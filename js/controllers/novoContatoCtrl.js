angular.module("controlePressaoArterial").controller("novoContatoCtrl", function($scope, $location, contatosAPI, pacientes) {
            
    $scope.app = "CPA - Controle da Pressão Arterial"; 
    $scope.pacientes = pacientes.data;    

    $scope.adicionarContato = function(contato) {    
        
        let dataSelecionada = new Date(contato.diaData);
        let ano = dataSelecionada.getFullYear();
        let mes = dataSelecionada.getMonth() + 1;
        let dia = dataSelecionada.getDate();

        let  horaSelecionada = new Date(contato.hora);        
        let hora = horaSelecionada.getHours();
        let minutos = horaSelecionada.getMinutes();

        contato.data = new Date(ano, mes, dia, hora, minutos, 0); 

        console.log(contato);

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