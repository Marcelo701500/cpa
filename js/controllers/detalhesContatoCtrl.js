angular.module("controlePressaoArterial").controller("detalhesContatoCtrl", function($scope, $routeParams, contato) {
     $scope.contato = contato.data; 
     console.log("Entrou");
     console.log($scope.contato);
     /*
    contatosAPI.getContato($routeParams.id).then(function(contato) {
        $scope.contato = contato.data;        
    });*/     

});