angular.module("controlePressaoArterial").config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');    
    $routeProvider.
        when("/registros",  {            
            templateUrl: "view/contatos.html",
            controller: "controlePressaoArterialCtrl"            
        }).
        when("/novoContato", {
            templateUrl: "view/novoContato.html",
            controller: "novoContatoCtrl",
            resolve: {
                pacientes: function(pacientesAPI) {
                    return pacientesAPI.getPacientes();
                }  
            }           
        }).
        when("/detalhesContato/:id", {
            templateUrl: "view/detalhesContato.html",
            controller: "detalhesContatoCtrl",
            resolve: {
                contato: function(contatosAPI, $route) {                    
                    return contatosAPI.getContato($route.current.params.id);
                } 
            }
        }). 
        when("/editarContato/:id", {
            templateUrl: "view/editarContato.html",
            controller: "editarContatoCtrl",
            resolve: {
                contato: function(contatosAPI, $route) {
                    return contatosAPI.getContato($route.current.params.id);
                },                 
            }
        }). 
        when("/pacientes", {
            templateUrl: "view/pacientes.html",
            controller: "pacientesCtrl"
        }).
        when("/error", {
            templateUrl: "/view/error.html"            
        });

        $routeProvider.otherwise('/error');
        
});