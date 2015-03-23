'use strict';

(function() {
  var dependencies = [];

  var app = angular.module('madsmadsdk', dependencies);

  app.config(['$httpProvider', function($httpProvider){

  }]);

  app.controller('caseController', ['$scope',
      function($scope) {
        var gfxBasePath = 'dist/css/gfx/';
        $scope.someToggled = false;

        $scope.filteredCases = [];

        $scope.skills = [
          {
            skill: 'AngularJS',
            emblem: gfxBasePath + 'angular.svg',
            toggled: false
          },
          {
            skill: 'Gulp',
            emblem: gfxBasePath + 'gulp.svg',
            toggled: false
          },
          {
            skill: 'jQuery',
            emblem: gfxBasePath + 'jquery.svg',
            toggled: false
          },
          {
            skill: 'Umbraco',
            emblem: gfxBasePath + 'umbraco.svg',
            toggled: false
          },
          {
            skill: 'Shopify',
            emblem: gfxBasePath + 'shopify.svg',
            toggled: false
          }
        ];

        $scope.toggle = function(s) {
          s.toggled = !s.toggled;
          $scope.someToggled = _.some($scope.skills, {'toggled':true});
          filterCases();
        }

        $scope.toggleCase = function(c) {
          c.toggled = !c.toggled;
          $scope.someCaseToggled = _.some($scope.cases, {'toggled':true});
        };

        $scope.cases = [
          {
            client: 'MadRouletten',
            body: 'Forestil dig at spise middag med 5 vildt fremmede mennesker. Rimeligt vildt, ikke?\r\nMadRouletten faciliterer præcist dette. Et super spændende start-up, som jeg er lead developer på.\r\nTjek det ud!',
            skills: ['AngularJS'],
            images: [
              gfxBasePath + 'madrouletten/1.jpg'
            ],
            link: 'http://www.madrouletten.com',
            cta: 'Besøg websitet her!',
            toggled: false
          },
          {
            client: 'S&S Projects',
            body: 'Urban streetwear med et touch af danske design-symboler. Super lækker tøj, og endnu en cool iværksætter virksomhed.\r\nSitet er bygget på Shopify, med jQuery og Bootstrap, og er på Bootstraps showcase liste.\r\nEn løsning jeg er stolt af!',
            skills: ['jQuery','Shopify'],
            images: [
              gfxBasePath + 'ssprojects/1.jpg'
            ],
            link: 'http://www.ssprojects.dk',
            cta: 'Besøg shoppen her!',
            toggled: false
          }
        ];

        function filterCases() {
          if(_.some($scope.skills, {'toggled':true})) {
            var selectedFilters = _.pluck(_.where($scope.skills, {'toggled':true}), 'skill');
            $scope.filteredCases = _.where($scope.cases, {'skills':selectedFilters});
          } else {
            $scope.filteredCases = $scope.cases;
          }
        };
        filterCases();
  }]);

})();
