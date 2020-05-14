import { card,pagination }  from './Templates.js'


let ticker;
const progressBar = () => {
    let counter = 0;
    $('.loader').fadeIn('ease')
    ticker = setInterval(() => {
        counter = counter + 1;
        if (counter <= 100) {
            $('.loader').css('width', `${counter}%`)
        }
        if (counter == 100) {
            counter = 0;
        }
    }, 10)
}

$(document).ajaxStart(() => {
    const trigger = setTimeout(() => {
        progressBar();
    }, 500);
    $(document).ajaxStop(() => {
        clearTimeout(trigger);
    })
})

function apiRequest(request) {
    let response;
    if (request != undefined) { 
        if (typeof request != 'object') {

            response = $.get({ url: 'https://api.coingecko.com/api/v3/coins/' + request, dataType: 'json' });


        }    
        else {
            response = $.get({ url: ' https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + request + '&tsyms=USD,EUR,ILS', dataType: 'json' });

        }
    }
    return response;
};

export default class DataHandler {
    constructor(request) {

        this.request = request;

    }

    async init() {

        const apiListData = await apiRequest(this.request);
        const pagesContainer = $(document.createElement('div'));
        let pagesCounter = 0;
        //Created an interval to let the call stack event loop 'breath'
        const dataFlowValve = setInterval(() => {

            const pageData = apiListData.splice(0, 24); //set how many coins per page
            const page = $(document.createElement('div'));

            page.addClass('page');
            page.attr('data-num', `${pagesCounter}`);
            page.hide();

            const storedData = JSON.parse(localStorage.getItem('coinsData'));


            $.each(pageData, (_index,coinData) => {

                const coin = card();
                coin.attr('data-id', coinData.id);
                coin.attr('data-symbol', coinData.symbol);
                coin.attr('data-name', coinData.name);
                coin.find('.card-header p').html(coinData.symbol.toUpperCase());
                coin.find('.card-title').html(coinData.name);
                coin.find('.info-container').hide();
                if (storedData != null) {

                    const storedCoin = $.grep(storedData, searchedCoin => searchedCoin.coinID === coinData.id);
                    if (storedCoin.length > 0) {
                        const tempRequest = new DataHandler(coinData.id)
                        tempRequest.updateCoin(coin)
                    }

                }
                coin.appendTo(page);
            })

            //append the first page as soon as it ready 
            if (page.data('num') == 0) {
                page.clone().prependTo('section');
                $('section').find('.page').fadeIn('slow');
                pagination().appendTo('section');
                clearInterval(ticker);
                if ($('.loader').css('display') === 'block') {
                    $('.loader').css('width', "100%");
                    $('.loader').fadeOut('slow', () => {
                        $('.loader').css('width', "0%");
                        $('.loader').show();

                    })
                }
                
            }

            pagesCounter++;
            page.appendTo(pagesContainer);

            //stop the interval if there is no more data to create a coin
            if (apiListData.length == 0) {
                clearInterval(dataFlowValve);
            }

        })

        return pagesContainer
    }

    async updateMarketData() {
        const storedData = JSON.parse(localStorage.getItem('coinsData'));
        const apiCoinData = await apiRequest(this.request);
        const timestamp = $.now();
        const filteredStoredData = $.grep(storedData, coinData => coinData.coinID != this.request);
        const coinData = {

            usd: apiCoinData.market_data.current_price.usd,
            eur: apiCoinData.market_data.current_price.eur,
            ils: apiCoinData.market_data.current_price.ils
        }
        filteredStoredData.push({ coinID: this.request, last_update: timestamp, market_data: coinData, image: apiCoinData.image.small });
        localStorage.setItem('coinsData', JSON.stringify(filteredStoredData));
        clearInterval(ticker);
        if ($('.loader').css('display') === 'block') {
            $('.loader').css('width', "100%");
            $('.loader').fadeOut('slow', () => {
                $('.loader').css('width', "0%");
                $('.loader').show();

            })
        }


    }

    updateCoin(coin) {
        const storedData = JSON.parse(localStorage.getItem('coinsData'));
        const storedCoinArr = $.grep(storedData, coinData => coinData.coinID === this.request);
        const storedCoin = storedCoinArr[0];
        const coinListItem = coin.find('li');
        coin.find('img').attr('src', storedCoin.image);
        $.each(coinListItem, (_index,li) => {
            switch (_index) {
                case 0:
                    $(li).html(`<h6>USD:</h6><p>${storedCoin.market_data.usd}$</p>`);
                    break;
                case 1:
                    $(li).html(`<h6>EUR:</h6><p>${storedCoin.market_data.eur}€</p>`);
                    break;
                case 2:
                    $(li).html(`<h6>ILS:</h6><p>${storedCoin.market_data.ils}₪</p>`);
                    break;
            }
        }) 
    }

    async liveReport() {

        const apiCoinData = await apiRequest(this.request);
        clearInterval(ticker);
        $('.loader').css('width', "0%");
        return apiCoinData;

    }
    //function in case wants to try it the other way
}