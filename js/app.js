(function () {
    'use strict'
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController )
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
    ;

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItemTemplate.html',
            restrict: 'E',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: ItemsDirectiveController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return ddo;
    }

    function ItemsDirectiveController(){
        var list = this;

        list.foundList = function () {
            for(var i = 0; i < list.items.length; i++){

            }
        }
    }


    NarrowItDownController.$inject = ['$scope', 'MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = '%scope';

        ctrl.getMatchedMenuItems = function () {
            console.log("Finding: " + ctrl.searchTerm);
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        }
    }


    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {

        var service = this;
        var arrayItems = [];

        service.getMatchedMenuItems = function(searchTerm) {


            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then( function (result) {

                for(var i=0;i<result.data.menu_items.length; i++){
                    if (result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1){
                        var item={
                            short_name:result.data.menu_items[i].short_name,
                            name:result.data.menu_items[i].name,
                            description:result.data.menu_items[i].description
                        };
                        arrayItems.push(item);
                    }
                }

                service.items = arrayItems;

                /*var foundItems = result.data.menu_items.filter(function (item) {
                    return item.description.toLowerCase().indexOf(selectItem) !== -1;
                });*/
                return service.items;
            });
        };

        service.remove = function (index) {
            service.foundItems.splice(index, 1);
        };
    }

})();