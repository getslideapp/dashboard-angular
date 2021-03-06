(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services', [
        "BlurAdmin.pages.services.bitcoinService",
        "BlurAdmin.pages.services.bitcoinService.bitcoinServiceTransactions",
        "BlurAdmin.pages.services.bitcoinService.bitcoinServiceUsers",
        "BlurAdmin.pages.services.bitcoinService.bitcoinServiceSettings",
        "BlurAdmin.pages.services.stellarService",
        "BlurAdmin.pages.services.stellarService.stellarServiceTransactions",
        "BlurAdmin.pages.services.stellarService.stellarServiceUsers",
        "BlurAdmin.pages.services.stellarService.stellarServiceSettings"
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('services', {
                url: '/services',
                templateUrl: 'app/pages/services/services.html',
                controller: "ServicesCtrl",
                title: 'Services',
                sidebarMeta: {
                    order: 300
                }
            });
    }

})();
