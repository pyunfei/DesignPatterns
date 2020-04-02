(function (global, factory) {
  "use strict";
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ?
      factory(global, true) :
      function (w) {
        if (!w.document) {
          throw new Error("performance requires a window with a document");
        }
        return factory(w);
      };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

  per = function () {
    return new Per();
  }

  function Per() {
    this.init();
    // this.render();
  }

  var value = {};

  Per.prototype.getValue = function () {
    return value;
  }

  Per.prototype.getText = function () {
    return {
      "Redirect": "重定向时间",
      "DNS": "DNS解析时间",
      "TCP": "TCP完成握手时间",
      "HTTP": "HTTP请求响应完成时间",
      "DOMReady": "DOM开始加载前所花费时间",
      "DOMSuccess": "DOM加载完成时间",
      "DOMParseSuc": "DOM结构解析完成时间",
      "ScriptSuc": "脚本加载时间",
      "OnLoad": "onload事件时间",
      "LoadAll": "页面完全加载时间",
    }
  }

  Per.prototype.init = function () {
    const handleAddListener = (type, fn) => {
      if (window.addEventListener) {
        window.addEventListener(type, fn())
      } else {
        window.attachEvent('on' + type, fn())
      }
    }
    handleAddListener('load', getTiming);
  }

  function getTiming() {
    try {
      timingHandler = function () {
        var time = performance.timing;
        var resource = {};
        var loadTime = (time.loadEventEnd - time.loadEventStart) / 1000;
        if (loadTime < 0) {
          setTimeout(function () {
            getTiming();
          }, 50);
          return;
        }
        resource['Redirect'] = (time.redirectEnd - time.redirectStart) / 1000;
        resource['DNS'] = (time.domainLookupEnd - time.domainLookupStart) / 1000;
        resource['TCP'] = (time.connectEnd - time.connectStart) / 1000;
        resource['HTTP'] = (time.responseEnd - time.requestStart) / 1000;
        resource['DOMReady'] = (time.responseEnd - time.navigationStart) / 1000;
        resource['DOMSuccess'] = (time.domComplete - time.domLoading) / 1000;
        resource['DOMParseSuc'] = (time.domInteractive - time.domLoading) / 1000;
        resource['ScriptSuc'] = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000;
        resource['OnLoad'] = (time.loadEventEnd - time.loadEventStart) / 1000;
        resource['LoadAll'] = (resource['Redirect'] + resource['DNS'] + resource['TCP'] + resource['HTTP'] + resource['DOMParseSuc'] + resource['DOMSuccess']);

        return resource;
      }

      resourceHandler = function () {
        if (performance) {
          var resource = performance.getEntries(), js = {
            num: 0,
            duration: 0
          }, css = {
            num: 0,
            duration: 0
          }, img = {
            num: 0,
            duration: 0
          };
          for (var i = 0; i < resource.length; i++) {
            if (resource[i].initiatorType == 'img') {
              img.num++;
              img.duration += resource[i].duration;
            } else if (resource[i].initiatorType == 'script') {
              js.num++;
              js.duration += resource[i].duration;
            } else if (resource[i].initiatorType == 'css' || resource[i].initiatorType == 'link') {
              css.num++;
              css.duration += resource[i].duration;
            }
          };
          return { js: js, css: css, img: img };
        }
      };

      // const source = resourceHandler();
      const time = timingHandler();

      value = { time }

    } catch (e) {
      console.error(resource)
      console.error(performance.timing);
    }
  }

  if (!noGlobal) {
    window.per = window._ = per;
  }

  return per;
});