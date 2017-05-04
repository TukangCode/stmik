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
.controller('JadwalCtrl', function($scope,$rootScope,$state,$http,$stateParams, $ionicLoading,$ionicPopup, Service) {
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
			var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'gagal tersambung ke server check koneksi internet anda'
			});
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getJadwal();
})

.controller('NilaiCtrl', function($scope,$rootScope,$state,$http,$stateParams, $ionicLoading,$ionicPopup, Service) {
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
			var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'gagal tersambung ke server check koneksi internet anda'
			});
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getNilai();
})
.controller('InfoCtrl', function($scope,$rootScope,$state, $http,$stateParams, $ionicLoading,$ionicPopup, Service) {
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
			var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'gagal tersambung ke server check koneksi internet anda'
			});
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getInfo();
})
.controller('MateriCtrl', function($cordovaFileTransfer,$scope,$rootScope,$state,$http,$stateParams,$ionicLoading,$ionicPopup,Service) {
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
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getMateri();

	$scope.Download = function (filename) {
		Service.loadingShow();
		ionic.Platform.ready(function(){
             var url = "http://matkul.esy.es/public/api/download/";
             var targetPath = cordova.file.externalRootDirectory + filename;
  
              $cordovaFileTransfer.download(url+filename, targetPath, {}, true).then(function (result) {
				//stop loading...
				Service.loadingHide();
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');			  
                    $scope.hasil = 'Save file on '+targetPath+' success!';
                    var alertPopup = $ionicPopup.alert({
						title: 'Success',
						template: 'berhasil download, Save file on '+targetPath
					})
              }, function (error) {
				//stop loading...
				Service.loadingHide();
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
                    var alertPopup = $ionicPopup.alert({
						title: 'Alert!',
						template: 'gagal download'
					});
					alert(error);
              }, function (progress) {
                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
              });
      });
  }
})
.controller('TugasCtrl', function($scope, $http, $rootScope, $state, $stateParams, $ionicLoading,$ionicPopup, Service) {
	if($rootScope.token == null){
		$state.go("login");
	}
	$scope.getTugas = function(){
		Service.loadingShow();
		$http.get(
			Service.baseUrl()+'tugas/'+$rootScope.nim+'/'+$rootScope.token
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
		}).finally(function() {
			//stop loading...
			Service.loadingHide();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
     });
	};
	$scope.getTugas();
})
