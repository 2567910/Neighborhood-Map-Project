// The Model
var highLightThisMarker, stopHighLighting, currentMarkerIcon, defaultIcon, geocoder;
var map, createMarkers, myInfowindow, markers, markerHot, setBounds, defaultBounds, performAjax;
var isTouchDevice = 'ontouchstart' in document.documentElement;
var screenWidth = screen.width;
// Hotspots=Clubs (in KO.js u will find Hotspots) I had to change the Location again becaue in my town there is no google street view!
var menuItems = ["Besten Club´s anzeigen", "Suchen", "Inhalte", "Clubs aktualisieren"];
// Store some markers into localStorage
function initNewHotspots() {
	if(!localStorage.myMarkers){
		var myMarkers = [{"title":"P1","location":{"lat":48.144129,"lng":11.584951}},
			{"title":"Gecko","location":{"lat":48.142269,"lng":11.570739}},
			{"title":"Crux","location":{"lat":48.137634,"lng":11.578214}},
			{"title":"Paradiso Tanzbar","location":{"lat":48.133210,"lng":11.574897}},
			{"title":"Neuraum","location":{"lat":48.142273,"lng":11.550636}},
			{"title":"Cord Club","location":{"lat":48.136460,"lng":11.564288}}];
		localStorage.setItem("myMarkers", JSON.stringify(myMarkers));
	}
}
initNewHotspots();

//Just the link in the menu bar

var inhalt = [
	{item: "All icons from http://fontawesome.io/"},
	{item: "Udacity Neighborhood Map Project"},
	{item: "OpenWeatherMap API from http://openweathermap.org/"},
	{item: "google maps API"},
	{item : "jQuery"},
	{item: "knockout.js"}
];

