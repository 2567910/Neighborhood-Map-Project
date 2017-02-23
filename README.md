# Welcome to my the neighborhood map Project

## Table of contents

* How to use the app
* Code organization
* Inhalte (what i used to build it)


### How to use the app

* Open the index.html or go to [this site](https://2567910.github.io/Neighborhood-Map-Project).
* Click the menu icon on the top-left to see a list of options

1. Open Die Besten Münchner Club`s to see and filter the saved markers
1. Open Inhalte to see what resources this app has used
1. Open Suchen in the menu or click on the top-right icon to search for places

* Click on the marker, then in the infowindow, also clicking on the name will also show the place details, a streetview image, the formatted address and current weather report.
* Click on the "Hotspot hinzufügen" or "Hotspot Löschen" this will either store the current marker or delete it.
* Adding more Hotspots by searching places in the search box.

### Code organization
* All css and js, except jquery and knockout, are initialy inlined in index.html, then according to advice, is now separated into different files.
* There are THREE chunks of javascript
1. model.js includes all the global variables and essential data
1. ko.js includes all the knockout viewmodel observables and functions
1. map.js includes all google map related functions


### Inhalte
* [knockout.js](knockoutjs.com)
* [jQuery](http://jquery.com/)
* [Google Maps API](https://developers.google.com/maps/)
* [OpenWeatherMap](http://openweathermap.org/api)
* All icons from http://fontawesome.io/


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
1. Optional minify js and css
