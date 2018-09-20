$( document ).ready(function () {
    
    // Decalre variables and get DOM elements
    var numImages = 10;
    var $gifContainer = $('#gif-container');
    var $addGif = $('#gif-input');
    var $addGifBtn = $('#add-gif-btn');
    var $imgContainer = $('#img-container');
    var $numOfImg = $('#num-of-images');
    var $imgs;
    var $imgsTitle;
    var $imgsRating;
    var $imgsWithIds;

    // Declare an array of topics
    var topic = ['funny cats', 'silly dogs', 'peanut butter jelly time', 'i like turtles']

    // Function to start the app
    function startApp() {
        
        // Create panels for images (10 by default)
        createImgPanel();
        $('.panel').hide();
        getUpdatedDomElems();

        // Sets numImages to the dropdown selection
        $numOfImg.change(function() {
            numImages = this.value;
        });

        // Start all event listeners
        $addGif.on('keydown', enterKeyToAdd);
        $addGifBtn.on('click', addGif);
        $gifContainer.on('click', 'button', displayGifs);
        $imgContainer.on('click', 'img', animateGifs);

        // Render buttons in topic array
        renderButton();
    }

    // Gets current DOM Elements on the page
    function getUpdatedDomElems() {
        $imgs = $('img');
        $imgsRating = $('.rating');
        $imgsTitle = $('.title');
        $imgsWithIds = $imgs.filter(function (index, element) {
            return $(element).attr('id');
        });
    }

    // Allows user to use 'enter' key to add topics
    function enterKeyToAdd(event) {
        if (event.keyCode === 13) {
            addGif();
        }
    }

    // Adds and create new topic button if it doesn't exist in the topic array
    function addGif() {

        // Convert topic from input to lowercase
        var topicLowerCase = $addGif.val().toLowerCase();

        // Check if input is already in the 'topic' array and NOT empty
        // If true, add to 'topic' array, wiped out buttons, re-render all buttons
        if (topic.indexOf(topicLowerCase) === -1 && $addGif.val() != '') {
            topic.push(topicLowerCase);
            $gifContainer.empty();
            renderButton();
        } 
        $addGif.val('');
    }

    // Renders buttons for each topic in topic array
    function renderButton() {
        for (i = 0; i < topic.length; i++) {
            newBtn = $('<button>');
            newBtn.addClass('btn btn-primary');
            newBtn.attr('data-topic', topic[i]);
            newBtn.text(topic[i]);
            $gifContainer.append(newBtn);
        }  
    }

    // Creates new panels where images will go in
    function createImgPanel() {
        
        $imgContainer.empty();

        for (i = 0; i < numImages; i++) {
            var newBoxDiv = $('<div>');
            var newPanel = $('<div>');
            var newPanelHeading = $('<div>');
            var newPanelBody = $('<div>');
            var newPanelFooter = $('<div>');
            var newImgContent = $('<img>');
            var newID = 'img-'+i;
            var title = '<p><span class="title"></span></p>';
            var rating = '<p>Rating: <span class="rating"></span></p>';
    
            newBoxDiv.addClass('col-sm-6 col-md-4');
            newPanel.addClass('panel panel-primary');
            newImgContent.attr({ 'id': newID, 'data-img': i });
            $imgContainer.append(newBoxDiv);
            newBoxDiv.append(newPanel);
            newPanel.append(newPanelHeading);
            newPanel.append(newPanelBody);
            newPanel.append(newPanelFooter);
            newPanelHeading.addClass('panel-heading');
            newPanelBody.addClass('panel-body');
            newPanelFooter.addClass('panel-footer');
            newPanelBody.append(newImgContent);
            newPanelHeading.append(title);
            newPanelFooter.append(rating);
        }
        // Call function to grab new DOM elements
        getUpdatedDomElems();
    }

    // Display Gifs by making Ajax call to the GIPHY API
    function displayGifs() {
        $('.panel').show();
        createImgPanel();

        // Sets title to data-topic value, replace spce with '+'
        var title = $(this).attr('data-topic').split(' ').join('+');
        var queryURL = "https://api.giphy.com/v1/gifs/search";

        // Add parameters to base queryURL
        queryURL += '?' + $.param({
            'api_key': "D41gIqTe2XuLnlhr8V93REZDOSxjwvCx",
            'q': title,
            'limit': numImages,
            'offset': "0",
            'rating': "G",
            'lang': "en"
        });
        
        // Make the ajax call and add the images to the page
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(res) {
            for (i = 0; i < numImages; i++) {
                var still = res.data[i].images.fixed_height_still.url;
                var animate = res.data[i].images.fixed_height.url;
                var title = res.data[i].title;
                var rating = res.data[i].rating.toUpperCase();
                var img = $($imgsWithIds[i]);
                var imgsTitle = $($imgsTitle[i]);
                var imgsRating = $($imgsRating[i]);
                img.attr('src', still);
                img.attr('data-still', still);
                img.attr('data-state', 'still');
                img.attr('data-animate', animate);
                imgsTitle.text(title)
                imgsRating.text(rating);
            }
        }).catch(function(err) {
            console.log(err);
        });   
    }

    // Start and stop animation on click
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

    // Starts the app
    startApp();
    
});