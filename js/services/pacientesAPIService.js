angular.module("controlePressaoArterial").service("pacientesAPI", function($http, config) {
    var _getPacientes = function() {
        return $http.get(config.baseUrl + "/pacientes");
    }
    return {
        getPacientes: _getPacientes
    };
})