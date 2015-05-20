
var svgProgress = angular.module('svgProgress', []);
svgProgress
  .directive('svgProgress', function() {

  return {
    scope: {
      radius: '=?',
      track: '=?',
      percent: '=?'
    },
    templateUrl: './scripts/directives/partials/radial-progress.html',
    link: function(scope, iElement, iAttrs) {

      scope.graph = init(scope);

      scope.$watchCollection('[percent, track, radius]', function(){
          scope.graph = init(scope)
          updateGraph(scope.graph);
      });

      function init(s){
        var config = {
          radius:      angular.isDefined(s.radius) ? s.radius : 100,
          trackWeight: angular.isDefined(s.track) ? s.track : 20,
          percent:     angular.isDefined(s.percent) ? s.percent : 45,
        }
        config.diameter = config.radius * 2;
        return config
      }

      function updateGraph(graph){
          var rads = (graph.percent/100) * 2 * Math.PI;
          graph.coords = {
              x: (Math.sin(rads) * graph.radius) + graph.radius,
              y: (Math.cos(rads) * graph.radius * -1) + graph.radius
          }

          if(graph.coords.x < graph.radius){ graph.largeArc = 1; }
          else { graph.largeArc = 0;}
      }
    }
  }
});



var myApp = angular.module('app', ['svgProgress']);
myApp
  .controller('RadialController', function($scope, $timeout) {
    var vm = this;
    vm.graph = {
        radius: 150,
        trackWeight: 40,
        percent: 62.5,
    }

})
