angular.module("controlePressaoArterial").controller("dialogModalCtrl", function ($scope, $modal, $log) {

    $scope.clickMe = function (p) {
        console.log("clickMe");
        $modal.open({
            templateUrl: 'myModalContent.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log) {
                $scope.selected = p;
                $scope.submit = function () {
                    $log.log('Submiting user info.');
                    $log.log($scope.selected);
                    $modalInstance.dismiss('cancel');
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                user: function () {
                    return $scope.selected;
                }
            }
        });
    };
    $scope.isSelected = function (p) {
        return $scope.selected === p;
    }

});