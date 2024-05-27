var express = require('express');
var Promise = require('sequelize').Utils.CustomEventEmitter ;

var render = express.response.render;
express.response.render = function expresssequelize_render (view, options, callback) {
  if (!options || 'function' == typeof options) {
    return render.call(this, view, options, callback);
  }

  var self = this;
  return resolve(options, function (err, result) {
    if (err) {
      return 'function' == typeof callback ? callback(err) : self.req.next(err);
    }

    // must return here so partials always work
    return render.call(self, view, result, callback);
  });
};

var json = express.response.json;
express.response.json = function expresssequelize_json () {
  var self = this;
  var args = arguments;
  var body = args[0];
  var status;
  if (2 === args.length) {
    // res.json(body, status) backwards compat
    if ('number' === typeof args[1]) {
      status = args[1];
    } else {
      status = body;
      body = args[1];
    }
  }
  return resolve(body, function(err, result) {
    if (err) {
      return self.req.next(err);
    }
    if (typeof status !== 'undefined') {
      json.call(self, status, result);
    } else {
      json.call(self, result);
    }
  });
};

var send = express.response.send;
express.response.send = function expresssequelize_send () {
  var args = Array.prototype.slice.apply(arguments);
  var self = this;

  function handleResult (err, result) {
    if (err) return self.req.next(err);
    args[0] = result;
    send.apply(self, args);
  }

  if (args[0] instanceof Promise) {
    return args[0].complete(handleResult);
  }

  if ('Object' == args[0].constructor.name) {
    return resolve(args[0], handleResult);
  }

  send.apply(this, args);
};

function resolve (options, callback, nested) {
  var keys = Object.keys(options);
  var i = keys.length;
  var remaining = [];
  var pending;
  var item;
  var key;

  while (i--) {
    key = keys[i];
    item = options[key];
    if (item instanceof Promise) {
      item.key = key;
      remaining.push(item);
    }
  }

  pending = remaining.length;
  if (options.locals) ++pending;

  if (!pending) {
    return callback(null, options);
  }

  function error (err) {
    if (error.ran) return;
    callback(error.ran = err);
  }

  remaining.forEach(function (item) {
    function handleResult (err, result) {
      if (err) return error(err);
      options[item.key] = result;
      if (!--pending) {
        callback(null, options);
      }
    }

    item.complete(handleResult);
  });

  if (nested) return;

  // locals support
  if (options.locals) {
    return resolve(options.locals, function (err, resolved) {
      if (err) return error(err);
      options.locals = resolved;
      if (--pending) return;
      return callback(null, options);
    }, true);
  }
}
