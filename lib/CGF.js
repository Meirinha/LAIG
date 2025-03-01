CGFversion = "0.21";
CGFdate = " (20181025)";
console.log("WebCGF - Library for Computer Graphics @ FEUP (WebGL) - v" + CGFversion + CGFdate);
var Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function() {
        try {
            var a = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (a.getContext('webgl') || a.getContext('experimental-webgl')));
        } catch (b) {
            return false;
        }
    }
    )(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function() {
        var a = document.createElement('div');
        a.id = 'webgl-error-message';
        a.style.fontFamily = 'monospace';
        a.style.fontSize = '13px';
        a.style.fontWeight = 'normal';
        a.style.textAlign = 'center';
        a.style.background = '#fff';
        a.style.color = '#000';
        a.style.padding = '1.5em';
        a.style.width = '400px';
        a.style.margin = '5em auto 0';
        if (!this.webgl)
            a.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n') : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n');
        return a;
    },
    addGetWebGLMessage: function(a) {
        var b, c, d;
        a = a || {};
        b = a.parent !== undefined ? a.parent : document.body;
        c = a.id !== undefined ? a.id : 'oldie';
        d = Detector.getWebGLErrorMessage();
        d.id = c;
        b.appendChild(d);
    }
};
if (typeof module === 'object')
    module.exports = Detector;
(function() {
    "use strict";
    var a = {};
    if (typeof exports === 'undefined')
        if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
            a.exports = {};
            define(function() {
                return a.exports;
            });
        } else
            a.exports = window;
    else
        a.exports = exports;
    (function(a) {
        if (!b)
            var b = 0.000001;
        if (!c)
            var c = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
        var d = {};
        d.setMatrixArrayType = function(a) {
            c = a;
        }
        ;
        if (typeof a !== 'undefined')
            a.glMatrix = d;
        ;var e = {};
        e.create = function() {
            var a = new c(2);
            a[0] = 0;
            a[1] = 0;
            return a;
        }
        ;
        e.clone = function(a) {
            var b = new c(2);
            b[0] = a[0];
            b[1] = a[1];
            return b;
        }
        ;
        e.fromValues = function(a, b) {
            var d = new c(2);
            d[0] = a;
            d[1] = b;
            return d;
        }
        ;
        e.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            return a;
        }
        ;
        e.set = function(a, b, c) {
            a[0] = b;
            a[1] = c;
            return a;
        }
        ;
        e.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            return a;
        }
        ;
        e.subtract = function(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            return a;
        }
        ;
        e.sub = e.subtract;
        e.multiply = function(a, b, c) {
            a[0] = b[0] * c[0];
            a[1] = b[1] * c[1];
            return a;
        }
        ;
        e.mul = e.multiply;
        e.divide = function(a, b, c) {
            a[0] = b[0] / c[0];
            a[1] = b[1] / c[1];
            return a;
        }
        ;
        e.div = e.divide;
        e.min = function(a, b, c) {
            a[0] = Math.min(b[0], c[0]);
            a[1] = Math.min(b[1], c[1]);
            return a;
        }
        ;
        e.max = function(a, b, c) {
            a[0] = Math.max(b[0], c[0]);
            a[1] = Math.max(b[1], c[1]);
            return a;
        }
        ;
        e.scale = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            return a;
        }
        ;
        e.distance = function(a, b) {
            var c = b[0] - a[0]
              , d = b[1] - a[1];
            return Math.sqrt(c * c + d * d);
        }
        ;
        e.dist = e.distance;
        e.squaredDistance = function(a, b) {
            var c = b[0] - a[0]
              , d = b[1] - a[1];
            return c * c + d * d;
        }
        ;
        e.sqrDist = e.squaredDistance;
        e.length = function(a) {
            var b = a[0]
              , c = a[1];
            return Math.sqrt(b * b + c * c);
        }
        ;
        e.len = e.length;
        e.squaredLength = function(a) {
            var b = a[0]
              , c = a[1];
            return b * b + c * c;
        }
        ;
        e.sqrLen = e.squaredLength;
        e.negate = function(a, b) {
            a[0] = -b[0];
            a[1] = -b[1];
            return a;
        }
        ;
        e.normalize = function(a, b) {
            var c = b[0]
              , d = b[1];
            var e = c * c + d * d;
            if (e > 0) {
                e = 1 / Math.sqrt(e);
                a[0] = b[0] * e;
                a[1] = b[1] * e;
            }
            return a;
        }
        ;
        e.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        }
        ;
        e.cross = function(a, b, c) {
            var d = b[0] * c[1] - b[1] * c[0];
            a[0] = a[1] = 0;
            a[2] = d;
            return a;
        }
        ;
        e.lerp = function(a, b, c, d) {
            var e = b[0]
              , f = b[1];
            a[0] = e + d * (c[0] - e);
            a[1] = f + d * (c[1] - f);
            return a;
        }
        ;
        e.transformMat2 = function(a, b, c) {
            var d = b[0]
              , e = b[1];
            a[0] = c[0] * d + c[2] * e;
            a[1] = c[1] * d + c[3] * e;
            return a;
        }
        ;
        e.transformMat2d = function(a, b, c) {
            var d = b[0]
              , e = b[1];
            a[0] = c[0] * d + c[2] * e + c[4];
            a[1] = c[1] * d + c[3] * e + c[5];
            return a;
        }
        ;
        e.transformMat3 = function(a, b, c) {
            var d = b[0]
              , e = b[1];
            a[0] = c[0] * d + c[3] * e + c[6];
            a[1] = c[1] * d + c[4] * e + c[7];
            return a;
        }
        ;
        e.transformMat4 = function(a, b, c) {
            var d = b[0]
              , e = b[1];
            a[0] = c[0] * d + c[4] * e + c[12];
            a[1] = c[1] * d + c[5] * e + c[13];
            return a;
        }
        ;
        e.forEach = (function() {
            var a = e.create();
            return function(b, c, d, e, f, g) {
                var h, i;
                if (!c)
                    c = 2;
                if (!d)
                    d = 0;
                if (e)
                    i = Math.min((e * c) + d, b.length);
                else
                    i = b.length;
                for (h = d; h < i; h += c) {
                    a[0] = b[h];
                    a[1] = b[h + 1];
                    f(a, a, g);
                    b[h] = a[0];
                    b[h + 1] = a[1];
                }
                return b;
            }
            ;
        }
        )();
        e.str = function(a) {
            return 'vec2(' + a[0] + ', ' + a[1] + ')';
        }
        ;
        if (typeof a !== 'undefined')
            a.vec2 = e;
        ;var f = {};
        f.create = function() {
            var a = new c(3);
            a[0] = 0;
            a[1] = 0;
            a[2] = 0;
            return a;
        }
        ;
        f.clone = function(a) {
            var b = new c(3);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            return b;
        }
        ;
        f.fromValues = function(a, b, d) {
            var e = new c(3);
            e[0] = a;
            e[1] = b;
            e[2] = d;
            return e;
        }
        ;
        f.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            return a;
        }
        ;
        f.set = function(a, b, c, d) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            return a;
        }
        ;
        f.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            a[2] = b[2] + c[2];
            return a;
        }
        ;
        f.subtract = function(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            a[2] = b[2] - c[2];
            return a;
        }
        ;
        f.sub = f.subtract;
        f.multiply = function(a, b, c) {
            a[0] = b[0] * c[0];
            a[1] = b[1] * c[1];
            a[2] = b[2] * c[2];
            return a;
        }
        ;
        f.mul = f.multiply;
        f.divide = function(a, b, c) {
            a[0] = b[0] / c[0];
            a[1] = b[1] / c[1];
            a[2] = b[2] / c[2];
            return a;
        }
        ;
        f.div = f.divide;
        f.min = function(a, b, c) {
            a[0] = Math.min(b[0], c[0]);
            a[1] = Math.min(b[1], c[1]);
            a[2] = Math.min(b[2], c[2]);
            return a;
        }
        ;
        f.max = function(a, b, c) {
            a[0] = Math.max(b[0], c[0]);
            a[1] = Math.max(b[1], c[1]);
            a[2] = Math.max(b[2], c[2]);
            return a;
        }
        ;
        f.scale = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            return a;
        }
        ;
        f.distance = function(a, b) {
            var c = b[0] - a[0]
              , d = b[1] - a[1]
              , e = b[2] - a[2];
            return Math.sqrt(c * c + d * d + e * e);
        }
        ;
        f.dist = f.distance;
        f.squaredDistance = function(a, b) {
            var c = b[0] - a[0]
              , d = b[1] - a[1]
              , e = b[2] - a[2];
            return c * c + d * d + e * e;
        }
        ;
        f.sqrDist = f.squaredDistance;
        f.length = function(a) {
            var b = a[0]
              , c = a[1]
              , d = a[2];
            return Math.sqrt(b * b + c * c + d * d);
        }
        ;
        f.len = f.length;
        f.squaredLength = function(a) {
            var b = a[0]
              , c = a[1]
              , d = a[2];
            return b * b + c * c + d * d;
        }
        ;
        f.sqrLen = f.squaredLength;
        f.negate = function(a, b) {
            a[0] = -b[0];
            a[1] = -b[1];
            a[2] = -b[2];
            return a;
        }
        ;
        f.normalize = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2];
            var f = c * c + d * d + e * e;
            if (f > 0) {
                f = 1 / Math.sqrt(f);
                a[0] = b[0] * f;
                a[1] = b[1] * f;
                a[2] = b[2] * f;
            }
            return a;
        }
        ;
        f.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        }
        ;
        f.cross = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = c[0]
              , h = c[1]
              , i = c[2];
            a[0] = e * i - f * h;
            a[1] = f * g - d * i;
            a[2] = d * h - e * g;
            return a;
        }
        ;
        f.lerp = function(a, b, c, d) {
            var e = b[0]
              , f = b[1]
              , g = b[2];
            a[0] = e + d * (c[0] - e);
            a[1] = f + d * (c[1] - f);
            a[2] = g + d * (c[2] - g);
            return a;
        }
        ;
        f.transformMat4 = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2];
            a[0] = c[0] * d + c[4] * e + c[8] * f + c[12];
            a[1] = c[1] * d + c[5] * e + c[9] * f + c[13];
            a[2] = c[2] * d + c[6] * e + c[10] * f + c[14];
            return a;
        }
        ;
        f.transformQuat = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = c[0]
              , h = c[1]
              , i = c[2]
              , j = c[3]
              , k = j * d + h * f - i * e
              , l = j * e + i * d - g * f
              , m = j * f + g * e - h * d
              , n = -g * d - h * e - i * f;
            a[0] = k * j + n * -g + l * -i - m * -h;
            a[1] = l * j + n * -h + m * -g - k * -i;
            a[2] = m * j + n * -i + k * -h - l * -g;
            return a;
        }
        ;
        f.forEach = (function() {
            var a = f.create();
            return function(b, c, d, e, f, g) {
                var h, i;
                if (!c)
                    c = 3;
                if (!d)
                    d = 0;
                if (e)
                    i = Math.min((e * c) + d, b.length);
                else
                    i = b.length;
                for (h = d; h < i; h += c) {
                    a[0] = b[h];
                    a[1] = b[h + 1];
                    a[2] = b[h + 2];
                    f(a, a, g);
                    b[h] = a[0];
                    b[h + 1] = a[1];
                    b[h + 2] = a[2];
                }
                return b;
            }
            ;
        }
        )();
        f.str = function(a) {
            return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
        }
        ;
        if (typeof a !== 'undefined')
            a.vec3 = f;
        ;var g = {};
        g.create = function() {
            var a = new c(4);
            a[0] = 0;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            return a;
        }
        ;
        g.clone = function(a) {
            var b = new c(4);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            return b;
        }
        ;
        g.fromValues = function(a, b, d, e) {
            var f = new c(4);
            f[0] = a;
            f[1] = b;
            f[2] = d;
            f[3] = e;
            return f;
        }
        ;
        g.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            return a;
        }
        ;
        g.set = function(a, b, c, d, e) {
            a[0] = b;
            a[1] = c;
            a[2] = d;
            a[3] = e;
            return a;
        }
        ;
        g.add = function(a, b, c) {
            a[0] = b[0] + c[0];
            a[1] = b[1] + c[1];
            a[2] = b[2] + c[2];
            a[3] = b[3] + c[3];
            return a;
        }
        ;
        g.subtract = function(a, b, c) {
            a[0] = b[0] - c[0];
            a[1] = b[1] - c[1];
            a[2] = b[2] - c[2];
            a[3] = b[3] - c[3];
            return a;
        }
        ;
        g.sub = g.subtract;
        g.multiply = function(a, b, c) {
            a[0] = b[0] * c[0];
            a[1] = b[1] * c[1];
            a[2] = b[2] * c[2];
            a[3] = b[3] * c[3];
            return a;
        }
        ;
        g.mul = g.multiply;
        g.divide = function(a, b, c) {
            a[0] = b[0] / c[0];
            a[1] = b[1] / c[1];
            a[2] = b[2] / c[2];
            a[3] = b[3] / c[3];
            return a;
        }
        ;
        g.div = g.divide;
        g.min = function(a, b, c) {
            a[0] = Math.min(b[0], c[0]);
            a[1] = Math.min(b[1], c[1]);
            a[2] = Math.min(b[2], c[2]);
            a[3] = Math.min(b[3], c[3]);
            return a;
        }
        ;
        g.max = function(a, b, c) {
            a[0] = Math.max(b[0], c[0]);
            a[1] = Math.max(b[1], c[1]);
            a[2] = Math.max(b[2], c[2]);
            a[3] = Math.max(b[3], c[3]);
            return a;
        }
        ;
        g.scale = function(a, b, c) {
            a[0] = b[0] * c;
            a[1] = b[1] * c;
            a[2] = b[2] * c;
            a[3] = b[3] * c;
            return a;
        }
        ;
        g.distance = function(a, b) {
            var c = b[0] - a[0]
              , d = b[1] - a[1]
              , e = b[2] - a[2]
              , f = b[3] - a[3];
            return Math.sqrt(c * c + d * d + e * e + f * f);
        }
        ;
        g.dist = g.distance;
        g.squaredDistance = function(a, b) {
            var c = b[0] - a[0]
              , d = b[1] - a[1]
              , e = b[2] - a[2]
              , f = b[3] - a[3];
            return c * c + d * d + e * e + f * f;
        }
        ;
        g.sqrDist = g.squaredDistance;
        g.length = function(a) {
            var b = a[0]
              , c = a[1]
              , d = a[2]
              , e = a[3];
            return Math.sqrt(b * b + c * c + d * d + e * e);
        }
        ;
        g.len = g.length;
        g.squaredLength = function(a) {
            var b = a[0]
              , c = a[1]
              , d = a[2]
              , e = a[3];
            return b * b + c * c + d * d + e * e;
        }
        ;
        g.sqrLen = g.squaredLength;
        g.negate = function(a, b) {
            a[0] = -b[0];
            a[1] = -b[1];
            a[2] = -b[2];
            a[3] = -b[3];
            return a;
        }
        ;
        g.normalize = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3];
            var g = c * c + d * d + e * e + f * f;
            if (g > 0) {
                g = 1 / Math.sqrt(g);
                a[0] = b[0] * g;
                a[1] = b[1] * g;
                a[2] = b[2] * g;
                a[3] = b[3] * g;
            }
            return a;
        }
        ;
        g.dot = function(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        }
        ;
        g.lerp = function(a, b, c, d) {
            var e = b[0]
              , f = b[1]
              , g = b[2]
              , h = b[3];
            a[0] = e + d * (c[0] - e);
            a[1] = f + d * (c[1] - f);
            a[2] = g + d * (c[2] - g);
            a[3] = h + d * (c[3] - h);
            return a;
        }
        ;
        g.transformMat4 = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3];
            a[0] = c[0] * d + c[4] * e + c[8] * f + c[12] * g;
            a[1] = c[1] * d + c[5] * e + c[9] * f + c[13] * g;
            a[2] = c[2] * d + c[6] * e + c[10] * f + c[14] * g;
            a[3] = c[3] * d + c[7] * e + c[11] * f + c[15] * g;
            return a;
        }
        ;
        g.transformQuat = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = c[0]
              , h = c[1]
              , i = c[2]
              , j = c[3]
              , k = j * d + h * f - i * e
              , l = j * e + i * d - g * f
              , m = j * f + g * e - h * d
              , n = -g * d - h * e - i * f;
            a[0] = k * j + n * -g + l * -i - m * -h;
            a[1] = l * j + n * -h + m * -g - k * -i;
            a[2] = m * j + n * -i + k * -h - l * -g;
            return a;
        }
        ;
        g.forEach = (function() {
            var a = g.create();
            return function(b, c, d, e, f, g) {
                var h, i;
                if (!c)
                    c = 4;
                if (!d)
                    d = 0;
                if (e)
                    i = Math.min((e * c) + d, b.length);
                else
                    i = b.length;
                for (h = d; h < i; h += c) {
                    a[0] = b[h];
                    a[1] = b[h + 1];
                    a[2] = b[h + 2];
                    a[3] = b[h + 3];
                    f(a, a, g);
                    b[h] = a[0];
                    b[h + 1] = a[1];
                    b[h + 2] = a[2];
                    b[h + 3] = a[3];
                }
                return b;
            }
            ;
        }
        )();
        g.str = function(a) {
            return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        }
        ;
        if (typeof a !== 'undefined')
            a.vec4 = g;
        ;var h = {};
        var i = new Float32Array([1, 0, 0, 1]);
        h.create = function() {
            var a = new c(4);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            return a;
        }
        ;
        h.clone = function(a) {
            var b = new c(4);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            return b;
        }
        ;
        h.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            return a;
        }
        ;
        h.identity = function(a) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            return a;
        }
        ;
        h.transpose = function(a, b) {
            if (a === b) {
                var c = b[1];
                a[1] = b[2];
                a[2] = c;
            } else {
                a[0] = b[0];
                a[1] = b[2];
                a[2] = b[1];
                a[3] = b[3];
            }
            return a;
        }
        ;
        h.invert = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3]
              , g = c * f - e * d;
            if (!g)
                return null;
            g = 1.0 / g;
            a[0] = f * g;
            a[1] = -d * g;
            a[2] = -e * g;
            a[3] = c * g;
            return a;
        }
        ;
        h.adjoint = function(a, b) {
            var c = b[0];
            a[0] = b[3];
            a[1] = -b[1];
            a[2] = -b[2];
            a[3] = c;
            return a;
        }
        ;
        h.determinant = function(a) {
            return a[0] * a[3] - a[2] * a[1];
        }
        ;
        h.multiply = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3];
            var h = c[0]
              , i = c[1]
              , j = c[2]
              , k = c[3];
            a[0] = d * h + e * j;
            a[1] = d * i + e * k;
            a[2] = f * h + g * j;
            a[3] = f * i + g * k;
            return a;
        }
        ;
        h.mul = h.multiply;
        h.rotate = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = Math.sin(c)
              , i = Math.cos(c);
            a[0] = d * i + e * h;
            a[1] = d * -h + e * i;
            a[2] = f * i + g * h;
            a[3] = f * -h + g * i;
            return a;
        }
        ;
        h.scale = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = c[0]
              , i = c[1];
            a[0] = d * h;
            a[1] = e * i;
            a[2] = f * h;
            a[3] = g * i;
            return a;
        }
        ;
        h.str = function(a) {
            return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        }
        ;
        if (typeof a !== 'undefined')
            a.mat2 = h;
        ;var j = {};
        var k = new Float32Array([1, 0, 0, 1, 0, 0]);
        j.create = function() {
            var a = new c(6);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            a[4] = 0;
            a[5] = 0;
            return a;
        }
        ;
        j.clone = function(a) {
            var b = new c(6);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            b[4] = a[4];
            b[5] = a[5];
            return b;
        }
        ;
        j.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = b[4];
            a[5] = b[5];
            return a;
        }
        ;
        j.identity = function(a) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            a[4] = 0;
            a[5] = 0;
            return a;
        }
        ;
        j.invert = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3]
              , g = b[4]
              , h = b[5];
            var i = c * f - d * e;
            if (!i)
                return null;
            i = 1.0 / i;
            a[0] = f * i;
            a[1] = -d * i;
            a[2] = -e * i;
            a[3] = c * i;
            a[4] = (e * h - f * g) * i;
            a[5] = (d * g - c * h) * i;
            return a;
        }
        ;
        j.determinant = function(a) {
            return a[0] * a[3] - a[1] * a[2];
        }
        ;
        j.multiply = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = b[4]
              , i = b[5]
              , j = c[0]
              , k = c[1]
              , l = c[2]
              , m = c[3]
              , n = c[4]
              , o = c[5];
            a[0] = d * j + e * l;
            a[1] = d * k + e * m;
            a[2] = f * j + g * l;
            a[3] = f * k + g * m;
            a[4] = j * h + l * i + n;
            a[5] = k * h + m * i + o;
            return a;
        }
        ;
        j.mul = j.multiply;
        j.rotate = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = b[4]
              , i = b[5]
              , j = Math.sin(c)
              , k = Math.cos(c);
            a[0] = d * k + e * j;
            a[1] = -d * j + e * k;
            a[2] = f * k + g * j;
            a[3] = -f * j + k * g;
            a[4] = k * h + j * i;
            a[5] = k * i - j * h;
            return a;
        }
        ;
        j.scale = function(a, b, c) {
            var d = c[0]
              , e = c[1];
            a[0] = b[0] * d;
            a[1] = b[1] * e;
            a[2] = b[2] * d;
            a[3] = b[3] * e;
            a[4] = b[4] * d;
            a[5] = b[5] * e;
            return a;
        }
        ;
        j.translate = function(a, b, c) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = b[4] + c[0];
            a[5] = b[5] + c[1];
            return a;
        }
        ;
        j.str = function(a) {
            return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
        }
        ;
        if (typeof a !== 'undefined')
            a.mat2d = j;
        ;var l = {};
        var m = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        l.create = function() {
            var a = new c(9);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 1;
            a[5] = 0;
            a[6] = 0;
            a[7] = 0;
            a[8] = 1;
            return a;
        }
        ;
        l.clone = function(a) {
            var b = new c(9);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            b[4] = a[4];
            b[5] = a[5];
            b[6] = a[6];
            b[7] = a[7];
            b[8] = a[8];
            return b;
        }
        ;
        l.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = b[4];
            a[5] = b[5];
            a[6] = b[6];
            a[7] = b[7];
            a[8] = b[8];
            return a;
        }
        ;
        l.identity = function(a) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 1;
            a[5] = 0;
            a[6] = 0;
            a[7] = 0;
            a[8] = 1;
            return a;
        }
        ;
        l.transpose = function(a, b) {
            if (a === b) {
                var c = b[1]
                  , d = b[2]
                  , e = b[5];
                a[1] = b[3];
                a[2] = b[6];
                a[3] = c;
                a[5] = b[7];
                a[6] = d;
                a[7] = e;
            } else {
                a[0] = b[0];
                a[1] = b[3];
                a[2] = b[6];
                a[3] = b[1];
                a[4] = b[4];
                a[5] = b[7];
                a[6] = b[2];
                a[7] = b[5];
                a[8] = b[8];
            }
            return a;
        }
        ;
        l.invert = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3]
              , g = b[4]
              , h = b[5]
              , i = b[6]
              , j = b[7]
              , k = b[8]
              , l = k * g - h * j
              , m = -k * f + h * i
              , n = j * f - g * i
              , o = c * l + d * m + e * n;
            if (!o)
                return null;
            o = 1.0 / o;
            a[0] = l * o;
            a[1] = (-k * d + e * j) * o;
            a[2] = (h * d - e * g) * o;
            a[3] = m * o;
            a[4] = (k * c - e * i) * o;
            a[5] = (-h * c + e * f) * o;
            a[6] = n * o;
            a[7] = (-j * c + d * i) * o;
            a[8] = (g * c - d * f) * o;
            return a;
        }
        ;
        l.adjoint = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3]
              , g = b[4]
              , h = b[5]
              , i = b[6]
              , j = b[7]
              , k = b[8];
            a[0] = (g * k - h * j);
            a[1] = (e * j - d * k);
            a[2] = (d * h - e * g);
            a[3] = (h * i - f * k);
            a[4] = (c * k - e * i);
            a[5] = (e * f - c * h);
            a[6] = (f * j - g * i);
            a[7] = (d * i - c * j);
            a[8] = (c * g - d * f);
            return a;
        }
        ;
        l.determinant = function(a) {
            var b = a[0]
              , c = a[1]
              , d = a[2]
              , e = a[3]
              , f = a[4]
              , g = a[5]
              , h = a[6]
              , i = a[7]
              , j = a[8];
            return b * (j * f - g * i) + c * (-j * e + g * h) + d * (i * e - f * h);
        }
        ;
        l.multiply = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = b[4]
              , i = b[5]
              , j = b[6]
              , k = b[7]
              , l = b[8]
              , m = c[0]
              , n = c[1]
              , o = c[2]
              , p = c[3]
              , q = c[4]
              , r = c[5]
              , s = c[6]
              , t = c[7]
              , u = c[8];
            a[0] = m * d + n * g + o * j;
            a[1] = m * e + n * h + o * k;
            a[2] = m * f + n * i + o * l;
            a[3] = p * d + q * g + r * j;
            a[4] = p * e + q * h + r * k;
            a[5] = p * f + q * i + r * l;
            a[6] = s * d + t * g + u * j;
            a[7] = s * e + t * h + u * k;
            a[8] = s * f + t * i + u * l;
            return a;
        }
        ;
        l.mul = l.multiply;
        l.translate = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = b[4]
              , i = b[5]
              , j = b[6]
              , k = b[7]
              , l = b[8]
              , m = c[0]
              , n = c[1];
            a[0] = d;
            a[1] = e;
            a[2] = f;
            a[3] = g;
            a[4] = h;
            a[5] = i;
            a[6] = m * d + n * g + j;
            a[7] = m * e + n * h + k;
            a[8] = m * f + n * i + l;
            return a;
        }
        ;
        l.rotate = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = b[4]
              , i = b[5]
              , j = b[6]
              , k = b[7]
              , l = b[8]
              , m = Math.sin(c)
              , n = Math.cos(c);
            a[0] = n * d + m * g;
            a[1] = n * e + m * h;
            a[2] = n * f + m * i;
            a[3] = n * g - m * d;
            a[4] = n * h - m * e;
            a[5] = n * i - m * f;
            a[6] = j;
            a[7] = k;
            a[8] = l;
            return a;
        }
        ;
        l.scale = function(a, b, c) {
            var d = c[0]
              , e = c[2];
            a[0] = d * b[0];
            a[1] = d * b[1];
            a[2] = d * b[2];
            a[3] = e * b[3];
            a[4] = e * b[4];
            a[5] = e * b[5];
            a[6] = b[6];
            a[7] = b[7];
            a[8] = b[8];
            return a;
        }
        ;
        l.fromMat2d = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = 0;
            a[3] = b[2];
            a[4] = b[3];
            a[5] = 0;
            a[6] = b[4];
            a[7] = b[5];
            a[8] = 1;
            return a;
        }
        ;
        l.fromQuat = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3]
              , g = c + c
              , h = d + d
              , i = e + e
              , j = c * g
              , k = c * h
              , l = c * i
              , m = d * h
              , n = d * i
              , o = e * i
              , p = f * g
              , q = f * h
              , r = f * i;
            a[0] = 1 - (m + o);
            a[1] = k + r;
            a[2] = l - q;
            a[3] = k - r;
            a[4] = 1 - (j + o);
            a[5] = n + p;
            a[6] = l + q;
            a[7] = n - p;
            a[8] = 1 - (j + m);
            return a;
        }
        ;
        l.str = function(a) {
            return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
        }
        ;
        if (typeof a !== 'undefined')
            a.mat3 = l;
        ;var n = {};
        var o = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        n.create = function() {
            var a = new c(16);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = 1;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = 1;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a;
        }
        ;
        n.clone = function(a) {
            var b = new c(16);
            b[0] = a[0];
            b[1] = a[1];
            b[2] = a[2];
            b[3] = a[3];
            b[4] = a[4];
            b[5] = a[5];
            b[6] = a[6];
            b[7] = a[7];
            b[8] = a[8];
            b[9] = a[9];
            b[10] = a[10];
            b[11] = a[11];
            b[12] = a[12];
            b[13] = a[13];
            b[14] = a[14];
            b[15] = a[15];
            return b;
        }
        ;
        n.copy = function(a, b) {
            a[0] = b[0];
            a[1] = b[1];
            a[2] = b[2];
            a[3] = b[3];
            a[4] = b[4];
            a[5] = b[5];
            a[6] = b[6];
            a[7] = b[7];
            a[8] = b[8];
            a[9] = b[9];
            a[10] = b[10];
            a[11] = b[11];
            a[12] = b[12];
            a[13] = b[13];
            a[14] = b[14];
            a[15] = b[15];
            return a;
        }
        ;
        n.identity = function(a) {
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = 1;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = 1;
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a;
        }
        ;
        n.transpose = function(a, b) {
            if (a === b) {
                var c = b[1]
                  , d = b[2]
                  , e = b[3]
                  , f = b[6]
                  , g = b[7]
                  , h = b[11];
                a[1] = b[4];
                a[2] = b[8];
                a[3] = b[12];
                a[4] = c;
                a[6] = b[9];
                a[7] = b[13];
                a[8] = d;
                a[9] = f;
                a[11] = b[14];
                a[12] = e;
                a[13] = g;
                a[14] = h;
            } else {
                a[0] = b[0];
                a[1] = b[4];
                a[2] = b[8];
                a[3] = b[12];
                a[4] = b[1];
                a[5] = b[5];
                a[6] = b[9];
                a[7] = b[13];
                a[8] = b[2];
                a[9] = b[6];
                a[10] = b[10];
                a[11] = b[14];
                a[12] = b[3];
                a[13] = b[7];
                a[14] = b[11];
                a[15] = b[15];
            }
            return a;
        }
        ;
        n.invert = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3]
              , g = b[4]
              , h = b[5]
              , i = b[6]
              , j = b[7]
              , k = b[8]
              , l = b[9]
              , m = b[10]
              , n = b[11]
              , o = b[12]
              , p = b[13]
              , q = b[14]
              , r = b[15]
              , s = c * h - d * g
              , t = c * i - e * g
              , u = c * j - f * g
              , v = d * i - e * h
              , w = d * j - f * h
              , x = e * j - f * i
              , y = k * p - l * o
              , z = k * q - m * o
              , A = k * r - n * o
              , B = l * q - m * p
              , C = l * r - n * p
              , D = m * r - n * q
              , E = s * D - t * C + u * B + v * A - w * z + x * y;
            if (!E)
                return null;
            E = 1.0 / E;
            a[0] = (h * D - i * C + j * B) * E;
            a[1] = (e * C - d * D - f * B) * E;
            a[2] = (p * x - q * w + r * v) * E;
            a[3] = (m * w - l * x - n * v) * E;
            a[4] = (i * A - g * D - j * z) * E;
            a[5] = (c * D - e * A + f * z) * E;
            a[6] = (q * u - o * x - r * t) * E;
            a[7] = (k * x - m * u + n * t) * E;
            a[8] = (g * C - h * A + j * y) * E;
            a[9] = (d * A - c * C - f * y) * E;
            a[10] = (o * w - p * u + r * s) * E;
            a[11] = (l * u - k * w - n * s) * E;
            a[12] = (h * z - g * B - i * y) * E;
            a[13] = (c * B - d * z + e * y) * E;
            a[14] = (p * t - o * v - q * s) * E;
            a[15] = (k * v - l * t + m * s) * E;
            return a;
        }
        ;
        n.adjoint = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3]
              , g = b[4]
              , h = b[5]
              , i = b[6]
              , j = b[7]
              , k = b[8]
              , l = b[9]
              , m = b[10]
              , n = b[11]
              , o = b[12]
              , p = b[13]
              , q = b[14]
              , r = b[15];
            a[0] = (h * (m * r - n * q) - l * (i * r - j * q) + p * (i * n - j * m));
            a[1] = -(d * (m * r - n * q) - l * (e * r - f * q) + p * (e * n - f * m));
            a[2] = (d * (i * r - j * q) - h * (e * r - f * q) + p * (e * j - f * i));
            a[3] = -(d * (i * n - j * m) - h * (e * n - f * m) + l * (e * j - f * i));
            a[4] = -(g * (m * r - n * q) - k * (i * r - j * q) + o * (i * n - j * m));
            a[5] = (c * (m * r - n * q) - k * (e * r - f * q) + o * (e * n - f * m));
            a[6] = -(c * (i * r - j * q) - g * (e * r - f * q) + o * (e * j - f * i));
            a[7] = (c * (i * n - j * m) - g * (e * n - f * m) + k * (e * j - f * i));
            a[8] = (g * (l * r - n * p) - k * (h * r - j * p) + o * (h * n - j * l));
            a[9] = -(c * (l * r - n * p) - k * (d * r - f * p) + o * (d * n - f * l));
            a[10] = (c * (h * r - j * p) - g * (d * r - f * p) + o * (d * j - f * h));
            a[11] = -(c * (h * n - j * l) - g * (d * n - f * l) + k * (d * j - f * h));
            a[12] = -(g * (l * q - m * p) - k * (h * q - i * p) + o * (h * m - i * l));
            a[13] = (c * (l * q - m * p) - k * (d * q - e * p) + o * (d * m - e * l));
            a[14] = -(c * (h * q - i * p) - g * (d * q - e * p) + o * (d * i - e * h));
            a[15] = (c * (h * m - i * l) - g * (d * m - e * l) + k * (d * i - e * h));
            return a;
        }
        ;
        n.determinant = function(a) {
            var b = a[0]
              , c = a[1]
              , d = a[2]
              , e = a[3]
              , f = a[4]
              , g = a[5]
              , h = a[6]
              , i = a[7]
              , j = a[8]
              , k = a[9]
              , l = a[10]
              , m = a[11]
              , n = a[12]
              , o = a[13]
              , p = a[14]
              , q = a[15]
              , r = b * g - c * f
              , s = b * h - d * f
              , t = b * i - e * f
              , u = c * h - d * g
              , v = c * i - e * g
              , w = d * i - e * h
              , x = j * o - k * n
              , y = j * p - l * n
              , z = j * q - m * n
              , A = k * p - l * o
              , B = k * q - m * o
              , C = l * q - m * p;
            return r * C - s * B + t * A + u * z - v * y + w * x;
        }
        ;
        n.multiply = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = b[4]
              , i = b[5]
              , j = b[6]
              , k = b[7]
              , l = b[8]
              , m = b[9]
              , n = b[10]
              , o = b[11]
              , p = b[12]
              , q = b[13]
              , r = b[14]
              , s = b[15];
            var t = c[0]
              , u = c[1]
              , v = c[2]
              , w = c[3];
            a[0] = t * d + u * h + v * l + w * p;
            a[1] = t * e + u * i + v * m + w * q;
            a[2] = t * f + u * j + v * n + w * r;
            a[3] = t * g + u * k + v * o + w * s;
            t = c[4];
            u = c[5];
            v = c[6];
            w = c[7];
            a[4] = t * d + u * h + v * l + w * p;
            a[5] = t * e + u * i + v * m + w * q;
            a[6] = t * f + u * j + v * n + w * r;
            a[7] = t * g + u * k + v * o + w * s;
            t = c[8];
            u = c[9];
            v = c[10];
            w = c[11];
            a[8] = t * d + u * h + v * l + w * p;
            a[9] = t * e + u * i + v * m + w * q;
            a[10] = t * f + u * j + v * n + w * r;
            a[11] = t * g + u * k + v * o + w * s;
            t = c[12];
            u = c[13];
            v = c[14];
            w = c[15];
            a[12] = t * d + u * h + v * l + w * p;
            a[13] = t * e + u * i + v * m + w * q;
            a[14] = t * f + u * j + v * n + w * r;
            a[15] = t * g + u * k + v * o + w * s;
            return a;
        }
        ;
        n.mul = n.multiply;
        n.translate = function(a, b, c) {
            var d = c[0], e = c[1], f = c[2], g, h, i, j, k, l, m, n, o, p, q, r;
            if (b === a) {
                a[12] = b[0] * d + b[4] * e + b[8] * f + b[12];
                a[13] = b[1] * d + b[5] * e + b[9] * f + b[13];
                a[14] = b[2] * d + b[6] * e + b[10] * f + b[14];
                a[15] = b[3] * d + b[7] * e + b[11] * f + b[15];
            } else {
                g = b[0];
                h = b[1];
                i = b[2];
                j = b[3];
                k = b[4];
                l = b[5];
                m = b[6];
                n = b[7];
                o = b[8];
                p = b[9];
                q = b[10];
                r = b[11];
                a[0] = g;
                a[1] = h;
                a[2] = i;
                a[3] = j;
                a[4] = k;
                a[5] = l;
                a[6] = m;
                a[7] = n;
                a[8] = o;
                a[9] = p;
                a[10] = q;
                a[11] = r;
                a[12] = g * d + k * e + o * f + b[12];
                a[13] = h * d + l * e + p * f + b[13];
                a[14] = i * d + m * e + q * f + b[14];
                a[15] = j * d + n * e + r * f + b[15];
            }
            return a;
        }
        ;
        n.scale = function(a, b, c) {
            var d = c[0]
              , e = c[1]
              , f = c[2];
            a[0] = b[0] * d;
            a[1] = b[1] * d;
            a[2] = b[2] * d;
            a[3] = b[3] * d;
            a[4] = b[4] * e;
            a[5] = b[5] * e;
            a[6] = b[6] * e;
            a[7] = b[7] * e;
            a[8] = b[8] * f;
            a[9] = b[9] * f;
            a[10] = b[10] * f;
            a[11] = b[11] * f;
            a[12] = b[12];
            a[13] = b[13];
            a[14] = b[14];
            a[15] = b[15];
            return a;
        }
        ;
        n.rotate = function(a, c, d, e) {
            var f = e[0], g = e[1], h = e[2], i = Math.sqrt(f * f + g * g + h * h), j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G;
            if (Math.abs(i) < b)
                return null;
            i = 1 / i;
            f *= i;
            g *= i;
            h *= i;
            j = Math.sin(d);
            k = Math.cos(d);
            l = 1 - k;
            m = c[0];
            n = c[1];
            o = c[2];
            p = c[3];
            q = c[4];
            r = c[5];
            s = c[6];
            t = c[7];
            u = c[8];
            v = c[9];
            w = c[10];
            x = c[11];
            y = f * f * l + k;
            z = g * f * l + h * j;
            A = h * f * l - g * j;
            B = f * g * l - h * j;
            C = g * g * l + k;
            D = h * g * l + f * j;
            E = f * h * l + g * j;
            F = g * h * l - f * j;
            G = h * h * l + k;
            a[0] = m * y + q * z + u * A;
            a[1] = n * y + r * z + v * A;
            a[2] = o * y + s * z + w * A;
            a[3] = p * y + t * z + x * A;
            a[4] = m * B + q * C + u * D;
            a[5] = n * B + r * C + v * D;
            a[6] = o * B + s * C + w * D;
            a[7] = p * B + t * C + x * D;
            a[8] = m * E + q * F + u * G;
            a[9] = n * E + r * F + v * G;
            a[10] = o * E + s * F + w * G;
            a[11] = p * E + t * F + x * G;
            if (c !== a) {
                a[12] = c[12];
                a[13] = c[13];
                a[14] = c[14];
                a[15] = c[15];
            }
            return a;
        }
        ;
        n.rotateX = function(a, b, c) {
            var d = Math.sin(c)
              , e = Math.cos(c)
              , f = b[4]
              , g = b[5]
              , h = b[6]
              , i = b[7]
              , j = b[8]
              , k = b[9]
              , l = b[10]
              , m = b[11];
            if (b !== a) {
                a[0] = b[0];
                a[1] = b[1];
                a[2] = b[2];
                a[3] = b[3];
                a[12] = b[12];
                a[13] = b[13];
                a[14] = b[14];
                a[15] = b[15];
            }
            a[4] = f * e + j * d;
            a[5] = g * e + k * d;
            a[6] = h * e + l * d;
            a[7] = i * e + m * d;
            a[8] = j * e - f * d;
            a[9] = k * e - g * d;
            a[10] = l * e - h * d;
            a[11] = m * e - i * d;
            return a;
        }
        ;
        n.rotateY = function(a, b, c) {
            var d = Math.sin(c)
              , e = Math.cos(c)
              , f = b[0]
              , g = b[1]
              , h = b[2]
              , i = b[3]
              , j = b[8]
              , k = b[9]
              , l = b[10]
              , m = b[11];
            if (b !== a) {
                a[4] = b[4];
                a[5] = b[5];
                a[6] = b[6];
                a[7] = b[7];
                a[12] = b[12];
                a[13] = b[13];
                a[14] = b[14];
                a[15] = b[15];
            }
            a[0] = f * e - j * d;
            a[1] = g * e - k * d;
            a[2] = h * e - l * d;
            a[3] = i * e - m * d;
            a[8] = f * d + j * e;
            a[9] = g * d + k * e;
            a[10] = h * d + l * e;
            a[11] = i * d + m * e;
            return a;
        }
        ;
        n.rotateZ = function(a, b, c) {
            var d = Math.sin(c)
              , e = Math.cos(c)
              , f = b[0]
              , g = b[1]
              , h = b[2]
              , i = b[3]
              , j = b[4]
              , k = b[5]
              , l = b[6]
              , m = b[7];
            if (b !== a) {
                a[8] = b[8];
                a[9] = b[9];
                a[10] = b[10];
                a[11] = b[11];
                a[12] = b[12];
                a[13] = b[13];
                a[14] = b[14];
                a[15] = b[15];
            }
            a[0] = f * e + j * d;
            a[1] = g * e + k * d;
            a[2] = h * e + l * d;
            a[3] = i * e + m * d;
            a[4] = j * e - f * d;
            a[5] = k * e - g * d;
            a[6] = l * e - h * d;
            a[7] = m * e - i * d;
            return a;
        }
        ;
        n.fromRotationTranslation = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = d + d
              , i = e + e
              , j = f + f
              , k = d * h
              , l = d * i
              , m = d * j
              , n = e * i
              , o = e * j
              , p = f * j
              , q = g * h
              , r = g * i
              , s = g * j;
            a[0] = 1 - (n + p);
            a[1] = l + s;
            a[2] = m - r;
            a[3] = 0;
            a[4] = l - s;
            a[5] = 1 - (k + p);
            a[6] = o + q;
            a[7] = 0;
            a[8] = m + r;
            a[9] = o - q;
            a[10] = 1 - (k + n);
            a[11] = 0;
            a[12] = c[0];
            a[13] = c[1];
            a[14] = c[2];
            a[15] = 1;
            return a;
        }
        ;
        n.fromQuat = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3]
              , g = c + c
              , h = d + d
              , i = e + e
              , j = c * g
              , k = c * h
              , l = c * i
              , m = d * h
              , n = d * i
              , o = e * i
              , p = f * g
              , q = f * h
              , r = f * i;
            a[0] = 1 - (m + o);
            a[1] = k + r;
            a[2] = l - q;
            a[3] = 0;
            a[4] = k - r;
            a[5] = 1 - (j + o);
            a[6] = n + p;
            a[7] = 0;
            a[8] = l + q;
            a[9] = n - p;
            a[10] = 1 - (j + m);
            a[11] = 0;
            a[12] = 0;
            a[13] = 0;
            a[14] = 0;
            a[15] = 1;
            return a;
        }
        ;
        n.frustum = function(a, b, c, d, e, f, g) {
            var h = 1 / (c - b)
              , i = 1 / (e - d)
              , j = 1 / (f - g);
            a[0] = (f * 2) * h;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = (f * 2) * i;
            a[6] = 0;
            a[7] = 0;
            a[8] = (c + b) * h;
            a[9] = (e + d) * i;
            a[10] = (g + f) * j;
            a[11] = -1;
            a[12] = 0;
            a[13] = 0;
            a[14] = (g * f * 2) * j;
            a[15] = 0;
            return a;
        }
        ;
        n.perspective = function(a, b, c, d, e) {
            var f = 1.0 / Math.tan(b / 2)
              , g = 1 / (d - e);
            a[0] = f / c;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = f;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = (e + d) * g;
            a[11] = -1;
            a[12] = 0;
            a[13] = 0;
            a[14] = (2 * e * d) * g;
            a[15] = 0;
            return a;
        }
        ;
        n.ortho = function(a, b, c, d, e, f, g) {
            var h = 1 / (b - c)
              , i = 1 / (d - e)
              , j = 1 / (f - g);
            a[0] = -2 * h;
            a[1] = 0;
            a[2] = 0;
            a[3] = 0;
            a[4] = 0;
            a[5] = -2 * i;
            a[6] = 0;
            a[7] = 0;
            a[8] = 0;
            a[9] = 0;
            a[10] = 2 * j;
            a[11] = 0;
            a[12] = (b + c) * h;
            a[13] = (e + d) * i;
            a[14] = (g + f) * j;
            a[15] = 1;
            return a;
        }
        ;
        n.lookAt = function(a, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q = c[0], r = c[1], s = c[2], t = e[0], u = e[1], v = e[2], w = d[0], x = d[1], y = d[2];
            if (Math.abs(q - w) < b && Math.abs(r - x) < b && Math.abs(s - y) < b)
                return n.identity(a);
            l = q - w;
            m = r - x;
            o = s - y;
            p = 1 / Math.sqrt(l * l + m * m + o * o);
            l *= p;
            m *= p;
            o *= p;
            f = u * o - v * m;
            g = v * l - t * o;
            h = t * m - u * l;
            p = Math.sqrt(f * f + g * g + h * h);
            if (!p) {
                f = 0;
                g = 0;
                h = 0;
            } else {
                p = 1 / p;
                f *= p;
                g *= p;
                h *= p;
            }
            i = m * h - o * g;
            j = o * f - l * h;
            k = l * g - m * f;
            p = Math.sqrt(i * i + j * j + k * k);
            if (!p) {
                i = 0;
                j = 0;
                k = 0;
            } else {
                p = 1 / p;
                i *= p;
                j *= p;
                k *= p;
            }
            a[0] = f;
            a[1] = i;
            a[2] = l;
            a[3] = 0;
            a[4] = g;
            a[5] = j;
            a[6] = m;
            a[7] = 0;
            a[8] = h;
            a[9] = k;
            a[10] = o;
            a[11] = 0;
            a[12] = -(f * q + g * r + h * s);
            a[13] = -(i * q + j * r + k * s);
            a[14] = -(l * q + m * r + o * s);
            a[15] = 1;
            return a;
        }
        ;
        n.str = function(a) {
            return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
        }
        ;
        if (typeof a !== 'undefined')
            a.mat4 = n;
        ;var p = {};
        var q = new Float32Array([0, 0, 0, 1]);
        p.create = function() {
            var a = new c(4);
            a[0] = 0;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            return a;
        }
        ;
        p.clone = g.clone;
        p.fromValues = g.fromValues;
        p.copy = g.copy;
        p.set = g.set;
        p.identity = function(a) {
            a[0] = 0;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            return a;
        }
        ;
        p.setAxisAngle = function(a, b, c) {
            c = c * 0.5;
            var d = Math.sin(c);
            a[0] = d * b[0];
            a[1] = d * b[1];
            a[2] = d * b[2];
            a[3] = Math.cos(c);
            return a;
        }
        ;
        p.add = g.add;
        p.multiply = function(a, b, c) {
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = c[0]
              , i = c[1]
              , j = c[2]
              , k = c[3];
            a[0] = d * k + g * h + e * j - f * i;
            a[1] = e * k + g * i + f * h - d * j;
            a[2] = f * k + g * j + d * i - e * h;
            a[3] = g * k - d * h - e * i - f * j;
            return a;
        }
        ;
        p.mul = p.multiply;
        p.scale = g.scale;
        p.rotateX = function(a, b, c) {
            c *= 0.5;
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = Math.sin(c)
              , i = Math.cos(c);
            a[0] = d * i + g * h;
            a[1] = e * i + f * h;
            a[2] = f * i - e * h;
            a[3] = g * i - d * h;
            return a;
        }
        ;
        p.rotateY = function(a, b, c) {
            c *= 0.5;
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = Math.sin(c)
              , i = Math.cos(c);
            a[0] = d * i - f * h;
            a[1] = e * i + g * h;
            a[2] = f * i + d * h;
            a[3] = g * i - e * h;
            return a;
        }
        ;
        p.rotateZ = function(a, b, c) {
            c *= 0.5;
            var d = b[0]
              , e = b[1]
              , f = b[2]
              , g = b[3]
              , h = Math.sin(c)
              , i = Math.cos(c);
            a[0] = d * i + e * h;
            a[1] = e * i - d * h;
            a[2] = f * i + g * h;
            a[3] = g * i - f * h;
            return a;
        }
        ;
        p.calculateW = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2];
            a[0] = c;
            a[1] = d;
            a[2] = e;
            a[3] = -Math.sqrt(Math.abs(1.0 - c * c - d * d - e * e));
            return a;
        }
        ;
        p.dot = g.dot;
        p.lerp = g.lerp;
        p.slerp = function(a, b, c, d) {
            var e = b[0]
              , f = b[1]
              , g = b[2]
              , h = b[3]
              , i = c[0]
              , j = c[1]
              , k = c[2]
              , l = c[3];
            var m = e * i + f * j + g * k + h * l, n, o, p, q;
            if (Math.abs(m) >= 1.0) {
                if (a !== b) {
                    a[0] = e;
                    a[1] = f;
                    a[2] = g;
                    a[3] = h;
                }
                return a;
            }
            n = Math.acos(m);
            o = Math.sqrt(1.0 - m * m);
            if (Math.abs(o) < 0.001) {
                a[0] = (e * 0.5 + i * 0.5);
                a[1] = (f * 0.5 + j * 0.5);
                a[2] = (g * 0.5 + k * 0.5);
                a[3] = (h * 0.5 + l * 0.5);
                return a;
            }
            p = Math.sin((1 - d) * n) / o;
            q = Math.sin(d * n) / o;
            a[0] = (e * p + i * q);
            a[1] = (f * p + j * q);
            a[2] = (g * p + k * q);
            a[3] = (h * p + l * q);
            return a;
        }
        ;
        p.invert = function(a, b) {
            var c = b[0]
              , d = b[1]
              , e = b[2]
              , f = b[3]
              , g = c * c + d * d + e * e + f * f
              , h = g ? 1.0 / g : 0;
            a[0] = -c * h;
            a[1] = -d * h;
            a[2] = -e * h;
            a[3] = f * h;
            return a;
        }
        ;
        p.conjugate = function(a, b) {
            a[0] = -b[0];
            a[1] = -b[1];
            a[2] = -b[2];
            a[3] = b[3];
            return a;
        }
        ;
        p.length = g.length;
        p.len = p.length;
        p.squaredLength = g.squaredLength;
        p.sqrLen = p.squaredLength;
        p.normalize = g.normalize;
        p.fromMat3 = (function() {
            var a = [1, 2, 0];
            return function(b, c) {
                var d = c[0] + c[4] + c[8];
                var e;
                if (d > 0.0) {
                    e = Math.sqrt(d + 1.0);
                    b[3] = 0.5 * e;
                    e = 0.5 / e;
                    b[0] = (c[7] - c[5]) * e;
                    b[1] = (c[2] - c[6]) * e;
                    b[2] = (c[3] - c[1]) * e;
                } else {
                    var f = 0;
                    if (c[4] > c[0])
                        f = 1;
                    if (c[8] > c[f * 3 + f])
                        f = 2;
                    var g = a[f];
                    var h = a[g];
                    e = Math.sqrt(c[f * 3 + f] - c[g * 3 + g] - c[h * 3 + h] + 1.0);
                    b[f] = 0.5 * e;
                    e = 0.5 / e;
                    b[3] = (c[h * 3 + g] - c[g * 3 + h]) * e;
                    b[g] = (c[g * 3 + f] + c[f * 3 + g]) * e;
                    b[h] = (c[h * 3 + f] + c[f * 3 + h]) * e;
                }
                return b;
            }
            ;
        }
        )();
        p.str = function(a) {
            return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        }
        ;
        if (typeof a !== 'undefined')
            a.quat = p;
        ;
    }
    )(a.exports);
}
)();
var dat = dat || {};
dat.gui = dat.gui || {};
dat.utils = dat.utils || {};
dat.controllers = dat.controllers || {};
dat.dom = dat.dom || {};
dat.color = dat.color || {};
dat.utils.css = function() {
    return {
        load: function(a, b) {
            b = b || document;
            var c = b.createElement("link");
            c.type = "text/css";
            c.rel = "stylesheet";
            c.href = a;
            b.getElementsByTagName("head")[0].appendChild(c);
        },
        inject: function(a, b) {
            b = b || document;
            var c = document.createElement("style");
            c.type = "text/css";
            c.innerHTML = a;
            b.getElementsByTagName("head")[0].appendChild(c);
        }
    };
}();
dat.utils.common = function() {
    var a = Array.prototype.forEach
      , b = Array.prototype.slice;
    return {
        BREAK: {},
        extend: function(a) {
            this.each(b.call(arguments, 1), function(b) {
                for (var c in b)
                    this.isUndefined(b[c]) || (a[c] = b[c]);
            }, this);
            return a;
        },
        defaults: function(a) {
            this.each(b.call(arguments, 1), function(b) {
                for (var c in b)
                    this.isUndefined(a[c]) && (a[c] = b[c]);
            }, this);
            return a;
        },
        compose: function() {
            var a = b.call(arguments);
            return function() {
                for (var c = b.call(arguments), d = a.length - 1; 0 <= d; d--)
                    c = [a[d].apply(this, c)];
                return c[0];
            }
            ;
        },
        each: function(b, c, d) {
            if (b)
                if (a && b.forEach && b.forEach === a)
                    b.forEach(c, d);
                else if (b.length === b.length + 0)
                    for (var e = 0, f = b.length; e < f && !(e in b && c.call(d, b[e], e) === this.BREAK); e++)
                        ;
                else
                    for (e in b)
                        if (c.call(d, b[e], e) === this.BREAK)
                            break;
        },
        defer: function(a) {
            setTimeout(a, 0);
        },
        toArray: function(a) {
            return a.toArray ? a.toArray() : b.call(a);
        },
        isUndefined: function(a) {
            return void 0 === a;
        },
        isNull: function(a) {
            return null === a;
        },
        isNaN: function(a) {
            return a !== a;
        },
        isArray: Array.isArray || function(a) {
            return a.constructor === Array;
        }
        ,
        isObject: function(a) {
            return a === Object(a);
        },
        isNumber: function(a) {
            return a === a + 0;
        },
        isString: function(a) {
            return a === a + "";
        },
        isBoolean: function(a) {
            return !1 === a || !0 === a;
        },
        isFunction: function(a) {
            return "[object Function]" === Object.prototype.toString.call(a);
        }
    };
}();
dat.controllers.Controller = function(a) {
    var b = function(a, b) {
        this.initialValue = a[b];
        this.domElement = document.createElement("div");
        this.object = a;
        this.property = b;
        this.__onFinishChange = this.__onChange = void 0;
    };
    a.extend(b.prototype, {
        onChange: function(a) {
            this.__onChange = a;
            return this;
        },
        onFinishChange: function(a) {
            this.__onFinishChange = a;
            return this;
        },
        setValue: function(a) {
            this.object[this.property] = a;
            this.__onChange && this.__onChange.call(this, a);
            this.updateDisplay();
            return this;
        },
        getValue: function() {
            return this.object[this.property];
        },
        updateDisplay: function() {
            return this;
        },
        isModified: function() {
            return this.initialValue !== this.getValue();
        }
    });
    return b;
}(dat.utils.common);
dat.dom.dom = function(a) {
    function b(b) {
        if ("0" === b || a.isUndefined(b))
            return 0;
        b = b.match(d);
        return a.isNull(b) ? 0 : parseFloat(b[1]);
    }
    var c = {};
    a.each({
        HTMLEvents: ["change"],
        MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
        KeyboardEvents: ["keydown"]
    }, function(b, d) {
        a.each(b, function(a) {
            c[a] = d;
        });
    });
    var d = /(\d+(\.\d+)?)px/
      , e = {
        makeSelectable: function(a, b) {
            void 0 !== a && void 0 !== a.style && (a.onselectstart = b ? function() {
                return !1;
            }
            : function() {}
            ,
            a.style.MozUserSelect = b ? "auto" : "none",
            a.style.KhtmlUserSelect = b ? "auto" : "none",
            a.unselectable = b ? "on" : "off");
        },
        makeFullscreen: function(b, c, d) {
            a.isUndefined(c) && (c = !0);
            a.isUndefined(d) && (d = !0);
            b.style.position = "absolute";
            c && (b.style.left = 0,
            b.style.right = 0);
            d && (b.style.top = 0,
            b.style.bottom = 0);
        },
        fakeEvent: function(b, d, e, f) {
            e = e || {};
            var g = c[d];
            if (!g)
                throw Error("Event type " + d + " not supported.");
            var h = document.createEvent(g);
            switch (g) {
            case "MouseEvents":
                h.initMouseEvent(d, e.bubbles || !1, e.cancelable || !0, window, e.clickCount || 1, 0, 0, e.x || e.clientX || 0, e.y || e.clientY || 0, !1, !1, !1, !1, 0, null);
                break;
            case "KeyboardEvents":
                g = h.initKeyboardEvent || h.initKeyEvent;
                a.defaults(e, {
                    cancelable: !0,
                    ctrlKey: !1,
                    altKey: !1,
                    shiftKey: !1,
                    metaKey: !1,
                    keyCode: void 0,
                    charCode: void 0
                });
                g(d, e.bubbles || !1, e.cancelable, window, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.keyCode, e.charCode);
                break;
            default:
                h.initEvent(d, e.bubbles || !1, e.cancelable || !0);
            }
            a.defaults(h, f);
            b.dispatchEvent(h);
        },
        bind: function(a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c);
            return e;
        },
        unbind: function(a, b, c, d) {
            a.removeEventListener ? a.removeEventListener(b, c, d || !1) : a.detachEvent && a.detachEvent("on" + b, c);
            return e;
        },
        addClass: function(a, b) {
            if (void 0 === a.className)
                a.className = b;
            else if (a.className !== b) {
                var c = a.className.split(/ +/);
                -1 == c.indexOf(b) && (c.push(b),
                a.className = c.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""));
            }
            return e;
        },
        removeClass: function(a, b) {
            if (b) {
                if (void 0 !== a.className)
                    if (a.className === b)
                        a.removeAttribute("class");
                    else {
                        var c = a.className.split(/ +/)
                          , d = c.indexOf(b);
                        -1 != d && (c.splice(d, 1),
                        a.className = c.join(" "));
                    }
            } else
                a.className = void 0;
            return e;
        },
        hasClass: function(a, b) {
            return new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)").test(a.className) || !1;
        },
        getWidth: function(a) {
            a = getComputedStyle(a);
            return b(a["border-left-width"]) + b(a["border-right-width"]) + b(a["padding-left"]) + b(a["padding-right"]) + b(a.width);
        },
        getHeight: function(a) {
            a = getComputedStyle(a);
            return b(a["border-top-width"]) + b(a["border-bottom-width"]) + b(a["padding-top"]) + b(a["padding-bottom"]) + b(a.height);
        },
        getOffset: function(a) {
            var b = {
                left: 0,
                top: 0
            };
            if (a.offsetParent)
                do
                    b.left += a.offsetLeft,
                    b.top += a.offsetTop;
                while (a = a.offsetParent);return b;
        },
        isActive: function(a) {
            return a === document.activeElement && (a.type || a.href);
        }
    };
    return e;
}(dat.utils.common);
dat.controllers.OptionController = function(a, b, c) {
    var d = function(a, e, f) {
        d.superclass.call(this, a, e);
        var g = this;
        this.__select = document.createElement("select");
        if (c.isArray(f)) {
            var h = {};
            c.each(f, function(a) {
                h[a] = a;
            });
            f = h;
        }
        c.each(f, function(a, b) {
            var c = document.createElement("option");
            c.innerHTML = b;
            c.setAttribute("value", a);
            g.__select.appendChild(c);
        });
        this.updateDisplay();
        b.bind(this.__select, "change", function() {
            g.setValue(this.options[this.selectedIndex].value);
        });
        this.domElement.appendChild(this.__select);
    };
    d.superclass = a;
    c.extend(d.prototype, a.prototype, {
        setValue: function(a) {
            a = d.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            return a;
        },
        updateDisplay: function() {
            this.__select.value = this.getValue();
            return d.superclass.prototype.updateDisplay.call(this);
        }
    });
    return d;
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.controllers.NumberController = function(a, b) {
    function c(a) {
        a = a.toString();
        return -1 < a.indexOf(".") ? a.length - a.indexOf(".") - 1 : 0;
    }
    var d = function(a, e, f) {
        d.superclass.call(this, a, e);
        f = f || {};
        this.__min = f.min;
        this.__max = f.max;
        this.__step = f.step;
        b.isUndefined(this.__step) ? this.__impliedStep = 0 == this.initialValue ? 1 : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__impliedStep = this.__step;
        this.__precision = c(this.__impliedStep);
    };
    d.superclass = a;
    b.extend(d.prototype, a.prototype, {
        setValue: function(a) {
            void 0 !== this.__min && a < this.__min ? a = this.__min : void 0 !== this.__max && a > this.__max && (a = this.__max);
            void 0 !== this.__step && 0 != a % this.__step && (a = Math.round(a / this.__step) * this.__step);
            return d.superclass.prototype.setValue.call(this, a);
        },
        min: function(a) {
            this.__min = a;
            return this;
        },
        max: function(a) {
            this.__max = a;
            return this;
        },
        step: function(a) {
            this.__impliedStep = this.__step = a;
            this.__precision = c(a);
            return this;
        }
    });
    return d;
}(dat.controllers.Controller, dat.utils.common);
dat.controllers.NumberControllerBox = function(a, b, c) {
    var d = function(a, e, f) {
        function g() {
            var a = parseFloat(j.__input.value);
            c.isNaN(a) || j.setValue(a);
        }
        function h(a) {
            var b = k - a.clientY;
            j.setValue(j.getValue() + b * j.__impliedStep);
            k = a.clientY;
        }
        function i() {
            b.unbind(window, "mousemove", h);
            b.unbind(window, "mouseup", i);
        }
        this.__truncationSuspended = !1;
        d.superclass.call(this, a, e, f);
        var j = this, k;
        this.__input = document.createElement("input");
        this.__input.setAttribute("type", "text");
        b.bind(this.__input, "change", g);
        b.bind(this.__input, "blur", function() {
            g();
            j.__onFinishChange && j.__onFinishChange.call(j, j.getValue());
        });
        b.bind(this.__input, "mousedown", function(a) {
            b.bind(window, "mousemove", h);
            b.bind(window, "mouseup", i);
            k = a.clientY;
        });
        b.bind(this.__input, "keydown", function(a) {
            13 === a.keyCode && (j.__truncationSuspended = !0,
            this.blur(),
            j.__truncationSuspended = !1);
        });
        this.updateDisplay();
        this.domElement.appendChild(this.__input);
    };
    d.superclass = a;
    c.extend(d.prototype, a.prototype, {
        updateDisplay: function() {
            var a = this.__input, b;
            if (this.__truncationSuspended)
                b = this.getValue();
            else {
                b = this.getValue();
                var c = Math.pow(10, this.__precision);
                b = Math.round(b * c) / c;
            }
            a.value = b;
            return d.superclass.prototype.updateDisplay.call(this);
        }
    });
    return d;
}(dat.controllers.NumberController, dat.dom.dom, dat.utils.common);
dat.controllers.NumberControllerSlider = function(a, b, c, d, e) {
    function f(a, b, c, d, e) {
        return d + (a - b) / (c - b) * (e - d);
    }
    var g = function(a, c, d, e, h) {
        function i(a) {
            a.preventDefault();
            var c = b.getOffset(k.__background)
              , d = b.getWidth(k.__background);
            k.setValue(f(a.clientX, c.left, c.left + d, k.__min, k.__max));
            return !1;
        }
        function j() {
            b.unbind(window, "mousemove", i);
            b.unbind(window, "mouseup", j);
            k.__onFinishChange && k.__onFinishChange.call(k, k.getValue());
        }
        g.superclass.call(this, a, c, {
            min: d,
            max: e,
            step: h
        });
        var k = this;
        this.__background = document.createElement("div");
        this.__foreground = document.createElement("div");
        b.bind(this.__background, "mousedown", function(a) {
            b.bind(window, "mousemove", i);
            b.bind(window, "mouseup", j);
            i(a);
        });
        b.addClass(this.__background, "slider");
        b.addClass(this.__foreground, "slider-fg");
        this.updateDisplay();
        this.__background.appendChild(this.__foreground);
        this.domElement.appendChild(this.__background);
    };
    g.superclass = a;
    g.useDefaultStyles = function() {
        c.inject(e);
    }
    ;
    d.extend(g.prototype, a.prototype, {
        updateDisplay: function() {
            var a = (this.getValue() - this.__min) / (this.__max - this.__min);
            this.__foreground.style.width = 100 * a + "%";
            return g.superclass.prototype.updateDisplay.call(this);
        }
    });
    return g;
}(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, "/**\n * dat-gui JavaScript Controller Library\n * http://code.google.com/p/dat-gui\n *\n * Copyright 2011 Data Arts Team, Google Creative Lab\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n */\n\n.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
dat.controllers.FunctionController = function(a, b, c) {
    var d = function(a, c, e) {
        d.superclass.call(this, a, c);
        var f = this;
        this.__button = document.createElement("div");
        this.__button.innerHTML = void 0 === e ? "Fire" : e;
        b.bind(this.__button, "click", function(a) {
            a.preventDefault();
            f.fire();
            return !1;
        });
        b.addClass(this.__button, "button");
        this.domElement.appendChild(this.__button);
    };
    d.superclass = a;
    c.extend(d.prototype, a.prototype, {
        fire: function() {
            this.__onChange && this.__onChange.call(this);
            this.getValue().call(this.object);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
        }
    });
    return d;
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.controllers.BooleanController = function(a, b, c) {
    var d = function(a, c) {
        d.superclass.call(this, a, c);
        var e = this;
        this.__prev = this.getValue();
        this.__checkbox = document.createElement("input");
        this.__checkbox.setAttribute("type", "checkbox");
        b.bind(this.__checkbox, "change", function() {
            e.setValue(!e.__prev);
        }, !1);
        this.domElement.appendChild(this.__checkbox);
        this.updateDisplay();
    };
    d.superclass = a;
    c.extend(d.prototype, a.prototype, {
        setValue: function(a) {
            a = d.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            this.__prev = this.getValue();
            return a;
        },
        updateDisplay: function() {
            !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"),
            this.__checkbox.checked = !0) : this.__checkbox.checked = !1;
            return d.superclass.prototype.updateDisplay.call(this);
        }
    });
    return d;
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.color.toString = function(a) {
    return function(b) {
        if (1 == b.a || a.isUndefined(b.a)) {
            for (b = b.hex.toString(16); 6 > b.length; )
                b = "0" + b;
            return "#" + b;
        }
        return "rgba(" + Math.round(b.r) + "," + Math.round(b.g) + "," + Math.round(b.b) + "," + b.a + ")";
    }
    ;
}(dat.utils.common);
dat.color.interpret = function(a, b) {
    var c, d, e = [{
        litmus: b.isString,
        conversions: {
            THREE_CHAR_HEX: {
                read: function(a) {
                    a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                    return null === a ? !1 : {
                        space: "HEX",
                        hex: parseInt("0x" + a[1].toString() + a[1].toString() + a[2].toString() + a[2].toString() + a[3].toString() + a[3].toString())
                    };
                },
                write: a
            },
            SIX_CHAR_HEX: {
                read: function(a) {
                    a = a.match(/^#([A-F0-9]{6})$/i);
                    return null === a ? !1 : {
                        space: "HEX",
                        hex: parseInt("0x" + a[1].toString())
                    };
                },
                write: a
            },
            CSS_RGB: {
                read: function(a) {
                    a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                    return null === a ? !1 : {
                        space: "RGB",
                        r: parseFloat(a[1]),
                        g: parseFloat(a[2]),
                        b: parseFloat(a[3])
                    };
                },
                write: a
            },
            CSS_RGBA: {
                read: function(a) {
                    a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                    return null === a ? !1 : {
                        space: "RGB",
                        r: parseFloat(a[1]),
                        g: parseFloat(a[2]),
                        b: parseFloat(a[3]),
                        a: parseFloat(a[4])
                    };
                },
                write: a
            }
        }
    }, {
        litmus: b.isNumber,
        conversions: {
            HEX: {
                read: function(a) {
                    return {
                        space: "HEX",
                        hex: a,
                        conversionName: "HEX"
                    };
                },
                write: function(a) {
                    return a.hex;
                }
            }
        }
    }, {
        litmus: b.isArray,
        conversions: {
            RGB_ARRAY: {
                read: function(a) {
                    return 3 != a.length ? !1 : {
                        space: "RGB",
                        r: a[0],
                        g: a[1],
                        b: a[2]
                    };
                },
                write: function(a) {
                    return [a.r, a.g, a.b];
                }
            },
            RGBA_ARRAY: {
                read: function(a) {
                    return 4 != a.length ? !1 : {
                        space: "RGB",
                        r: a[0],
                        g: a[1],
                        b: a[2],
                        a: a[3]
                    };
                },
                write: function(a) {
                    return [a.r, a.g, a.b, a.a];
                }
            }
        }
    }, {
        litmus: b.isObject,
        conversions: {
            RGBA_OBJ: {
                read: function(a) {
                    return b.isNumber(a.r) && b.isNumber(a.g) && b.isNumber(a.b) && b.isNumber(a.a) ? {
                        space: "RGB",
                        r: a.r,
                        g: a.g,
                        b: a.b,
                        a: a.a
                    } : !1;
                },
                write: function(a) {
                    return {
                        r: a.r,
                        g: a.g,
                        b: a.b,
                        a: a.a
                    };
                }
            },
            RGB_OBJ: {
                read: function(a) {
                    return b.isNumber(a.r) && b.isNumber(a.g) && b.isNumber(a.b) ? {
                        space: "RGB",
                        r: a.r,
                        g: a.g,
                        b: a.b
                    } : !1;
                },
                write: function(a) {
                    return {
                        r: a.r,
                        g: a.g,
                        b: a.b
                    };
                }
            },
            HSVA_OBJ: {
                read: function(a) {
                    return b.isNumber(a.h) && b.isNumber(a.s) && b.isNumber(a.v) && b.isNumber(a.a) ? {
                        space: "HSV",
                        h: a.h,
                        s: a.s,
                        v: a.v,
                        a: a.a
                    } : !1;
                },
                write: function(a) {
                    return {
                        h: a.h,
                        s: a.s,
                        v: a.v,
                        a: a.a
                    };
                }
            },
            HSV_OBJ: {
                read: function(a) {
                    return b.isNumber(a.h) && b.isNumber(a.s) && b.isNumber(a.v) ? {
                        space: "HSV",
                        h: a.h,
                        s: a.s,
                        v: a.v
                    } : !1;
                },
                write: function(a) {
                    return {
                        h: a.h,
                        s: a.s,
                        v: a.v
                    };
                }
            }
        }
    }];
    return function() {
        d = !1;
        var a = 1 < arguments.length ? b.toArray(arguments) : arguments[0];
        b.each(e, function(e) {
            if (e.litmus(a))
                return b.each(e.conversions, function(e, f) {
                    c = e.read(a);
                    if (!1 === d && !1 !== c)
                        return d = c,
                        c.conversionName = f,
                        c.conversion = e,
                        b.BREAK;
                }),
                b.BREAK;
        });
        return d;
    }
    ;
}(dat.color.toString, dat.utils.common);
dat.GUI = dat.gui.GUI = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    function p(a, b, c, f) {
        if (void 0 === b[c])
            throw Error("Object " + b + ' has no property "' + c + '"');
        f.color ? b = new k(b,c) : (b = [b, c].concat(f.factoryArgs),
        b = d.apply(a, b));
        f.before instanceof e && (f.before = f.before.__li);
        s(a, b);
        n.addClass(b.domElement, "c");
        c = document.createElement("span");
        n.addClass(c, "property-name");
        c.innerHTML = b.property;
        var g = document.createElement("div");
        g.appendChild(c);
        g.appendChild(b.domElement);
        f = q(a, g, f.before);
        n.addClass(f, H.CLASS_CONTROLLER_ROW);
        n.addClass(f, typeof b.getValue());
        r(a, f, b);
        a.__controllers.push(b);
        return b;
    }
    function q(a, b, c) {
        var d = document.createElement("li");
        b && d.appendChild(b);
        c ? a.__ul.insertBefore(d, params.before) : a.__ul.appendChild(d);
        a.onResize();
        return d;
    }
    function r(a, b, c) {
        c.__li = b;
        c.__gui = a;
        o.extend(c, {
            options: function(b) {
                if (1 < arguments.length)
                    return c.remove(),
                    p(a, c.object, c.property, {
                        before: c.__li.nextElementSibling,
                        factoryArgs: [o.toArray(arguments)]
                    });
                if (o.isArray(b) || o.isObject(b))
                    return c.remove(),
                    p(a, c.object, c.property, {
                        before: c.__li.nextElementSibling,
                        factoryArgs: [b]
                    });
            },
            name: function(a) {
                c.__li.firstElementChild.firstElementChild.innerHTML = a;
                return c;
            },
            listen: function() {
                c.__gui.listen(c);
                return c;
            },
            remove: function() {
                c.__gui.remove(c);
                return c;
            }
        });
        if (c instanceof i) {
            var d = new h(c.object,c.property,{
                min: c.__min,
                max: c.__max,
                step: c.__step
            });
            o.each(["updateDisplay", "onChange", "onFinishChange"], function(a) {
                var b = c[a]
                  , e = d[a];
                c[a] = d[a] = function() {
                    var a = Array.prototype.slice.call(arguments);
                    b.apply(c, a);
                    return e.apply(d, a);
                }
                ;
            });
            n.addClass(b, "has-slider");
            c.domElement.insertBefore(d.domElement, c.domElement.firstElementChild);
        } else if (c instanceof h) {
            var e = function(b) {
                return o.isNumber(c.__min) && o.isNumber(c.__max) ? (c.remove(),
                p(a, c.object, c.property, {
                    before: c.__li.nextElementSibling,
                    factoryArgs: [c.__min, c.__max, c.__step]
                })) : b;
            };
            c.min = o.compose(e, c.min);
            c.max = o.compose(e, c.max);
        } else
            c instanceof f ? (n.bind(b, "click", function() {
                n.fakeEvent(c.__checkbox, "click");
            }),
            n.bind(c.__checkbox, "click", function(a) {
                a.stopPropagation();
            })) : c instanceof g ? (n.bind(b, "click", function() {
                n.fakeEvent(c.__button, "click");
            }),
            n.bind(b, "mouseover", function() {
                n.addClass(c.__button, "hover");
            }),
            n.bind(b, "mouseout", function() {
                n.removeClass(c.__button, "hover");
            })) : c instanceof k && (n.addClass(b, "color"),
            c.updateDisplay = o.compose(function(a) {
                b.style.borderLeftColor = c.__color.toString();
                return a;
            }, c.updateDisplay),
            c.updateDisplay());
        c.setValue = o.compose(function(b) {
            a.getRoot().__preset_select && c.isModified() && y(a.getRoot(), !0);
            return b;
        }, c.setValue);
    }
    function s(a, b) {
        var c = a.getRoot()
          , d = c.__rememberedObjects.indexOf(b.object);
        if (-1 != d) {
            var e = c.__rememberedObjectIndecesToControllers[d];
            void 0 === e && (e = {},
            c.__rememberedObjectIndecesToControllers[d] = e);
            e[b.property] = b;
            if (c.load && c.load.remembered) {
                c = c.load.remembered;
                if (c[a.preset])
                    c = c[a.preset];
                else if (c.Default)
                    c = c.Default;
                else
                    return;
                c[d] && void 0 !== c[d][b.property] && (d = c[d][b.property],
                b.initialValue = d,
                b.setValue(d));
            }
        }
    }
    function t(a) {
        var b = a.__save_row = document.createElement("li");
        n.addClass(a.domElement, "has-save");
        a.__ul.insertBefore(b, a.__ul.firstChild);
        n.addClass(b, "save-row");
        var c = document.createElement("span");
        c.innerHTML = "&nbsp;";
        n.addClass(c, "button gears");
        var d = document.createElement("span");
        d.innerHTML = "Save";
        n.addClass(d, "button");
        n.addClass(d, "save");
        var e = document.createElement("span");
        e.innerHTML = "New";
        n.addClass(e, "button");
        n.addClass(e, "save-as");
        var f = document.createElement("span");
        f.innerHTML = "Revert";
        n.addClass(f, "button");
        n.addClass(f, "revert");
        var g = a.__preset_select = document.createElement("select");
        a.load && a.load.remembered ? o.each(a.load.remembered, function(b, c) {
            x(a, c, c == a.preset);
        }) : x(a, "Default", !1);
        n.bind(g, "change", function() {
            for (var b = 0; b < a.__preset_select.length; b++)
                a.__preset_select[b].innerHTML = a.__preset_select[b].value;
            a.preset = this.value;
        });
        b.appendChild(g);
        b.appendChild(c);
        b.appendChild(d);
        b.appendChild(e);
        b.appendChild(f);
        if (A) {
            var h = function() {
                i.style.display = a.useLocalStorage ? "block" : "none";
            }
              , b = document.getElementById("dg-save-locally")
              , i = document.getElementById("dg-local-explain");
            b.style.display = "block";
            b = document.getElementById("dg-local-storage");
            "true" === localStorage.getItem(document.location.href + ".isLocal") && b.setAttribute("checked", "checked");
            h();
            n.bind(b, "change", function() {
                a.useLocalStorage = !a.useLocalStorage;
                h();
            });
        }
        var j = document.getElementById("dg-new-constructor");
        n.bind(j, "keydown", function(a) {
            !a.metaKey || 67 !== a.which && 67 != a.keyCode || C.hide();
        });
        n.bind(c, "click", function() {
            j.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2);
            C.show();
            j.focus();
            j.select();
        });
        n.bind(d, "click", function() {
            a.save();
        });
        n.bind(e, "click", function() {
            var b = prompt("Enter a new preset name.");
            b && a.saveAs(b);
        });
        n.bind(f, "click", function() {
            a.revert();
        });
    }
    function u(a) {
        function b(b) {
            b.preventDefault();
            e = b.clientX;
            n.addClass(a.__closeButton, H.CLASS_DRAG);
            n.bind(window, "mousemove", c);
            n.bind(window, "mouseup", d);
            return !1;
        }
        function c(b) {
            b.preventDefault();
            a.width += e - b.clientX;
            a.onResize();
            e = b.clientX;
            return !1;
        }
        function d() {
            n.removeClass(a.__closeButton, H.CLASS_DRAG);
            n.unbind(window, "mousemove", c);
            n.unbind(window, "mouseup", d);
        }
        a.__resize_handle = document.createElement("div");
        o.extend(a.__resize_handle.style, {
            width: "6px",
            marginLeft: "-3px",
            height: "200px",
            cursor: "ew-resize",
            position: "absolute"
        });
        var e;
        n.bind(a.__resize_handle, "mousedown", b);
        n.bind(a.__closeButton, "mousedown", b);
        a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild);
    }
    function v(a, b) {
        a.domElement.style.width = b + "px";
        a.__save_row && a.autoPlace && (a.__save_row.style.width = b + "px");
        a.__closeButton && (a.__closeButton.style.width = b + "px");
    }
    function w(a, b) {
        var c = {};
        o.each(a.__rememberedObjects, function(d, e) {
            var f = {};
            o.each(a.__rememberedObjectIndecesToControllers[e], function(a, c) {
                f[c] = b ? a.initialValue : a.getValue();
            });
            c[e] = f;
        });
        return c;
    }
    function x(a, b, c) {
        var d = document.createElement("option");
        d.innerHTML = b;
        d.value = b;
        a.__preset_select.appendChild(d);
        c && (a.__preset_select.selectedIndex = a.__preset_select.length - 1);
    }
    function y(a, b) {
        var c = a.__preset_select[a.__preset_select.selectedIndex];
        c.innerHTML = b ? c.value + "*" : c.value;
    }
    function z(a) {
        0 != a.length && l(function() {
            z(a);
        });
        o.each(a, function(a) {
            a.updateDisplay();
        });
    }
    a.inject(c);
    var A;
    try {
        A = "localStorage"in window && null !== window.localStorage;
    } catch (B) {
        A = !1;
    }
    var C, D = !0, E, F = !1, G = [], H = function(a) {
        function b() {
            var a = c.getRoot();
            a.width += 1;
            o.defer(function() {
                --a.width;
            });
        }
        var c = this;
        this.domElement = document.createElement("div");
        this.__ul = document.createElement("ul");
        this.domElement.appendChild(this.__ul);
        n.addClass(this.domElement, "dg");
        this.__folders = {};
        this.__controllers = [];
        this.__rememberedObjects = [];
        this.__rememberedObjectIndecesToControllers = [];
        this.__listening = [];
        a = a || {};
        a = o.defaults(a, {
            autoPlace: !0,
            width: H.DEFAULT_WIDTH
        });
        a = o.defaults(a, {
            resizable: a.autoPlace,
            hideable: a.autoPlace
        });
        o.isUndefined(a.load) ? a.load = {
            preset: "Default"
        } : a.preset && (a.load.preset = a.preset);
        o.isUndefined(a.parent) && a.hideable && G.push(this);
        a.resizable = o.isUndefined(a.parent) && a.resizable;
        a.autoPlace && o.isUndefined(a.scrollable) && (a.scrollable = !0);
        var d = A && "true" === localStorage.getItem(document.location.href + ".isLocal"), e;
        Object.defineProperties(this, {
            parent: {
                get: function() {
                    return a.parent;
                }
            },
            scrollable: {
                get: function() {
                    return a.scrollable;
                }
            },
            autoPlace: {
                get: function() {
                    return a.autoPlace;
                }
            },
            preset: {
                get: function() {
                    return c.parent ? c.getRoot().preset : a.load.preset;
                },
                set: function(b) {
                    c.parent ? c.getRoot().preset = b : a.load.preset = b;
                    for (b = 0; b < this.__preset_select.length; b++)
                        this.__preset_select[b].value == this.preset && (this.__preset_select.selectedIndex = b);
                    c.revert();
                }
            },
            width: {
                get: function() {
                    return a.width;
                },
                set: function(b) {
                    a.width = b;
                    v(c, b);
                }
            },
            name: {
                get: function() {
                    return a.name;
                },
                set: function(b) {
                    a.name = b;
                    g && (g.innerHTML = a.name);
                }
            },
            closed: {
                get: function() {
                    return a.closed;
                },
                set: function(b) {
                    a.closed = b;
                    a.closed ? n.addClass(c.__ul, H.CLASS_CLOSED) : n.removeClass(c.__ul, H.CLASS_CLOSED);
                    this.onResize();
                    c.__closeButton && (c.__closeButton.innerHTML = b ? H.TEXT_OPEN : H.TEXT_CLOSED);
                }
            },
            load: {
                get: function() {
                    return a.load;
                }
            },
            useLocalStorage: {
                get: function() {
                    return d;
                },
                set: function(a) {
                    A && ((d = a) ? n.bind(window, "unload", e) : n.unbind(window, "unload", e),
                    localStorage.setItem(document.location.href + ".isLocal", a));
                }
            }
        });
        if (o.isUndefined(a.parent)) {
            a.closed = !1;
            n.addClass(this.domElement, H.CLASS_MAIN);
            n.makeSelectable(this.domElement, !1);
            if (A && d) {
                c.useLocalStorage = !0;
                var f = localStorage.getItem(document.location.href + ".gui");
                f && (a.load = JSON.parse(f));
            }
            this.__closeButton = document.createElement("div");
            this.__closeButton.innerHTML = H.TEXT_CLOSED;
            n.addClass(this.__closeButton, H.CLASS_CLOSE_BUTTON);
            this.domElement.appendChild(this.__closeButton);
            n.bind(this.__closeButton, "click", function() {
                c.closed = !c.closed;
            });
        } else {
            void 0 === a.closed && (a.closed = !0);
            var g = document.createTextNode(a.name);
            n.addClass(g, "controller-name");
            f = q(c, g);
            n.addClass(this.__ul, H.CLASS_CLOSED);
            n.addClass(f, "title");
            n.bind(f, "click", function(a) {
                a.preventDefault();
                c.closed = !c.closed;
                return !1;
            });
            a.closed || (this.closed = !1);
        }
        a.autoPlace && (o.isUndefined(a.parent) && (D && (E = document.createElement("div"),
        n.addClass(E, "dg"),
        n.addClass(E, H.CLASS_AUTO_PLACE_CONTAINER),
        document.body.appendChild(E),
        D = !1),
        E.appendChild(this.domElement),
        n.addClass(this.domElement, H.CLASS_AUTO_PLACE)),
        this.parent || v(c, a.width));
        n.bind(window, "resize", function() {
            c.onResize();
        });
        n.bind(this.__ul, "webkitTransitionEnd", function() {
            c.onResize();
        });
        n.bind(this.__ul, "transitionend", function() {
            c.onResize();
        });
        n.bind(this.__ul, "oTransitionEnd", function() {
            c.onResize();
        });
        this.onResize();
        a.resizable && u(this);
        this.saveToLocalStorageIfPossible = e = function() {
            A && "true" === localStorage.getItem(document.location.href + ".isLocal") && localStorage.setItem(document.location.href + ".gui", JSON.stringify(c.getSaveObject()));
        }
        ;
        c.getRoot();
        a.parent || b();
    };
    H.toggleHide = function() {
        F = !F;
        o.each(G, function(a) {
            a.domElement.style.zIndex = F ? -999 : 999;
            a.domElement.style.opacity = F ? 0 : 1;
        });
    }
    ;
    H.CLASS_AUTO_PLACE = "a";
    H.CLASS_AUTO_PLACE_CONTAINER = "ac";
    H.CLASS_MAIN = "main";
    H.CLASS_CONTROLLER_ROW = "cr";
    H.CLASS_TOO_TALL = "taller-than-window";
    H.CLASS_CLOSED = "closed";
    H.CLASS_CLOSE_BUTTON = "close-button";
    H.CLASS_DRAG = "drag";
    H.DEFAULT_WIDTH = 245;
    H.TEXT_CLOSED = "Close Controls";
    H.TEXT_OPEN = "Open Controls";
    n.bind(window, "keydown", function(a) {
        "text" === document.activeElement.type || 72 !== a.which && 72 != a.keyCode || H.toggleHide();
    }, !1);
    o.extend(H.prototype, {
        add: function(a, b) {
            return p(this, a, b, {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
            });
        },
        addColor: function(a, b) {
            return p(this, a, b, {
                color: !0
            });
        },
        remove: function(a) {
            this.__ul.removeChild(a.__li);
            this.__controllers.splice(this.__controllers.indexOf(a), 1);
            var b = this;
            o.defer(function() {
                b.onResize();
            });
        },
        destroy: function() {
            this.autoPlace && E.removeChild(this.domElement);
        },
        addFolder: function(a) {
            if (void 0 !== this.__folders[a])
                throw Error('You already have a folder in this GUI by the name "' + a + '"');
            var b = {
                name: a,
                parent: this
            };
            b.autoPlace = this.autoPlace;
            this.load && this.load.folders && this.load.folders[a] && (b.closed = this.load.folders[a].closed,
            b.load = this.load.folders[a]);
            b = new H(b);
            this.__folders[a] = b;
            a = q(this, b.domElement);
            n.addClass(a, "folder");
            return b;
        },
        open: function() {
            this.closed = !1;
        },
        close: function() {
            this.closed = !0;
        },
        onResize: function() {
            var a = this.getRoot();
            if (a.scrollable) {
                var b = n.getOffset(a.__ul).top
                  , c = 0;
                o.each(a.__ul.childNodes, function(b) {
                    a.autoPlace && b === a.__save_row || (c += n.getHeight(b));
                });
                window.innerHeight - b - 20 < c ? (n.addClass(a.domElement, H.CLASS_TOO_TALL),
                a.__ul.style.height = window.innerHeight - b - 20 + "px") : (n.removeClass(a.domElement, H.CLASS_TOO_TALL),
                a.__ul.style.height = "auto");
            }
            a.__resize_handle && o.defer(function() {
                a.__resize_handle.style.height = a.__ul.offsetHeight + "px";
            });
            a.__closeButton && (a.__closeButton.style.width = a.width + "px");
        },
        remember: function() {
            o.isUndefined(C) && (C = new m(),
            C.domElement.innerHTML = b);
            if (this.parent)
                throw Error("You can only call remember on a top level GUI.");
            var a = this;
            o.each(Array.prototype.slice.call(arguments), function(b) {
                0 == a.__rememberedObjects.length && t(a);
                -1 == a.__rememberedObjects.indexOf(b) && a.__rememberedObjects.push(b);
            });
            this.autoPlace && v(this, this.width);
        },
        getRoot: function() {
            for (var a = this; a.parent; )
                a = a.parent;
            return a;
        },
        getSaveObject: function() {
            var a = this.load;
            a.closed = this.closed;
            0 < this.__rememberedObjects.length && (a.preset = this.preset,
            a.remembered || (a.remembered = {}),
            a.remembered[this.preset] = w(this));
            a.folders = {};
            o.each(this.__folders, function(b, c) {
                a.folders[c] = b.getSaveObject();
            });
            return a;
        },
        save: function() {
            this.load.remembered || (this.load.remembered = {});
            this.load.remembered[this.preset] = w(this);
            y(this, !1);
            this.saveToLocalStorageIfPossible();
        },
        saveAs: function(a) {
            this.load.remembered || (this.load.remembered = {},
            this.load.remembered.Default = w(this, !0));
            this.load.remembered[a] = w(this);
            this.preset = a;
            x(this, a, !0);
            this.saveToLocalStorageIfPossible();
        },
        revert: function(a) {
            o.each(this.__controllers, function(b) {
                this.getRoot().load.remembered ? s(a || this.getRoot(), b) : b.setValue(b.initialValue);
            }, this);
            o.each(this.__folders, function(a) {
                a.revert(a);
            });
            a || y(this.getRoot(), !1);
        },
        listen: function(a) {
            var b = 0 == this.__listening.length;
            this.__listening.push(a);
            b && z(this.__listening);
        }
    });
    return H;
}(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', ".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n", dat.controllers.factory = function(a, b, c, d, e, f, g) {
    return function(h, i, j, k) {
        var l = h[i];
        if (g.isArray(j) || g.isObject(j))
            return new a(h,i,j);
        if (g.isNumber(l))
            return g.isNumber(j) && g.isNumber(k) ? new c(h,i,j,k) : new b(h,i,{
                min: j,
                max: k
            });
        if (g.isString(l))
            return new d(h,i);
        if (g.isFunction(l))
            return new e(h,i,"");
        if (g.isBoolean(l))
            return new f(h,i);
    }
    ;
}(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = function(a, b, c) {
    var d = function(a, c) {
        function e() {
            f.setValue(f.__input.value);
        }
        d.superclass.call(this, a, c);
        var f = this;
        this.__input = document.createElement("input");
        this.__input.setAttribute("type", "text");
        b.bind(this.__input, "keyup", e);
        b.bind(this.__input, "change", e);
        b.bind(this.__input, "blur", function() {
            f.__onFinishChange && f.__onFinishChange.call(f, f.getValue());
        });
        b.bind(this.__input, "keydown", function(a) {
            13 === a.keyCode && this.blur();
        });
        this.updateDisplay();
        this.domElement.appendChild(this.__input);
    };
    d.superclass = a;
    c.extend(d.prototype, a.prototype, {
        updateDisplay: function() {
            b.isActive(this.__input) || (this.__input.value = this.getValue());
            return d.superclass.prototype.updateDisplay.call(this);
        }
    });
    return d;
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController, dat.controllers.ColorController = function(a, b, c, d, e) {
    function f(a, b, c, d) {
        a.style.background = "";
        e.each(i, function(e) {
            a.style.cssText += "background: " + e + "linear-gradient(" + b + ", " + c + " 0%, " + d + " 100%); ";
        });
    }
    function g(a) {
        a.style.background = "";
        a.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";
        a.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
        a.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
        a.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
        a.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
    }
    var h = function(a, i) {
        function j(a) {
            n(a);
            b.bind(window, "mousemove", n);
            b.bind(window, "mouseup", k);
        }
        function k() {
            b.unbind(window, "mousemove", n);
            b.unbind(window, "mouseup", k);
        }
        function l() {
            var a = d(this.value);
            !1 !== a ? (p.__color.__state = a,
            p.setValue(p.__color.toOriginal())) : this.value = p.__color.toString();
        }
        function m() {
            b.unbind(window, "mousemove", o);
            b.unbind(window, "mouseup", m);
        }
        function n(a) {
            a.preventDefault();
            var c = b.getWidth(p.__saturation_field)
              , d = b.getOffset(p.__saturation_field)
              , e = (a.clientX - d.left + document.body.scrollLeft) / c;
            a = 1 - (a.clientY - d.top + document.body.scrollTop) / c;
            1 < a ? a = 1 : 0 > a && (a = 0);
            1 < e ? e = 1 : 0 > e && (e = 0);
            p.__color.v = a;
            p.__color.s = e;
            p.setValue(p.__color.toOriginal());
            return !1;
        }
        function o(a) {
            a.preventDefault();
            var c = b.getHeight(p.__hue_field)
              , d = b.getOffset(p.__hue_field);
            a = 1 - (a.clientY - d.top + document.body.scrollTop) / c;
            1 < a ? a = 1 : 0 > a && (a = 0);
            p.__color.h = 360 * a;
            p.setValue(p.__color.toOriginal());
            return !1;
        }
        h.superclass.call(this, a, i);
        this.__color = new c(this.getValue());
        this.__temp = new c(0);
        var p = this;
        this.domElement = document.createElement("div");
        b.makeSelectable(this.domElement, !1);
        this.__selector = document.createElement("div");
        this.__selector.className = "selector";
        this.__saturation_field = document.createElement("div");
        this.__saturation_field.className = "saturation-field";
        this.__field_knob = document.createElement("div");
        this.__field_knob.className = "field-knob";
        this.__field_knob_border = "2px solid ";
        this.__hue_knob = document.createElement("div");
        this.__hue_knob.className = "hue-knob";
        this.__hue_field = document.createElement("div");
        this.__hue_field.className = "hue-field";
        this.__input = document.createElement("input");
        this.__input.type = "text";
        this.__input_textShadow = "0 1px 1px ";
        b.bind(this.__input, "keydown", function(a) {
            13 === a.keyCode && l.call(this);
        });
        b.bind(this.__input, "blur", l);
        b.bind(this.__selector, "mousedown", function(a) {
            b.addClass(this, "drag").bind(window, "mouseup", function(a) {
                b.removeClass(p.__selector, "drag");
            });
        });
        var q = document.createElement("div");
        e.extend(this.__selector.style, {
            width: "122px",
            height: "102px",
            padding: "3px",
            backgroundColor: "#222",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
        });
        e.extend(this.__field_knob.style, {
            position: "absolute",
            width: "12px",
            height: "12px",
            border: this.__field_knob_border + (.5 > this.__color.v ? "#fff" : "#000"),
            boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            zIndex: 1
        });
        e.extend(this.__hue_knob.style, {
            position: "absolute",
            width: "15px",
            height: "2px",
            borderRight: "4px solid #fff",
            zIndex: 1
        });
        e.extend(this.__saturation_field.style, {
            width: "100px",
            height: "100px",
            border: "1px solid #555",
            marginRight: "3px",
            display: "inline-block",
            cursor: "pointer"
        });
        e.extend(q.style, {
            width: "100%",
            height: "100%",
            background: "none"
        });
        f(q, "top", "rgba(0,0,0,0)", "#000");
        e.extend(this.__hue_field.style, {
            width: "15px",
            height: "100px",
            display: "inline-block",
            border: "1px solid #555",
            cursor: "ns-resize"
        });
        g(this.__hue_field);
        e.extend(this.__input.style, {
            outline: "none",
            textAlign: "center",
            color: "#fff",
            border: 0,
            fontWeight: "bold",
            textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)"
        });
        b.bind(this.__saturation_field, "mousedown", j);
        b.bind(this.__field_knob, "mousedown", j);
        b.bind(this.__hue_field, "mousedown", function(a) {
            o(a);
            b.bind(window, "mousemove", o);
            b.bind(window, "mouseup", m);
        });
        this.__saturation_field.appendChild(q);
        this.__selector.appendChild(this.__field_knob);
        this.__selector.appendChild(this.__saturation_field);
        this.__selector.appendChild(this.__hue_field);
        this.__hue_field.appendChild(this.__hue_knob);
        this.domElement.appendChild(this.__input);
        this.domElement.appendChild(this.__selector);
        this.updateDisplay();
    };
    h.superclass = a;
    e.extend(h.prototype, a.prototype, {
        updateDisplay: function() {
            var a = d(this.getValue());
            if (!1 !== a) {
                var b = !1;
                e.each(c.COMPONENTS, function(c) {
                    if (!e.isUndefined(a[c]) && !e.isUndefined(this.__color.__state[c]) && a[c] !== this.__color.__state[c])
                        return b = !0,
                        {};
                }, this);
                b && e.extend(this.__color.__state, a);
            }
            e.extend(this.__temp.__state, this.__color.__state);
            this.__temp.a = 1;
            var g = .5 > this.__color.v || .5 < this.__color.s ? 255 : 0
              , h = 255 - g;
            e.extend(this.__field_knob.style, {
                marginLeft: 100 * this.__color.s - 7 + "px",
                marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                backgroundColor: this.__temp.toString(),
                border: this.__field_knob_border + "rgb(" + g + "," + g + "," + g + ")"
            });
            this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px";
            this.__temp.s = 1;
            this.__temp.v = 1;
            f(this.__saturation_field, "left", "#fff", this.__temp.toString());
            e.extend(this.__input.style, {
                backgroundColor: this.__input.value = this.__color.toString(),
                color: "rgb(" + g + "," + g + "," + g + ")",
                textShadow: this.__input_textShadow + "rgba(" + h + "," + h + "," + h + ",.7)"
            });
        }
    });
    var i = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
    return h;
}(dat.controllers.Controller, dat.dom.dom, dat.color.Color = function(a, b, c, d) {
    function e(a, b, c) {
        Object.defineProperty(a, b, {
            get: function() {
                if ("RGB" === this.__state.space)
                    return this.__state[b];
                g(this, b, c);
                return this.__state[b];
            },
            set: function(a) {
                "RGB" !== this.__state.space && (g(this, b, c),
                this.__state.space = "RGB");
                this.__state[b] = a;
            }
        });
    }
    function f(a, b) {
        Object.defineProperty(a, b, {
            get: function() {
                if ("HSV" === this.__state.space)
                    return this.__state[b];
                h(this);
                return this.__state[b];
            },
            set: function(a) {
                "HSV" !== this.__state.space && (h(this),
                this.__state.space = "HSV");
                this.__state[b] = a;
            }
        });
    }
    function g(a, c, e) {
        if ("HEX" === a.__state.space)
            a.__state[c] = b.component_from_hex(a.__state.hex, e);
        else if ("HSV" === a.__state.space)
            d.extend(a.__state, b.hsv_to_rgb(a.__state.h, a.__state.s, a.__state.v));
        else
            throw "Corrupted color state";
    }
    function h(a) {
        var c = b.rgb_to_hsv(a.r, a.g, a.b);
        d.extend(a.__state, {
            s: c.s,
            v: c.v
        });
        d.isNaN(c.h) ? d.isUndefined(a.__state.h) && (a.__state.h = 0) : a.__state.h = c.h;
    }
    var i = function() {
        this.__state = a.apply(this, arguments);
        if (!1 === this.__state)
            throw "Failed to interpret color arguments";
        this.__state.a = this.__state.a || 1;
    };
    i.COMPONENTS = "r g b h s v hex a".split(" ");
    d.extend(i.prototype, {
        toString: function() {
            return c(this);
        },
        toOriginal: function() {
            return this.__state.conversion.write(this);
        }
    });
    e(i.prototype, "r", 2);
    e(i.prototype, "g", 1);
    e(i.prototype, "b", 0);
    f(i.prototype, "h");
    f(i.prototype, "s");
    f(i.prototype, "v");
    Object.defineProperty(i.prototype, "a", {
        get: function() {
            return this.__state.a;
        },
        set: function(a) {
            this.__state.a = a;
        }
    });
    Object.defineProperty(i.prototype, "hex", {
        get: function() {
            "HEX" !== !this.__state.space && (this.__state.hex = b.rgb_to_hex(this.r, this.g, this.b));
            return this.__state.hex;
        },
        set: function(a) {
            this.__state.space = "HEX";
            this.__state.hex = a;
        }
    });
    return i;
}(dat.color.interpret, dat.color.math = function() {
    var a;
    return {
        hsv_to_rgb: function(a, b, c) {
            var d = a / 60 - Math.floor(a / 60)
              , e = c * (1 - b)
              , f = c * (1 - d * b);
            b = c * (1 - (1 - d) * b);
            a = [[c, b, e], [f, c, e], [e, c, b], [e, f, c], [b, e, c], [c, e, f]][Math.floor(a / 60) % 6];
            return {
                r: 255 * a[0],
                g: 255 * a[1],
                b: 255 * a[2]
            };
        },
        rgb_to_hsv: function(a, b, c) {
            var d = Math.min(a, b, c)
              , e = Math.max(a, b, c)
              , d = e - d;
            if (0 == e)
                return {
                    h: NaN,
                    s: 0,
                    v: 0
                };
            a = (a == e ? (b - c) / d : b == e ? 2 + (c - a) / d : 4 + (a - b) / d) / 6;
            0 > a && (a += 1);
            return {
                h: 360 * a,
                s: d / e,
                v: e / 255
            };
        },
        rgb_to_hex: function(a, b, c) {
            a = this.hex_with_component(0, 2, a);
            a = this.hex_with_component(a, 1, b);
            return a = this.hex_with_component(a, 0, c);
        },
        component_from_hex: function(a, b) {
            return a >> 8 * b & 255;
        },
        hex_with_component: function(b, c, d) {
            return d << (a = 8 * c) | b & ~(255 << a);
        }
    };
}(), dat.color.toString, dat.utils.common), dat.color.interpret, dat.utils.common), dat.utils.requestAnimationFrame = function() {
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a, b) {
        window.setTimeout(a, 1E3 / 60);
    }
    ;
}(), dat.dom.CenteredDiv = function(a, b) {
    var c = function() {
        this.backgroundElement = document.createElement("div");
        b.extend(this.backgroundElement.style, {
            backgroundColor: "rgba(0,0,0,0.8)",
            top: 0,
            left: 0,
            display: "none",
            zIndex: "1000",
            opacity: 0,
            WebkitTransition: "opacity 0.2s linear",
            transition: "opacity 0.2s linear"
        });
        a.makeFullscreen(this.backgroundElement);
        this.backgroundElement.style.position = "fixed";
        this.domElement = document.createElement("div");
        b.extend(this.domElement.style, {
            position: "fixed",
            display: "none",
            zIndex: "1001",
            opacity: 0,
            WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
            transition: "transform 0.2s ease-out, opacity 0.2s linear"
        });
        document.body.appendChild(this.backgroundElement);
        document.body.appendChild(this.domElement);
        var c = this;
        a.bind(this.backgroundElement, "click", function() {
            c.hide();
        });
    };
    c.prototype.show = function() {
        var a = this;
        this.backgroundElement.style.display = "block";
        this.domElement.style.display = "block";
        this.domElement.style.opacity = 0;
        this.domElement.style.webkitTransform = "scale(1.1)";
        this.layout();
        b.defer(function() {
            a.backgroundElement.style.opacity = 1;
            a.domElement.style.opacity = 1;
            a.domElement.style.webkitTransform = "scale(1)";
        });
    }
    ;
    c.prototype.hide = function() {
        var b = this
          , c = function() {
            b.domElement.style.display = "none";
            b.backgroundElement.style.display = "none";
            a.unbind(b.domElement, "webkitTransitionEnd", c);
            a.unbind(b.domElement, "transitionend", c);
            a.unbind(b.domElement, "oTransitionEnd", c);
        };
        a.bind(this.domElement, "webkitTransitionEnd", c);
        a.bind(this.domElement, "transitionend", c);
        a.bind(this.domElement, "oTransitionEnd", c);
        this.backgroundElement.style.opacity = 0;
        this.domElement.style.opacity = 0;
        this.domElement.style.webkitTransform = "scale(1.1)";
    }
    ;
    c.prototype.layout = function() {
        this.domElement.style.left = window.innerWidth / 2 - a.getWidth(this.domElement) / 2 + "px";
        this.domElement.style.top = window.innerHeight / 2 - a.getHeight(this.domElement) / 2 + "px";
    }
    ;
    return c;
}(dat.dom.dom, dat.utils.common), dat.dom.dom, dat.utils.common);
function setProperty(a, b, c) {
    var d = b.split(/[\.\[\]]/).filter(function(a) {
        return a.length > 0;
    });
    var e = a;
    for (var f = 0; f < d.length - 1; ++f) {
        if (e[d[f]] === undefined)
            e[d[f]] = {};
        e = e[d[f]];
    }
    e[d[d.length - 1]] = c;
}
function getStringFromUrl(a) {
    var b = new XMLHttpRequest();
    b.open("GET", a, false);
    b.send();
    return b.responseText;
}
function CGFshader(a, b, c) {
    this.gl = a;
    this.uniforms = {};
    this.attributes = {};
    if (b != undefined && c != undefined)
        this.init(b, c);
    this.textureUnit = 0;
}
CGFshader.prototype.init = function(a, b) {
    this.fragmentURL = b;
    this.vertexURL = a;
    var c = getStringFromUrl(b);
    var d = getStringFromUrl(a);
    var e = this.createShaderFromSource(WebGLRenderingContext.FRAGMENT_SHADER, c);
    var f = this.createShaderFromSource(WebGLRenderingContext.VERTEX_SHADER, d);
    this.compile_program(f, e);
}
;
CGFshader.prototype.createShaderFromSource = function(a, b) {
    var c = this.gl.createShader(a);
    this.gl.shaderSource(c, b);
    this.gl.compileShader(c);
    if (!this.gl.getShaderParameter(c, this.gl.COMPILE_STATUS)) {
        alert(this.gl.getShaderInfoLog(c));
        return null;
    }
    return c;
}
;
CGFshader.prototype.createUniformSetter = function(a, b, c, d) {
    var e = c.type;
    var f = (c.size > 1 && c.name.substr(-3) === "[0]");
    if (e === a.FLOAT && f)
        return function(b) {
            a.uniform1fv(d, b);
        }
        ;
    if (e === a.FLOAT)
        return function(b) {
            a.uniform1f(d, b);
        }
        ;
    if (e === a.FLOAT_VEC2)
        return function(b) {
            a.uniform2fv(d, b);
        }
        ;
    if (e === a.FLOAT_VEC3)
        return function(b) {
            a.uniform3fv(d, b);
        }
        ;
    if (e === a.FLOAT_VEC4)
        return function(b) {
            a.uniform4fv(d, b);
        }
        ;
    if (e === a.INT && f)
        return function(b) {
            a.uniform1iv(d, b);
        }
        ;
    if (e === a.INT)
        return function(b) {
            a.uniform1i(d, b);
        }
        ;
    if (e === a.INT_VEC2)
        return function(b) {
            a.uniform2iv(d, b);
        }
        ;
    if (e === a.INT_VEC3)
        return function(b) {
            a.uniform3iv(d, b);
        }
        ;
    if (e === a.INT_VEC4)
        return function(b) {
            a.uniform4iv(d, b);
        }
        ;
    if (e === a.BOOL)
        return function(b) {
            a.uniform1i(d, b);
        }
        ;
    if (e === a.BOOL_VEC2)
        return function(b) {
            a.uniform2iv(d, b);
        }
        ;
    if (e === a.BOOL_VEC3)
        return function(b) {
            a.uniform3iv(d, b);
        }
        ;
    if (e === a.BOOL_VEC4)
        return function(b) {
            a.uniform4iv(d, b);
        }
        ;
    if (e === a.FLOAT_MAT2)
        return function(b) {
            a.uniformMatrix2fv(d, false, b);
        }
        ;
    if (e === a.FLOAT_MAT3)
        return function(b) {
            a.uniformMatrix3fv(d, false, b);
        }
        ;
    if (e === a.FLOAT_MAT4)
        return function(b) {
            a.uniformMatrix4fv(d, false, b);
        }
        ;
    if ((e === a.SAMPLER_2D || e === a.SAMPLER_CUBE) && f) {
        var g = [];
        for (var h = 0; h < info.size; ++h)
            g.push(textureUnit++);
        return function(b, c) {
            return function(b) {
                a.uniform1iv(d, c);
                b.forEach(function(a, b) {});
            }
            ;
        }(this.getBindPointForSamplerType(a, e), g);
    }
    if (e === a.SAMPLER_2D || e === a.SAMPLER_CUBE)
        return function(b) {
            a.uniform1i(d, b);
        }
        ;
    throw ("unknown type: 0x" + e.toString(16));
}
;
CGFshader.prototype.getBindPointForSamplerType = function(a, b) {
    if (b === a.SAMPLER_2D)
        return a.TEXTURE_2D;
    if (b === a.SAMPLER_CUBE)
        return a.TEXTURE_CUBE_MAP;
}
;
CGFshader.prototype.createAttributeSetter = function(a, b) {
    return function(c) {
        a.bindBuffer(a.ARRAY_BUFFER, c.buffer);
        a.enableVertexAttribArray(b);
        a.vertexAttribPointer(b, c.numComponents || c.size, c.type || a.FLOAT, c.normalize || false, c.stride || 0, c.offset || 0);
    }
    ;
}
;
CGFshader.prototype.compile_program = function(a, b) {
    var c = this.gl;
    var d = c.createProgram();
    c.attachShader(d, a);
    c.attachShader(d, b);
    try {
        c.bindAttribLocation(d, 0, "aVertexPosition");
    } catch (e) {
        console.log("CGFshader: could not bind 'aVertexPosition' to location 0. Do you have this attribute in your shader?");
    }
    ;c.linkProgram(d);
    if (!c.getProgramParameter(d, c.LINK_STATUS)) {
        console.log(c.getProgramInfoLog(d));
        alert('Could not initialise shaders');
    }
    this.program = d;
    c.useProgram(d);
    this.uniforms = {};
    this.uniformSetters = {};
    var f = c.getProgramParameter(d, c.ACTIVE_UNIFORMS);
    for (var g = 0; g < f; ++g) {
        var h = c.getActiveUniform(d, g);
        var i = c.getUniformLocation(d, h.name);
        setProperty(this.uniforms, h.name, i);
        setProperty(this.uniformSetters, h.name, this.createUniformSetter(c, d, h, i));
    }
    this.attributes = {};
    this.attributeSetters = {};
    var j = c.getProgramParameter(d, c.ACTIVE_ATTRIBUTES);
    for (var g = 0; g < j; ++g) {
        var k = c.getActiveAttrib(d, g);
        var i = c.getAttribLocation(d, k.name);
        setProperty(this.attributes, k.name, i);
        setProperty(this.attributeSetters, k.name, this.createAttributeSetter(c, i));
    }
}
;
CGFshader.prototype.update = function() {}
;
CGFshader.prototype.bind = function() {
    this.gl.useProgram(this.program);
}
;
CGFshader.prototype.unbind = function() {
    if (!this.warnedunbind) {
        console.warn("CGFshader.unbind should not be used. Please review your code and remove direct shader binding/unbinding and use CGFscene.setActiveShader() instead.");
        this.warnedunbind = true;
    }
}
;
CGFshader.prototype.applyUniforms = function(a) {
    var b = this;
    Object.keys(a).forEach(function(c) {
        var d = b.uniformSetters[c];
        if (d)
            d(a[c]);
        else
            console.log("Attempt to set value for uniform '" + c + "' with no setter function (does it exist in the shader?).");
    });
}
;
CGFshader.prototype.getUniformsValues = function() {
    var a = this;
    var b = function(c, d) {
        for (var e in c) {
            var f;
            if (typeof c[e] !== 'function') {
                if (!(c[e]instanceof WebGLUniformLocation)) {
                    f = {};
                    b(c[e], f);
                } else
                    f = a.gl.getUniform(a.program, c[e]);
                d[e] = f;
            }
        }
    };
    udict = {};
    b(this.uniforms, udict);
    return udict;
}
;
CGFshader.prototype.setUniformsValues = function(a) {
    this.bind();
    var b = this;
    var c = function(a, b) {
        for (var d in a) {
            try {
                if (typeof b[d] != 'undefined')
                    if (typeof a[d] !== 'function')
                        c(a[d], b[d]);
                    else
                        a[d](b[d]);
            } catch (e) {
                console.log("Problem setting uniform " + d);
            }
            ;
        }
    };
    c(this.uniformSetters, a);
}
;
CGFshader.prototype.importUniforms = function(a) {
    a.bind();
    var b = a.getUniformsValues();
    this.bind();
    this.setUniformsValues(b);
}
;
CGFshader.prototype.getUniformValue = function(a) {
    return this.gl.getUniform(this.program, this.uniforms[a]);
}
;
function CGFtexture(a, b) {
    this.scene = a;
    this.texID = -1;
    this.gl = a.gl;
    this.image = new Image();
    this.image.crossOrigin = "anonymous";
    var c = this;
    this.image.onload = function() {
        console.log("Texture loaded: " + c.image.src);
        c.texID = c.gl.createTexture();
        c.gl.bindTexture(c.gl.TEXTURE_2D, c.texID);
        c.gl.texImage2D(c.gl.TEXTURE_2D, 0, c.gl.RGBA, c.gl.RGBA, c.gl.UNSIGNED_BYTE, c.image);
        c.gl.texParameteri(c.gl.TEXTURE_2D, c.gl.TEXTURE_MAG_FILTER, c.gl.LINEAR);
        if (isPowerOfTwo(c.image.width) && isPowerOfTwo(c.image.height))
            c.gl.texParameteri(c.gl.TEXTURE_2D, c.gl.TEXTURE_MIN_FILTER, c.gl.LINEAR);
        else {
            c.gl.texParameteri(c.gl.TEXTURE_2D, c.gl.TEXTURE_MIN_FILTER, c.gl.LINEAR);
            c.gl.texParameteri(c.gl.TEXTURE_2D, c.gl.TEXTURE_WRAP_S, c.gl.CLAMP_TO_EDGE);
            c.gl.texParameteri(c.gl.TEXTURE_2D, c.gl.TEXTURE_WRAP_T, c.gl.CLAMP_TO_EDGE);
        }
    }
    ;
    this.image.src = b;
}
function isPowerOfTwo(a) {
    return (a & (a - 1)) == 0;
}
CGFtexture.prototype.bind = function(a) {
    var b = a || 0;
    if (this.texID != -1) {
        this.gl.activeTexture(this.gl.TEXTURE0 + b);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texID);
        if (b == 0)
            this.scene.activeTexture = this;
        return true;
    } else {
        if (b == 0)
            this.scene.activeTexture = null;
        return false;
    }
}
;
CGFtexture.prototype.unbind = function(a) {
    var b = a || 0;
    this.gl.activeTexture(this.gl.TEXTURE0 + b);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    if (b == 0)
        this.scene.activeTexture = null;
}
;
function CGFappearance(a) {
    this.scene = a;
    this.ambient = vec4.fromValues(0.2, 0.2, 0.2, 1.0);
    this.diffuse = vec4.fromValues(0.5, 0.5, 0.5, 1.0);
    this.specular = vec4.fromValues(0.5, 0.5, 0.5, 1.0);
    this.shininess = 10.0;
    this.emission = vec4.fromValues(0, 0, 0, 1);
    this.texture = null;
}
CGFappearance.prototype.constructor = CGFappearance;
CGFappearance.prototype.setAmbient = function(a, b, c, d) {
    vec4.set(this.ambient, a, b, c, d);
}
;
CGFappearance.prototype.setDiffuse = function(a, b, c, d) {
    vec4.set(this.diffuse, a, b, c, d);
}
;
CGFappearance.prototype.setSpecular = function(a, b, c, d) {
    vec4.set(this.specular, a, b, c, d);
}
;
CGFappearance.prototype.setShininess = function(a) {
    this.shininess = a;
}
;
CGFappearance.prototype.setEmission = function(a, b, c, d) {
    vec4.set(this.emission, a, b, c, d);
}
;
CGFappearance.prototype.setColor = function(a, b, c, d) {
    this.setAmbient(a, b, c, d);
    this.setDiffuse(a, b, c, d);
}
;
CGFappearance.prototype.apply = function() {
    this.scene.setAmbient(this.ambient[0], this.ambient[1], this.ambient[2], this.ambient[3]);
    this.scene.setDiffuse(this.diffuse[0], this.diffuse[1], this.diffuse[2], this.diffuse[3]);
    this.scene.setSpecular(this.specular[0], this.specular[1], this.specular[2], this.specular[3]);
    this.scene.setShininess(this.shininess);
    this.scene.setEmission(this.emission[0], this.emission[1], this.emission[2], this.emission[3]);
    if (this.texture) {
        if (this.texture.bind() && this.wrapS && this.wrapT) {
            var a = this.scene.gl;
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, this.wrapS);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, this.wrapT);
            this.scene.activeTexture = this.texture;
        }
    } else
        this.scene.activeTexture = null;
}
;
CGFappearance.prototype.setTexture = function(a) {
    this.texture = a;
}
;
CGFappearance.prototype.loadTexture = function(a) {
    this.texture = new CGFtexture(this.scene,a);
}
;
CGFappearance.prototype.setTextureWrap = function(a, b) {
    this.wrapS = this.scene.gl[a];
    this.wrapT = this.scene.gl[b];
}
;
function CGFobject(a) {
    this.scene = a;
    this.inited = false;
    this.pickingEnabled = false;
    this.primitiveType = this.scene.gl.TRIANGLES;
}
;CGFobject.prototype.constructor = CGFobject;
CGFobject.prototype.display = function() {
    this.drawElements(this.primitiveType);
}
;
CGFobject.prototype.initGLBuffers = function() {
    var a = this.scene.gl;
    this.vertsBuffer = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, this.vertsBuffer);
    a.bufferData(a.ARRAY_BUFFER, new Float32Array(this.vertices), a.STATIC_DRAW);
    if (!this.normals)
        this.normals = Array.apply(null, new Array(this.vertices.length)).map(function() {
            return 1.0;
        });
    this.normsBuffer = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, this.normsBuffer);
    a.bufferData(a.ARRAY_BUFFER, new Float32Array(this.normals), a.STATIC_DRAW);
    this.indicesBuffer = a.createBuffer();
    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
    a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), a.STATIC_DRAW);
    if (!this.texCoords)
        this.hasTexCoords = false;
    else {
        this.hasTexCoords = true;
        this.texCoordsBuffer = a.createBuffer();
        a.bindBuffer(a.ARRAY_BUFFER, this.texCoordsBuffer);
        a.bufferData(a.ARRAY_BUFFER, new Float32Array(this.texCoords), a.STATIC_DRAW);
    }
    ;this.indicesBuffer.numValues = this.indices.length;
    a.bindBuffer(a.ARRAY_BUFFER, null);
    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
    this.inited = true;
}
;
CGFobject.prototype.updateTexCoordsGLBuffers = function() {
    var a = this.scene.gl;
    if (!this.texCoords)
        this.hasTexCoords = false;
    else {
        this.hasTexCoords = true;
        if (!this.texCoordsBuffer)
            this.texCoordsBuffer = a.createBuffer();
        a.bindBuffer(a.ARRAY_BUFFER, this.texCoordsBuffer);
        a.bufferData(a.ARRAY_BUFFER, new Float32Array(this.texCoords), a.STATIC_DRAW);
    }
    ;
}
;
CGFobject.prototype.initBuffers = function() {
    this.vertices = [-0.5, -0.5, 0, 0.5, -0.5, 0, -0.5, 0.5, 0, 0.5, 0.5, 0];
    this.indices = [0, 1, 2, 3];
    this.normals = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0];
    this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
    this.initGLBuffers();
}
;
CGFobject.prototype.drawElements = function(a) {
    var b = this.scene.activeShader;
    var c = this.scene.gl;
    c.uniformMatrix4fv(b.uniforms.uMVMatrix, false, this.scene.activeMatrix);
    c.enableVertexAttribArray(b.attributes.aVertexPosition);
    c.bindBuffer(c.ARRAY_BUFFER, this.vertsBuffer);
    c.vertexAttribPointer(b.attributes.aVertexPosition, 3, c.FLOAT, false, 0, 0);
    if (b.uniforms.uNMatrix)
        this.scene.updateInverseMatrix();
    c.uniformMatrix4fv(b.uniforms.uNMatrix, false, this.scene.invMatrix);
    if (b.attributes.aVertexNormal) {
        c.enableVertexAttribArray(b.attributes.aVertexNormal);
        c.bindBuffer(c.ARRAY_BUFFER, this.normsBuffer);
        c.vertexAttribPointer(b.attributes.aVertexNormal, 3, c.FLOAT, false, 0, 0);
    }
    var d = this.scene.texturesEnabled;
    if (b.attributes.aTextureCoord)
        if (this.hasTexCoords && d && this.scene.activeTexture) {
            c.enableVertexAttribArray(b.attributes.aTextureCoord);
            c.bindBuffer(c.ARRAY_BUFFER, this.texCoordsBuffer);
            c.vertexAttribPointer(b.attributes.aTextureCoord, 2, c.FLOAT, false, 0, 0);
        } else {
            this.scene.enableTextures(false);
            c.disableVertexAttribArray(b.attributes.aTextureCoord);
        }
    ;c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
    c.drawElements(a, this.indicesBuffer.numValues, c.UNSIGNED_SHORT, 0);
    c.bindBuffer(c.ARRAY_BUFFER, null);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null);
    this.scene.enableTextures(d);
}
;
function CGFaxis(a, b, c) {
    CGFobject.call(this, a);
    this.length = 5;
    this.thickness = 0.05;
    switch (arguments.length) {
    case 3:
        this.thickness = c;
    case 2:
        this.length = b;
    }
    this.HALF_PI = 3.1415926536 / 2;
    this.pyr = new CGFquadPyramid(a,this.length - this.thickness / 2.0,this.thickness);
}
;CGFaxis.prototype = Object.create(CGFobject.prototype);
CGFaxis.prototype.constructor = CGFaxis;
CGFaxis.prototype.display = function() {
    this.scene.pushMatrix();
    this.scene.activeTexture = null;
    this.scene.setShininess(100.0);
    this.scene.setAmbient(1, 1, 1, 1);
    this.scene.pushMatrix();
    this.scene.translate(0, 0, this.thickness / 2.0);
    this.scene.setDiffuse(0, 0, 1, 1);
    this.scene.setSpecular(0, 0, 1, 1);
    this.pyr.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(this.HALF_PI, 0, 1, 0);
    this.scene.translate(0, 0, this.thickness / 2.0);
    this.scene.setDiffuse(1, 0, 0, 1);
    this.scene.setSpecular(1, 0, 0, 1);
    this.pyr.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.rotate(-this.HALF_PI, 1, 0, 0);
    this.scene.translate(0, 0, this.thickness / 2.0);
    this.scene.setDiffuse(0, 1, 0, 1);
    this.scene.setSpecular(0, 1, 0, 1);
    this.pyr.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
}
;
function CGFquadPyramid(a, b, c) {
    CGFobject.call(this, a);
    this.halfSide = c / 2;
    this.height = b;
    this.initBuffers();
}
;CGFquadPyramid.prototype = Object.create(CGFobject.prototype);
CGFquadPyramid.prototype.constructor = CGFquadPyramid;
CGFquadPyramid.prototype.initBuffers = function() {
    this.vertices = [-this.halfSide, -this.halfSide, 0, this.halfSide, -this.halfSide, 0, -this.halfSide, this.halfSide, 0, this.halfSide, this.halfSide, 0, 0, 0, this.height];
    this.indices = [2, 1, 0, 1, 2, 3, 0, 1, 4, 1, 3, 4, 2, 0, 4, 3, 2, 4];
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
function CGFinterface() {
    this.mouse = vec2.create();
    this.prevMouse = vec2.create();
    this.mouseButtons = [false, false, false];
    this.activeCamera = null;
    this.ctrlKey = false;
}
;CGFinterface.prototype.init = function(a) {
    console.log("Initializing Interface");
    this.scene = a.scene;
    var b = a.gl.canvas;
    b.tabIndex = 1;
    var c = this;
    b.oncontextmenu = function(a) {
        return false;
    }
    ;
    b.addEventListener("mousedown", function(a) {
        a.preventDefault();
        a.stopPropagation();
        c.processMouseDown(a);
        c.scene.onPick(a);
    });
    b.addEventListener("mouseup", function(a) {
        a.preventDefault();
        a.stopPropagation();
        c.processMouseUp(a);
    });
    b.addEventListener("mousemove", function(a) {
        a.preventDefault();
        a.stopPropagation();
        c.processMouseMove(a);
    });
    b.addEventListener("touchstart", function(a) {
        a.preventDefault();
        a.stopPropagation();
        c.processTouchStart(a);
    });
    b.addEventListener("touchend", function(a) {
        a.preventDefault();
        a.stopPropagation();
        c.processTouchEnd(a);
        c.scene.onPick(a);
    });
    b.addEventListener("touchmove", function(a) {
        a.preventDefault();
        a.stopPropagation();
        c.processTouchMove(a);
    });
    document.onkeypress = function(a) {
        c.processKeyboard(a);
    }
    ;
    document.onkeydown = function(a) {
        c.processKeyDown(a);
    }
    ;
    document.onkeyup = function(a) {
        c.processKeyUp(a);
    }
    ;
    return true;
}
;
CGFinterface.prototype.update = function() {}
;
CGFinterface.prototype.processKeyboard = function(a) {
    console.log('keypress');
}
;
CGFinterface.prototype.processKeyDown = function(a) {
    console.log('keydown');
}
;
CGFinterface.prototype.processKeyUp = function(a) {
    console.log('keyup');
}
;
CGFinterface.prototype.setActiveCamera = function(a) {
    this.activeCamera = a;
}
;
CGFinterface.prototype.processMouseDown = function(a) {
    var b = a.which;
    this.mouseButtons[b - 1] = true;
    this.mouse[0] = a.pageX;
    this.mouse[1] = a.pageY;
    this.prevMouse[0] = this.mouse[0];
    this.prevMouse[1] = this.mouse[1];
    this.ctrlKey = a.ctrlKey;
}
;
CGFinterface.prototype.processMouseUp = function(a) {
    var b = a.which;
    this.mouseButtons[b - 1] = false;
    this.prevMouse[0] = this.mouse[0];
    this.prevMouse[1] = this.mouse[1];
    this.mouse[0] = a.pageX;
    this.mouse[1] = a.pageY;
    this.ctrlKey = a.ctrlKey;
}
;
CGFinterface.prototype.processMouseMove = function(a) {
    this.prevMouse[0] = this.mouse[0];
    this.prevMouse[1] = this.mouse[1];
    this.mouse[0] = a.pageX;
    this.mouse[1] = a.pageY;
    this.processMouse();
}
;
CGFinterface.prototype.processMouse = function() {
    if (this.activeCamera) {
        var a = vec2.subtract(vec2.create(), this.mouse, this.prevMouse);
        if (this.mouseButtons[0])
            if (this.ctrlKey)
                this.activeCamera.zoom(a[1] * 0.05);
            else {
                this.activeCamera.orbit(CGFcameraAxisID.X, a[1] * Math.PI / 180.0);
                this.activeCamera.orbit(CGFcameraAxisID.Y, -a[0] * Math.PI / 180.0);
            }
        else if (this.mouseButtons[2])
            this.activeCamera.pan([-a[0] * 0.05, a[1] * 0.05, 0]);
        else if (this.mouseButtons[1])
            this.activeCamera.zoom(a[1] * 0.05);
    }
}
;
CGFinterface.prototype.processTouchStart = function(a) {
    this.touches = a.targetTouches;
    this.prevTouches = this.touches;
}
;
CGFinterface.prototype.processTouchEnd = function(a) {
    this.prevTouches = this.touches;
    this.touches = a.targetTouches;
}
;
CGFinterface.prototype.processTouchMove = function(a) {
    this.prevTouches = this.touches;
    this.touches = a.targetTouches;
    this.processTouches();
}
;
CGFinterface.prototype.processTouches = function() {
    if (this.activeCamera)
        if (this.touches.length == 1) {
            var a = [this.prevTouches[0].pageX, this.prevTouches[0].pageY];
            var b = [this.touches[0].pageX, this.touches[0].pageY];
            var c = vec2.subtract(vec2.create(), b, a);
            this.activeCamera.orbit(CGFcameraAxisID.X, c[1] * Math.PI / 180.0);
            this.activeCamera.orbit(CGFcameraAxisID.Y, -c[0] * Math.PI / 180.0);
        } else {
            var d = [this.prevTouches[0].pageX, this.prevTouches[0].pageY];
            var e = [this.touches[0].pageX, this.touches[0].pageY];
            if (this.touches.length == 2) {
                var f = [this.prevTouches[1].pageX, this.prevTouches[1].pageY];
                var g = [this.touches[1].pageX, this.touches[1].pageY];
                var h = this.distanceBetweenPoints(d, f);
                var i = this.distanceBetweenPoints(e, g);
                var j = i - h;
                this.activeCamera.zoom(j * 0.05);
            } else {
                var c = vec2.subtract(vec2.create(), e, d);
                this.activeCamera.pan([-c[0] * 0.05, c[1] * 0.05, 0]);
            }
        }
}
;
CGFinterface.prototype.distanceBetweenPoints = function(a, b) {
    return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
}
;
function CGFscene() {}
CGFscene.prototype.init = function(a) {
    console.log("Initializing Scene");
    this.gl = a.gl;
    this.pMatrix = mat4.create();
    this.invMatrix = mat4.create();
    this.activeMatrix = mat4.create();
    this.matrixStack = new Array();
    this.picksRequests = [];
    this.pickData = [];
    this.pickIds = [];
    this.pickResults = [];
    this.pickMode = false;
    this.pickShader = new CGFshader(this.gl,'../lib/CGF/shaders/picking/vertex.glsl','../lib/CGF/shaders/picking/fragment.glsl');
    this.defaultShader = new CGFshader(this.gl,'../lib/CGF/shaders/Gouraud/textured/multiple_light-vertex.glsl','../lib/CGF/shaders/Gouraud/textured/fragment.glsl');
    this.shader = {
        bind: function() {
            console.error("direct shader bind deprecated, use CGFscene.setActiveShader() instead, and only when you need to change shader. (" + arguments.callee.caller.name + ")");
        },
        unbind: function() {
            console.error("direct shader unbind deprecated, please remove. (" + arguments.callee.caller.name + ")");
        }
    };
    this.activeShader = this.defaultShader;
    this.activeShader.bind();
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.uniform1i(this.activeShader.uniforms.uSampler, 0);
    this.enableTextures(false);
    this.activeTexture = null;
    this.lights = new Array();
    var b = 0;
    for (var c in this.activeShader.uniforms.uLight) {
        this.lights[b] = new CGFlight(this,b);
        this.lights[b].disable();
        this.lights[b].update();
        b++;
    }
    ;this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.setGlobalAmbientLight(0.1, 0.1, 0.1, 1.0);
    this.lastUpdate = 0;
    this.updatePeriod = 0;
    return true;
}
;
CGFscene.prototype.enableTextures = function(a) {
    this.activeShader.bind();
    this.texturesEnabled = a;
    this.gl.uniform1i(this.activeShader.uniforms.uUseTexture, a);
}
;
CGFscene.prototype.loadIdentity = function() {
    mat4.identity(this.activeMatrix);
}
;
CGFscene.prototype.pushMatrix = function() {
    this.matrixStack.push(this.activeMatrix);
    this.activeMatrix = mat4.clone(this.activeMatrix);
}
;
CGFscene.prototype.popMatrix = function() {
    this.activeMatrix = this.matrixStack.pop();
}
;
CGFscene.prototype.multMatrix = function(a) {
    mat4.multiply(this.activeMatrix, this.activeMatrix, a);
}
;
CGFscene.prototype.getMatrix = function() {
    return mat4.clone(this.activeMatrix);
}
;
CGFscene.prototype.setMatrix = function(a) {
    this.activeMatrix = mat4.clone(a);
}
;
CGFscene.prototype.translate = function(a, b, c) {
    mat4.translate(this.activeMatrix, this.activeMatrix, [a, b, c]);
}
;
CGFscene.prototype.rotate = function(a, b, c, d) {
    mat4.rotate(this.activeMatrix, this.activeMatrix, a, [b, c, d]);
}
;
CGFscene.prototype.scale = function(a, b, c) {
    mat4.scale(this.activeMatrix, this.activeMatrix, [a, b, c]);
}
;
CGFscene.prototype.setEmission = function(a, b, c, d) {
    this.activeShader.setUniformsValues({
        uFrontMaterial: {
            emission: [a, b, c, d]
        }
    });
}
;
CGFscene.prototype.setAmbient = function(a, b, c, d) {
    this.activeShader.setUniformsValues({
        uFrontMaterial: {
            ambient: [a, b, c, d]
        }
    });
}
;
CGFscene.prototype.setDiffuse = function(a, b, c, d) {
    this.activeShader.setUniformsValues({
        uFrontMaterial: {
            diffuse: [a, b, c, d]
        }
    });
}
;
CGFscene.prototype.setSpecular = function(a, b, c, d) {
    this.activeShader.setUniformsValues({
        uFrontMaterial: {
            specular: [a, b, c, d]
        }
    });
}
;
CGFscene.prototype.setShininess = function(a) {
    this.activeShader.setUniformsValues({
        uFrontMaterial: {
            shininess: a
        }
    });
}
;
CGFscene.prototype.getProjectionMatrix = function() {
    return this.camera.getProjectionMatrix(this.gl.canvas.width, this.gl.canvas.height);
}
;
CGFscene.prototype.updateProjectionMatrix = function() {
    this.pMatrix = this.getProjectionMatrix();
    this.activeShader.setUniformsValues({
        uPMatrix: this.pMatrix
    });
}
;
CGFscene.prototype.applyViewMatrix = function() {
    mat4.mul(this.activeMatrix, this.activeMatrix, this.camera.getViewMatrix());
}
;
CGFscene.prototype.update = function(a) {}
;
CGFscene.prototype.setUpdatePeriod = function(a) {
    this.updatePeriod = a;
}
;
CGFscene.prototype.checkUpdate = function() {
    if (this.updatePeriod > 0) {
        var a = Date.now();
        if (a - this.lastUpdate >= this.updatePeriod) {
            this.update(a);
            this.lastUpdate = a;
        }
    }
}
;
CGFscene.prototype.display = function() {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
}
;
CGFscene.prototype.displayWithPick = function() {
    var a = this.getNextPickRequest();
    if (a != null) {
        prevShader = this.activeShader;
        var b = a[0][0];
        var c = a[0][1];
        this.setActiveShader(this.pickShader);
        var d = new Uint8Array(4);
        this.pickMode = true;
        var e = this.texturesEnabled;
        this.texturesEnabled = false;
        this.display();
        this.texturesEnabled = e;
        this.pickMode = false;
        this.gl.readPixels(b, c, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, d);
        if (d != null && d != undefined) {
            this.pickResults.splice(0, this.pickResults.length);
            var f = this.getPickData(d);
            if (f != null)
                this.pickResults.push([f[0], f[1]]);
            else
                this.pickResults.push([undefined, undefined]);
        }
        this.setActiveShader(prevShader);
    }
    this.display();
}
;
CGFscene.prototype.setGlobalAmbientLight = function(a, b, c, d) {
    this.activeShader.bind();
    this.gl.uniform4f(this.activeShader.uniforms.uGlobalAmbient, a, b, c, d);
}
;
CGFscene.prototype.onPick = function(a) {
    if (this.pickEnabled == false)
        return;
    var b = a.clientX
      , c = a.clientY;
    var d = a.target.getBoundingClientRect();
    if (d.left <= b && b < d.right && d.top <= c && c < d.bottom) {
        var e = b - d.left;
        y_in_canvas = d.bottom - c;
        this.picksRequests.push([e, y_in_canvas]);
    }
}
;
CGFscene.prototype.getNextPickRequest = function() {
    if (this.picksRequests.length == 0)
        return null;
    return this.picksRequests.splice(0, 1);
}
;
CGFscene.prototype.registerForPick = function(a, b) {
    if (this.pickMode) {
        var c = this.intToRGB(a);
        this.pickData[a] = [b, a, c];
        this.gl.uniform4fv(this.pickShader.uniforms.uPickColor, c);
    }
}
;
CGFscene.prototype.clearPickRegistration = function() {
    if (this.pickMode)
        this.gl.uniform4fv(this.pickShader.uniforms.uPickColor, [0, 0, 0, 0]);
}
;
CGFscene.prototype.intToRGB = function(a) {
    var b = a >> 16;
    var c = a % 65536 >> 8;
    var d = a % 256;
    return [b / 255.0, c / 255.0, d / 255.0, 1.0];
}
;
CGFscene.prototype.getPickData = function(a) {
    var b = 65536 * a[0] + 256 * a[1] + a[2];
    return this.pickData[b];
}
;
CGFscene.prototype.setPickEnabled = function(a) {
    this.pickEnabled = a;
}
;
CGFscene.prototype.setActiveShader = function(a) {
    if (this.pickMode == false) {
        a.importUniforms(this.activeShader);
        this.activeShader = a;
        this.activeShader.bind();
    }
    return;
}
;
CGFscene.prototype.setActiveShaderSimple = function(a) {
    if (this.pickMode == false) {
        var b = this.activeShader.getUniformValue('uPMatrix');
        this.activeShader = a;
        this.activeShader.bind();
        a.setUniformsValues({
            'uPMatrix': b
        });
    }
    return;
}
;
CGFscene.prototype.updateInverseMatrix = function() {
    mat4.invert(this.invMatrix, this.activeMatrix);
    mat4.transpose(this.invMatrix, this.invMatrix);
    return;
}
;
var CGFcameraAxis = Object.freeze({
    X: vec3.fromValues(1.0, 0.0, 0.0),
    Y: vec3.fromValues(0.0, 1.0, 0.0),
    Z: vec3.fromValues(0.0, 0.0, 1.0)
});
var CGFcameraAxisID = Object.freeze({
    X: 0,
    Y: 1,
    Z: 2
});
function CGFcamera(a, b, c, d, e) {
    this.fov = a;
    this.near = b;
    this.far = c;
    this.position = vec4.fromValues(d[0], d[1], d[2], 0.0);
    this.target = vec4.fromValues(e[0], e[1], e[2], 0.0);
    this.direction = this.calculateDirection();
    this._up = vec3.fromValues(0.0, 1.0, 0.0);
    this._viewMatrix = mat4.create();
    this._projectionMatrix = mat4.create();
}
CGFcamera.prototype.getViewMatrix = function() {
    mat4.lookAt(this._viewMatrix, this.position, this.target, this._up);
    return this._viewMatrix;
}
;
CGFcamera.prototype.getProjectionMatrix = function(a, b) {
    var c = a / b;
    mat4.perspective(this._projectionMatrix, this.fov, c, this.near, this.far);
    return this._projectionMatrix;
}
;
CGFcamera.prototype.calculateDirection = function() {
    return vec4.normalize(vec4.create(), vec4.subtract(vec4.create(), this.target, this.position));
}
;
CGFcamera.prototype.setPosition = function(a) {
    vec3.copy(this.position, a);
    this.direction = this.calculateDirection();
}
;
CGFcamera.prototype.setTarget = function(a) {
    vec3.copy(this.target, a);
    this.direction = this.calculateDirection();
}
;
CGFcamera.prototype.translate = function(a) {
    var b = vec4.scale(vec4.create(), this.direction, -a[2]);
    var c = vec4.fromValues(0.0, a[1], 0.0, 0.0);
    var d = vec3.create();
    vec3.scale(d, vec3.cross(d, vec3.fromValues(0, 1, 0), this.direction), a[0]);
    var e = vec4.fromValues(d[0], d[1], d[2], 0);
    var f = vec4.create();
    f = vec4.add(f, b, vec4.add(f, c, e));
    vec4.add(this.position, this.position, f);
    vec4.add(this.target, this.position, this.direction);
}
;
CGFcamera.prototype.rotate = function(a, b) {
    vec4.transformMat4(this.direction, this.direction, mat4.rotate(mat4.create(), mat4.create(), b, a));
    vec4.add(this.target, this.position, this.direction);
}
;
CGFcamera.prototype.orbit = function(a, b) {
    var c = vec4.sub(vec4.create(), this.position, this.target);
    c[3] = 0;
    var d;
    if (a == CGFcameraAxisID.X) {
        var e = vec3.create();
        vec3.normalize(e, vec3.cross(e, c, this._up));
        var f = mat4.rotate(mat4.create(), mat4.create(), b, e);
        d = vec4.transformMat4(vec4.create(), c, f);
        vec3.normalize(this._up, vec3.cross(this._up, e, d));
    } else
        d = vec4.transformMat4(vec4.create(), c, mat4.rotate(mat4.create(), mat4.create(), b, this._up));
    vec4.add(this.position, this.target, d);
    this.direction = this.calculateDirection();
}
;
CGFcamera.prototype.pan = function(a) {
    var b = 0.05 * vec3.distance(this.target, this.position);
    var c = vec3.cross(vec3.create(), this.direction, this._up);
    var d = vec4.scale(vec4.create(), vec3.normalize(c, c), a[0] * b);
    d[3] = 0;
    var e = vec4.scale(vec4.create(), this._up, a[1] * b);
    e[3] = 0;
    vec4.add(this.position, this.position, d);
    vec4.add(this.target, this.target, d);
    vec4.add(this.position, this.position, e);
    vec4.add(this.target, this.target, e);
}
;
CGFcamera.prototype.zoom = function(a) {
    vec4.add(this.position, this.position, vec4.scale(vec4.create(), this.direction, a));
}
;
function CGFinterfaceCamera(a, b, c) {
    CGFcamera.call(this, a, b, c, [10, 10, 10], [0, 0, 0]);
    this.translation = [0, 0, 0];
    this.rotation = [0.52, 0.79, 0];
    this.distance = 50;
    this._positionMatrix = mat4.create();
    this._invPositionMatrix = mat4.create();
}
CGFinterfaceCamera.prototype = Object.create(CGFcamera.prototype);
CGFinterfaceCamera.prototype.constructor = CGFinterfaceCamera;
CGFinterfaceCamera.prototype.getViewMatrix = function() {
    vec4.set(this.position, 0, 0, this.distance, 1);
    vec4.set(this.target, 0, 0, 0, 1);
    vec3.set(this._up, 0, 1, 0);
    vec4.set(this.direction, 0, 0, -1, 0);
    mat4.lookAt(this._viewMatrix, this.position, this.target, this._up);
    mat4.identity(this._positionMatrix);
    mat4.rotateZ(this._positionMatrix, this._positionMatrix, this.rotation[2]);
    mat4.rotateX(this._positionMatrix, this._positionMatrix, this.rotation[0]);
    mat4.rotateY(this._positionMatrix, this._positionMatrix, -this.rotation[1]);
    mat4.translate(this._positionMatrix, this._positionMatrix, this.translation);
    mat4.invert(this._invPositionMatrix, this._positionMatrix);
    vec4.transformMat4(this.position, this.position, this._invPositionMatrix);
    vec4.transformMat4(this.target, this.target, this._invPositionMatrix);
    vec4.transformMat4(this.direction, this.direction, this._invPositionMatrix);
    vec3.transformMat4(this._up, this._up, this._invPositionMatrix);
    mat4.multiply(this._viewMatrix, this._viewMatrix, this._positionMatrix);
    return this._viewMatrix;
}
;
CGFinterfaceCamera.prototype.setDistance = function(a) {
    this.distance = a;
    this.clampDistance();
}
;
CGFinterfaceCamera.prototype.clampDistance = function() {
    if (this.distance < this.near)
        this.distance = this.near;
    else if (this.distance > this.far)
        this.distance = this.far;
}
;
CGFinterfaceCamera.prototype.roll = function(a) {
    this.rotate(CGFcameraAxis.Z, a);
}
;
CGFinterfaceCamera.prototype.orbit = function(a, b) {
    this.rotation[a] += b;
}
;
CGFinterfaceCamera.prototype.rotate = function(a, b) {
    this.rotation[a] += b;
}
;
CGFinterfaceCamera.prototype.zoom = function(a) {
    this.distance -= a;
    this.clampDistance();
}
;
CGFinterfaceCamera.prototype.translate = function(a) {
    vec4.add(this.translation, this.translation, a);
}
;
CGFinterfaceCamera.prototype.pan = function(a) {
    a[3] = 0.0;
    vec4.transformMat4(a, a, this._invPositionMatrix);
    vec4.sub(this.translation, this.translation, a);
}
;
function CGFcameraOrtho(a, b, c, d, e, f, g, h, i) {
    this.left = a;
    this.right = b;
    this.bottom = c;
    this.top = d;
    this.near = e;
    this.far = f;
    this.position = vec4.fromValues(g[0], g[1], g[2], 0.0);
    this.target = vec4.fromValues(h[0], h[1], h[2], 0.0);
    this.direction = this.calculateDirection();
    this._up = i;
    this._viewMatrix = mat4.create();
    this._projectionMatrix = mat4.create();
}
CGFcameraOrtho.prototype.getViewMatrix = function() {
    mat4.lookAt(this._viewMatrix, this.position, this.target, this._up);
    return this._viewMatrix;
}
;
CGFcameraOrtho.prototype.getProjectionMatrix = function(a, b) {
    var c = a / b;
    mat4.ortho(this._projectionMatrix, this.left, this.right, this.bottom, this.top, this.near, this.far);
    return this._projectionMatrix;
}
;
CGFcameraOrtho.prototype.calculateDirection = function() {
    return vec4.normalize(vec4.create(), vec4.subtract(vec4.create(), this.target, this.position));
}
;
CGFcameraOrtho.prototype.setPosition = function(a) {
    vec3.copy(this.position, a);
    this.direction = this.calculateDirection();
}
;
CGFcameraOrtho.prototype.setTarget = function(a) {
    vec3.copy(this.target, a);
    this.direction = this.calculateDirection();
}
;
CGFcameraOrtho.prototype.translate = function(a) {
    var b = vec4.scale(vec4.create(), this.direction, -a[2]);
    var c = vec4.fromValues(0.0, a[1], 0.0, 0.0);
    var d = vec3.create();
    vec3.scale(d, vec3.cross(d, vec3.fromValues(0, 1, 0), this.direction), a[0]);
    var e = vec4.fromValues(d[0], d[1], d[2], 0);
    var f = vec4.create();
    f = vec4.add(f, b, vec4.add(f, c, e));
    vec4.add(this.position, this.position, f);
    vec4.add(this.target, this.position, this.direction);
}
;
CGFcameraOrtho.prototype.rotate = function(a, b) {
    vec4.transformMat4(this.direction, this.direction, mat4.rotate(mat4.create(), mat4.create(), b, a));
    vec4.add(this.target, this.position, this.direction);
}
;
CGFcameraOrtho.prototype.orbit = function(a, b) {
    var c = vec4.sub(vec4.create(), this.position, this.target);
    c[3] = 0;
    var d;
    if (a == CGFcameraAxisID.X) {
        var e = vec3.create();
        vec3.normalize(e, vec3.cross(e, c, this._up));
        var f = mat4.rotate(mat4.create(), mat4.create(), b, e);
        d = vec4.transformMat4(vec4.create(), c, f);
        vec3.normalize(this._up, vec3.cross(this._up, e, d));
    } else
        d = vec4.transformMat4(vec4.create(), c, mat4.rotate(mat4.create(), mat4.create(), b, this._up));
    vec4.add(this.position, this.target, d);
    this.direction = this.calculateDirection();
}
;
CGFcameraOrtho.prototype.pan = function(a) {
    var b = 0.05 * vec3.distance(this.target, this.position);
    var c = vec3.cross(vec3.create(), this.direction, this._up);
    var d = vec4.scale(vec4.create(), vec3.normalize(c, c), a[0] * b);
    d[3] = 0;
    var e = vec4.scale(vec4.create(), this._up, a[1] * b);
    e[3] = 0;
    vec4.add(this.position, this.position, d);
    vec4.add(this.target, this.target, d);
    vec4.add(this.position, this.position, e);
    vec4.add(this.target, this.target, e);
}
;
CGFcameraOrtho.prototype.zoom = function(a) {
    vec4.add(this.position, this.position, vec4.scale(vec4.create(), this.direction, a));
}
;
CGFcameraOrtho.prototype.setUp = function(a) {
    this._up = a;
}
;
function CGFlight(a, b) {
    CGFobject.call(this, a);
    this.scene = a;
    this.id = b;
    console.log("Created Light " + b);
    this.setPosition(0, 0, 0, 1);
    this.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.setSpecular(0.5, 0.5, 0.5, 1.0);
    this.setSpotDirection(0, -1, 0);
    this.setSpotExponent(10);
    this.setSpotCutOff(180);
    this.setConstantAttenuation(1);
    this.setLinearAttenuation(0);
    this.setQuadraticAttenuation(0);
    this.visible = false;
    this.initBuffers();
}
;CGFlight.prototype = Object.create(CGFobject.prototype);
CGFlight.prototype.constructor = CGFlight;
CGFlight.prototype.initBuffers = function() {
    this.vertices = [-0.5, 0, 0, 0, 0.5, 0, 0.5, 0, 0, 0, -0.5, 0, 0, 0, 0.5, 0, 0, -0.5];
    this.indices = [1, 4, 0, 1, 2, 4, 1, 5, 2, 1, 0, 5, 3, 0, 4, 3, 4, 2, 3, 2, 5, 3, 5, 0];
    this.normals = [1, 0, 0, 0, -1, 0, -1, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1];
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
CGFlight.prototype.enable = function() {
    this.enabled = true;
}
;
CGFlight.prototype.disable = function() {
    this.enabled = false;
}
;
CGFlight.prototype.setPosition = function(a, b, c, d) {
    this.position = [a, b, c, d];
}
;
CGFlight.prototype.setAmbient = function(a, b, c, d) {
    this.ambient = [a, b, c, d];
}
;
CGFlight.prototype.setDiffuse = function(a, b, c, d) {
    this.diffuse = [a, b, c, d];
}
;
CGFlight.prototype.setSpecular = function(a, b, c, d) {
    this.specular = [a, b, c, d];
}
;
CGFlight.prototype.setSpotDirection = function(a, b, c) {
    this.spot_direction = [a, b, c, 1.0];
}
;
CGFlight.prototype.setSpotExponent = function(a) {
    this.spot_exponent = a;
}
;
CGFlight.prototype.setSpotCutOff = function(a) {
    this.spot_cutoff = a;
}
;
CGFlight.prototype.setConstantAttenuation = function(a) {
    this.constant_attenuation = a;
}
;
CGFlight.prototype.setLinearAttenuation = function(a) {
    this.linear_attenuation = a;
}
;
CGFlight.prototype.setQuadraticAttenuation = function(a) {
    this.quadratic_attenuation = a;
}
;
CGFlight.prototype.update = function() {
    this.tPosition = [0, 0, 0, 0];
    this.tDirection = [0, 0, 0, 0];
    this.scene.updateInverseMatrix();
    vec4.transformMat4(this.tDirection, this.spot_direction, this.scene.invMatrix);
    vec4.transformMat4(this.tPosition, this.position, this.scene.activeMatrix);
    this.updateShader();
    if (this.visible) {
        this.scene.setDiffuse(0.5, 0.5, 0.5, 1);
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(0.3, 0.3, 0.3);
        this.display();
        this.scene.popMatrix();
    }
    ;
}
;
CGFlight.prototype.updateShader = function() {
    var a = this.scene.gl;
    if (!this.scene.pickMode)
        try {
            var b = this.scene.activeShader.uniforms.uLight[this.id];
            a.uniform1i(b.enabled, this.enabled);
            a.uniform4fv(b.position, this.tPosition);
            a.uniform4fv(b.ambient, this.ambient);
            a.uniform4fv(b.diffuse, this.diffuse);
            a.uniform4fv(b.specular, this.specular);
            a.uniform3fv(b.spot_direction, [this.tDirection[0], this.tDirection[1], this.tDirection[2]]);
            a.uniform1f(b.spot_exponent, this.spot_exponent);
            a.uniform1f(b.spot_cutoff, this.spot_cutoff);
            a.uniform1f(b.constant_attenuation, this.constant_attenuation);
            a.uniform1f(b.linear_attenuation, this.linear_attenuation);
            a.uniform1f(b.quadratic_attenuation, this.quadratic_attenuation);
        } catch (c) {
            console.log("CGFlight.updateShader: Problem updating light " + this.id);
        }
    ;;
}
;
CGFlight.prototype.setVisible = function(a) {
    this.visible = a;
}
;
function CGFapplication(a) {
    this.element = a;
    this.initialized = false;
    this.gl = null;
}
CGFapplication.prototype.init = function() {
    if (this.initialized)
        return true;
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage({
            parent: this.element
        });
        return false;
    }
    var a = document.createElement("canvas");
    this.gl = a.getContext("webgl", {
        antialias: true
    }) || a.getContext("experimental-webgl", {
        antialias: true
    });
    if (!this.gl) {
        Detector.addGetWebGLMessage({
            parent: this.element
        });
        return false;
    }
    this.initialized = true;
    this.element.appendChild(this.gl.canvas);
    this.initScene();
    this.initInterface();
    window.addEventListener("resize", this.resizeCanvas(this.gl));
    this.resizeCanvas(this.gl)();
    return true;
}
;
CGFapplication.prototype.resizeCanvas = function(a) {
    return function() {
        console.log("resize");
        if (!a)
            return;
        var b = window.innerWidth;
        var c = window.innerHeight;
        console.log("clientWidth: " + b + ", clientHeight: " + c);
        if (a.canvas.width != b || a.canvas.height != c) {
            console.log("width: " + a.canvas.width + ", height: " + a.canvas.height);
            a.canvas.width = b;
            a.canvas.height = c;
        }
    }
    ;
}
;
CGFapplication.prototype.setScene = function(a) {
    this.scene = a;
    if (this.initialized)
        this.scene.init(this);
}
;
CGFapplication.prototype.setInterface = function(a) {
    this.interface = a;
    if (this.initialized)
        this.interface.init(this);
}
;
CGFapplication.prototype.initScene = function() {
    if (this.scene && this.initialized)
        return this.scene.init(this);
    return false;
}
;
CGFapplication.prototype.initInterface = function() {
    if (this.interface && this.initialized)
        return this.interface.init(this);
    return false;
}
;
CGFapplication.prototype.run = function() {
    var a = this;
    function b() {
        requestAnimationFrame(b, a.gl.canvas);
        if (a.interface)
            a.interface.update();
        if (a.scene) {
            a.scene.checkUpdate();
            a.scene.displayWithPick();
        }
    }
    b();
}
;
function CGFplane(a, b) {
    CGFobject.call(this, a);
    this.numDivisions = b ? b + 1.0 : 2.0;
    this.initBuffers();
    this.wireframe = false;
}
CGFplane.prototype = Object.create(CGFobject.prototype);
CGFplane.prototype.constructor = CGFplane;
CGFplane.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    for (var a = 0; a < this.numDivisions; ++a)
        for (var b = 0; b < this.numDivisions; ++b) {
            this.vertices.push(a, 0, b);
            this.normals.push(0, 1, 0);
        }
    var c = 0;
    for (var a = 0; a < this.numDivisions - 1; ++a) {
        this.indices.push(c);
        var b;
        for (b = 0; b < this.numDivisions - 1; ++b) {
            this.indices.push(c + (b + 1));
            this.indices.push(c + this.numDivisions + b);
        }
        c += this.numDivisions;
        this.indices.push(c + b);
    }
    this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
    this.initGLBuffers();
}
;
CGFplane.prototype.display = function() {
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0.0, -0.5);
    var a = 1.0 / (this.numDivisions - 1);
    this.scene.scale(a, 1.0, a);
    this.drawElements(this.primitiveType);
    this.scene.popMatrix();
}
;
var indexOf = function(a) {
    if (typeof Array.prototype.indexOf === 'function')
        indexOf = Array.prototype.indexOf;
    else
        indexOf = function(a) {
            var b = -1
              , c = -1;
            for (b = 0; b < this.length; b++)
                if (this[b] === a) {
                    c = b;
                    break;
                }
            return c;
        }
        ;
    return indexOf.call(this, a);
};
CGFXMLreader = function() {
    this.xmlhttp = null;
    this.xmlDoc = null;
    this.xmlfile = null;
    this.parserObj = null;
    this.errorMessage = null;
}
;
CGFXMLreader.prototype.constructor = CGFXMLreader;
CGFXMLreader.prototype.getErrorMessage = function() {
    return this.errorMessage;
}
;
CGFXMLreader.prototype.open = function(a, b) {
    this.xmlfile = a;
    if (!b.onXMLReady)
        console.error("CGFXMLReader.open: onXMLReady handler not defined.");
    if (!b.onXMLError)
        console.error("CGFXMLReader.open: onXMLError handler not defined.");
    this.parserObj = b;
    if (window.XMLHttpRequest)
        this.xmlhttp = new XMLHttpRequest();
    else if (window.ActiveXObject)
        this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    if (this.xmlhttp != null) {
        this.xmlhttp.onload = this.onStateChange;
        this.xmlhttp.reader = this;
        this.xmlhttp.open("GET", a, true);
        this.xmlhttp.setRequestHeader("Content-Type", "text/xml");
        this.xmlhttp.send(null);
    } else {
        reader.parserObj.onXMLError("The XMLHttpRequest is not supported");
        return;
    }
}
;
CGFXMLreader.prototype.onStateChange = function() {
    if (this.readyState == 4)
        if (this.status == 200) {
            var a = new window.DOMParser();
            var b = this.reader;
            b.xmlDoc = a.parseFromString(this.response, "text/xml");
            b.parserObj.onXMLReady();
            if (b.getErrorMessage() != null) {
                b.parserObj.onXMLError(b.getErrorMessage());
                return;
            }
        } else {
            var b = this.reader;
            b.parserObj.onXMLError(this.status + ": " + b.xmlfile + ", " + this.statusText);
        }
}
;
CGFXMLreader.prototype.getRGBA = function(a, b, c) {
    if (c == undefined)
        c = true;
    if (a == null) {
        console.error("element is null.");
        return null;
    }
    if (b == null) {
        console.error("color (rgba) attribute name is null.");
        return null;
    }
    var d = a.getAttribute(b);
    if (d == null) {
        if (c)
            console.error("color (rgba) value is null for attribute " + b + ".");
        return null;
    }
    var e = d.split(' ');
    if (e.length != 4) {
        console.error("invalid " + e.length + " number of color components for color (rgba) in attribute " + b + ".");
        return null;
    }
    var f = new Array();
    for (var g = 0; g < 4; g++)
        f.push(parseFloat(e[g]));
    return f;
}
;
CGFXMLreader.prototype.getVector3 = function(a, b, c) {
    if (c == undefined)
        c = true;
    if (a == null) {
        console.error("element is null.");
        return null;
    }
    if (b == null) {
        console.error("vector3 attribute name is null.");
        return null;
    }
    var d = a.getAttribute(b);
    if (d == null) {
        if (c)
            console.error("vector3 value is null for attribute " + b + ".");
        return null;
    }
    var e = d.split(' ');
    if (e.length != 3) {
        console.error("invalid " + e.length + " number of components for a vector3, in attribute " + b + ".");
        return null;
    }
    var f = new Array();
    for (var g = 0; g < 3; g++)
        f.push(parseFloat(e[g]));
    return f;
}
;
CGFXMLreader.prototype.getVector2 = function(a, b, c) {
    if (c == undefined)
        c = true;
    if (a == null) {
        console.error("element is null.");
        return null;
    }
    if (b == null) {
        console.error("vector3 attribute name is null.");
        return null;
    }
    var d = a.getAttribute(b);
    if (d == null) {
        if (c)
            console.error("vector2 value is null for attribute " + b + ".");
        return null;
    }
    var e = d.split(' ');
    if (e.length != 2) {
        console.error("invalid " + e.length + " number of components for a vector2, in attribute " + b + ".");
        return null;
    }
    var f = new Array();
    for (var g = 0; g < 2; g++)
        f.push(parseFloat(e[g]));
    return f;
}
;
CGFXMLreader.prototype.getItem = function(a, b, c, d) {
    if (d == undefined)
        d = true;
    if (a == null) {
        console.error("element is null.");
        return null;
    }
    if (b == null) {
        console.error("item attribute name is null.");
        return null;
    }
    var e = a.getAttribute(b);
    if (e == null) {
        if (d)
            console.error("item value is null for attribute " + b + ".");
        return null;
    }
    e = e.toLowerCase();
    var f = indexOf.call(c, e);
    if (f < 0) {
        console.error("value '" + e + "' is not a choice in [" + c.toString() + "]");
        return null;
    }
    return e;
}
;
CGFXMLreader.prototype.getString = function(a, b, c) {
    if (c == undefined)
        c = true;
    if (a == null) {
        console.error("element is null.");
        return null;
    }
    if (b == null) {
        console.error("string attribute name is null.");
        return null;
    }
    var d = a.getAttribute(b);
    if (d == null && c) {
        console.error("string value is null for attribute " + b + ".");
        return null;
    }
    return d;
}
;
CGFXMLreader.prototype.hasAttribute = function(a, b) {
    if (a == null) {
        console.error("element is null.");
        return null;
    }
    if (b == null) {
        console.error("string attribute name is null.");
        return null;
    }
    var c = a.getAttribute(b);
    return (c != null);
}
;
CGFXMLreader.prototype.getBoolean = function(a, b, c) {
    if (c == undefined)
        c = true;
    var d = this.getItem(a, b, ["true", "t", "1", "false", "f", "0"], c);
    if (d == null)
        return null;
    if (d == "1" || d == "true" || d == "t")
        return true;
    return false;
}
;
CGFXMLreader.prototype.getInteger = function(a, b, c) {
    if (c == undefined)
        c = true;
    var d = this.getString(a, b, c);
    if (d == null)
        return null;
    return parseInt(d);
}
;
CGFXMLreader.prototype.getFloat = function(a, b, c) {
    if (c == undefined)
        c = true;
    var d = this.getString(a, b, c);
    if (d == null)
        return null;
    return parseFloat(d);
}
;
CGFnurbsUtils = {
    findSpan: function(a, b, c) {
        var d = c.length - a - 1;
        if (b >= c[d])
            return d - 1;
        if (b <= c[a])
            return a;
        var e = a;
        var f = d;
        var g = Math.floor((e + f) / 2);
        while (b < c[g] || b >= c[g + 1]) {
            if (b < c[g])
                f = g;
            else
                e = g;
            g = Math.floor((e + f) / 2);
        }
        return g;
    },
    calcBasisFunctions: function(a, b, c, d) {
        var e = [];
        var f = [];
        var g = [];
        e[0] = 1.0;
        for (var h = 1; h <= c; ++h) {
            f[h] = b - d[a + 1 - h];
            g[h] = d[a + h] - b;
            var i = 0.0;
            for (var j = 0; j < h; ++j) {
                var k = g[j + 1];
                var l = f[h - j];
                var m = e[j] / (k + l);
                e[j] = i + k * m;
                i = l * m;
            }
            e[h] = i;
        }
        return e;
    },
    calcBSplinePoint: function(a, b, c, d) {
        var e = this.findSpan(a, d, b);
        var f = this.calcBasisFunctions(e, d, a, b);
        var g = new vec4.fromValues(0,0,0,0);
        for (var h = 0; h <= a; ++h) {
            var i = c[e - a + h];
            var j = f[h];
            var k = i[3] * j;
            g[0] += i[0] * k;
            g[1] += i[1] * k;
            g[2] += i[2] * k;
            g[3] += i[3] * j;
        }
        return g;
    },
    calcBasisFunctionDerivatives: function(a, b, c, d, e) {
        var f = [];
        for (var g = 0; g <= c; ++g)
            f[g] = 0.0;
        var h = [];
        for (var g = 0; g <= d; ++g)
            h[g] = f.slice(0);
        var i = [];
        for (var g = 0; g <= c; ++g)
            i[g] = f.slice(0);
        i[0][0] = 1.0;
        var j = f.slice(0);
        var k = f.slice(0);
        for (var l = 1; l <= c; ++l) {
            j[l] = b - e[a + 1 - l];
            k[l] = e[a + l] - b;
            var m = 0.0;
            for (var n = 0; n < l; ++n) {
                var o = k[n + 1];
                var p = j[l - n];
                i[l][n] = o + p;
                var q = i[n][l - 1] / i[l][n];
                i[n][l] = m + o * q;
                m = p * q;
            }
            i[l][l] = m;
        }
        for (var l = 0; l <= c; ++l)
            h[0][l] = i[l][c];
        for (var n = 0; n <= c; ++n) {
            var r = 0;
            var s = 1;
            var t = [];
            for (var g = 0; g <= c; ++g)
                t[g] = f.slice(0);
            t[0][0] = 1.0;
            for (var u = 1; u <= d; ++u) {
                var v = 0.0;
                var w = n - u;
                var x = c - u;
                if (n >= u) {
                    t[s][0] = t[r][0] / i[x + 1][w];
                    v = t[s][0] * i[w][x];
                }
                var y = (w >= -1) ? 1 : -w;
                var z = (n - 1 <= x) ? u - 1 : c - n;
                for (var l = y; l <= z; ++l) {
                    t[s][l] = (t[r][l] - t[r][l - 1]) / i[x + 1][w + l];
                    v += t[s][l] * i[w + l][x];
                }
                if (n <= x) {
                    t[s][u] = -t[r][u - 1] / i[x + 1][n];
                    v += t[s][u] * i[n][x];
                }
                h[u][n] = v;
                var l = r;
                r = s;
                s = l;
            }
        }
        var n = c;
        for (var u = 1; u <= d; ++u) {
            for (var l = 0; l <= c; ++l)
                h[u][l] *= n;
            n *= c - u;
        }
        return h;
    },
    calcBSplineDerivatives: function(a, b, c, d, e) {
        var f = e < a ? e : a;
        var g = [];
        var h = this.findSpan(a, d, b);
        var i = this.calcBasisFunctionDerivatives(h, d, a, f, b);
        var j = [];
        for (var k = 0; k < c.length; ++k) {
            var l = c[k].clone();
            var m = l[3];
            l[0] *= m;
            l[1] *= m;
            l[2] *= m;
            j[k] = l;
        }
        for (var n = 0; n <= f; ++n) {
            var l = j[h - a].clone().multiplyScalar(i[n][0]);
            for (var o = 1; o <= a; ++o)
                l.add(j[h - a + o].clone().multiplyScalar(i[n][o]));
            g[n] = l;
        }
        for (var n = f + 1; n <= e + 1; ++n)
            g[n] = vec4.fromValues(0, 0, 0, 0);
        return g;
    },
    calcKoverI: function(a, b) {
        var c = 1;
        for (var d = 2; d <= a; ++d)
            c *= d;
        var e = 1;
        for (var d = 2; d <= b; ++d)
            e *= d;
        for (var d = 2; d <= a - b; ++d)
            e *= d;
        return c / e;
    },
    calcRationalCurveDerivatives: function(a) {
        var b = a.length;
        var c = [];
        var d = [];
        for (var e = 0; e < b; ++e) {
            var f = a[e];
            c[e] = vec3.fromValues(f[0], f[1], f[2]);
            d[e] = f[3];
        }
        var g = [];
        for (var h = 0; h < b; ++h) {
            var i = c[h].clone();
            for (var e = 1; e <= h; ++e)
                i.sub(g[h - e].clone().multiplyScalar(this.calcKoverI(h, e) * d[e]));
            g[h] = i.divideScalar(d[0]);
        }
        return g;
    },
    calcNURBSDerivatives: function(a, b, c, d, e) {
        var f = this.calcBSplineDerivatives(a, b, c, d, e);
        return this.calcRationalCurveDerivatives(f);
    },
    calcSurfacePoint: function(a, b, c, d, e, f, g) {
        var h = this.findSpan(a, f, c);
        var i = this.findSpan(b, g, d);
        var j = this.calcBasisFunctions(h, f, a, c);
        var k = this.calcBasisFunctions(i, g, b, d);
        var l = [];
        for (var m = 0; m <= b; ++m) {
            l[m] = vec4.fromValues(0, 0, 0, 0);
            for (var n = 0; n <= a; ++n) {
                var o = vec4.clone(e[h - a + n][i - b + m]);
                var p = o[3];
                o[0] *= p;
                o[1] *= p;
                o[2] *= p;
                var q = [];
                vec4.scale(q, o, j[n]);
                vec4.add(l[m], l[m], q);
            }
        }
        var r = new vec4.fromValues(0,0,0,0);
        for (var m = 0; m <= b; ++m) {
            var s = [];
            vec4.scale(s, l[m], k[m]);
            vec4.add(r, r, s);
        }
        r[0] = r[0] / r[3];
        r[1] = r[1] / r[3];
        r[2] = r[2] / r[3];
        return new vec3.fromValues(r[0],r[1],r[2]);
    }
};
CGFnurbsSurface = function(a, b, c) {
    this.degree1 = a;
    this.degree2 = b;
    this.knots1 = this.generateKnots(a);
    this.knots2 = this.generateKnots(b);
    this.controlPoints = [];
    var d = a + 1;
    var e = b + 1;
    for (var f = 0; f < d; ++f) {
        this.controlPoints[f] = [];
        for (var g = 0; g < e; ++g) {
            var h = c[f][g];
            this.controlPoints[f][g] = new vec4.fromValues(h[0],h[1],h[2],h[3]);
        }
    }
}
;
CGFnurbsSurface.prototype = {
    constructor: CGFnurbsSurface,
    getPoint: function(a, b) {
        var c = this.knots1[0] + a * (this.knots1[this.knots1.length - 1] - this.knots1[0]);
        var d = this.knots2[0] + b * (this.knots2[this.knots2.length - 1] - this.knots2[0]);
        return CGFnurbsUtils.calcSurfacePoint(this.degree1, this.degree2, this.knots1, this.knots2, this.controlPoints, c, d);
    },
    generateKnots: function(a) {
        n = a + 1;
        res = [];
        for (v = 0; v <= 1; v++)
            for (i = 0; i < n; i++)
                res.push(v);
        return res;
    }
};
CGFnurbsObject = function(a, b, c, d) {
    CGFobject.call(this, a);
    this.evalObj = d;
    this.slices = b;
    this.stacks = c;
    this.initBuffers();
    this.wireframe = false;
    this.pickingEnabled = true;
}
;
CGFnurbsObject.prototype = Object.create(CGFobject.prototype);
CGFnurbsObject.prototype.constructor = CGFnurbsObject;
CGFnurbsObject.prototype.initBuffers = function() {
    this.vertices = [];
    this.faceNormals = [];
    this.texCoords = [];
    this.colors = [];
    this.indices = [];
    this.faces = [];
    var a, b, c;
    var d, e;
    var f = this.slices + 1;
    var g;
    for (a = 0; a <= this.stacks; a++) {
        e = a / this.stacks;
        for (b = 0; b <= this.slices; b++) {
            d = b / this.slices;
            c = this.evalObj.getPoint(d, e);
            this.vertices.push(c[0]);
            this.vertices.push(c[1]);
            this.vertices.push(c[2]);
            g = vec2.fromValues(b / this.slices, a / this.stacks);
            this.texCoords.push(g[0]);
            this.texCoords.push(1.0 - g[1]);
        }
    }
    var h, i, j, k;
    for (a = 0; a < this.stacks; a++)
        for (b = 0; b < this.slices; b++) {
            h = a * f + b;
            i = a * f + b + 1;
            j = (a + 1) * f + b + 1;
            k = (a + 1) * f + b;
            this.indices.push(h);
            this.indices.push(i);
            this.indices.push(k);
            this.faceNormals.push(this.computeFaceNormal(h, i, k, f));
            this.indices.push(i);
            this.indices.push(j);
            this.indices.push(k);
            this.faceNormals.push(this.computeFaceNormal(i, j, k, f));
        }
    this.normals = this.computeVertexNormals();
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
CGFnurbsObject.prototype.computeFaceNormal = function(a, b, c, d) {
    var e = (a * 3);
    var f = (b * 3);
    var g = (c * 3);
    var h = vec3.fromValues(this.vertices[e], this.vertices[e + 1], this.vertices[e + 2]);
    var i = vec3.fromValues(this.vertices[f], this.vertices[f + 1], this.vertices[f + 2]);
    var j = vec3.fromValues(this.vertices[g], this.vertices[g + 1], this.vertices[g + 2]);
    var k = vec3.create();
    var l = vec3.create();
    var m = vec3.create();
    vec3.subtract(k, i, h);
    vec3.subtract(l, j, h);
    vec3.cross(m, k, l);
    vec3.normalize(m, m);
    return m;
}
;
CGFnurbsObject.prototype.computeVertexNormals = function() {
    var a = this.vertices.length;
    var b = new Array(a);
    for (var c = 0; c < a; c++)
        b[c] = vec3.fromValues(0.0, 0.0, 0.0);
    var d, e, f;
    var g;
    var h = 0;
    var i = this.indices.length;
    for (var c = 0; c < i; c += 3) {
        g = this.faceNormals[h];
        d = this.indices[c + 0];
        e = this.indices[c + 1];
        f = this.indices[c + 2];
        vec3.add(b[d], b[d], g);
        vec3.add(b[e], b[e], g);
        vec3.add(b[f], b[f], g);
        h++;
    }
    var j = [];
    for (var c = 0; c < a; c++) {
        vec3.normalize(b[c], b[c]);
        j.push(b[c][0], b[c][1], b[c][2]);
    }
    return j;
}
;
CGFnurbsObject.prototype.display = function() {
    this.scene.pushMatrix();
    this.drawElements(this.primitiveType);
    this.scene.popMatrix();
}
;
