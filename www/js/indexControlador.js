/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

ons.bootstrap().controller('indexControlador', function ($scope, $http) {
    var ruta = "http://192.168.50.1:8080/SWTodaUnaVida/rest/";
    var planSeleccionado = [];
    var planManuelaSeleccionado = [];


    $scope.persona = {};
    $scope.personaManuela = {};
    $http.get(ruta + "persona/1")
            .then(function (response) {
                $scope.planes = response.data;
            }, function (data, status, headers, config) {
                alert("error");
            });
    $http.get(ruta + "persona/2")
            .then(function (response) {
                $scope.planesManuela = response.data;
            });
    $http.get(ruta + "persona/3")
            .then(function (response) {
                $scope.planesMujer = response.data;
            });
    $http.get(ruta + "persona/4")
            .then(function (response) {
                $scope.planesDrogas = response.data;
            });

    $scope.labelStyle = {
        marginLeft: '6px',
        width: '10px',
        height: '10px',
        borderRadius: '100%',
        backgroundColor: 'transparent',
        display: 'inline-block'
    };
    $scope.estiloCheck = {
        width: '100%',
        textAlign: 'center'
    };

    $scope.guardar = function (persona) {
        if (planSeleccionado.length === 0)
        {
            Dialog.show();
        } else {
            persona.planes = planSeleccionado;
            $http.post(ruta + "persona/guardarPersona", persona).then(function (data, status, headers, config) {
                alert("Registro Exitoso");
            }, function (data, status, headers, config) {
                alert("No se pudo registrar. Intentelo de nuevo");
            });

        }

    };

    $scope.guardarManuela = function (personaManuela) {
        personaManuela.planes = planManuelaSeleccionado;
        $http.post(ruta + "persona/guardarPersonaManuela", personaManuela).then(function (data, status, headers, config) {
            alert("Registro Exitoso");
        }, function (data, status, headers, config) {
            alert("No se pudo registrar. Intentelo de nuevo");
        });
    };

    $scope.seleccionarPlan = function (idPlan) {
        var idx = planSeleccionado.indexOf(idPlan);
        if (idx > -1)
        {
            planSeleccionado.splice(idx, 1);
        } else {
            planSeleccionado.push(idPlan);
        }
    };

    $scope.seleccionarPlanManuela = function (idPlan) {
        var idx = planManuelaSeleccionado.indexOf(idPlan);
        if (idx > -1)
        {
            planManuelaSeleccionado.splice(idx, 1);
        } else {
            planManuelaSeleccionado.push(idPlan);
        }
    };

    $scope.tomarFoto = function () {

        app.onDeviceReady();
        navigator.camera.getPicture(onSuccess, onFail, {quality: 50,
            destinationType: Camera.DestinationType.DATA_URL});

        function onSuccess(imageURI) {              
            var image = document.getElementById('miFoto');
            image.src = "data:image/jpeg;base64," + imageURI;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };

    

});







