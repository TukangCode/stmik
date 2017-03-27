angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope,$rootScope,  $state, $ionicModal, $timeout) {
	$scope.logout = function(){
		$rootScope.token == null;
		$state.go("login");
	}
})
.controller('LoginCtrl', function($scope, $rootScope, $stateParams, $state, $http, $ionicPopup, Service) {
	if($rootScope.token != null){
		$state.go("app.info",{nim:$rootScope.nim, token: $rootScope.token});
	}
	$scope.user = {};
	$scope.login = function(){
		Service.loadingShow();
		$http.get(
			Service.baseUrl()+'login',
			{
				params : {
					name: $scope.user.username,
					password: $scope.user.password
				}				
			}
		).success(function(data){
			Service.loadingHide();
			//set token dan nim
			$rootScope.token = data.token;
			$rootScope.nim = data.user.name;
			Service.setToken(data.token);
			Service.setNim(data.user.name);
			//pergi ke halaman informasi
			$state.go("app.info",{nim:$rootScope.nim, token: $rootScope.token});
		}).error(function(data){
			Service.loadingHide();
			if(data != null){
				var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: data.message
				});
			}else{
				var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'gagal tersambung ke server check koneksi internet anda'
				});
			}
		});
	};
})
.controller('JadwalCtrl', function($scope,$rootScope,$state,$http,$stateParams, $ionicLoading, Service) {
	if($rootScope.token == null){
		$state.go("login");
	}
	$scope.getJadwal = function(){
		Service.loadingShow();
		$http.get(
			Service.baseUrl()+'jadwal/'+$rootScope.nim+'/'+$rootScope.token
		).success(function(data){
			$scope.model = [];
				angular.forEach(data.data, function(value, key) {
			$scope.model.push(value);
			})
		}).error(function(data){
			$state.go("login");
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getJadwal();
})

.controller('NilaiCtrl', function($scope,$rootScope,$state,$http,$stateParams, $ionicLoading, Service) {
	if($rootScope.token == null){
		$state.go("login");
	}
	$scope.getNilai = function(){
		Service.loadingShow();
		$http.get(
			Service.baseUrl()+'nilai/'+$rootScope.nim+'/'+$rootScope.token
		).success(function(data){
			$scope.nilai= [];
			angular.forEach(data.data, function(value, key) {
				$scope.nilai.push(value);
			})
		}).error(function(){
			$state.go("login");
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getNilai();
})
.controller('InfoCtrl', function($scope,$rootScope,$state, $http,$stateParams, $ionicLoading, Service) {
	if($rootScope.token == null){
		$state.go("login");
	}
	$scope.getInfo = function(){
		Service.loadingShow();
		$http.get(
			Service.baseUrl()+'pengumuman/'+$rootScope.nim+'/'+$rootScope.token
		).success(function(data){
			$scope.informasi= [];
			angular.forEach(data.data, function(value, key) {
				$scope.informasi.push(value);
			})
		}).error(function(){
			$state.go("login");
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getInfo();
})
.controller('MateriCtrl', function($scope,$rootScope, $state, $http,$stateParams, $ionicLoading, Service) {
	if($rootScope.token == null){
		$state.go("login");
	}
	$scope.getMateri = function(){
		Service.loadingShow();
		$http.get(
			Service.baseUrl()+'materi/'+$rootScope.nim+'/'+$rootScope.token
		).success(function(data){
			$scope.materis= [];
			angular.forEach(data.data, function(value, key) {
				$scope.materis.push(value);
			})
		}).error(function(){
			var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'gagal tersambung ke server check koneksi internet anda'
			});
			$state.go("login");
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getMateri();
})
.controller('TugasCtrl', function($scope, $http, $rootScope, $state, $stateParams, $ionicLoading, Service, $ionicPopup) {
	if($rootScope.token == null){
		$state.go("login");
	}
	$scope.token = $rootScope.token;
	$scope.nim = $rootScope.nim;
	$scope.getTugas = function(){
		Service.loadingShow();
		$http.get(
			Service.baseUrl()+'tugas/'+$scope.nim+'/'+$scope.token
		).success(function(data){
			$scope.tugas = [];
				angular.forEach(data.data, function(value, key) {
			$scope.tugas.push(value);
			});
			Service.loadingHide();
		}).error(function(data){
			var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: 'gagal tersambung ke server check koneksi internet anda'
			});
			$state.go("login");
			
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getTugas();
});
