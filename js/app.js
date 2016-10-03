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
                 console.log(list)
             }
         }
     }


    NarrowItDownController.$inject = ['$scope', 'MenuSearchService']
    function NarrowItDownController($scope, MenuSearchService) {
        var ctrlNarrow = this;
        ctrlNarrow.found = [];
        $scope.searchTerm = "";

        $scope.foundIt = [];

        this.getMatchedMenuItems = function () {

            ctrlNarrow.found.splice(0, ctrlNarrow.found.length);
            ctrlNarrow.empty = false;

            if($scope.searchTerm === ""){
                ctrlNarrow.empty = true;
            }else{
                ctrlNarrow.found = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
                $scope.foundIt = ctrlNarrow.found;
                console.log($scope.foundIt);
            }
        }

        this.removeItem = function(index){
            ctrlNarrow.found.splice(index,1);
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

                for(var i=0; i<result.data.menu_items.length; i++){
                    /*console.log(result.data.menu_items[i].description.toLowerCase());*/
                    if (result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1){
                        console.log("Found it");
                        var item={
                            short_name:result.data.menu_items[i].short_name,
                            name:result.data.menu_items[i].name,
                            description:result.data.menu_items[i].description
                        };

                        arrayItems.push(item);
                    }
                }

                service.items = arrayItems;
                service.founded = arrayItems;

                return service.founded;
            });
        };

        service.remove = function (index) {
            service.foundItems.splice(index, 1);
        };
    }

})();
