(function() {
  var baseWidth = 640;
  var baseHeight = 360;
  var pending = false;

  function fitFrame(frame) {
    var iframe = frame.querySelector('iframe');
    if (!iframe) return;

    var width = frame.clientWidth;
    if (width > 0 && width < baseWidth) {
      var scale = width / baseWidth;
      frame.style.aspectRatio = 'auto';
      frame.style.height = Math.round(baseHeight * scale) + 'px';
      iframe.style.width = baseWidth + 'px';
      iframe.style.height = baseHeight + 'px';
      iframe.style.maxWidth = 'none';
      iframe.style.transform = 'scale(' + scale + ')';
      iframe.style.transformOrigin = 'top left';
      return;
    }

    frame.style.aspectRatio = '';
    frame.style.height = '';
    iframe.style.width = '';
    iframe.style.height = '';
    iframe.style.maxWidth = '';
    iframe.style.transform = '';
    iframe.style.transformOrigin = '';
  }

  function fitPlayers() {
    pending = false;
    var frames = document.querySelectorAll('.watch-frame');
    for (var i = 0; i < frames.length; i += 1) {
      fitFrame(frames[i]);
    }
  }

  function requestFit() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(fitPlayers);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fitPlayers);
  } else {
    fitPlayers();
  }

  window.addEventListener('resize', requestFit);
  window.addEventListener('orientationchange', requestFit);
})();
