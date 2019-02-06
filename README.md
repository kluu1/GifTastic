# GifTastic
Live Demo: https://kluu1.github.io/GifTastic-App/
- This is a fun and simple giffy app using Giphy API's
- Users can click on one of the topic button to display the still gifs
- When the user clicks on a still gif, the gif will animate, vice versa.
- Users can also add more topics
- Each gif will display its rating (PG, G, so on)

## Preview
![Alt text](/screenshot.png?raw=true "giftastic")

## Design Notes
- There is an array called 'topic' that holds all the topics for the app.
- On startup, the app will loop through the topics and create a button for each topic.
- When users clicks on a topic button, the page will display 10 non-animated gif images. 
- Users can change how many images to display per page by change the value in the dropdown menu.
- Under every gif, there a rating is displayed (PG, G, etc.).
- When users clicks on a still image, the gif will animate. If the user clicks the gif again, it will stop animation.
- There is a form on the page that takes the value of the user input box and adds it to the topics array. When the user clicks 'Add Gif' or presses 'Enter', a function call will be made to recreate buttons for each topic in the array.

## Technologies used
- JavaScript
- jQuery
- Bootstrap
- HTML5
- CSS3
