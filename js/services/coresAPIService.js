angular.module("controlePressaoArterial").service("coresAPI", function($http) {
    this.getCores = function() {
        return $http.get("http://192.168.100.143:3000/cores");
    }
})