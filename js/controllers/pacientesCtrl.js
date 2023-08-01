angular.module("controlePressaoArterial").controller("pacientesCtrl", function($scope, $routeParams, pacientesAPI) {
    //$scope.pacientes = pacientes.data; 
    //console.log($scope.pacientes)

    $scope.pacientes = [];

    var carregarPacientes = function () {
        pacientesAPI.getPacientes()
        .then(function success(pacientes) {   
            $scope.pacientes = pacientes.data;
        })
        .catch (function error(response) {
            $scope.error = "Não possível carregar os dados!";                          
        });                
    }

    carregarPacientes();
    /*
   contatosAPI.getContato($routeParams.id).then(function(contato) {
       $scope.contato = contato.data;        
   });*/     

});