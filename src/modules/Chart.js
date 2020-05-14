import DataHandler from './DataHandler.js'

const chart = async (symbolsArr, namesArr, type, sign) => {
    const setDataHandler = new DataHandler(symbolsArr);
    const apiResponse = await setDataHandler.liveReport();//fetch only once to initialize datapoints
    const filteredNamesData = [];
    const filteredSymbolsData = $.map(symbolsArr, (_value, _index) => {
        if ($.inArray(symbolsArr[_index].toUpperCase(), Object.keys(apiResponse)) >= 0) {
            filteredNamesData.push(namesArr[_index]);
            return symbolsArr[_index];
        }
    })
    $(document).on('change', '#coins_in_chart', () => {
        type = $('#coins_in_chart').val().toUpperCase()
        switch (type) {
            case 'USD':
                sign = '$';
                break;
            case 'EUR':
                sign = '€';
                break;
            case 'ILS':
                sign = '₪';
                break;
        }
        chart(symbolsArr, namesArr, type, sign)

    })

   

    const options = {
        title: {
            text: 'Live Reports'
        },
        axisX: {
            title: "chart updates every 2 secs"
        },
        axisY: {
            includeZero: true
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: []
    };

    $.each(filteredSymbolsData, (_index, symbol) => {
        let arr = []
        if (_index == 0) {
            options.data.push({
            type: "line",
            xValueType: "datetime",
            yValueFormatString: `###.0000${sign}`,
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: `${filteredNamesData[_index]}`,
            dataPoints: arr
            })
        }
        else{
            options.data.push({
            type: "line",
            xValueType: "datetime",
            yValueFormatString: `###.0000€${sign}`,
            showInLegend: true,
            name: `${filteredNamesData[_index]}`,
            dataPoints: arr
            })
        }

    })

    $("#chartContainer").CanvasJSChart(options);

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    let regulator;
    if (filteredNamesData.length != 0) {

            regulator = setInterval(function () {
            updatechart();

        }, 2000);
    }
    else {
        alert("Either the you haven't toggled a coin OR the coins toggled have no data in the api")
    }

    async function updatechart() {
        const apiResponse = await setDataHandler.liveReport();//fetch to update datapoints
        const activePage = $('.chart-wrapper');

        if (activePage.length == 0) {
            clearInterval(regulator);

            return
        }

        let counter = 0;
        $.each(apiResponse, (symbol, prices) => {
                
            options.data[counter].dataPoints.push({
                x: new Date($.now() - 2000),
                y: prices[type]
            })
            options.data[counter].legendText = `${filteredNamesData[counter]}: ` + prices[type] + `${sign}`;

            counter++

        })
        $("#chartContainer").CanvasJSChart().render();

    }



}


export { chart }
