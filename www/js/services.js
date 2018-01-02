angular.module('starter.services', [])
 
.service('Service', function($ionicLoading) {
        var token = '';
		var nim = '';
		var baseUrl = 'http://localhost/siakad/public/api/';

        return {
            baseUrl: function () {
                return baseUrl;
            },
            getToken: function () {
                return token;
            },
            setToken: function(value) {
                token = value;
            },
            getNim: function () {
                return nim;
            },
            setNim: function(value) {
                nim = value;
            },
			//fungsi stop loading
			loadingHide : function(){
				$ionicLoading.hide()
			},
			//fungsi tampilkan loading
			loadingShow : function() {
				$ionicLoading.show({
				  template: 'Loading...'
				})
			}
        };
});