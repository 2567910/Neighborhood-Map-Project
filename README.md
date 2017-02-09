# Welcome to the neighborhood map around UCL 

## Table of contents  

* How to use the app
* Code organization
* Acknowledgement (icons and APIs) 


### How to use the app 

* Open the index.html or go to [this site](http://21xinpj.com/maps/index.html). 
* Click the menu icon on the top-left to see a list of options

1. Open My favorites to see and filter the saved markers 
1. Open Acknowledgements to see what resources this app has used 
1. Open search or click on the top-right icon to search for places 

* Click on the marker, then in the infowindow, click the "see details" will show the place name, a streetview image, the formatted address and current weather report. 
* Click on the "Save to MyFavorite" or "Delete from MyFavorite" will either store the current marker or delete it. 
* Adding more favorites by searching them in the search box.
* Enjoy. 

### Code organization
* All css and js, except jquery and knockout, are initialy inlined in index.html, then according to advice, is now separated into different files. (Sorry for the inconvinience...)
* There are THREE chunks of javascript 
1. model.js includes all the global variables and essential data 
1. ko.js includes all the knockout viewmodel observables and functions 
1. map.js includes all google map related functions


### Acknowledgements 
* [knockout.js](knockoutjs.com)
* [jQuery](http://jquery.com/)
* [Google Maps API](https://developers.google.com/maps/)
* [OpenWeatherMap](http://openweathermap.org/api)
* Icons from www.flaticon.com: 
1. Menu icon was made by Eleonor Wang from www.flaticon.com
1. Search icon made by Freepik from www.flaticon.com
1. Backward arrow icon by Freepik from www.flaticon.com
1. Close icon by Madebyoliver from www.flaticon.com

### Following are changes that have been made 
1. Adding an event listener for resizing
1. No extra step to see details. Just show an infowindow and detailed information
1. Semantic tags for html 
1. element classes and ids using lower case letters
1. deleting closing slash /
1. Error handling when google map doesn't load
1. scripts put to bottom for optimization
1. using panto in google maps 
1. marker animation when activated 
1. use bindings to close and show menu and resize map! 
1. setvisible to improve speed 
1. Use binding to resize map
1. Include a favicon in header 
1. Code quality check, js/css/html 