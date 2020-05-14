import { pagination, liveReportsSection, aboutSection, searchModal, limitModal } from './Templates.js'
import { chart } from './chart.js'

export default class UIHandler {

    constructor(pagesContainer) {
        this.pagesContainer = pagesContainer;
    }
    searchCoin() {

        const symbol = $("#search-input").val().toLowerCase();
        const target = this.pagesContainer.find(`.card[data-symbol=${symbol}]`).clone();
        if (target.length == 0) {
            alert('COIN NOT FOUND ,Please make sure you type the coin symbol only e.g: BTC or btc');
        }
        else {
            const modal = searchModal();
            target.appendTo(modal.find('.modal-body'));
            modal.insertAfter($('header'));
            modal.fadeIn('slow');
        }
    };

    closeModal(target) {

        $('#show-all')[0].checked = false;
        const updatePageID = $('.page').detach().data('num');
        const updatedPage = this.pagesContainer.find(`[data-num="${updatePageID}"]`).clone();
        $(`.modal[data-belongs=${target}]`).fadeOut('slow', () => $(`.modal[data-belongs=${target}]`).remove());
        updatedPage.prependTo($('section')).fadeIn('slow');
    };

    toggleSwitched(targetedToggle, isChecked) {
        const targetedToggleID = $(targetedToggle).parents('.card').data('id');
        this.pagesContainer.find(`.card[data-id=${targetedToggleID}]`).find('input')[0].checked = isChecked;
    };

    toggleLimit(toggledArray, targetedToggle) {

        const modal = limitModal();
        $.each(toggledArray, function () {
            $(this).parents('.card').clone().appendTo(modal.find('.coins-toggled-container'));
        })

        if (targetedToggle == undefined) {
            $(modal.find('h3')[1]).empty();
        }
        $(targetedToggle).parents('.card').clone().appendTo(modal.find('.coin-untoggled-container'));
        modal.insertAfter($('header'));
        modal.fadeToggle('slow');
    }

    coinInfo(coin) {

        const coinID = coin.data('id');
        this.pagesContainer.find(`.card[data-id=${coinID}]`).replaceWith(coin.clone());
        this.pagesContainer.find('.info-container').hide();
    }

    moveCoinPage(currentPage, target)
    {
        currentPage.fadeOut('slow', () => currentPage.remove());
        this.pagesContainer.find(`.page[data-num="${target}"]`).clone().prependTo('section');
        $('.page').fadeIn('slow');
    }

    switchSection(request) {
        $('section').empty();
        switch (request) {
            case 'liveReports':
                const namesArr = [];
                const symbolsArr = [];
                const toggledArray = $.grep(this.pagesContainer.find('.coins-toggler'), toggle => toggle.checked);
                $.each(toggledArray, (_index, toggleSwitch) => {

                    symbolsArr.push($(toggleSwitch).parents('.card').data('symbol').toUpperCase());
                    namesArr.push($(toggleSwitch).parents('.card').data('name'));
                })
                liveReportsSection().prependTo('section');
                chart(symbolsArr, namesArr, 'USD', '$');
                break;
            case 'about':
                aboutSection().prependTo('section');
                break;
            default:
                this.pagesContainer.find('.page[data-num="0"]').clone().prependTo('section').fadeIn('ease');
                pagination().appendTo('section');

        }
    }
}

