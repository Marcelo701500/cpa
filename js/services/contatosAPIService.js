angular.module("controlePressaoArterial").factory("contatosAPI", function($http, config) {

    var _getContatos = function () {
        return $http.get(config.baseUrl + "/registros");
    };

    var _getContato = function (id) {
        return $http.get(config.baseUrl + "/registros/" + id);
    };    

    var _saveContato = function(contato) {
        return $http.post(config.baseUrl + "/registros", contato, {
            headers:{ 
                'Content-Type': 'application/json' 
            }            
        });
    };

    var _updateContato = function(contato) {
        return $http.put(config.baseUrl + "/registros/" + contato.id, contato, {
            headers:{ 
                'Content-Type': 'application/json' 
            }            
        });
    };

    var _deleteContato = function(id) {
        return $http.delete(config.baseUrl + "/registros/" + id);
    }

    return {
        getContatos: _getContatos,
        getContato: _getContato,
        saveContato: _saveContato,
        deleteContato: _deleteContato,
        updateContato: _updateContato
    };
})