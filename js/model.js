// The Model
var highLightThisMarker, stopHighLighting, currentMarkerIcon, defaultIcon, geocoder;
var map, createMarkers, myInfowindow, markers, markerHot, setBounds, defaultBounds, performAjax;
var isTouchDevice = 'ontouchstart' in document.documentElement;
var screenWidth = screen.width;
// items in menu
var menuItems = ["Hotspots Schmalkalden", "Suchen", "Inhalte", "Hotspots aktualisieren", "Lukasseyfarth"];
// Store some markers into localStorage
function initNewHotspots() {
	if(!localStorage.myMarkers){
		var myMarkers = [{"title":"ALDI","location":{"lat":50.718120,"lng":10.466949}},
			{"title":"FH Schmalkalden","location":{"lat":50.717433,"lng":10.463801}},
			{"title":"REWE","location":{"lat":50.721054,"lng":10.458085}},
			{"title":"McDonalds","location":{"lat":50.715314,"lng":10.468343}}];
		localStorage.setItem("myMarkers", JSON.stringify(myMarkers));
	}
}
initNewHotspots();

//Just the link in the menu bar
//    var Lukasseyfarth = {
//        url: ko.observable("year-end.html"),
//        details: ko.observable("Report including final year-end statistics")
//    };

var inhalt = [
	{item: "All icons made by http://fontawesome.io/"},
	{item: "Udacity Neighborhood Map Project"},
	{item: "OpenWeatherMap API from http://openweathermap.org/"},
	{item: "google maps API"},
	{item : "jQuery"},
	{item: "knockout.js"}
];

