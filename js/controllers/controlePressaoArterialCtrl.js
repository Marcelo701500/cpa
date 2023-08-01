angular.module("controlePressaoArterial").controller("controlePressaoArterialCtrl", function($scope, contatosAPI, pacientesAPI, $filter) {
            
    $scope.app = $filter('upper')("CPA");
    $scope.contatos = [];    
    $scope.pacientes = [];  

    var carregarContatos = function () {                      
        contatosAPI.getContatos()
        .then(function success(contatos) {   
            $scope.contatos = contatos.data;  
            $scope.contatos = $filter('orderBy')($scope.contatos, '-data');              
        })
        .catch (function error(response) {
            $scope.error = "Não possível carregar os dados!";                         
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
    
    $scope.apagarContatos = function(contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        })                
    }

    $scope.deletarContato = function(contato, index) {       
        var index = index;        
        contatosAPI.deleteContato(contato.id)
        .then(function () {  
            $scope.contatos.splice(index, 1);             
        })
        .catch (function error(response) {
            $scope.message = "Aconteceu um problema";                         
    });

    }


    /* Aula 16 - Apresenta inconsistencia
    var counter = 0;    
    $scope.verificarContatoSelecionado = function (contatos) {
        console.log(counter++);
        console.log(contatos);        
        $scope.hasContatoSelecionado = contatos.some(function (contato) {
            console.log("> " + contato);
            return contato.selecionado;
        })
    }*/

    $scope.verificarContatoSelecionado = function(contato) {
        console.log(contato.id+' - '+contato.nome);
    }

    $scope.isContatoSelecionado = function (contatos) {         
        return contatos.some(function (contato) {
            return contato.selecionado;
        })
    }    

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    $scope.reset = function() {
        $scope.contato = angular.copy($scope.contatos);
    }
    
    $scope.confirmationDialogConfig = {};
    
    $scope.confirmationDialog = function (title, message, btnLabel, btnAction, contato, index) {        
        $scope.contatoParaDeletar = contato;
        $scope.contatoIndex = index;
        $scope.confirmationDialogConfig = {            
            title: title,
            message: message,
            buttons: [{
                label: btnLabel,
                action: btnAction
            }]
        };
        $scope.showDialog(true);
    };

    $scope.multiConfirmationDialog = function () {
        $scope.confirmationDialogConfig = {
            title: "Select Operation...",
            message: "Please select which operation you would like to perform.",
            buttons: [{
                label: "Reset",
                action: "reset"
            }, {
                label: "Delete",
                action: "delete"
            }, {
                label: "Save",
                action: "save"
            }]
        };
        $scope.showDialog(true);
    };

    $scope.executeDialogAction = function (action) {
        if (typeof $scope[action] === "function") {
            console.log('action');
            $scope[action]();
        }
    };

    $scope.reset = function () {
        console.log("Resetting...");
        $scope.showDialog();
    };

    $scope.delete = function (contato, index) {
        console.log("Deleting...");
        $scope.deletarContato($scope.contatoParaDeletar, $scope.contatoindex)
        carregarContatos();
        $scope.showDialog();
    };

    $scope.save = function () {
        console.log("Saving...");
        $scope.showDialog();
    };

    $scope.showDialog = function (flag) {
        jQuery("#confirmation-dialog .modal").modal(flag ? 'show' : 'hide');
    };

    carregarContatos();    

});