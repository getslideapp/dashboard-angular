(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.userWebhooks')
        .controller('UserWebhooksCtrl', UserWebhooksCtrl);

    /** @ngInject */
    function UserWebhooksCtrl($scope,API,$uibModal,toastr,$http,cookieManagement,errorToasts,$window,stringService,errorHandler) {

        var vm = this;
        vm.updatedUserWebhook = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingUserWebhooks = true;
        $scope.editUserWebhook = {};

        $scope.userWebhooksParams = {
            event: 'User Create'
        };

        $scope.eventOptions = ['User Create','User Update','User Delete'];

        $scope.toggleUserWebhooksEditView = function(webhook){
            if(webhook){
                $scope.editUserWebhook = webhook;
                $scope.editUserWebhook.event = $scope.editUserWebhook.event == 'user.create' ?
                    'User Create' : $scope.editUserWebhook.event == 'user.update' ? 'User Update' : 'User Delete';
            } else{
                $scope.editUserWebhook = {};
                vm.getUserWebhooks();
            }
            $scope.editingUserWebhook = !$scope.editingUserWebhook;
        };

        vm.getUserWebhooks = function () {
            if(vm.token) {
                $scope.loadingUserWebhooks = true;
                $http.get(API + '/admin/webhooks/users/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserWebhooks = false;
                    if (res.status === 200) {
                        $scope.userWebhooks = res.data.data;
                        $window.scrollTo(0, 0);
                    }
                }).catch(function (error) {
                    $scope.loadingUserWebhooks = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUserWebhooks();

        $scope.addUserWebhooks = function (userWebhooksParams) {
            $scope.loadingUserWebhooks = true;
            userWebhooksParams.event = userWebhooksParams.event == 'User Create' ?
             'user.create' : userWebhooksParams.event == 'User Update' ? 'user.update' : 'user.delete';
            $http.post(API + '/admin/webhooks/users/', userWebhooksParams, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingUserWebhooks = false;
                if (res.status === 201) {
                    vm.getUserWebhooks();
                    toastr.success('You have successfully added the Webhook!');
                    $scope.userWebhooksParams = {event: 'User Create'};
                    $window.scrollTo(0, 0);
                }
            }).catch(function (error) {
                $scope.userWebhooksParams = {event: 'User Create'};
                $scope.loadingUserWebhooks = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.userWebhookChanged = function(field){
            vm.updatedUserWebhook[field] = $scope.editUserWebhook[field];
        };

        $scope.updateUserWebhook = function () {
            $window.scrollTo(0, 0);
            $scope.editingUserWebhooks = !$scope.editingUserWebhooks;
            $scope.loadingUserWebhooks = true;
            vm.updatedUserWebhook.event = vm.updatedUserWebhook.event == 'User Create' ?
             'user.create' : vm.updatedUserWebhook.event == 'User Update' ? 'user.update' : 'user.delete';
            $http.patch(API + '/admin/webhooks/users/'+ $scope.editUserWebhook.id + '/', vm.updatedUserWebhook, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingUserWebhooks = false;
                if (res.status === 200) {
                    vm.updatedUserWebhook = {};
                    vm.getUserWebhooks();
                    toastr.success('You have successfully updated the Webhook!');
                }
            }).catch(function (error) {
                $scope.loadingUserWebhooks = false;
                vm.updatedUserWebhook = {};
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.findIndexOfUserWebhook = function(element){
            return this.id == element.id;
        };

        $scope.openUserWebhooksModal = function (page, size,userWebhook) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserWebhooksModalCtrl',
                scope: $scope,
                resolve: {
                    userWebhook: function () {
                        return userWebhook;
                    }
                }
            });

            vm.theModal.result.then(function(userWebhook){
                var index = $scope.userWebhooks.findIndex(vm.findIndexOfUserWebhook,userWebhook);
                $scope.userWebhooks.splice(index, 1);
            }, function(){
            });
        };
    }
})();
