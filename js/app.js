(function () {
    'use strict'
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController )
        .service('MenuSearchService', MenuSearchService);


    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController() {
        var menu = this;

        var promise = MenuSearchService.getMatchedMenuItems();
    }


    MenuSearchService.$inject = [$http]
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
                params: {
                    category: searchTerm
                }
            }).then( function (result) {
                var foundItems;
                console.log(result);

                return foundItems;
            });
        };
    }

})();