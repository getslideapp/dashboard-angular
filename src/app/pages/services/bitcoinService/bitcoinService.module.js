(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('bitcoinService', {
                url: '/services/bitcoin',
                templateUrl: 'app/pages/services/bitcoinService/bitcoinService.html',
                controller: "BitcoinServiceCtrl",
                title: 'Bitcoin Service'
            });
    }

})();
