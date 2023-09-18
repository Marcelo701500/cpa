angular.module("controlePressaoArterial").controller("novoContatoCtrl", function($scope, $location, contatosAPI, contato, pacientes) {
            
    $scope.app = "CPA - Controle da Pressão Arterial"; 
    $scope.pacientes = pacientes.data;    

    $scope.adicionarContato = function(contato) {     

        /*
        var  selectedDate = new Date(contato.diaData);
        var year = selectedDate.getFullYear();
        var month = selectedDate.getMonth() + 1;
        var day = selectedDate.getDate();

        var  selectedHour = new Date(contato.horaData);
        var hour = selectedHour.getHours();
        var minutes = selectedHour.getMinutes();

        contato.data = new Date(year, month, day, hour, minutes, 0);       
        */
       
        contato.data = new Date();
        contato.dia = contato.data
        contato.hora = contato.data

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

        var ano = dataAtual.getFullYear();
        var mes = dataAtual.getMonth() + 1;
        var dia = dataAtual.getDate();        
        var hora = dataAtual.getHours();
        var minutos = dataAtual.getMinutes();

        var dataHoraAtual = new Date(ano, mes, dia, hora, minutos, 0); 

        setTimeout(() => {
            document.getElementById('dia').valueAsDate = dataHoraAtual;
            document.getElementById('hora').valueAsDate = dataHoraAtual;       
        }, 1000);
    }

    setData(new Date());

});