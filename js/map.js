// initializing the google map  and map related functions also i minifyed the styles so it runs faster.
function initMap() {
	var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":60}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":20}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":40}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":20},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"17"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#ff4700"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"invert_lightness":true},{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#3b3b3b"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ff4700"},{"lightness":"39"},{"gamma":"0.43"},{"saturation":"-47"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#555555"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
	map = new google.maps.Map(document.getElementById("map"), {
		center:{lat: 50.717436, lng: 10.463649},
		zoom: 20,
		styles: styles,
		mapTypeControl: true,
	    mapTypeControlOptions: {
	        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
	        position: google.maps.ControlPosition.LEFT_BOTTOM
	    }
	});

	geocoder  =  new google.maps.Geocoder();
	// attach the input to enable autocomplete
	var input = $("#searchbox")[0];
	var searchBox = new google.maps.places.SearchBox(input);
	myInfowindow = new google.maps.InfoWindow();
	// change icon-colors: modified by udacity course material
	defaultIcon = makeMarkerIcon('ffa27c');
	currentMarkerIcon = makeMarkerIcon('ffffff');
	function makeMarkerIcon(markerColor) {
		var markerImage = new google.maps.MarkerImage(
			'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
			'|40|_|%E2%80%A2',
		new google.maps.Size(42, 68),
		new google.maps.Point(0, 0),
		new google.maps.Point(21, 68),
		new google.maps.Size(42,68));
		return markerImage;
	}
	highLightThisMarker = function(){
		this.setIcon(currentMarkerIcon);
	};
	stopHighLighting = function(){
		this.setIcon(defaultIcon);
	};
	// this function is used once when initializing stored markers and display it on map
	createMarkers = function(locations) {
		markers=[];
		for(var i=0; i<locations.length; i++){
			var marker = new google.maps.Marker({
				position: locations[i].location,
				title: locations[i].title,
				icon: defaultIcon,
				animation: google.maps.Animation.DROP,
				map: map
			});


			markers.push(marker);
			marker.addListener('click', function(){
				populateInfoWindow(this, myInfowindow);
				performAjax(this);
				setBouncing(this);
			});
			if(!isTouchDevice){
				marker.addListener('mouseover', highLightThisMarker);
				marker.addListener('mouseout', stopHighLighting);
			}

		}
	};

	// Show Initial Markers, and save each marker as favorite
	var HotspotMarkers = JSON.parse(localStorage.myMarkers);
	createMarkers(HotspotMarkers);
	markerHot = [];
	for(var i = 0; i<markers.length; i++){
		markerHot.push(markers[i]);
	}
	// confine the maps to show all the necessary markers
	setBounds= function(markerArry) {
		var bounds = new google.maps.LatLngBounds();
		for(var i = 0; i<markerArry.length; i++){
			if(markerArry[i].getMap() !== null){
				bounds.extend(markerArry[i].position);
			}
		}
		map.fitBounds(bounds);
	};
	setBounds(markerHot);

	// enable search function and return places with markers, modified little
	// from google maps api referece
	searchBox.addListener('places_changed', function(){
		var places = searchBox.getPlaces();
		if(places.length === 0){
			return;
		}
		// Hide all the old markers and delete them
		markers.forEach(function(marker){
			marker.setMap(null);
		});
		markerHot.forEach(function(marker){
			marker.setMap(null);
		});
		markers = [];

		// Create a marker for each
		places.forEach(function(place) {
			// old icon
			/*
			var icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};
			*/
			var marker = new google.maps.Marker({
				map: map,
				icon: defaultIcon,
				title: place.name,
				position: place.geometry.location
			});
			markers.push(marker);
			marker.addListener('click', function(){
				populateInfoWindow(this, myInfowindow);
				performAjax(this);
				setBouncing(this);
			});
			if(!isTouchDevice){
				marker.addListener('mouseover', highLightThisMarker);
				marker.addListener('mouseout', stopHighLighting);
			}
		});

		setBounds(markers);
	});

	// reset the map bounds when the screen resizes
	// This can only be called after the map has loaded.
	window.onresize = function(){
		setBounds(markers);
	};
}


// populateInfoWindow defined, modified from udacity course material
function populateInfoWindow(marker, infowindow){
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
	// Clear the infowindow content to give the streetview time to load.
		infowindow.setContent('');
		infowindow.marker = marker;
	// Make sure the marker property is cleared if the infowindow is closed.
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
		});
	}
	infowindow.setContent('<div><h2>' + marker.title + '</h2></div>');

	infowindow.open(map, marker);
}
function hideAllMarkers() {
	// hide the Hotspots
	markerHot.forEach(function(marker){
		marker.setMap(null);
	});
	markers.forEach(function(marker) {
		marker.setMap(null);
	});
}
function showMarker(markerArry){
	markerArry.forEach(function(marker){
		marker.setMap(map);
	});
}
// bounce a particular marker for 1.4 seconds
function setBouncing(marker) {
	if(marker.getAnimation()  === null){
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){marker.setAnimation(null);}, 1400);
	}
}
//error handling
function mapError(){
	alert("Cannot Load map, please try again letter!");
}
// run before changing marks
localStorage.clear();
