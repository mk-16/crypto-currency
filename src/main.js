
import UIHandler from './modules/UIHandler.js'
import DataHandler from './modules/DataHandler.js'

$(async () => {

    const setListHandler = new DataHandler('list');
    let pagesContainer = await setListHandler.init();
    let setUIHandler = new UIHandler(pagesContainer);

    $(document).on('click', 'a', (evt) => {
        evt.preventDefault()

        let target = $(evt.target).attr('href');
        const currentPage = $('.page');
        const setAnchorHandler = new UIHandler(pagesContainer);


        switch (target) {
            case 'home':
                $('.parallax').fadeIn();
                setAnchorHandler.switchSection();
                $('body').children('span').remove()
                break;
            case 'live-reports':
                $('.parallax').fadeOut('fast');
                setAnchorHandler.switchSection('liveReports');
                break;
            case 'about':
                $('body').children('span').remove()
                $('.parallax').fadeOut('fast')
                setAnchorHandler.switchSection('about');
                break;
            case 'first-page':
                setAnchorHandler.moveCoinPage(currentPage, 0);
                break;
            case 'prev-page':
                target = currentPage.data('num') - 1
                if (target >= 0) {
                    setAnchorHandler.moveCoinPage(currentPage, target);
                }
                break;
            case 'next-page':
                target = currentPage.data('num') + 1
                if (target < pagesContainer.children().length) {
                    setAnchorHandler.moveCoinPage(currentPage, target);
                }

                break;
            case 'last-page':
                target = pagesContainer.children().length - 1
                setAnchorHandler.moveCoinPage(currentPage, target);
                break;
        }

    })

    $(document).on('click', '#search-btn', async (evt) => {

        evt.preventDefault();

        if ($('.modal[data-belongs="search"]').length == 0) {
            setUIHandler = new UIHandler(pagesContainer);
            setUIHandler.searchCoin();
        }
    })

    $(document).on('click', '.btn-close', (evt) => {
        const target = $(evt.target).parents('.modal').data('belongs');
        setUIHandler = new UIHandler(pagesContainer);
        setUIHandler.closeModal(target);

    })

    $(document).on('click', '.coins-toggler', (evt) => {

        const targetedToggle = evt.target;
        const toggledArray = $.grep(pagesContainer.find('.coins-toggler'), toggle => toggle.checked);

        setUIHandler = new UIHandler(pagesContainer);
        if (targetedToggle.checked && toggledArray.length < 5) {
            setUIHandler.toggleSwitched(targetedToggle, true);
        }
        else if (targetedToggle.checked && toggledArray.length == 5 && $('.modal[data-belongs="limit"]').length == 0) {
            targetedToggle.checked = false

            if ($('.modal[data-belongs="search"]').length == 1) {
                setUIHandler.closeModal('search');
            }
            setUIHandler.toggleLimit(toggledArray, targetedToggle);
            alert('You have reached the limits of toggable coins')
        }
        else {
            setUIHandler.toggleSwitched(targetedToggle, false);
            targetedToggle.checked = false;

        }

    })

    $(document).on('click', '.more-info-btn', async (evt) => {

        const storedData = JSON.parse(localStorage.getItem('coinsData'));
        const coin = $(evt.currentTarget).parents('.card');
        const coinID = $(evt.currentTarget).parents('.card').data('id');
        const currenTime = $.now();

        const coinHandler = new DataHandler(coinID);
        setUIHandler = new UIHandler(pagesContainer);

        if (storedData === null) {
            localStorage.setItem('coinsData', JSON.stringify([]));
            await coinHandler.updateMarketData();;
            await coinHandler.updateCoin(coin);;
        }
        else {
            const storedCoin = $.grep(storedData, coinData => coinData.coinID === coinID);
            if (storedCoin.length === 0) {
                await coinHandler.updateMarketData();
                await coinHandler.updateCoin(coin);

            }

            else if (currenTime - storedCoin[0].last_update > 120 * 1000) {
                await coinHandler.updateMarketData();
                await coinHandler.updateCoin(coin);
            }
        }
        setUIHandler.coinInfo(coin);
        coin.find('.info-container').slideToggle('ease');
                                                                                            
    })

    $(document).on('click', '#show-all', (evt) => {
        setUIHandler = new UIHandler(pagesContainer)
        const toggledArray = $.grep(pagesContainer.find('.coins-toggler'), toggle => toggle.checked);
        if (toggledArray.length == 0) {
            $('#show-all')[0].checked = false;
            alert('there are NO selected coins, Please select some coins with the toggle');
        }
        else {
            setUIHandler.toggleLimit(toggledArray);
        }
    })

})

