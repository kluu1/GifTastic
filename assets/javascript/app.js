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
        $imgsWithIds.on('click', animateGifs);
        renderBtn();
        $thumbnail.hide();
    }

    function addGif() {
        if (topic.indexOf($addGif.val()) === -1) {
            topic.push($addGif.val());
            var newGif = $('<button>');
            newGif.addClass('btn btn-primary');
            newGif.
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
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=D41gIqTe2XuLnlhr8V93REZDOSxjwvCx&q=' + title + '&limit=10&offset=0&rating=G&lang=en';
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(res) {
            for (i = 0; i < 10; i++) {
                var still = res.data[i].images.downsized_still.url;
                var animate = res.data[i].images.downsized.url;
                var img = $($imgsWithIds[i]);
                img.attr('src', still);
                img.attr('data-still', still);
                img.attr('data-state', 'still');
                img.attr('data-animate', animate);
            }
        }).catch(function(err) {
            console.log(err);
        });   
    }

    function animateGifs() {
        var state = $(this).attr('data-state');
        var thisImg = $(this);

        if (state === 'still') {
            thisImg.attr('src', thisImg.attr('data-animate'));
            thisImg.attr('data-state', 'animate');
          } else if (state === 'animate') {
            thisImg.attr('src', thisImg.attr('data-still'));
            thisImg.attr('data-state', 'still');
        }
    }

    startApp();
    

});