(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services')
        .controller('ServicesCtrl', ServicesCtrl);

    /** @ngInject */
    function ServicesCtrl($scope) {

        $scope.defaultImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

    }

})();