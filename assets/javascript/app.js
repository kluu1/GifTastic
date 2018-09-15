$( document ).ready(function () {
    
    // Get DOM elements
    var $gifContainer = $('#gif-container');
    var $addGif = $('#gif-input');
    var $addGifBtn = $('#add-gif-btn');
    var $thumbnail = $('.thumbnail');
    var $imgs = $('img');

    var $imgsWithIds = $imgs.filter(function (index, element) {
        return $(element).attr('id');
    });

    var topic = ['batman', 'spiderman', 'jumanji']

    function startApp() {
        $addGifBtn.on('click', addGif);
        $gifContainer.on('click', 'button', displayGifs);
        renderBtn();
        $thumbnail.hide();
    }

    function addGif() {
        if (topic.indexOf($addGif.val()) === -1) {
            topic.push($addGif.val());
            var newGif = $('<button>');
            newGif.addClass('btn btn-primary');
            newGif.text($addGif.val());
            $gifContainer.append(newGif);
        } 
    }

    function renderBtn() {
        for (i = 0; i < topic.length; i++) {
            newBtn = $('<button>');
            newBtn.addClass('btn btn-primary');
            newBtn.text(topic[i]);
            $gifContainer.append(newBtn);
        }  
    }

    function displayGifs() {
        $thumbnail.show();
        var title = $(this).text().split(' ').join('+');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=D41gIqTe2XuLnlhr8V93REZDOSxjwvCx&q=' + title + '&limit=9&offset=0&rating=G&lang=en';
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(res) {
            for (i = 0; i < 9; i++) {
                var imgUrl = res.data[i].images.downsized.url;
                $($imgsWithIds[i]).attr('src', imgUrl);
            }
        }).catch(function(err) {
            console.log(err);
        });
        
    }

    startApp();

    console.log($imgsWithIds);
    console.log($($imgsWithIds[10]))
    

});