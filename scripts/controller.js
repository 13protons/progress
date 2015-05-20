
var svgProgress = angular.module('svgProgress', []);
svgProgress
  .directive('svgProgress', function() {



  return {
    scope: {
      radius: '=?',
      track: '=?',
      percent: '=?',
      heading: '=?',
      caption: '=?'
    },
    replace: true,
    templateUrl: './scripts/directives/partials/radial-progress.html',
    link: function(scope, iElement, iAttrs) {
      scope.graph = init(scope);
      var base64 = b64();

      updateGraph(scope.graph);

      scope.$watchCollection('[percent, track, radius, heading, caption]', function(){
          scope.graph = init(scope)
          updateGraph(scope.graph);
      });


      //scope.svg = 'data:image/svg+xml;base64,' + base64_encode(svg)
      console.log(scope.graph)
      //background-image: url('data:image/svg+xml;base64,[data]');



      function init(s){
        var config = {
          radius:       angular.isDefined(s.radius) ? s.radius : 100,
          trackWeight:  angular.isDefined(s.track) ? s.track : 20,
          percent:      angular.isDefined(s.percent) ? s.percent : 45,
          heading:      s.heading,
          caption:      s.caption
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

          var svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="'+graph.diameter+'px" height="'+graph.diameter+'px" viewBox="0 0'+graph.diameter+' '+graph.diameter+'" xml:space="preserve" class="radial-graph">';

            svg += '<circle class="track" fill="#eeeeee" cx="'+graph.radius+'" cy="'+graph.radius+'" r="'+graph.radius+'"/>';

            svg +='<path class="progress" fill="#FFB03B" d="M'+graph.radius+','+graph.radius+' L'+graph.radius+',0 A'+graph.radius+','+graph.radius+' 1 '+graph.largeArc+',1 '+graph.coords.x+','+graph.coords.y+' z"/> <circle class="center" fill="#ffffff" cx="'+graph.radius+'" cy="'+graph.radius+'" r="'+(graph.radius - graph.trackWeight)+'"/>';

            svg += '</svg>';

          graph.svg = 'data:image/svg+xml;base64,' + base64.encode(svg);

          graph.style = {
            width: graph.diameter + 'px',
            height: graph.diameter + 'px',
            'background-image': "url('" + graph.svg + "')"
          }
      }

      // Create Base64 Object
      function b64(){
        Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(e) {
                var t = "";
                var n, r, i, s, o, u, a;
                var f = 0;
                e = Base64._utf8_encode(e);
                while (f < e.length) {
                    n = e.charCodeAt(f++);
                    r = e.charCodeAt(f++);
                    i = e.charCodeAt(f++);
                    s = n >> 2;
                    o = (n & 3) << 4 | r >> 4;
                    u = (r & 15) << 2 | i >> 6;
                    a = i & 63;
                    if (isNaN(r)) {
                        u = a = 64
                    } else if (isNaN(i)) {
                        a = 64
                    }
                    t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                }
                return t
            },
            decode: function(e) {
                var t = "";
                var n, r, i;
                var s, o, u, a;
                var f = 0;
                e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (f < e.length) {
                    s = this._keyStr.indexOf(e.charAt(f++));
                    o = this._keyStr.indexOf(e.charAt(f++));
                    u = this._keyStr.indexOf(e.charAt(f++));
                    a = this._keyStr.indexOf(e.charAt(f++));
                    n = s << 2 | o >> 4;
                    r = (o & 15) << 4 | u >> 2;
                    i = (u & 3) << 6 | a;
                    t = t + String.fromCharCode(n);
                    if (u != 64) {
                        t = t + String.fromCharCode(r)
                    }
                    if (a != 64) {
                        t = t + String.fromCharCode(i)
                    }
                }
                t = Base64._utf8_decode(t);
                return t
            },
            _utf8_encode: function(e) {
                e = e.replace(/\r\n/g, "\n");
                var t = "";
                for (var n = 0; n < e.length; n++) {
                    var r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r)
                    } else if (r > 127 && r < 2048) {
                        t += String.fromCharCode(r >> 6 | 192);
                        t += String.fromCharCode(r & 63 | 128)
                    } else {
                        t += String.fromCharCode(r >> 12 | 224);
                        t += String.fromCharCode(r >> 6 & 63 | 128);
                        t += String.fromCharCode(r & 63 | 128)
                    }
                }
                return t
            },
            _utf8_decode: function(e) {
                var t = "";
                var n = 0;
                var r = c1 = c2 = 0;
                while (n < e.length) {
                    r = e.charCodeAt(n);
                    if (r < 128) {
                        t += String.fromCharCode(r);
                        n++
                    } else if (r > 191 && r < 224) {
                        c2 = e.charCodeAt(n + 1);
                        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                        n += 2
                    } else {
                        c2 = e.charCodeAt(n + 1);
                        c3 = e.charCodeAt(n + 2);
                        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                        n += 3
                    }
                }
                return t
            }
        }

        return Base64;
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
        heading: '22',
        caption: 'payments'
    }

})
