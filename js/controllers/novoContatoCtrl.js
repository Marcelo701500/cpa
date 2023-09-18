angular.module("controlePressaoArterial").controller("novoContatoCtrl", function($scope, $location, contatosAPI, pacientes) {
            
    $scope.app = "CPA - Controle da Pressão Arterial"; 
    $scope.pacientes = pacientes.data;    

    $scope.adicionarContato = function(contato) {    

        contato.data = new Date();
        contato.diaData = new Date();
        contato.hora = new Date();
        
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

    function setData(dataAtual) { 

        let ano = dataAtual.getFullYear();
        let mes = dataAtual.getMonth() + 1;
        let dia = dataAtual.getDate();        
        let hora = dataAtual.getHours()-3;
        let minutos = dataAtual.getMinutes();

        dataAtual = new Date(ano, mes, dia, hora, minutos, 0); 

        setTimeout(() => {
            document.getElementById('diadata').valueAsDate = dataAtual;
            document.getElementById('hora').valueAsDate = dataAtual;       
        }, 1000);
    }

    setData(new Date());

});