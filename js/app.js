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
            }
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService) {
        var ctrlNarrow = this;
        ctrlNarrow.found = [];

        ctrlNarrow.searchItems = function () {
            ctrlNarrow.found = MenuSearchService.getMatchedMenuItems(ctrlNarrow.searchTerm);
        }

        ctrlNarrow.remove = function(index){
            ctrlNarrow.found.splice(index, 1);
        }
    }


    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {

        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {

            if (!service.data) service.getData();
            if (searchTerm === "") return [];

            var items = service.data.menu_items;
            var found = [];

            for (var i = 0; i < items.length; i++) {
                var desc = items[i].description;
                if (desc.indexOf(searchTerm) !== -1) {
                    found.push(items[i]);
                }
            }

            console.dir(found);
            return found;
        };

        service.getData = function () {

            $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then( function (result) {
                console.log(result.data);
                service.data = result.data;
            }, function (result) {
                console.log(result.data);
                service.getData();
            });
        }
        service.getData();
    }
})();
