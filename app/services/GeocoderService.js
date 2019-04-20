(function(angular, undefined) {
	'use strict';

	/**
	 * Geocoder Service
	 */
	angular
		.module('app')
		.service('Geocoder', GeocoderService);

	GeocoderService.$inject = ['$http'];

	function GeocoderService($http) {
		var apiKey = undefined;

		this.searchPlace = function(query) {
			console.log('Google Maps API Key:', apiKey);
			return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					key: apiKey,
					address: query,
					sensor: false
				}
			});
		};

		this.getPlaceInfo = function(lonlat) {
			return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					key: apiKey,
					latlng: lonlat.lat + ',' + lonlat.lon,
					sensor: false
				}
			});
		};

		this.getGeoIP = function() {
			return $http.jsonp('http://www.telize.com/geoip?callback=JSON_CALLBACK');
		};
	}

})(window.angular);
