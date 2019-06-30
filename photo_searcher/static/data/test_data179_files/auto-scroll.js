Event.observe(window, 'load', function() {
  $$('a[href^=#]:not([href=#])').each(function(element) {
    element.observe('click', function(event) {
      new Effect.ScrollTo(this.hash.substr(1));
      Event.stop(event);
    }.bindAsEventListener(element))
  })
})