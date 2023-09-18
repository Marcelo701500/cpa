angular.module("controlePressaoArterial").controller("editarContatoCtrl", function($scope, $location, contatosAPI, pacientesAPI, coresAPI, contato) {
            
    $scope.app = "CPA - Controle da Pressão Arterial";  
   
    $scope.contato = contato.data;
   
    let dataRegistro = new Date(contato.data.data);
    let ano = dataRegistro.getFullYear();
    let mes = dataRegistro.getMonth();
    let dia = dataRegistro.getDate();        
    let hora = dataRegistro.getHours();
    let minutos = dataRegistro.getMinutes();

    $scope.contato.diaData = new Date(ano, mes, dia, hora, minutos, 0);
    $scope.contato.hora = new Date(ano, mes, dia, hora, minutos, 0); 
    $scope.contato.data = new Date(ano, mes, dia, hora, minutos, 0); 

    
    $scope.updateContato = function(contato) { 

        let dataSelecionada = new Date(contato.diaData);
        let ano = dataSelecionada.getFullYear();
        let mes = dataSelecionada.getMonth();
        let dia = dataSelecionada.getDate();

        let horaSelecionada = new Date(contato.hora);        
        let hora = horaSelecionada.getHours();
        let minutos = horaSelecionada.getMinutes();

        contato.data = new Date(ano, mes, dia, hora, minutos, 0); 

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