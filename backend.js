
$(document).ready(function () {
    $("#search").on("click", function (event) {
        event.preventDefault();
        var searchTxt = $("#search-term").val();
        var numberRec = $("#number-records").val();
        var startYear = $("#start-year").val();
        var endYear = $("#end-year").val();
        console.log(searchTxt, numberRec, startYear, endYear);
    })
    $("#reset").on("click", function (event) {
        event.preventDefault();
        var searchTxt = $("#search-term").val(null);
        var numberRec = $("#number-records").val(null);
        var startYear = $("#start-year").val(null);
        var endYear = $("#end-year").val(null);
        console.log(searchTxt, numberRec, startYear, endYear);
    })
})
$(document).on("click", "#search", function () {
    event.preventDefault();
    var limitNum = parseInt($("#number-records").val());
    console.log(limitNum);
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "315b4cda26814b54ad0934919f414cb2",
        'q': $("#search-term").val(),
        'begin_date': parseInt($("#start-year").val() + "0101"),
        'end_date': parseInt($("#end-year").val() + "0101"),
        'sort': "newest"
    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        console.log(result)
        // $("#results").empty();
        for (var i = 0; i < limitNum; i++) {
            console.log("here")
            var doc = result.response.docs[i];
            var authorData = doc.byline.original;
            var titleData = doc.headline.main;
            var dateData = doc.pub_date;;
            var linkData = doc.web_url;
            console.log(author,title,date,link);
     
            var title = $(`<div id="title"><strong>${titleData}</strong></div>`);
            var author = $(`<div id="Author">${authorData}</div>`);
            var date = $(`<div id="date">${dateData}</div>`);
            var link = $(`<a id="link" href="${linkData}">${linkData}</a><br><hr>`);

             $("#results").append(title,author,date,link)

        }
    }).fail(function (err) {
        throw err;
    });

})