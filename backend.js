$(document).ready(function () {
    $(document).on("click", "#search", function () {
        // clean up the result section from previous results
        event.preventDefault();
        $("#results").empty();
        $("#resultHeader").empty();
        // store user input 
        var searchKey = $("#search-term").val();
        var startD = $("#start-year").val();
        var endID = $("#end-year").val();
        var limitNum = parseInt($("#number-records").val());

        //create the ajax url
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "315b4cda26814b54ad0934919f414cb2",
            'q': $("#search-term").val(),
            'begin_date': parseInt($("#start-year").val() + "0101"),
            'end_date': parseInt($("#end-year").val() + "0101"),
            'sort': "newest"
        });

        // use ajax method to call NYT API
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function (result) {

            // function to get reslt from the response and put them in the result section
            function getResult(number) {
                // fishing values from the response JSON object
                for (var i = 0; i < number; i++) {
                    
                    var doc = result.response.docs[i];
                    console.log(doc);
                    //there are articles without Author which the below if will catch them
                    if(doc.byline){ var authorData = doc.byline.original;}
                    else { var authorData = "" }
                    var titleData = doc.headline.main;
                    var dateData = doc.pub_date;;
                    var linkData = doc.web_url;

                    // dynamically creating html element for the values using jQuery
                    var title = $(`<div id="title"><strong>${titleData}</strong></div>`);
                    var author = $(`<div id="Author">${authorData}</div>`);
                    var date = $(`<div id="date">${dateData}</div>`);
                    var link = $(`<a id="link" href="${linkData}">${linkData}</a><br><hr>`);
                    console.log(author, title, date, link);

                    // appending the results to html
                    $("#results").append(title, author, date, link)
                }
            }

            var responseCount = result.response.docs.length

            // if enough articles has been found
            if (responseCount >= limitNum) {
                $("#resultHeader").append(`Here is ${limitNum} articles reagrding ${searchKey} from ${startD} to ${endID}:`)
                getResult(limitNum);
            }

            // if less or no articles has been found
            else if (responseCount < limitNum) {
                console.log(responseCount);
                $("#resultHeader").append(`${responseCount} articles reagrding ${searchKey} from ${startD} to ${endID} has been found!`)
                getResult(responseCount);
            }

        // catch the error
        }).fail(function (err) {
            throw err;
        });
    });
})