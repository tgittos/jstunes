MODELER = {};
MODELER.Event = function() {
  var that = {},
  listeners = {};
  var listen = function(event, handler, expires) {
    if (!listeners[event]) { listeners[event] = []; }
    listeners[event].push({handler: handler, expires: expires});
  };
  var dispatch = function(event, payload) {
    if (listeners[event]) {
      listeners[event].each(function(){
        var handler = this.handler;
        if (this.expires) { listeners[event].remove(this); }
        handler.call(this, { event: event, data: payload } );
      });
    }
  };
  var stopListening = function(event, handler) {
    if (listeners[event]) {
      listeners[event].each(function(){
        if (this.handler == handler) { listeners[event].remove(this); }
      });
    }
  }
  var reset = function() {
    listeners = {};
  };
  that.listen = listen;
  that.dispatch = dispatch;
  that.stopListening = stopListening;
  that.reset = reset;
  return that;
}();
