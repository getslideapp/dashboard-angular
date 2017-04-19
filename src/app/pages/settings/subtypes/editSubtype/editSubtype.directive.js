(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('editSubtype', editSubtype);

    /** @ngInject */
    function editSubtype() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/settings/subtypes/editSubtype/editSubtype.html'
        };
    }
})();