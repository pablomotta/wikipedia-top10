$(document).ready(function() {


    // variables
    var $$form = $('#search-form')
    var $$input = $('#search-input')
    var $$results = $('#results')

    // perfrom actions upon search submition.
    $$form.on('submit', function(event) {
        //prevent page reload
        event.preventDefault()
            //grab item to be searched
        var searchTerms = $$input.val()

        searchWikipedia(searchTerms, function(json) {
            // empty previous results before displaying new search
            $$results.empty()
                // format result items returned by formatResponse function.
            formatResponse(json)
                //map each item and store them in an array.
                .map(createResultItem)
                //loop through each result item
                .forEach(function(listItem) {
                    // append each item of the array to $$results div.
                    $$results.append(listItem)
                })

        })
    })

})

// wikipedia search method function.
function searchWikipedia(text, callback) {

    var endpoint = 'https://en.wikipedia.org/w/api.php?callback=?'
        //object with wikipedia query items.
    var query = {
            action: 'query',
            format: 'json',
            list: 'search',
            generator: 'search',
            srsearch: text,
            gsrsearch: text
        }
        // AJAX call to fetch data from wikipedia
    $.getJSON(endpoint, query, callback)
}

// result creation method funciton
function createResultItem(data) {

    var href = 'https://en.wikipedia.org?curid=' + data.pageid
        // data to be displayed on page
    return `<div>
            <div class="results">
                <h5>${data.title}</h5><br>
                <p>${data.snippet}</p><br>
                <a id="button" class="button" href="${href}" target="_blank">More</a>
            </div>
          </div>`
}

//result format method function.
function formatResponse(json) {

    var search = json.query.search
    var pages = json.query.pages

    return Object.keys(pages)
        .map(function(pageId) {

            var info = pages[pageId]
            var details = search[info.index]

            return Object.assign({}, info, details)
        })
}
