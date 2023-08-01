angular.module("controlePressaoArterial").controller("editarContatoCtrl", function($scope, $location, contatosAPI, pacientesAPI, coresAPI, contato) {
            
    $scope.app = "Lista Telefonica";  
    $scope.contato = contato.data; 

    // Adicionar - Ok
    $scope.updateContato = function(contato) { 
        contatosAPI.updateContato(contato)
            .then(function (contato) {
                //delete $scope.contato;
                $scope.contatoForm.$setPristine();   
                $location.path("/registros");             
            })
            .catch (function error(response) {
                $scope.message = "Aconteceu um problema";                         
        });
    }      
    
    var carregarPacientes = function () {
        pacientesAPI.getPacientes()
        .then(function success(pacientes) {   
            $scope.pacientes = pacientes.data;
        })
        .catch (function error(response) {
            $scope.error = "Não possível carregar os dados!";                          
        });                
    }

    var carregarCores = function () {
        coresAPI.getCores()
        .then(function success(cores) {   
            $scope.cores = cores.data;
        })
        .catch (function error(response) {
            $scope.error = "Não possível carregar os dados!";                          
        });                
    }

    carregarPacientes();
    //carregarCores();   

});