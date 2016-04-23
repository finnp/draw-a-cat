(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var createMenu = require('browser-menu')
var menuItems = require('./exercises/menu.json')
var util = require('./util')

menu = createMenu({
  width: 29,
  x: 4,
  y: 4,
  bg: '#1F8DD6',
  fg: '#f2f2f2'
})  

menu.reset()

menuItems.forEach(function (item) {
  var id = util.idFromName(item)
  var success = localStorage.getItem(id + '-success')
  if(success) item += ' (COMPLETED)'
  menu.add(item)
})

menu.on('select', function (label) {
  var id = util.idFromName(label)
  window.location.href = 'exercises/' + id
})
},{"./exercises/menu.json":2,"./util":10,"browser-menu":3}],2:[function(require,module,exports){
module.exports=[
  "HELLO CAT",
  "RECTANGLE",
  "COLOR IT",
  "SQUARE CAT",
  "POSITIONS",
  "POSITIONS IMPROVED",
  "CAT FAMILY",
  "RAINBOW"
]
},{}],3:[function(require,module,exports){
var remove    = require('remove-element')
var Emitter   = require('events/')
var xtend     = require('xtend')
var vkey      = require('vkey')


module.exports = createMenu

require('insert-css')(
  ".browser-terminal-menu {\n  position: absolute;\n  top: 1em;\n  left: 1em;\n  padding: 1em;\n  margin: 0;\n  list-style-type: none;\n  font-family: monospace;\n  line-height: 1.5em;\n  font-size: 14px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n}\n\n.browser-terminal-menu > li {\n  cursor: pointer;\n  margin: 0;\n  padding: 0.025em 0.5em;\n  white-space: pre-wrap;\n}\n\n.browser-terminal-menu > li.non-item {\n  cursor: default;\n}\n"
)

function createMenu(opts) {
  opts = opts || {}
  opts = xtend({
      x: 1
    , y: 1
    , fg: 'white'
    , bg: 'blue'
    , padding: xtend({
        top: 1
      , left: 1
      , right: 1
      , bottom: 1
    }, opts.padding || {})
  }, opts)

  var curr = null
  var list = document.createElement('ul')
  var menu = new Emitter

  menu.setMaxListeners(Infinity)

  var latestLineText = ''
  var latestLine = null
  var items = []

  // methods
  menu.add = add
  menu.reset = reset
  menu.close = close
  menu.write = write
  menu.createStream = createStream

  menu.element = list

  // styles
  list.classList.add('browser-terminal-menu')
  list.style.color = opts.fg
  list.style.backgroundColor = opts.bg

  if ('x' in opts) list.style.left = opts.x + 'em'
  if ('y' in opts) list.style.top  = opts.y + 'em'
  if ('width' in opts) list.style.width = opts.width + 'em'

  var padding = opts.padding
  list.style.paddingTop = padding.top + 'em'
  list.style.paddingLeft = padding.left + 'em'
  list.style.paddingRight = padding.right + 'em'
  list.style.paddingBottom = padding.bottom + 'em'

  // keybindings
  var keys = {
      '<up>': prev
    , '<left>': prev
    , 'H': prev
    , 'K': prev
    , '<down>': next
    , '<right>': next
    , 'J': next
    , 'L': next
    , '<space>': select
    , '<enter>': select
    , 'Q': close
    , '<tab>': next
  }

  window.addEventListener('keydown', keydown, false)
  menu.once('close', function() {
    window.removeEventListener('keydown', keydown, false)
  })

  return menu

  // behavior
  function add(text) {
    var item = document.createElement('li')
    latestLine = null
    latestLineText = ''

    items.push(item)
    list.appendChild(item)
    item.innerHTML = text
    item.addEventListener('mouseover', mouseover, false)
    item.addEventListener('click', click, false)

    return menu.once('close', function() {
      item.removeEventListener('mouseover', mouseover, false)
      item.removeEventListener('click', click, false)
    })

    function mouseover(e) {
      if (curr !== null) {
        disable(items[curr])
        curr = null
      }

      enable(item)
      curr = items.indexOf(item)
    }

    function click() {
      curr = items.indexOf(item)
      select()
    }
  }

  function enable(item) {
    item.style.backgroundColor = opts.fg
    item.style.color = opts.bg
  }

  function disable(item) {
    item.style.color = opts.fg
    item.style.backgroundColor = opts.bg
  }

  function next() {
    if (curr !== null) {
      disable(items[curr])
      curr += items.length + 1
      curr %= items.length
    } else {
      curr = 0
    }

    enable(items[curr])
  }

  function prev() {
    if (curr !== null) {
      disable(items[curr])
      curr += items.length - 1
      curr %= items.length
    } else {
      curr = items.length - 1
    }

    enable(items[curr])
  }

  function select() {
    if (curr === null) return
    if (!items[curr]) return
    var label = items[curr].innerHTML
    menu.emit('select', label, curr)
  }

  function reset() {
    document.body.appendChild(list)
  }

  function close() {
    remove(menu.element)
    menu.emit('close')
  }

  function write(text) {
    if (!latestLine) {
      latestLine = document.createElement('li')
      latestLine.classList.add('non-item')
      list.appendChild(latestLine)
    }

    latestLineText += text
    latestLine.innerHTML =
    latestLineText.replace(/\s+$/g, '')
  }

  function keydown(e) {
    if (e.metaKey) return
    var key = vkey[e.keyCode] || e.char
    if (e.shiftKey) {
      if (key === '<tab>') {
        key = '<up>'
      } else {
        return
      }
    }

    if (e.ctrlKey) {
      if (key !== 'C') return
      return close()
    }

    if (!keys[key]) return
    keys[key]()
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  // just for completeness...
  function createStream() {
    var e = new Emitter
    e.pipe = function(){}
    return e
  }
}

},{"events/":4,"insert-css":5,"remove-element":6,"vkey":7,"xtend":9}],4:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],5:[function(require,module,exports){
var inserted = {};

module.exports = function (css) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(elem);
};

},{}],6:[function(require,module,exports){
module.exports = remove

function remove(element) {
  if (
    element &&
    element.parentNode
  ) element.parentNode.removeChild(element)

  return element
}

},{}],7:[function(require,module,exports){
var ua = typeof window !== 'undefined' ? window.navigator.userAgent : ''
  , isOSX = /OS X/.test(ua)
  , isOpera = /Opera/.test(ua)
  , maybeFirefox = !/like Gecko/.test(ua) && !isOpera

var i, output = module.exports = {
  0:  isOSX ? '<menu>' : '<UNK>'
, 1:  '<mouse 1>'
, 2:  '<mouse 2>'
, 3:  '<break>'
, 4:  '<mouse 3>'
, 5:  '<mouse 4>'
, 6:  '<mouse 5>'
, 8:  '<backspace>'
, 9:  '<tab>'
, 12: '<clear>'
, 13: '<enter>'
, 16: '<shift>'
, 17: '<control>'
, 18: '<alt>'
, 19: '<pause>'
, 20: '<caps-lock>'
, 21: '<ime-hangul>'
, 23: '<ime-junja>'
, 24: '<ime-final>'
, 25: '<ime-kanji>'
, 27: '<escape>'
, 28: '<ime-convert>'
, 29: '<ime-nonconvert>'
, 30: '<ime-accept>'
, 31: '<ime-mode-change>'
, 27: '<escape>'
, 32: '<space>'
, 33: '<page-up>'
, 34: '<page-down>'
, 35: '<end>'
, 36: '<home>'
, 37: '<left>'
, 38: '<up>'
, 39: '<right>'
, 40: '<down>'
, 41: '<select>'
, 42: '<print>'
, 43: '<execute>'
, 44: '<snapshot>'
, 45: '<insert>'
, 46: '<delete>'
, 47: '<help>'
, 91: '<meta>'  // meta-left -- no one handles left and right properly, so we coerce into one.
, 92: '<meta>'  // meta-right
, 93: isOSX ? '<meta>' : '<menu>'      // chrome,opera,safari all report this for meta-right (osx mbp).
, 95: '<sleep>'
, 106: '<num-*>'
, 107: '<num-+>'
, 108: '<num-enter>'
, 109: '<num-->'
, 110: '<num-.>'
, 111: '<num-/>'
, 144: '<num-lock>'
, 145: '<scroll-lock>'
, 160: '<shift-left>'
, 161: '<shift-right>'
, 162: '<control-left>'
, 163: '<control-right>'
, 164: '<alt-left>'
, 165: '<alt-right>'
, 166: '<browser-back>'
, 167: '<browser-forward>'
, 168: '<browser-refresh>'
, 169: '<browser-stop>'
, 170: '<browser-search>'
, 171: '<browser-favorites>'
, 172: '<browser-home>'

  // ff/osx reports '<volume-mute>' for '-'
, 173: isOSX && maybeFirefox ? '-' : '<volume-mute>'
, 174: '<volume-down>'
, 175: '<volume-up>'
, 176: '<next-track>'
, 177: '<prev-track>'
, 178: '<stop>'
, 179: '<play-pause>'
, 180: '<launch-mail>'
, 181: '<launch-media-select>'
, 182: '<launch-app 1>'
, 183: '<launch-app 2>'
, 186: ';'
, 187: '='
, 188: ','
, 189: '-'
, 190: '.'
, 191: '/'
, 192: '`'
, 219: '['
, 220: '\\'
, 221: ']'
, 222: "'"
, 223: '<meta>'
, 224: '<meta>'       // firefox reports meta here.
, 226: '<alt-gr>'
, 229: '<ime-process>'
, 231: isOpera ? '`' : '<unicode>'
, 246: '<attention>'
, 247: '<crsel>'
, 248: '<exsel>'
, 249: '<erase-eof>'
, 250: '<play>'
, 251: '<zoom>'
, 252: '<no-name>'
, 253: '<pa-1>'
, 254: '<clear>'
}

for(i = 58; i < 65; ++i) {
  output[i] = String.fromCharCode(i)
}

// 0-9
for(i = 48; i < 58; ++i) {
  output[i] = (i - 48)+''
}

// A-Z
for(i = 65; i < 91; ++i) {
  output[i] = String.fromCharCode(i)
}

// num0-9
for(i = 96; i < 106; ++i) {
  output[i] = '<num-'+(i - 96)+'>'
}

// F1-F24
for(i = 112; i < 136; ++i) {
  output[i] = 'F'+(i-111)
}

},{}],8:[function(require,module,exports){
module.exports = hasKeys

function hasKeys(source) {
    return source !== null &&
        (typeof source === "object" ||
        typeof source === "function")
}

},{}],9:[function(require,module,exports){
var hasKeys = require("./has-keys")

module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        if (!hasKeys(source)) {
            continue
        }

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{"./has-keys":8}],10:[function(require,module,exports){
var menu = require('./exercises/menu.json')

function nextLesson(currentId) {
  var menuIds = menu.map(idFromName)
  var index = menuIds.indexOf(currentId)
  if(index === -1) return undefined
  return menuIds[index + 1]
}

function idFromName (id) {
  return id.toLowerCase()
    .replace(/\s\(completed\)/g, '')
    .replace(/\s/g, '_')
    .replace(/[^\w]/gi, '')
    .replace(/_/g, '-')
}

exports.idFromName = idFromName
exports.nextLesson = nextLesson
},{"./exercises/menu.json":2}]},{},[1]);
