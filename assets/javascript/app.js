$( document ).ready(function () {
    
    // Declare global variables

    // Get DOM elements
    // var $moviesContainer = $('#movies-container');
    // var $addMovie = $('#movie-input');
    // var $addMovieBtn = $('#add-movie-btn');
    // var $images = [$('#img-01'), $('#img-02'), $('#img-03'), $('#img-04'), $('#img-05'), $('#img-06'), $('#img-07'), $('#img-08'), $('#img-09')];

    var $imgs = $('img');

    var imgsWithIds = $imgs.filter(function (index, element) {
        return $(element).attr('id');
    });

    console.log(imgsWithIds);

    console.log(imgsWithIds[0]);

    console.log(imgsWithIds[0].attr('src', 'http://testurl.com'))

    

    // divsWithImg[0].attr('src', 'test_rul');

    // function startApp() {
    //     $addMovieBtn.on('click', addMovie);
    //     $moviesContainer.on('click', 'button', displayGifs);
        
    // }

    // function addMovie() {

    //     if ($addMovie.val() != "") {
    //         var newMovie = $('<button>');
    //         newMovie.addClass('btn btn-primary');
    //         newMovie.text($addMovie.val());
    //         $moviesContainer.append(newMovie);
    //         console.log('clicked');
    //     } 
    // }

    // function displayGifs() {
    //     var title = $(this).text().split(' ').join('+');
    //     var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=D41gIqTe2XuLnlhr8V93REZDOSxjwvCx&q=' + title + '&limit=9&offset=0&rating=G&lang=en';
    
    //     $.ajax({
    //         url: queryURL,
    //         method: 'GET'
    //     }).then(function(response) {

    //         for (i = 0; i < 9; i++) {
    //             var imgUrl = response.data[i].images.downsized.url;
    //             // $images[i].attr('src', imgUrl);

    //             imgs[0] = imgUrl;

    //         }
    //     });
        
    // }

    // startApp();
    

});