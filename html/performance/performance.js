handleAddListener('load', getTiming)

function handleAddListener(type, fn) {
  if (window.addEventListener) {
    window.addEventListener(type, fn)
  } else {
    window.attachEvent('on' + type, fn)
  }
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

    const source = resourceHandler();
    const time = timingHandler();

    return { source, time }

  } catch (e) {
    console.error(resource)
    console.error(performance.timing);
  }
}