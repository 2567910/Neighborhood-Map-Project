// Here is my ViewModel for KO Hotspots Schmalkalden markerHot markerHot
function AppViewModel() {

	var self = this;
	// observables
	this.menu = ko.observable(menuItems);
	this.inhalt = ko.observableArray(inhalt);
	this.showMenuVar = ko.observable(false);
	this.showSearchVar = ko.observable(false);
	this.showHotspots = ko.observable(false);
	this.showInhalt = ko.observable(true);
	this.showDetails = ko.observable(false);
	this.mapWidth = ko.observable("100%");
	this.mapLeft = ko.observable("0");
//	this.Lukasseyfarth = ko.observableArray(Lukasseyfarth);
//	this.showLukas = ko.observable(false);
	// Functions
	this.reset = function() {
		self.showMenuVar(false);
		self.showSearchVar(false);
		self.showHotspots(false);
		self.showInhalt(false);
		self.showDetails(false);
		self.resettingMap();
		myInfowindow.close();
	};
	// functions to resize maps when showing and hiding the left-side menu on larger
	// screens
	//var $map = $("#map")
	this.mapFitting = function() {
		if(screenWidth > 500){
			self.mapWidth("calc(100% - 250px)");
			self.mapLeft("250px");
			setBounds(markers);
		}
	};
	this.resettingMap = function() {
		if(screenWidth > 500){
			self.mapWidth("100%");
			self.mapLeft("0");
			setBounds(markers);
		}
	};

	// read from model for favourite markers and display them on the screen
	var HotspotMarkers = JSON.parse(localStorage.myMarkers);
	this.HotspotList = ko.observableArray(HotspotMarkers);
	this.showNewHotspots = function(){
		self.reset();
		self.showHotspots(true);
		setBounds(markerHot);
	};

	// Set up for filtering function
	this.initial = ko.observable("");
	this.HOTSPOTS = ko.computed(function(){

		var arry = [];
		if(markerHot){ // markerHot only exists after map is loaded, so an if is added
			self.HotspotList(markerHot);	// Store markers in an ko.observable array why?
		}
		for (var x=0; x<self.HotspotList().length; x++){
			if(self.HotspotList()[x].title.indexOf(self.initial()) >= 0){
												// filtering through checking if the typed in words
												// are contained in the marker title.
												// If so, push it in an arry, and display it
				arry.push(self.HotspotList()[x]);
				if(markerHot){
					// markerHot[x].setMap(map);
					markerHot[x].setVisible(true);
				}
			}else if(markerHot){ 				// if not, hide it
				// markerHot[x].setMap(null);
				markerHot[x].setVisible(false);
			}
		}
		return arry;

	});

	//Functions when menuItems are clicked
	this.respond = function(clickedItem) {
		switch (clickedItem){
			case 'Hotspots Schmalkalden':
				self.reset();
				self.mapFitting();
				self.showNewHotspots();
				hideAllMarkers();
				markers = markerHot;
				showMarker(markerHot);
				setBounds(markerHot);
				self.HotspotList(markerHot);
				break;
			case 'Suchen':
				self.reset();
				self.showSearch();
				break;
			case 'Inhalte':
				self.reset();
				self.mapFitting();
				self.showInhalt();
				break;
			case 'Hotspots aktualisieren':
				localStorage.removeItem('myMarkers');
				initNewHotspots();
				initMap();
				break;
//			case 'Lukasseyfarth':
//				self.showLukas();
//				break;
		}
	};



	// Functions to show/hide the menu
	this.showMenu = function(){
		self.reset();
		self.showMenuVar(true);
		//$("#menumain").show();
		self.mapFitting();
	};
	this.closeMenu = function(){
		self.showMenuVar(false);
		self.resettingMap();
	};

	// functions to show/hide the search input
	this.showSearch = function() {
		self.reset();
		self.showSearchVar(true);
	};
	this.hideSearch = function() {
		self.showSearchVar(false);
	};

	this.showNewHotspots = function() {
		self.showHotspots(true);
	};

	this.showInhalte = function() {
		self.showInhalt(true);
	};

//	this.showLukas = function() {
//		self.showLukas(true);
//	};

	// Animation for a chosen marker
	this.showThisMarker = function(clickedItem){
		// self.resetIcons();
		clickedItem.setIcon(currentMarkerIcon);
		// clickedItem.highLightThisMarker();
	};
	// change Center of the map
	this.changeCenter = function(clickedItem) {
		self.reset();
		performAjax(clickedItem);
		map.panTo(clickedItem.position);
		map.setZoom(16);
		populateInfoWindow(clickedItem, myInfowindow);
		setBouncing(clickedItem);
	};

	self.resetIcons = function(){
		for(var i=0; i<self.HotspotList().length; i++){
			self.HotspotList()[i].setIcon(defaultIcon);
		}
	};

	this.showDetailedInfo = function(){
		self.showDetails(true);
	};

		// When the filter button is clicked
	this.filterFunc = function(){
		if(screenWidth < 500){
			self.reset();
		}
		setBounds(self.HOTSPOTS());
	};

	// performAjax Func
	this.infoTitle = ko.observable("");
	this.infoURL = ko.observable("");
	this.inforAlt = ko.observable("");
	this.infoWTName = ko.observable("");
	this.weatherAlt = ko.observable("");
	this.weatherURL = ko.observable("");
	this.saveOption = ko.observable("");
	this.currentMarker = ko.observable("");
	this.wtresponse = ko.observable(-1);
	this.fullAddress = ko.observable("");
	performAjax = function(marker){
		self.currentMarker(marker);
		self.wtresponse(-1);
		self.infoTitle(marker.title);
		// the street view image
		var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=500x300&location=' + marker.title + '&key=AIzaSyC3ynkO5ktim9d7A1Dr1lmHdgNQxF479UM';
		self.infoURL(streetviewUrl);
		// formatted address
		self.fullAddress("");
		var currentLocation = {'location': {lat: marker.position.lat(), lng: marker.position.lng()}};
		geocoder.geocode(currentLocation, function(result,status){
			if (status === google.maps.GeocoderStatus.OK) {
				self.fullAddress(result[0].formatted_address);
			}else{
				console.log('Geocoder failed due to: ' + status);
				alert("Sorry, cannot get address now. :( " );
			}
		});
		// Weather condition
		var wturl = "http://api.openweathermap.org/data/2.5/weather?lat="+
					marker.position.lat()+"&lon="+
					marker.position.lng()+"&appid=00410fc5ea64ac6a03711b3573d43973";

		$.ajax({
			url: wturl,
			method: 'GET'
		}).done(function(result){
			self.wtresponse(1);
			self.infoWTName(result.name);
			self.weatherURL("http://openweathermap.org/img/w/" + result.weather[0].icon+ ".png");
			self.weatherAlt(result.weather[0].description);
		}).fail(function(error){
			console.log(error);
			alert("Unable to display weather condition");
		});
		// Function for saving and deleting markers ------------------------------------
		if(markerHot.indexOf(marker)<0){
			self.saveOption("Hotspot hinzufügen");
		}else {
			self.saveOption("Hotspot löschen");
		}
		// ...and, display it on the screen
		self.showDetailedInfo();
	};
	// if a marker is added or deleted from Hotspots, update the localstorage
	this.updateLocalStorage = function(){
		var markerRef = {};
		var refList = [];
		for(var i = 0; i < markerHot.length; i++){
			markerRef = {"title": markerHot[i].title,
						"location":
							{"lat": markerHot[i].position.lat(),
							"lng": markerHot[i].position.lng()}};
			refList.push(markerRef);
		}
		localStorage.setItem("myMarkers", JSON.stringify(refList));
	};
	// Whene marker is changed, change the option to the oposite and
	// save the localStorage
	this.switchSave = function(){
		// Aktion whene the selected marker is in the Hotspot array
		if(markerHot.indexOf(self.currentMarker())<0){
			markerHot.push(self.currentMarker());
			alert("Hotspot gespeichert!");
			self.saveOption("Hotspot löschen");
			self.updateLocalStorage();
		}else {
			markerHot.splice(markerHot.indexOf(self.currentMarker()), 1);
			self.currentMarker().setVisible(false);
			myInfowindow.close();
			alert("Hotspot wurde gelöscht");
			self.saveOption("Hotspot hinzufügen");
			self.updateLocalStorage();
		}
	};
}
// Activates knockout.js
ko.applyBindings(new AppViewModel());