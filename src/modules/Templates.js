
const liveReportsSection = () => {

    return $(`
            <div class="chart-wrapper">
            <div id="chartContainer" style="height: 370px; width: 100%;">
            </div>
            <div class="coin-selector">
                <select id="coins_in_chart">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="ils">ILS</option>
                </select>
            </div>
            </div>`)
    }
const aboutSection = () => {
    return $(`
             <div class="about-container">
                <div class="image-container"><img src="src/media/me.jpeg"></div>
                 <p> 
                This website displays real time information for crypto-currency based on CoinGecko and CryptoCompare API's.
                the site is composed of two main pages, "Home", where you can scroll and search for currencies
                and "Live Reports" where you can see real time currency information (2 sec intervals), the site 
                has the fallowing features:
                </p>
                <ul>
                    <li>Search for specific currency if provided the symbol (either CAPS or lowercase)</li>
                    <li>Display all selected currencies (max 5 currencies)</li>
                    <li>Pagination style scrolling to allow for confort with more than 7k currencies</li>
                </ul>
                <p>
                This site was designed with quick loading times in mind for seamless experience (even in low bandwitch network 3G).
                The styling of the site was done with a "Mobile First" aproach,keeping mind desktop responsivness aswell.
                </p><p>Technologies Used:</p>
                <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript</li>
                </ul>
                <p>Libraries Used:</p>
                <ul>
                <li>JQUERY(3.4.1)</li>
                <li>Custom-Bootstrap from bootswatch.com (Cosmo style)</li>
                <li>CanvasJS</li>
                </ul>
                <p>This website was developed to test the fallowing skills:</p>
                <ul>
                <li>HTML5 Tags Usages</li>
                <li>CSS3 Media Queries And Advanced Selectors</li>
                <li>Dynamic Page Layouts</li>
                <li>Bootstrap And Flex</li>
                </ul>
                <p>Javascript :</p>
                <ul>
                <li>Objects</li>
                <li>Callbacks,Promises,Async Await</li>
                <li>JQuery</li>
                <li>SPA Foundations</li>
                <li>Events Managment</li>
                <li>AJAX (RESTful API)</li>
                </ul>

                <h6>Created by Michael L.</h6>
 

                </div>
                `)
}

const searchModal = () => {

    return $(`<div class="modal" data-belongs="search">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Search Results</h5>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-close" data-dismiss="modal" id="close-search">Close</button>
                        </div>
                    </div>
                </div>
            </div>`)
    }
const limitModal = () => {

    return $(`<div class="modal" data-belongs="limit">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        </div>
                        <div class="modal-body">
                            <h3>Selected Coins</h3>
                            <div class="coins-toggled-container">
                            </div>
                            <hr />
                            <h3>Requested Coin</h3>
                            <div class="coin-untoggled-container">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-close" data-dismiss="modal"id="close-limit" >Close</button>
                        </div>
                    </div>
                </div>
            </div>`)
    }
const card = () => {
    return $(`<div class="card border-primary">
            <div class="card-header">
                <div class="container">
                    <p></p>
                    <label class="switch ">
                        <input type="checkbox" class="coins-toggler">
                            <span class="slider round"></span>
                    </label>
            </div>
            </div>
            <div class="card-body">
                <h4 class="card-title"></h4>
                <button type="button" class="btn btn-primary more-info-btn">More Info</button>
                <div class="container info-container">
                    <div>
                        <img />
                    </div>
                    <ul class="list-group">
                        <li class="d-flex justify-content-between align-items-center"></li>
                        <li class="d-flex justify-content-between align-items-center"></li>
                        <li class="d-flex justify-content-between align-items-center"></li>
                    </ul>
                </div>
            </div>
        </div>`)
}

const pagination = () => {
    return $(`<div>
                <ul class="pagination pagination-lg">
                    <li><a href="first-page">First Page</a></li>
                    <li><a href="prev-page">&laquo;&laquo; Previous Page</a></li>
                    <li><a href="next-page">Next Page &raquo;&raquo; </a></li>
                    <li><a href="last-page">Last Page</a></li>
                </ul>
            </div>`)
}

export { liveReportsSection, aboutSection, searchModal, limitModal, card, pagination }
