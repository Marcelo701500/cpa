angular.module("controlePressaoArterial").controller("novoContatoCtrl", function($scope, $location, contatosAPI, pacientes) {
            
    $scope.app = "CPA - Controle da Pressão Arterial"; 
    $scope.pacientes = pacientes.data;  
    
    // Adicionar - Ok
    $scope.adicionarContato = function(contato) {        
        contato.data = new Date();                
        contatosAPI.saveContato(contato)
            .then(function (contato) {
                delete $scope.contato;
                $scope.contatoForm.$setPristine();   
                $location.path("/registros");             
            })
            .catch (function error(response) {
                $scope.message = "Aconteceu um problema";                         
        });
    }       
});