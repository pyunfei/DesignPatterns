; +function (host) {
  'use strict';
  var performance = host.performance, timing, dnsDuration, tcpDuration, requestDuration, domDuration, whiteTime, domreadyTime, onloadTime, panel,
    getDom = function (str) {
      return document.getElementById(str);
    },
    getWidth = function () {
      return window.innerWidth || document.documentElement.clientWidth;
    },
    setPercent = function (id, minSec) {
      var el = getDom('performance-' + id);
      var per = Math.round(minSec / onloadTime * 100);
      if (per) {
        per = per * .7;
      }
      el.querySelector('.performance-color').style.width = per + '%';
      el.querySelector('.performance-bar-value').innerHTML = minSec + 'ms';
    },
    initDom = function () {
      var c;
      panel = getDom('performance');
      if (!panel) {
        c = document.createElement('div');
        c.innerHTML = container;
        document.body.appendChild(c);
        //document.querySelector('#performance').style.left = '-'+(getWidth()/2)+'px';
        panel = getDom('performance');
      }
    },
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
  setTimeout(function () {
    if (performance) {
      timing = performance.timing;
      dnsDuration = timing.domainLookupEnd - timing.domainLookupStart;
      tcpDuration = timing.connectEnd - timing.connectStart;
      requestDuration = timing.responseEnd - timing.responseStart;
      domDuration = timing.domComplete - timing.domInteractive;
      whiteTime = timing.responseStart - timing.navigationStart;
      domreadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
      onloadTime = timing.loadEventEnd - timing.navigationStart;
      initDom();
      var resource = resourceHandler();
      document.querySelector('#performance-js').querySelector('.performance-color').innerHTML = resource.js.num;
      document.querySelector('#performance-js').querySelector('.performance-bar-value').innerHTML = (resource.js.duration / 1000).toFixed(2) + 's';
      document.querySelector('#performance-css').querySelector('.performance-color').innerHTML = resource.css.num;
      document.querySelector('#performance-css').querySelector('.performance-bar-value').innerHTML = (resource.css.duration / 1000).toFixed(2) + 's';
      document.querySelector('#performance-img').querySelector('.performance-color').innerHTML = resource.img.num;
      document.querySelector('#performance-img').querySelector('.performance-bar-value').innerHTML = (resource.img.duration / 1000).toFixed(2) + 's';
      setTimeout(function () {
        document.querySelector('.performance').classList.add('anim');
        setPercent('dnsDuration', dnsDuration);
        setPercent('tcpDuration', tcpDuration);
        setPercent('requestDuration', requestDuration);
        setPercent('domDuration', domDuration);
        setPercent('whiteTime', whiteTime);
        setPercent('domreadyTime', domreadyTime);
        setPercent('onloadTime', onloadTime);
        getDom('performance-close').addEventListener('click', function () {
          panel.parentNode.parentNode.removeChild(panel.parentNode);
        });
      }, 20);
    } else {
      console.log('no performance api');
    }
  }, 500);
}(this);