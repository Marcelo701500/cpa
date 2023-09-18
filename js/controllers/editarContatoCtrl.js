angular.module("controlePressaoArterial").controller("editarContatoCtrl", function($scope, $location, contatosAPI, pacientesAPI, coresAPI, contato) {
            
    $scope.app = "CPA - Controle da Pressão Arterial";  
   
    $scope.contato = contato.data;
    $scope.contato.diaData = new Date(contato.data.data);
    $scope.contato.horaData = new Date(contato.data.data);
    $scope.contato.data = new Date(contato.data.data);    
    
    $scope.updateContato = function(contato) { 

        var  selectedDate = new Date(contato.diaData);
        var year = selectedDate.getFullYear();
        var month = selectedDate.getMonth() + 1;
        var day = selectedDate.getDate();

        var  selectedHour = new Date(contato.horaData);
        var hour = selectedHour.getHours();
        var minutes = selectedHour.getMinutes();

        contato.data = new Date(year, month, day, hour, minutes, 0);

        contatosAPI.updateContato(contato)        
            .then(function (contato) {
                //delete $scope.contato;
                $scope.contatoForm.$setPristine();
                console.log($location);
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