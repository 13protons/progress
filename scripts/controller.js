
var svgProgress = angular.module('svgProgress', []);
svgProgress
  .directive('svgProgress', function() {



  return {
    scope: {
      radius: '=?',
      track: '=?',
      percent: '=?',
      color: '=?',
      fill: '=?'
    },
    replace: true,
    templateUrl: './scripts/directives/partials/radial-progress.html',
    link: function(scope, iElement, iAttrs) {

      sync();

      scope.$watchCollection('[color, fill, percent, track, radius]', function(){
          sync();
      }, true);

      function sync(){
        scope.graph = init(scope);

        if(scope.graph.percent == 0 || scope.graph.percent % 100 == 0){
          scope.graph.percent = .1;
          scope.graph.fill = scope.graph.color;
        }
        updateGraph(scope.graph);
      }

      //scope.svg = 'data:image/svg+xml;base64,' + base64_encode(svg)
      console.log(scope.graph)
      //background-image: url('data:image/svg+xml;base64,[data]');



      function init(s){
        var config = {
          radius:      angular.isDefined(s.radius) ? s.radius : 100,
          trackWeight: angular.isDefined(s.track) ? s.track : 20,
          percent:     angular.isDefined(s.percent) ? s.percent : 45,
          color:       angular.isDefined(s.color) ? s.color : '#EEEEEE',
          fill:        angular.isDefined(s.fill) ? s.fill : '#FFB03B'
        }
        config.diameter = config.radius * 2;
        config.innerRadius = config.radius - config.trackWeight;
        return config
      }

      function updateGraph(graph){

          var rads = (graph.percent/100) * 2 * Math.PI;
          graph.coords = {
              x: (Math.sin(rads) * graph.radius) + graph.radius,
              y: (Math.cos(rads) * graph.radius * -1) + graph.radius
          }
          if(graph.coords.x < graph.radius){
              graph.fillArc = 1;
              graph.trackArc = 0;
            }
          else {
              graph.fillArc = 0;
              graph.trackArc = 1;
            }
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
        trackColor: '#EEEEEE',
        color: '#FFB03B'
    }

})
