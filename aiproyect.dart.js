function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 === (void 0) ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    !(key === (void 0)) && !(key === $.CTC6) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    !(key === (void 0)) && !(key === $.CTC6) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if (typeof index !== 'number') return this.operator$index$1$bailout(1, index, 0);
  if (index < 0) return;
  var t1 = this._values;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(2, t1, index);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      index = env0;
      break;
    case 2:
      t1 = env0;
      index = env1;
      break;
  }
  switch (state) {
    case 0:
      var index = this._probeForLookup$1(key);
    case 1:
      state = 0;
      if ($.ltB(index, 0)) return;
      var t1 = this._values;
    case 2:
      state = 0;
      return $.index(t1, index);
  }
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) === (void 0) || $.index(this._keys, index) === $.CTC6) this._numberOfEntries = $.add(this._numberOfEntries, 1);
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.List(newCapacity);
  var t1 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; i < capacity; ++i) {
    t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 === (void 0) || t2 === $.CTC6) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t3 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t3);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.List(newCapacity);
      var t1 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t1, ({E: 'V'}));
      this._values = t1;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key === (void 0) || key === $.CTC6) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) return hash;
      return insertionIndex;
    }
    if ($.eqB(existingKey, key)) return hash;
    if ($.ltB(insertionIndex, 0) && $.CTC6 === existingKey) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, key, hash) {
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) return hash;
      return insertionIndex;
    }
    if ($.eqB(existingKey, key)) return hash;
    if ($.ltB(insertionIndex, 0) && $.CTC6 === existingKey) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t1 = $.List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var t1 = ({});
  t1.f_11 = f;
  var result = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  t1.result_2 = result;
  $.forEach(this._backingMap, new $.Closure26(t1));
  return t1.result_2;
 },
 forEach$1: function(f) {
  var t1 = ({});
  t1.f_10 = f;
  $.forEach(this._backingMap, new $.Closure25(t1));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.Closure24(this));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t2 = t1.length;
  if (value < 0 || value >= t2) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = (void 0);
  do {
    var t2 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry === (void 0) || entry === $.CTC6));
 },
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = (void 0);
  do {
    var t2 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    entry = $.index(t1, this._nextValidIndex);
  } while ((entry === (void 0) || entry === $.CTC6));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC0);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = t1[t2];
  this._advance$0();
  return t2;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(2, t1, t2);
  var t3 = t2.length;
  if (t1 >= t3) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
  t2[t1] === $.CTC6 && this._advance$0();
  t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(3, t1, t2);
  return t1 < t2.length;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
    case 3:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._nextValidIndex;
    case 1:
      state = 0;
      var t2 = this._entries;
    case 2:
      state = 0;
      if ($.geB(t1, $.get$length(t2))) return false;
      $.index(t2, this._nextValidIndex) === $.CTC6 && this._advance$0();
      t1 = this._nextValidIndex;
    case 3:
      state = 0;
      return $.lt(t1, $.get$length(t2));
  }
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) return '';
  if ($.get$length(this._buffer) === 1) return $.index(this._buffer, 0);
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str === (void 0) || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  if (!$.eqNullB(this._next)) return true;
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC0);
  var next = this._next;
  this._next = (void 0);
  return next;
 }
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$0());
  var value = (this.list[this.i]);
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
 },
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 }
};

$$.Closure27 = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib0_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_index"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._index);
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$1('');
  for (i = 0; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$1('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 === (void 0)) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = sb.toString$0();
      sb = $.StringBufferImpl$1('');
      for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = sb.toString$0();
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
  }
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.BadNumberFormatException = {"":
 ["_s"],
 super: "Object",
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.S(this._s) + '\'';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if ($.eqNullB(t1)) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 === (void 0)) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.Math = {"":
 [],
 super: "Object"
};

$$.DrawGraph = {"":
 ["IsSelect?", "IsRemove?", "IsMove?", "IsJoin?", "IsAdd?", "CurrentSelectAriste", "CurrentSelecteNode", "Aristes?", "Nodes?"],
 super: "Object",
 Draw$1: function(ctx) {
  var t1 = ({});
  t1.ctx_10 = ctx;
  t1.ctx_10.clearRect$4(0, 0, 660, 500);
  $.forEach(this.Nodes, new $.Closure17(t1));
  $.forEach(this.Aristes, new $.Closure18(t1));
 },
 AddNewNode$1: function(node) {
  if ($.gtB($.get$length(this.Nodes), 0)) {
    $.index(this.Nodes, 0).set$isInitial(true);
    $.last(this.Nodes).set$isLast(false);
  }
  $.add$1(this.Nodes, node);
 },
 HasNodeClick$2: function(x, y) {
  var nodeCount = $.get$length(this.Nodes);
  if (typeof nodeCount !== 'number') return this.HasNodeClick$2$bailout(1, x, y, nodeCount);
  for (var i = 0; i < nodeCount; ++i) {
    if ($.index(this.Nodes, i).IsInside$2(x, y) === true) {
      var t1 = $.eqB($.index(this.Nodes, i).get$isSelected(), true);
      var t2 = this.Nodes;
      if (t1) $.index(t2, i).set$isSelected(false);
      else $.index(t2, i).set$isSelected(true);
      return true;
    }
  }
  return false;
 },
 HasNodeClick$2$bailout: function(state, x, y, nodeCount) {
  for (var i = 0; $.ltB(i, nodeCount); ++i) {
    if ($.index(this.Nodes, i).IsInside$2(x, y) === true) {
      var t1 = $.eqB($.index(this.Nodes, i).get$isSelected(), true);
      var t2 = this.Nodes;
      if (t1) $.index(t2, i).set$isSelected(false);
      else $.index(t2, i).set$isSelected(true);
      return true;
    }
  }
  return false;
 },
 HasAristeClick$2: function(x, y) {
  var aristeCount = $.get$length(this.Aristes);
  if (typeof aristeCount !== 'number') return this.HasAristeClick$2$bailout(1, x, y, aristeCount);
  for (var i = 0; i < aristeCount; ++i) {
    if ($.index(this.Aristes, i).IsInside$2(x, y) === true) {
      var t1 = $.eqB($.index(this.Aristes, i).get$IsSelected(), true);
      var t2 = this.Aristes;
      if (t1) $.index(t2, i).set$IsSelected(false);
      else $.index(t2, i).set$IsSelected(true);
      return true;
    }
  }
  return false;
 },
 HasAristeClick$2$bailout: function(state, x, y, aristeCount) {
  for (var i = 0; $.ltB(i, aristeCount); ++i) {
    if ($.index(this.Aristes, i).IsInside$2(x, y) === true) {
      var t1 = $.eqB($.index(this.Aristes, i).get$IsSelected(), true);
      var t2 = this.Aristes;
      if (t1) $.index(t2, i).set$IsSelected(false);
      else $.index(t2, i).set$IsSelected(true);
      return true;
    }
  }
  return false;
 },
 ClearAristesSelection$0: function() {
  $.forEach(this.Aristes, new $.Closure20());
 },
 ClearNodeSelection$0: function() {
  $.forEach(this.Nodes, new $.Closure19());
 },
 GetSelectedNodes$0: function() {
  var nodeCount = $.get$length(this.Nodes);
  if (typeof nodeCount !== 'number') return this.GetSelectedNodes$0$bailout(1, nodeCount);
  var SelectedNodes = $.List((void 0));
  $.setRuntimeTypeInfo(SelectedNodes, ({E: 'DrawNode'}));
  for (var i = 0; i < nodeCount; ++i) {
    $.index(this.Nodes, i).get$isSelected() === true && SelectedNodes.push($.index(this.Nodes, i));
  }
  return SelectedNodes;
 },
 GetSelectedNodes$0$bailout: function(state, nodeCount) {
  var SelectedNodes = $.List((void 0));
  $.setRuntimeTypeInfo(SelectedNodes, ({E: 'DrawNode'}));
  for (var i = 0; $.ltB(i, nodeCount); ++i) {
    $.index(this.Nodes, i).get$isSelected() === true && SelectedNodes.push($.index(this.Nodes, i));
  }
  return SelectedNodes;
 },
 GetSelectedAristes$0: function() {
  var aristeCount = $.get$length(this.Aristes);
  if (typeof aristeCount !== 'number') return this.GetSelectedAristes$0$bailout(1, aristeCount);
  var SelectedAristes = $.List((void 0));
  $.setRuntimeTypeInfo(SelectedAristes, ({E: 'DrawAriste'}));
  for (var i = 0; i < aristeCount; ++i) {
    $.index(this.Aristes, i).get$IsSelected() === true && SelectedAristes.push($.index(this.Aristes, i));
  }
  return SelectedAristes;
 },
 GetSelectedAristes$0$bailout: function(state, aristeCount) {
  var SelectedAristes = $.List((void 0));
  $.setRuntimeTypeInfo(SelectedAristes, ({E: 'DrawAriste'}));
  for (var i = 0; $.ltB(i, aristeCount); ++i) {
    $.index(this.Aristes, i).get$IsSelected() === true && SelectedAristes.push($.index(this.Aristes, i));
  }
  return SelectedAristes;
 },
 GetSelectedNodesID$0: function() {
  var nodeCount = $.get$length(this.Nodes);
  if (typeof nodeCount !== 'number') return this.GetSelectedNodesID$0$bailout(1, nodeCount);
  var SelectedNodesID = $.List((void 0));
  $.setRuntimeTypeInfo(SelectedNodesID, ({E: 'int'}));
  for (var i = 0; i < nodeCount; ++i) {
    $.index(this.Nodes, i).get$isSelected() === true && SelectedNodesID.push(i);
  }
  return SelectedNodesID;
 },
 GetSelectedNodesID$0$bailout: function(state, nodeCount) {
  var SelectedNodesID = $.List((void 0));
  $.setRuntimeTypeInfo(SelectedNodesID, ({E: 'int'}));
  for (var i = 0; $.ltB(i, nodeCount); ++i) {
    $.index(this.Nodes, i).get$isSelected() === true && SelectedNodesID.push(i);
  }
  return SelectedNodesID;
 },
 BlockSelectedAristes$0: function() {
  for (var i = 0; $.ltB(i, $.get$length(this.Aristes)); ++i) {
    $.index(this.Aristes, i).get$IsSelected() === true && $.index(this.Aristes, i).Block$0();
  }
 },
 BlockConnectedAristes$1: function(node) {
  for (var i = 0; $.ltB(i, $.get$length(this.Aristes)); ++i) {
    $.index(this.Aristes, i).IsConnectedTo$1(node) === true && $.index(this.Aristes, i).Block$0();
  }
 },
 SetSelect$0: function() {
  this.ResetStates$0();
  this.IsSelect = true;
 },
 SetRemove$0: function() {
  this.ResetStates$0();
  this.IsRemove = true;
 },
 SetMove$0: function() {
  this.ResetStates$0();
  this.IsMove = true;
 },
 SetJoin$0: function() {
  this.ResetStates$0();
  this.IsJoin = true;
 },
 SetAdd$0: function() {
  this.ResetStates$0();
  this.IsAdd = true;
 },
 ResetStates$0: function() {
  this.IsAdd = false;
  this.IsJoin = false;
  this.IsMove = false;
  this.IsRemove = false;
  this.IsSelect = false;
 },
 DrawGraph$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'DrawNode'}));
  this.Nodes = t1;
  t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'DrawAriste'}));
  this.Aristes = t1;
 }
};

$$.SelectableShape = {"":
 ["cy=", "cx="],
 super: "Object",
 IsInside$2: function(x, y) {
  if (typeof x !== 'number') return this.IsInside$2$bailout(1, x, y, 0, 0);
  if (typeof y !== 'number') return this.IsInside$2$bailout(1, x, y, 0, 0);
  var t1 = this.cx;
  if (typeof t1 !== 'number') return this.IsInside$2$bailout(2, x, y, t1, 0);
  var t2 = this.size;
  if (typeof t2 !== 'number') return this.IsInside$2$bailout(3, x, y, t1, t2);
  var t3 = t2 / 2;
  if (x >= t1 - t3 && x <= t1 + t3) {
    t1 = this.cy;
    if (typeof t1 !== 'number') return this.IsInside$2$bailout(6, y, t1, 0, 0);
    if (typeof t2 !== 'number') return this.IsInside$2$bailout(7, y, t1, t2, 0);
    t1 = y >= t1 - t2 / 2;
  } else t1 = false;
  if (t1) {
    t1 = this.cy;
    if (typeof t1 !== 'number') return this.IsInside$2$bailout(8, y, t1, 0, 0);
    if (typeof t2 !== 'number') return this.IsInside$2$bailout(9, t2, y, t1, 0);
    t1 = y <= t1 + t2 / 2;
  } else t1 = false;
  if (t1) return true;
  return false;
 },
 IsInside$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var x = env0;
      var y = env1;
      break;
    case 1:
      x = env0;
      y = env1;
      break;
    case 2:
      x = env0;
      y = env1;
      t1 = env2;
      break;
    case 3:
      x = env0;
      y = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 4:
      x = env0;
      y = env1;
      t1 = env2;
      break;
    case 5:
      x = env0;
      y = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 6:
      y = env0;
      t1 = env1;
      break;
    case 7:
      y = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 8:
      y = env0;
      t1 = env1;
      break;
    case 9:
      t2 = env0;
      y = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      var t1 = this.cx;
    case 2:
      state = 0;
      var t2 = this.size;
    case 3:
      state = 0;
    case 4:
    case 5:
      if (state == 4 || state == 5 || (state == 0 && $.geB(x, $.sub(t1, $.div(t2, 2))))) {
        switch (state) {
          case 0:
            t1 = this.cx;
          case 4:
            state = 0;
            t2 = this.size;
          case 5:
            state = 0;
            t1 = $.leB(x, $.add(t1, $.div(t2, 2)));
        }
      } else {
        t1 = false;
      }
    case 6:
    case 7:
      if (state == 6 || state == 7 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this.cy;
          case 6:
            state = 0;
            t2 = this.size;
          case 7:
            state = 0;
            t1 = $.geB(y, $.sub(t1, $.div(t2, 2)));
        }
      } else {
        t1 = false;
      }
    case 8:
    case 9:
      if (state == 8 || state == 9 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this.cy;
          case 8:
            state = 0;
            t2 = this.size;
          case 9:
            state = 0;
            t1 = $.leB(y, $.add(t1, $.div(t2, 2)));
        }
      } else {
        t1 = false;
      }
      if (t1) return true;
      return false;
  }
 }
};

$$.DrawAriste = {"":
 ["d", "StrV1", "StrV0", "StrVal", "IsBlocked?", "IsSelected=", "val?", "finalN?", "initialN?", "size", "cy", "cx"],
 super: "SelectableShape",
 Draw$1: function(ctx) {
  if (this.IsBlocked !== true) {
    this.RecalculateAriste$0();
    $.DrawLine(ctx, this.initialN.get$cx(), this.initialN.get$cy(), this.finalN.get$cx(), this.finalN.get$cy(), this.IsSelected);
    $.DrawLabel(ctx, $.toDouble(this.cx), $.toDouble(this.cy), $.toString(this.val));
  }
 },
 RecalculateAriste$0: function() {
  this.cx = $.toInt($.div($.add(this.initialN.get$cx(), this.finalN.get$cx()), 2));
  this.cy = $.toInt($.div($.add(this.initialN.get$cy(), this.finalN.get$cy()), 2));
 },
 IsConnectedTo$1: function(node) {
  if (node.isSame$1(this.initialN) === true || node.isSame$1(this.finalN) === true) return true;
  return false;
 },
 isSame$1: function(ariste) {
  if (ariste.get$initialN().isSame$1(this.initialN) === true && ariste.get$finalN().isSame$1(this.finalN) === true) return true;
  return false;
 },
 SetValue$1: function(charCode) {
  var str = $.String$fromCharCodes([charCode]);
  if (this.d === 0) {
    this.StrV0 = str;
    this.d = 1;
  } else {
    if (this.d === 1) {
      this.StrV1 = str;
      this.d = 0;
    }
  }
  this.StrVal = $.S(this.StrV0) + $.S(this.StrV1);
  this.val = $.parseInt(this.StrVal);
 },
 SetJoin$0: function() {
  this.initialN.get$node().ConnectTo$2(this.finalN.get$node(), this.val);
 },
 Block$0: function() {
  this.IsBlocked = true;
  this.cx = -10;
  this.cy = -10;
 },
 DrawAriste$3: function(initialNode, finalNode, value) {
  this.initialN = initialNode;
  this.finalN = finalNode;
  this.cx = $.toInt($.div($.add(this.initialN.get$cx(), this.finalN.get$cx()), 2));
  this.cy = $.toInt($.div($.add(this.initialN.get$cy(), this.finalN.get$cy()), 2));
  this.val = value;
  this.size = 40;
 }
};

$$.DrawNode = {"":
 ["node?", "isSelected=", "isInitial!", "isLast!", "d", "StrH1", "StrH0", "StrHe", "h", "val?", "size", "cy", "cx"],
 super: "SelectableShape",
 Draw$1: function(ctx) {
  if (this.isInitial === true) $.DrawInitialNode(ctx, this.cx, this.cy, this.val, $.S(this.h), this.isSelected);
  else {
    var t1 = this.isLast === true;
    var t2 = this.cx;
    var t3 = this.val;
    var t4 = this.cy;
    var t5 = this.h;
    if (t1) $.DrawFinalNode(ctx, t2, t4, t3, $.S(t5), this.isSelected);
    else $.DrawNode0(ctx, t2, t4, t3, $.S(t5), this.isSelected);
  }
 },
 SetHeuristicValue$1: function(charCode) {
  var str = $.String$fromCharCodes([charCode]);
  if (this.d === 0) {
    this.StrH0 = str;
    this.d = 1;
  } else {
    if (this.d === 1) {
      this.StrH1 = str;
      this.d = 0;
    }
  }
  this.StrHe = $.S(this.StrH0) + $.S(this.StrH1);
  this.h = $.parseInt(this.StrHe);
 },
 SetNodeValue$0: function() {
  this.node = $.GraphNode$1($.toString(this.val));
  var t1 = this.h;
  this.node.set$Heuristic(t1);
 },
 isSame$1: function(nd) {
  return $.eq(this.val, nd.get$val());
 },
 DrawNode$4: function(x, y, value, heuristic) {
  this.cx = x;
  this.cy = y;
  this.val = value;
  this.h = heuristic;
  this.size = 40;
 }
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DeprecatedPeerConnectionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$keyPress: function() {
  return this._get$1('keypress');
 },
 get$click: function() {
  return this._get$1('click');
 }
};

$$.FilteredElementList = {"":
 ["_childNodes", "_node"],
 super: "Object",
 last$0: function() {
  return $.last(this.get$_filtered());
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
 },
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
 },
 operator$index$1: function(index) {
  var t1 = this.get$_filtered();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, index, t1) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this.get$_filtered());
 },
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
 },
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
 },
 removeLast$0: function() {
  var result = this.last$0();
  !$.eqNullB(result) && result.remove$0();
  return result;
 },
 clear$0: function() {
  $.clear(this._childNodes);
 },
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.Closure23());
 },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
 },
 add$1: function(value) {
  $.add$1(this._childNodes, value);
 },
 get$add: function() { return new $.Closure28(this, 'add$1'); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len)) return;
  if ($.ltB(newLength, 0)) throw $.captureStackTrace($.CTC4);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
 },
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
 },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
 },
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2.is$Element()) return t2;
  }
  return;
 },
 first$0: function() { return this.get$first().$call$0(); },
 get$_filtered: function() {
  return $.List$from($.filter(this._childNodes, new $.Closure21()));
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ChildrenElementList = {"":
 ["_childElements", "_element"],
 super: "Object",
 last$0: function() {
  return this._element.get$$$dom_lastElementChild();
 },
 removeLast$0: function() {
  var result = this.last$0();
  !$.eqNullB(result) && this._element.$dom_removeChild$1(result);
  return result;
 },
 clear$0: function() {
  this._element.set$text('');
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange0(this, start, rangeLength, []));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC3);
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._element; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 iterator$0: function() {
  return $.iterator(this._toList$0());
 },
 add$1: function(value) {
  this._element.$dom_appendChild$1(value);
  return value;
 },
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC2);
 },
 operator$indexSet$2: function(index, value) {
  this._element.$dom_replaceChild$2(value, $.index(this._childElements, index));
 },
 operator$index$1: function(index) {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, t1, index);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this._childElements);
 },
 isEmpty$0: function() {
  return $.eqNull(this._element.get$$$dom_firstElementChild());
 },
 filter$1: function(f) {
  var t1 = ({});
  t1.f_1 = f;
  var output = [];
  this.forEach$1(new $.Closure22(t1, output));
  return $._FrozenElementList$_wrap$1(output);
 },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return this._element.get$$$dom_firstElementChild();
 },
 first$0: function() { return this.get$first().$call$0(); },
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._toList$0$bailout(1, t1);
  var output = $.List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t3 = t1[i];
    var t4 = output.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    output[i] = t3;
  }
  return output;
 },
 _toList$0$bailout: function(state, t1) {
  var output = $.List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    var t3 = output.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    output[i] = t2;
  }
  return output;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 super: "Object",
 last$0: function() {
  return $.last(this._nodeList);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC2);
 },
 clear$0: function() {
  throw $.captureStackTrace($.CTC2);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange(this._nodeList, start, rangeLength));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC2);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC2);
 },
 iterator$0: function() {
  return $._FrozenElementListIterator$1(this);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.CTC2);
 },
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC2);
 },
 operator$index$1: function(index) {
  var t1 = this._nodeList;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, t1, index);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this._nodeList);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
 },
 filter$1: function(f) {
  var out = $._ElementList$1([]);
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && out.add$1(t2);
  }
  return out;
 },
 forEach$1: function(f) {
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return $.index(this._nodeList, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_lib_index", "_list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._lib_index;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = $.get$length(this._list);
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 < t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_index;
    case 1:
      state = 0;
      var t2 = $.get$length(this._list);
    case 2:
      state = 0;
      return $.lt(t1, t2);
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC0);
  var t1 = this._list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t2 = this._lib_index;
  if (typeof t2 !== 'number') return this.next$0$bailout(2, t1, t2);
  this._lib_index = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC0);
      var t1 = this._list;
    case 1:
      state = 0;
      var t2 = this._lib_index;
    case 2:
      state = 0;
      this._lib_index = $.add(t2, 1);
      return $.index(t1, t2);
  }
 }
};

$$._ElementList = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._ElementList$1($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
 },
 filter$1: function(f) {
  return $._ElementList$1($._ListWrapper.prototype.filter$1.call(this, f));
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$keyPress: function() {
  return this._get$1('keypress');
 },
 get$click: function() {
  return this._get$1('click');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 _get$1: function(type) {
  return $._EventListenerListImpl$2(this._ptr, type);
 },
 operator$index$1: function(type) {
  return this._get$1($.toLowerCase(type));
 }
};

$$._EventListenerListImpl = {"":
 ["_type", "_ptr"],
 super: "Object",
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 operator$index$1: function(index) {
  var t1 = this._this.get$$$dom_childNodes();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, index, t1) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange0(this, start, rangeLength, []));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter1(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !$.eqNullB(result) && this._this.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 get$first: function() {
  return this._this.firstChild;;
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 get$first: function() {
  return $.index(this._list, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 removeRange$2: function(start, rangeLength) {
  return $.removeRange(this._list, start, rangeLength);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
 },
 last$0: function() {
  return $.last(this._list);
 },
 removeLast$0: function() {
  return $.removeLast(this._list);
 },
 clear$0: function() {
  return $.clear(this._list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
 },
 addAll$1: function(collection) {
  return $.addAll(this._list, collection);
 },
 add$1: function(value) {
  return $.add$1(this._list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
 },
 operator$index$1: function(index) {
  var t1 = this._list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, t1, index);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this._list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
 },
 filter$1: function(f) {
  return $.filter(this._list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._list, f);
 },
 iterator$0: function() {
  return $.iterator(this._list);
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange(this._list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter(this._list, f));
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this._get$1('click');
 }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$keyPress: function() {
  return this._get$1('keypress');
 },
 get$click: function() {
  return this._get$1('click');
 }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$keyPress: function() {
  return this._get$1('keypress');
 },
 get$click: function() {
  return this._get$1('click');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC0);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.next$0$bailout(2, t1, t2);
  this._pos = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC0);
      var t1 = this._array;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t2, 1);
      return $.index(t1, t2);
  }
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t2, t1);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t2 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$.GraphAriste = {"":
 ["Node?", "value?"],
 super: "Object"
};

$$.GraphNode = {"":
 ["Aristes?", "Heuristic=", "Final?", "Data?"],
 super: "Object",
 ConnectTo$2: function(GNode, Value) {
  $.add$1(this.Aristes, $.GraphAriste$2(Value, GNode));
 },
 setFinal$0: function() {
  this.Final = true;
 },
 GraphNode$1: function(Data) {
  this.Data = Data;
  this.Final = false;
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'GraphAriste'}));
  this.Aristes = t1;
 }
};

$$.Path = {"":
 ["Extended?", "NodesCollecion", "Value?"],
 super: "Object",
 GetStrPath$0: function() {
  var s = $.concat('(', $.toString(this.Value));
  var i = 0;
  while (true) {
    var t1 = $.get$length(this.NodesCollecion);
    if (typeof t1 !== 'number') return this.GetStrPath$0$bailout(1, s, i, t1);
    if (!(i < t1)) break;
    t1 = $.Revert(this.NodesCollecion);
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetStrPath$0$bailout(2, s, i, t1);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    s = $.concat(s, $.toString(t1[i].get$Data()));
    ++i;
  }
  return $.concat(s, ')');
 },
 GetStrPath$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      s = env0;
      i = env1;
      t1 = env2;
      break;
    case 2:
      s = env0;
      i = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var s = $.concat('(', $.toString(this.Value));
      var i = 0;
    case 1:
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = $.get$length(this.NodesCollecion);
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = $.Revert(this.NodesCollecion);
          case 2:
            state = 0;
            s = $.concat(s, $.toString($.index(t1, i).get$Data()));
            ++i;
        }
      }
      return $.concat(s, ')');
  }
 },
 GetStrHeuristic$0: function() {
  var s = $.concat('(', $.toString(this.getHeuristic$0()));
  var i = 0;
  while (true) {
    var t1 = $.get$length(this.NodesCollecion);
    if (typeof t1 !== 'number') return this.GetStrHeuristic$0$bailout(1, s, i, t1);
    if (!(i < t1)) break;
    t1 = $.Revert(this.NodesCollecion);
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetStrHeuristic$0$bailout(2, s, i, t1);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    s = $.concat(s, $.toString(t1[i].get$Data()));
    ++i;
  }
  return $.concat(s, ')');
 },
 GetStrHeuristic$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      s = env0;
      i = env1;
      t1 = env2;
      break;
    case 2:
      s = env0;
      i = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var s = $.concat('(', $.toString(this.getHeuristic$0()));
      var i = 0;
    case 1:
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = $.get$length(this.NodesCollecion);
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = $.Revert(this.NodesCollecion);
          case 2:
            state = 0;
            s = $.concat(s, $.toString($.index(t1, i).get$Data()));
            ++i;
        }
      }
      return $.concat(s, ')');
  }
 },
 GetStrHeuristicPath$0: function() {
  var t1 = this.Value;
  if (typeof t1 !== 'number') return this.GetStrHeuristicPath$0$bailout(1, t1, 0, 0);
  var t2 = this.getHeuristic$0();
  if (typeof t2 !== 'number') return this.GetStrHeuristicPath$0$bailout(2, t1, t2, 0);
  var s = $.concat('(', $.toString(t1 + t2));
  var i = 0;
  while (true) {
    t1 = $.get$length(this.NodesCollecion);
    if (typeof t1 !== 'number') return this.GetStrHeuristicPath$0$bailout(3, t1, s, i);
    if (!(i < t1)) break;
    t1 = $.Revert(this.NodesCollecion);
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetStrHeuristicPath$0$bailout(4, t1, s, i);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    s = $.concat(s, $.toString(t1[i].get$Data()));
    ++i;
  }
  return $.concat(s, ')');
 },
 GetStrHeuristicPath$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
    case 3:
      t1 = env0;
      s = env1;
      i = env2;
      break;
    case 4:
      t1 = env0;
      s = env1;
      i = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.Value;
    case 1:
      state = 0;
      var t2 = this.getHeuristic$0();
    case 2:
      state = 0;
      var s = $.concat('(', $.toString($.add(t1, t2)));
      var i = 0;
    case 3:
    case 4:
      L0: while (true) {
        switch (state) {
          case 0:
            t1 = $.get$length(this.NodesCollecion);
          case 3:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = $.Revert(this.NodesCollecion);
          case 4:
            state = 0;
            s = $.concat(s, $.toString($.index(t1, i).get$Data()));
            ++i;
        }
      }
      return $.concat(s, ')');
  }
 },
 GetAbsolutePath$0: function() {
  var s = '(';
  var i = 0;
  while (true) {
    var t1 = $.get$length(this.NodesCollecion);
    if (typeof t1 !== 'number') return this.GetAbsolutePath$0$bailout(1, t1, s, i);
    if (!(i < t1)) break;
    t1 = $.Revert(this.NodesCollecion);
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetAbsolutePath$0$bailout(2, t1, s, i);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    s = $.concat(s, $.toString(t1[i].get$Data()));
    if (typeof s !== 'string') return this.GetAbsolutePath$0$bailout(3, s, i, 0);
    ++i;
  }
  return s + ')';
 },
 GetAbsolutePath$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      s = env1;
      i = env2;
      break;
    case 2:
      t1 = env0;
      s = env1;
      i = env2;
      break;
    case 3:
      s = env0;
      i = env1;
      break;
  }
  switch (state) {
    case 0:
      var s = '(';
      var i = 0;
    case 1:
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = $.get$length(this.NodesCollecion);
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = $.Revert(this.NodesCollecion);
          case 2:
            state = 0;
            s = $.concat(s, $.toString($.index(t1, i).get$Data()));
          case 3:
            state = 0;
            ++i;
        }
      }
      return $.concat(s, ')');
  }
 },
 AddNode$1: function(GNode) {
  $.add$1(this.NodesCollecion, GNode);
 },
 ExtendPath$0: function() {
  var ExtendedPath = $.List((void 0));
  $.setRuntimeTypeInfo(ExtendedPath, ({E: 'Path'}));
  this.Extended = true;
  var i = 0;
  while (true) {
    var t1 = this.NodesCollecion;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.ExtendPath$0$bailout(1, t1, ExtendedPath, i, 0, 0);
    var t2 = t1.length;
    var t3 = t2 - 1;
    if (t3 < 0 || t3 >= t2) throw $.ioore(t3);
    t3 = $.get$length(t1[t3].get$Aristes());
    if (typeof t3 !== 'number') return this.ExtendPath$0$bailout(2, t3, ExtendedPath, i, 0, 0);
    if (!(i < t3)) break;
    var NewPath = $.Path$0();
    var j = 0;
    while (true) {
      t1 = $.get$length(this.NodesCollecion);
      if (typeof t1 !== 'number') return this.ExtendPath$0$bailout(3, NewPath, ExtendedPath, j, t1, i);
      if (!(j < t1)) break;
      t1 = this.NodesCollecion;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.ExtendPath$0$bailout(4, NewPath, ExtendedPath, j, t1, i);
      t2 = t1.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      NewPath.AddNode$1(t1[j]);
      ++j;
    }
    t1 = this.NodesCollecion;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.ExtendPath$0$bailout(5, NewPath, ExtendedPath, i, t1, 0);
    t2 = t1.length;
    t3 = t2 - 1;
    if (t3 < 0 || t3 >= t2) throw $.ioore(t3);
    t3 = t1[t3].get$Aristes();
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.ExtendPath$0$bailout(6, NewPath, ExtendedPath, i, t3, 0);
    t1 = t3.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    NewPath.AddNode$1(t3[i].get$Node());
    t3 = this.NodesCollecion;
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.ExtendPath$0$bailout(7, t3, NewPath, ExtendedPath, i, 0);
    var t4 = t3.length;
    var t5 = t4 - 1;
    if (t5 < 0 || t5 >= t4) throw $.ioore(t5);
    t5 = t3[t5].get$Aristes();
    if (typeof t5 !== 'string' && (typeof t5 !== 'object' || (t5.constructor !== Array && !t5.is$JavaScriptIndexingBehavior()))) return this.ExtendPath$0$bailout(8, NewPath, ExtendedPath, t5, i, 0);
    t3 = t5.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t5 = t5[i].get$value();
    if (typeof t5 !== 'number') return this.ExtendPath$0$bailout(9, NewPath, ExtendedPath, t5, i, 0);
    var t6 = this.Value;
    if (typeof t6 !== 'number') return this.ExtendPath$0$bailout(10, t6, NewPath, ExtendedPath, t5, i);
    NewPath.Value = t5 + t6;
    ExtendedPath.push(NewPath);
    ++i;
  }
  return ExtendedPath;
 },
 ExtendPath$0$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t1 = env0;
      ExtendedPath = env1;
      i = env2;
      break;
    case 2:
      t1 = env0;
      ExtendedPath = env1;
      i = env2;
      break;
    case 3:
      NewPath = env0;
      ExtendedPath = env1;
      j = env2;
      t1 = env3;
      i = env4;
      break;
    case 4:
      NewPath = env0;
      ExtendedPath = env1;
      j = env2;
      t1 = env3;
      i = env4;
      break;
    case 5:
      NewPath = env0;
      ExtendedPath = env1;
      i = env2;
      t1 = env3;
      break;
    case 6:
      NewPath = env0;
      ExtendedPath = env1;
      i = env2;
      t1 = env3;
      break;
    case 7:
      t1 = env0;
      NewPath = env1;
      ExtendedPath = env2;
      i = env3;
      break;
    case 8:
      NewPath = env0;
      ExtendedPath = env1;
      t1 = env2;
      i = env3;
      break;
    case 9:
      NewPath = env0;
      ExtendedPath = env1;
      t1 = env2;
      i = env3;
      break;
    case 10:
      t2 = env0;
      NewPath = env1;
      ExtendedPath = env2;
      t1 = env3;
      i = env4;
      break;
  }
  switch (state) {
    case 0:
      var ExtendedPath = $.List((void 0));
      $.setRuntimeTypeInfo(ExtendedPath, ({E: 'Path'}));
      this.Extended = true;
      var i = 0;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = this.NodesCollecion;
          case 1:
            state = 0;
            t1 = $.get$length($.index(t1, $.sub($.get$length(t1), 1)).get$Aristes());
          case 2:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            var NewPath = $.Path$0();
            var j = 0;
          case 3:
          case 4:
            L1: while (true) {
              switch (state) {
                case 0:
                  t1 = $.get$length(this.NodesCollecion);
                case 3:
                  state = 0;
                  if (!$.ltB(j, t1)) break L1;
                  t1 = this.NodesCollecion;
                case 4:
                  state = 0;
                  NewPath.AddNode$1($.index(t1, j));
                  ++j;
              }
            }
            t1 = this.NodesCollecion;
          case 5:
            state = 0;
            t1 = $.index(t1, $.sub($.get$length(t1), 1)).get$Aristes();
          case 6:
            state = 0;
            NewPath.AddNode$1($.index(t1, i).get$Node());
            t1 = this.NodesCollecion;
          case 7:
            state = 0;
            t1 = $.index(t1, $.sub($.get$length(t1), 1)).get$Aristes();
          case 8:
            state = 0;
            t1 = $.index(t1, i).get$value();
          case 9:
            state = 0;
            var t2 = this.Value;
          case 10:
            state = 0;
            NewPath.Value = $.add(t1, t2);
            ExtendedPath.push(NewPath);
            ++i;
        }
      }
      return ExtendedPath;
  }
 },
 hasFinalNode$0: function() {
  var i = 0;
  while (true) {
    var t1 = $.get$length(this.NodesCollecion);
    if (typeof t1 !== 'number') return this.hasFinalNode$0$bailout(1, t1, i);
    if (!(i < t1)) break;
    t1 = this.NodesCollecion;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.hasFinalNode$0$bailout(2, i, t1);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    if (t1[i].get$Final() === true) return true;
    ++i;
  }
  return false;
 },
 hasFinalNode$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      i = env1;
      break;
    case 2:
      i = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var i = 0;
    case 1:
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = $.get$length(this.NodesCollecion);
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.NodesCollecion;
          case 2:
            state = 0;
            if ($.index(t1, i).get$Final() === true) return true;
            ++i;
        }
      }
      return false;
  }
 },
 getHeuristic$0: function() {
  return $.last(this.NodesCollecion).get$Heuristic();
 },
 Path$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'GraphNode'}));
  this.NodesCollecion = t1;
  this.Extended = false;
 }
};

$$.PathRow = {"":
 ["Paths"],
 super: "Object",
 GetLowestHeuristic$0: function() {
  var t1 = this.Paths;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetLowestHeuristic$0$bailout(1, t1, 0, 0, 0);
  var t2 = t1.length;
  if (0 >= t2) throw $.ioore(0);
  var LowestPath = t1[0];
  var LowestVal = LowestPath.getHeuristic$0();
  if (typeof LowestVal !== 'number') return this.GetLowestHeuristic$0$bailout(2, LowestPath, LowestVal, 0, 0);
  var i = 1;
  while (true) {
    t1 = $.get$length(this.Paths);
    if (typeof t1 !== 'number') return this.GetLowestHeuristic$0$bailout(3, t1, LowestPath, i, LowestVal);
    if (!(i < t1)) break;
    t1 = this.Paths;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetLowestHeuristic$0$bailout(4, LowestPath, i, t1, LowestVal);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i].getHeuristic$0();
    if (typeof t1 !== 'number') return this.GetLowestHeuristic$0$bailout(5, LowestPath, i, t1, LowestVal);
    if (t1 <= LowestVal) {
      t1 = this.Paths;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetLowestHeuristic$0$bailout(6, i, t1, LowestVal, 0);
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      LowestPath = t1[i];
    }
    ++i;
  }
  return LowestPath;
 },
 GetLowestHeuristic$0$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      LowestPath = env0;
      LowestVal = env1;
      break;
    case 3:
      t1 = env0;
      LowestPath = env1;
      i = env2;
      LowestVal = env3;
      break;
    case 4:
      LowestPath = env0;
      i = env1;
      t1 = env2;
      LowestVal = env3;
      break;
    case 5:
      LowestPath = env0;
      i = env1;
      t1 = env2;
      LowestVal = env3;
      break;
    case 6:
      i = env0;
      t1 = env1;
      LowestVal = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.Paths;
    case 1:
      state = 0;
      var LowestPath = $.index(t1, 0);
      var LowestVal = LowestPath.getHeuristic$0();
    case 2:
      state = 0;
      var i = 1;
    case 3:
    case 4:
    case 5:
    case 6:
      L0: while (true) {
        switch (state) {
          case 0:
            t1 = $.get$length(this.Paths);
          case 3:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.Paths;
          case 4:
            state = 0;
            t1 = $.index(t1, i).getHeuristic$0();
          case 5:
            state = 0;
          case 6:
            if (state == 6 || (state == 0 && $.leB(t1, LowestVal))) {
              switch (state) {
                case 0:
                  t1 = this.Paths;
                case 6:
                  state = 0;
                  LowestPath = $.index(t1, i);
              }
            }
            ++i;
        }
      }
      return LowestPath;
  }
 },
 GetLowestHeuristicPath$0: function() {
  var t1 = this.Paths;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetLowestHeuristicPath$0$bailout(1, t1, 0, 0, 0, 0);
  var t2 = t1.length;
  if (0 >= t2) throw $.ioore(0);
  var LowestPath = t1[0];
  var LowestVal = LowestPath.get$Value();
  if (typeof LowestVal !== 'number') return this.GetLowestHeuristicPath$0$bailout(2, LowestPath, LowestVal, 0, 0, 0);
  var i = 1;
  while (true) {
    t1 = $.get$length(this.Paths);
    if (typeof t1 !== 'number') return this.GetLowestHeuristicPath$0$bailout(3, t1, LowestPath, i, LowestVal, 0);
    if (!(i < t1)) break;
    t1 = this.Paths;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetLowestHeuristicPath$0$bailout(4, LowestPath, t1, i, LowestVal, 0);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i].get$Value();
    if (typeof t1 !== 'number') return this.GetLowestHeuristicPath$0$bailout(5, LowestPath, i, t1, LowestVal, 0);
    var t3 = this.Paths;
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.GetLowestHeuristicPath$0$bailout(6, LowestVal, LowestPath, t3, i, t1);
    var t4 = t3.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    t3 = t3[i].getHeuristic$0();
    if (typeof t3 !== 'number') return this.GetLowestHeuristicPath$0$bailout(7, t3, LowestVal, LowestPath, i, t1);
    if (t1 + t3 < LowestVal) {
      t1 = this.Paths;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetLowestHeuristicPath$0$bailout(8, i, t1, LowestVal, 0, 0);
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      LowestPath = t1[i];
    }
    ++i;
  }
  return LowestPath;
 },
 GetLowestHeuristicPath$0$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      LowestPath = env0;
      LowestVal = env1;
      break;
    case 3:
      t1 = env0;
      LowestPath = env1;
      i = env2;
      LowestVal = env3;
      break;
    case 4:
      LowestPath = env0;
      t1 = env1;
      i = env2;
      LowestVal = env3;
      break;
    case 5:
      LowestPath = env0;
      i = env1;
      t1 = env2;
      LowestVal = env3;
      break;
    case 6:
      LowestVal = env0;
      LowestPath = env1;
      t2 = env2;
      i = env3;
      t1 = env4;
      break;
    case 7:
      t2 = env0;
      LowestVal = env1;
      LowestPath = env2;
      i = env3;
      t1 = env4;
      break;
    case 8:
      i = env0;
      t1 = env1;
      LowestVal = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.Paths;
    case 1:
      state = 0;
      var LowestPath = $.index(t1, 0);
      var LowestVal = LowestPath.get$Value();
    case 2:
      state = 0;
      var i = 1;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      L0: while (true) {
        switch (state) {
          case 0:
            t1 = $.get$length(this.Paths);
          case 3:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.Paths;
          case 4:
            state = 0;
            t1 = $.index(t1, i).get$Value();
          case 5:
            state = 0;
            var t2 = this.Paths;
          case 6:
            state = 0;
            t2 = $.index(t2, i).getHeuristic$0();
          case 7:
            state = 0;
          case 8:
            if (state == 8 || (state == 0 && $.ltB($.add(t1, t2), LowestVal))) {
              switch (state) {
                case 0:
                  t1 = this.Paths;
                case 8:
                  state = 0;
                  LowestPath = $.index(t1, i);
              }
            }
            ++i;
        }
      }
      return LowestPath;
  }
 },
 GetLowestPath$0: function() {
  var t1 = this.Paths;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetLowestPath$0$bailout(1, t1, 0, 0, 0);
  var t2 = t1.length;
  if (0 >= t2) throw $.ioore(0);
  var LowestPath = t1[0];
  var LowestVal = LowestPath.get$Value();
  if (typeof LowestVal !== 'number') return this.GetLowestPath$0$bailout(2, LowestPath, LowestVal, 0, 0);
  var i = 1;
  while (true) {
    t1 = $.get$length(this.Paths);
    if (typeof t1 !== 'number') return this.GetLowestPath$0$bailout(3, t1, LowestPath, i, LowestVal);
    if (!(i < t1)) break;
    t1 = this.Paths;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetLowestPath$0$bailout(4, LowestPath, i, t1, LowestVal);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1 = t1[i].get$Value();
    if (typeof t1 !== 'number') return this.GetLowestPath$0$bailout(5, LowestPath, i, t1, LowestVal);
    if (t1 < LowestVal) {
      t1 = this.Paths;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetLowestPath$0$bailout(6, i, t1, LowestVal, 0);
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      LowestPath = t1[i];
    }
    ++i;
  }
  return LowestPath;
 },
 GetLowestPath$0$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      LowestPath = env0;
      LowestVal = env1;
      break;
    case 3:
      t1 = env0;
      LowestPath = env1;
      i = env2;
      LowestVal = env3;
      break;
    case 4:
      LowestPath = env0;
      i = env1;
      t1 = env2;
      LowestVal = env3;
      break;
    case 5:
      LowestPath = env0;
      i = env1;
      t1 = env2;
      LowestVal = env3;
      break;
    case 6:
      i = env0;
      t1 = env1;
      LowestVal = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.Paths;
    case 1:
      state = 0;
      var LowestPath = $.index(t1, 0);
      var LowestVal = LowestPath.get$Value();
    case 2:
      state = 0;
      var i = 1;
    case 3:
    case 4:
    case 5:
    case 6:
      L0: while (true) {
        switch (state) {
          case 0:
            t1 = $.get$length(this.Paths);
          case 3:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.Paths;
          case 4:
            state = 0;
            t1 = $.index(t1, i).get$Value();
          case 5:
            state = 0;
          case 6:
            if (state == 6 || (state == 0 && $.ltB(t1, LowestVal))) {
              switch (state) {
                case 0:
                  t1 = this.Paths;
                case 6:
                  state = 0;
                  LowestPath = $.index(t1, i);
              }
            }
            ++i;
        }
      }
      return LowestPath;
  }
 },
 GetFirstPath$0: function() {
  var t1 = this.Paths;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetFirstPath$0$bailout(1, t1);
  var t2 = t1.length;
  if (0 >= t2) throw $.ioore(0);
  return t1[0];
 },
 GetFirstPath$0$bailout: function(state, t1) {
  return $.index(t1, 0);
 },
 GetLastPath$0: function() {
  return $.last(this.Paths);
 },
 PrintPaths$1: function(returnString) {
  for (var s = '', i = 0; $.ltB(i, $.get$length(this.Paths)); ++i) {
    s = $.concat(s, $.index(this.Paths, i).GetStrPath$0());
  }
  if (returnString === true) return s;
  $.print(s);
 },
 PrintHeuristicPaths$1: function(returnString) {
  var s = '';
  var i = 0;
  while (true) {
    var t1 = $.get$length(this.Paths);
    if (typeof t1 !== 'number') return this.PrintHeuristicPaths$1$bailout(1, s, i, returnString, t1);
    if (!(i < t1)) break;
    t1 = this.Paths;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.PrintHeuristicPaths$1$bailout(2, s, i, returnString, t1);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    s = $.concat(s, t1[i].GetStrHeuristicPath$0());
    if (typeof s !== 'string') return this.PrintHeuristicPaths$1$bailout(3, returnString, i, s, 0);
    ++i;
  }
  if (returnString === true) return s;
  $.print(s);
 },
 PrintHeuristicPaths$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      s = env0;
      i = env1;
      var returnString = env2;
      t1 = env3;
      break;
    case 2:
      s = env0;
      i = env1;
      returnString = env2;
      t1 = env3;
      break;
    case 3:
      returnString = env0;
      i = env1;
      s = env2;
      break;
  }
  switch (state) {
    case 0:
      var s = '';
      var i = 0;
    case 1:
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = $.get$length(this.Paths);
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.Paths;
          case 2:
            state = 0;
            s = $.concat(s, $.index(t1, i).GetStrHeuristicPath$0());
          case 3:
            state = 0;
            ++i;
        }
      }
      if (returnString === true) return s;
      $.print(s);
  }
 },
 PrintHeuristic$1: function(returnString) {
  var s = '';
  var i = 0;
  while (true) {
    var t1 = $.get$length(this.Paths);
    if (typeof t1 !== 'number') return this.PrintHeuristic$1$bailout(1, s, i, returnString, t1);
    if (!(i < t1)) break;
    t1 = this.Paths;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.PrintHeuristic$1$bailout(2, s, i, returnString, t1);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    s = $.concat(s, t1[i].GetStrHeuristic$0());
    if (typeof s !== 'string') return this.PrintHeuristic$1$bailout(3, returnString, i, s, 0);
    ++i;
  }
  if (returnString === true) return s;
  $.print(s);
 },
 PrintHeuristic$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      s = env0;
      i = env1;
      var returnString = env2;
      t1 = env3;
      break;
    case 2:
      s = env0;
      i = env1;
      returnString = env2;
      t1 = env3;
      break;
    case 3:
      returnString = env0;
      i = env1;
      s = env2;
      break;
  }
  switch (state) {
    case 0:
      var s = '';
      var i = 0;
    case 1:
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = $.get$length(this.Paths);
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.Paths;
          case 2:
            state = 0;
            s = $.concat(s, $.index(t1, i).GetStrHeuristic$0());
          case 3:
            state = 0;
            ++i;
        }
      }
      if (returnString === true) return s;
      $.print(s);
  }
 },
 GetPathStr$0: function() {
  var s = '';
  var i = 0;
  while (true) {
    var t1 = $.get$length(this.Paths);
    if (typeof t1 !== 'number') return this.GetPathStr$0$bailout(1, t1, s, i);
    if (!(i < t1)) break;
    t1 = this.Paths;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetPathStr$0$bailout(2, t1, s, i);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    s = $.concat(s, t1[i].GetAbsolutePath$0());
    if (typeof s !== 'string') return this.GetPathStr$0$bailout(3, s, i, 0);
    ++i;
  }
  return s;
 },
 GetPathStr$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      s = env1;
      i = env2;
      break;
    case 2:
      t1 = env0;
      s = env1;
      i = env2;
      break;
    case 3:
      s = env0;
      i = env1;
      break;
  }
  switch (state) {
    case 0:
      var s = '';
      var i = 0;
    case 1:
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = $.get$length(this.Paths);
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.Paths;
          case 2:
            state = 0;
            s = $.concat(s, $.index(t1, i).GetAbsolutePath$0());
          case 3:
            state = 0;
            ++i;
        }
      }
      return s;
  }
 },
 GetUnexpandedPaths$0: function() {
  var UnexpandedPaths = $.List((void 0));
  $.setRuntimeTypeInfo(UnexpandedPaths, ({E: 'Path'}));
  var i = 0;
  while (true) {
    var t1 = $.get$length(this.Paths);
    if (typeof t1 !== 'number') return this.GetUnexpandedPaths$0$bailout(1, i, UnexpandedPaths, t1);
    if (!(i < t1)) break;
    t1 = this.Paths;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetUnexpandedPaths$0$bailout(2, t1, i, UnexpandedPaths);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    if (t1[i].get$Extended() !== true) {
      t1 = this.Paths;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.GetUnexpandedPaths$0$bailout(3, i, UnexpandedPaths, t1);
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      UnexpandedPaths.push(t1[i]);
    }
    ++i;
  }
  return UnexpandedPaths;
 },
 GetUnexpandedPaths$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      i = env0;
      UnexpandedPaths = env1;
      t1 = env2;
      break;
    case 2:
      t1 = env0;
      i = env1;
      UnexpandedPaths = env2;
      break;
    case 3:
      i = env0;
      UnexpandedPaths = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var UnexpandedPaths = $.List((void 0));
      $.setRuntimeTypeInfo(UnexpandedPaths, ({E: 'Path'}));
      var i = 0;
    case 1:
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            var t1 = $.get$length(this.Paths);
          case 1:
            state = 0;
            if (!$.ltB(i, t1)) break L0;
            t1 = this.Paths;
          case 2:
            state = 0;
          case 3:
            if (state == 3 || (state == 0 && $.index(t1, i).get$Extended() !== true)) {
              switch (state) {
                case 0:
                  t1 = this.Paths;
                case 3:
                  state = 0;
                  UnexpandedPaths.push($.index(t1, i));
              }
            }
            ++i;
        }
      }
      return UnexpandedPaths;
  }
 },
 AddPath$1: function(QPath) {
  $.add$1(this.Paths, QPath);
 },
 PathRow$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Path'}));
  this.Paths = t1;
 }
};

$$.PathTable = {"":
 ["Rows"],
 super: "Object",
 GetLastRow$0: function() {
  return $.last(this.Rows);
 },
 AddRow$1: function(NewRow) {
  $.add$1(this.Rows, NewRow);
 },
 PathTable$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'PathRow'}));
  this.Rows = t1;
 }
};

$$.Graph = {"":
 ["CurrentNode", "FinalState", "InitialState?", "NodesCollecion"],
 super: "Object",
 setFinalState$1: function(GNode) {
  this.FinalState = GNode;
 },
 setInitialState$1: function(GNode) {
  this.InitialState = GNode;
 },
 Graph$0: function() {
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'GraphNode'}));
  this.NodesCollecion = t1;
 }
};

$$.Closure = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  this.box_0.GraphN_2.SetAdd$0();
  this.box_0.GraphN_2.ClearNodeSelection$0();
  this.box_0.GraphN_2.ClearAristesSelection$0();
 }
};

$$.Closure0 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  this.box_0.GraphN_2.SetJoin$0();
  this.box_0.GraphN_2.ClearNodeSelection$0();
  this.box_0.GraphN_2.ClearAristesSelection$0();
 }
};

$$.Closure1 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  this.box_0.GraphN_2.SetMove$0();
  this.box_0.GraphN_2.ClearNodeSelection$0();
  this.box_0.GraphN_2.ClearAristesSelection$0();
 }
};

$$.Closure2 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  this.box_0.GraphN_2.SetRemove$0();
  this.box_0.GraphN_2.ClearNodeSelection$0();
  this.box_0.GraphN_2.ClearAristesSelection$0();
 }
};

$$.Closure3 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  this.box_0.GraphN_2.SetSelect$0();
  this.box_0.GraphN_2.ClearNodeSelection$0();
  this.box_0.GraphN_2.ClearAristesSelection$0();
 }
};

$$.Closure4 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  $.ProcessGraph(this.box_0.GraphN_2);
 }
};

$$.Closure5 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  if (this.box_0.GraphN_2.get$IsSelect() === true) {
    if ($.eqB($.get$length(this.box_0.GraphN_2.GetSelectedNodes$0()), 1)) $.index(this.box_0.GraphN_2.GetSelectedNodes$0(), 0).SetHeuristicValue$1(e.get$charCode());
    else {
      $.eqB($.get$length(this.box_0.GraphN_2.GetSelectedAristes$0()), 1) && $.index(this.box_0.GraphN_2.GetSelectedAristes$0(), 0).SetValue$1(e.get$charCode());
    }
    var t1 = this.box_0;
    t1.GraphN_2.Draw$1(t1.ctx_1);
  }
 }
};

$$.Closure6 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  if (this.box_0.GraphN_2.get$IsSelect() === true) {
    if (this.box_0.GraphN_2.HasNodeClick$2(e.get$offsetX(), e.get$offsetY()) === true) {
      this.box_0.GraphN_2.ClearNodeSelection$0();
      this.box_0.GraphN_2.ClearAristesSelection$0();
      this.box_0.GraphN_2.HasNodeClick$2(e.get$offsetX(), e.get$offsetY());
    } else {
      var t1 = this.box_0.GraphN_2.HasAristeClick$2(e.get$offsetX(), e.get$offsetY()) === true;
      var t2 = this.box_0;
      if (t1) {
        t2.GraphN_2.ClearNodeSelection$0();
        this.box_0.GraphN_2.ClearAristesSelection$0();
        this.box_0.GraphN_2.HasAristeClick$2(e.get$offsetX(), e.get$offsetY());
      } else {
        t2.GraphN_2.ClearNodeSelection$0();
        this.box_0.GraphN_2.ClearAristesSelection$0();
      }
    }
    t1 = this.box_0;
    t1.GraphN_2.Draw$1(t1.ctx_1);
  }
 }
};

$$.Closure7 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  if (this.box_0.GraphN_2.get$IsMove() === true) {
    var SelectedNodes = this.box_0.GraphN_2.GetSelectedNodes$0();
    if ($.eqB($.get$length(SelectedNodes), 1)) {
      var t1 = e.get$offsetX();
      $.index(SelectedNodes, 0).set$cx(t1);
      t1 = e.get$offsetY();
      $.index(SelectedNodes, 0).set$cy(t1);
    }
    t1 = this.box_0;
    t1.GraphN_2.Draw$1(t1.ctx_1);
  }
 }
};

$$.Closure8 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  if (this.box_0.GraphN_2.get$IsMove() === true) {
    if (this.box_0.GraphN_2.HasNodeClick$2(e.get$offsetX(), e.get$offsetY()) === true) {
      var t1 = this.box_0;
      t1.GraphN_2.Draw$1(t1.ctx_1);
    }
  }
 }
};

$$.Closure9 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  if (this.box_0.GraphN_2.get$IsMove() === true) {
    this.box_0.GraphN_2.ClearNodeSelection$0();
    var t1 = this.box_0;
    t1.GraphN_2.Draw$1(t1.ctx_1);
  }
 }
};

$$.Closure10 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  if (this.box_0.GraphN_2.get$IsRemove() === true) {
    if (this.box_0.GraphN_2.HasNodeClick$2(e.get$offsetX(), e.get$offsetY()) === true) {
      var SelectedNodesID = this.box_0.GraphN_2.GetSelectedNodesID$0();
      var t1 = this.box_0.GraphN_2;
      t1.BlockConnectedAristes$1($.index(t1.GetSelectedNodes$0(), 0));
      $.removeRange(this.box_0.GraphN_2.get$Nodes(), $.index(SelectedNodesID, 0), 1);
      this.box_0.GraphN_2.ClearNodeSelection$0();
      this.box_0.GraphN_2.ClearAristesSelection$0();
      t1 = this.box_0;
      t1.GraphN_2.Draw$1(t1.ctx_1);
    } else {
      if (this.box_0.GraphN_2.HasAristeClick$2(e.get$offsetX(), e.get$offsetY()) === true) {
        this.box_0.GraphN_2.BlockSelectedAristes$0();
        this.box_0.GraphN_2.ClearNodeSelection$0();
        this.box_0.GraphN_2.ClearAristesSelection$0();
        t1 = this.box_0;
        t1.GraphN_2.Draw$1(t1.ctx_1);
      }
    }
    $.index(this.box_0.GraphN_2.get$Nodes(), 0).set$isInitial(true);
    $.last(this.box_0.GraphN_2.get$Nodes()).set$isLast(false);
    $.index(this.box_0.GraphN_2.get$Nodes(), $.sub($.get$length(this.box_0.GraphN_2.get$Nodes()), 1)).set$isLast(true);
  }
 }
};

$$.Closure11 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  if (this.box_0.GraphN_2.get$IsAdd() === true) {
    if (this.box_0.GraphN_2.HasNodeClick$2(e.get$offsetX(), e.get$offsetY()) !== true) {
      var t1 = e.get$offsetX();
      var t2 = e.get$offsetY();
      var t3 = this.box_0;
      var newNode = $.DrawNode$4(t1, t2, $.index(t3.alpth_3, t3.it_4), 0);
      this.box_0.GraphN_2.AddNewNode$1(newNode);
      var it = $.add(this.box_0.it_4, 1);
      this.box_0.it_4 = it;
    } else this.box_0.GraphN_2.ClearNodeSelection$0();
    t1 = this.box_0;
    t1.GraphN_2.Draw$1(t1.ctx_1);
  }
 }
};

$$.Closure12 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(e) {
  if (this.box_0.GraphN_2.get$IsJoin() === true) {
    if (this.box_0.GraphN_2.HasNodeClick$2(e.get$offsetX(), e.get$offsetY()) === true) {
      var SelectedNodes = this.box_0.GraphN_2.GetSelectedNodes$0();
      if ($.eqB($.get$length(SelectedNodes), 2)) {
        $.add$1(this.box_0.GraphN_2.get$Aristes(), $.DrawAriste$3($.index(SelectedNodes, 0), $.index(SelectedNodes, 1), 0));
        this.box_0.GraphN_2.ClearNodeSelection$0();
      }
    }
    var t1 = this.box_0;
    t1.GraphN_2.Draw$1(t1.ctx_1);
  }
 }
};

$$.Closure13 = {"":
 ["box_0"],
 super: "Closure27",
 $call$2: function(k, v) {
  var t1 = this.box_0;
  t1.first_3 !== true && $.add$1(t1.result_1, ', ');
  this.box_0.first_3 = false;
  t1 = this.box_0;
  $._emitObject(k, t1.result_1, t1.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  t1 = this.box_0;
  $._emitObject(v, t1.result_1, t1.visiting_2);
 }
};

$$.Closure14 = {"":
 ["box_0"],
 super: "Closure27",
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
};

$$.Closure15 = {"":
 ["box_0"],
 super: "Closure27",
 $call$0: function() {
  var t1 = this.box_0;
  return t1.closure_1.$call$1(t1.arg1_2);
 }
};

$$.Closure16 = {"":
 ["box_0"],
 super: "Closure27",
 $call$0: function() {
  var t1 = this.box_0;
  return t1.closure_1.$call$2(t1.arg1_2, t1.arg2_3);
 }
};

$$.Closure17 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(node) {
  return node.Draw$1(this.box_0.ctx_10);
 }
};

$$.Closure18 = {"":
 ["box_0"],
 super: "Closure27",
 $call$1: function(ariste) {
  return ariste.Draw$1(this.box_0.ctx_10);
 }
};

$$.Closure19 = {"":
 [],
 super: "Closure27",
 $call$1: function(node) {
  node.set$isSelected(false);
  return false;
 }
};

$$.Closure20 = {"":
 [],
 super: "Closure27",
 $call$1: function(ariste) {
  ariste.set$IsSelected(false);
  return false;
 }
};

$$.Closure21 = {"":
 [],
 super: "Closure27",
 $call$1: function(n) {
  return typeof n === 'object' && n.is$Element();
 }
};

$$.Closure22 = {"":
 ["box_0", "output_2"],
 super: "Closure27",
 $call$1: function(element) {
  this.box_0.f_1.$call$1(element) === true && $.add$1(this.output_2, element);
 }
};

$$.Closure23 = {"":
 [],
 super: "Closure27",
 $call$1: function(el) {
  return el.remove$0();
 }
};

$$.Closure24 = {"":
 ["this_0"],
 super: "Closure27",
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
};

$$.Closure25 = {"":
 ["box_0"],
 super: "Closure27",
 $call$2: function(key, value) {
  this.box_0.f_10.$call$1(key);
 }
};

$$.Closure26 = {"":
 ["box_0"],
 super: "Closure27",
 $call$2: function(key, value) {
  this.box_0.f_11.$call$1(key) === true && $.add$1(this.box_0.result_2, key);
 }
};

$$.Closure27 = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 }
};

Isolate.$defineClass('Closure28', 'Closure27', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
Isolate.$defineClass('Closure29', 'Closure27', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  }
  return a.operator$mul$1(b);
};

$._ChildNodeListLazy$1 = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b) === true;
    return a === b;
  }
  return a === b;
};

$._containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    if (t1.next$0() === ref) return true;
  }
  return false;
};

$._NodeListWrapper$1 = function(list) {
  return new $._NodeListWrapper(list);
};

$.isJsArray = function(value) {
  return !(value === (void 0)) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.DrawFinalNode = function(context, x, y, label, heuristic, isSelected) {
  context.set$fillStyle('rgb(0,255,0)');
  context.beginPath$0();
  context.arc$6(x, y, 20, 0, 6.283185307179586, true);
  context.closePath$0();
  context.fill$0();
  if (isSelected === true) context.set$strokeStyle('#AAAAAA');
  else context.set$strokeStyle('#0B173B');
  context.set$lineWidth(4);
  context.beginPath$0();
  context.arc$6(x, y, 20, 0, 6.283185307179586, true);
  context.closePath$0();
  context.stroke$0();
  context.set$fillStyle('#000000');
  context.set$font('bold 30px sans-serif');
  context.fillText$3(label, $.sub(x, 11), $.add(y, 8));
  context.set$fillStyle('#0000FF');
  context.set$font('bold 20px sans-serif');
  context.fillText$3(heuristic, $.sub(x, 16), $.sub(y, 27));
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length;
  }
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  }
  return a.operator$ge$1(b);
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$._IDBOpenDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.removeRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.removeRange$2(start, length$);
  $.checkGrowable(receiver, 'removeRange');
  if ($.eqB(length$, 0)) return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  var receiverLength = (receiver.length);
  if (start < 0 || start >= receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  var t1 = start + length$;
  if (t1 > receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$1(t1));
  t1 = $.add(start, length$);
  if (typeof length$ !== 'number') throw $.iae(length$);
  var t2 = receiverLength - length$;
  if (typeof start !== 'number') throw $.iae(start);
  $.copy(receiver, t1, receiver, start, t2 - start);
  $.set$length(receiver, t2);
};

$.printString = function(string) {
  if (typeof dartPrint == "function") dartPrint(string);
  else {
    if (typeof console == "object") console.log(string);
    else {
      write(string);
      write("\n");
    }
  }
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate((a) / (b));
  }
  return a.operator$tdiv$1(b);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  return name$;
};

$.DrawInitialNode = function(context, x, y, label, heuristic, isSelected) {
  context.set$fillStyle('rgb(200,200,0)');
  context.beginPath$0();
  context.arc$6(x, y, 20, 0, 6.283185307179586, true);
  context.closePath$0();
  context.fill$0();
  if (isSelected === true) context.set$strokeStyle('#AAAAAA');
  else context.set$strokeStyle('#0B173B');
  context.set$lineWidth(4);
  context.beginPath$0();
  context.arc$6(x, y, 20, 0, 6.283185307179586, true);
  context.closePath$0();
  context.stroke$0();
  context.set$fillStyle('#000000');
  context.set$font('bold 30px sans-serif');
  context.fillText$3(label, $.sub(x, 11), $.add(y, 8));
  context.set$fillStyle('#0000FF');
  context.set$font('bold 20px sans-serif');
  context.fillText$3(heuristic, $.sub(x, 16), $.sub(y, 27));
};

$.sqrt = function(x) {
  return $.sqrt0(x);
};

$.sqrt0 = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$1(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1((void 0));
    return false;
  }
  return typeof a === "undefined";
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex === (void 0)) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t1 = ({});
  t1.arg2_3 = arg2;
  t1.arg1_2 = arg1;
  t1.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure14(t1).$call$0();
  }
  if ($.eqB(numberOfArguments, 1)) {
    return new $.Closure15(t1).$call$0();
  }
  if ($.eqB(numberOfArguments, 2)) {
    return new $.Closure16(t1).$call$0();
  }
  throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$.String$fromCharCodes = function(charCodes) {
  return $.createFromCharCodes(charCodes);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
  var t1;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$.parseInt = function(str) {
  return $.parseInt0(str);
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) return receiver.filter$1(predicate);
  return $.filter0(receiver, [], predicate);
};

$._NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.parseInt0 = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) throw $.captureStackTrace($.BadNumberFormatException$1(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2)) {
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  } else t1 = false;
  if (!t1) {
    if ($.gtB($.get$length(trimmed), 3)) {
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    } else t1 = false;
  } else t1 = true;
  var base = t1 ? 16 : 10;
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) throw $.captureStackTrace($.BadNumberFormatException$1(str));
  return ret;
};

$.filter0 = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix === (void 0)) {
    if ($.isFirefox() === true) $._cachedBrowserPrefix = '-moz-';
    else $._cachedBrowserPrefix = '-webkit-';
  }
  return $._cachedBrowserPrefix;
};

$.DrawGraph$0 = function() {
  var t1 = new $.DrawGraph(false, false, false, false, true, (void 0), (void 0), (void 0), (void 0));
  t1.DrawGraph$0();
  return t1;
};

$.filter1 = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List0());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $._emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  }
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._ElementList$1 = function(list) {
  return new $._ElementList(list);
};

$._WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.DrawLabel = function(context, x, y, label) {
  context.set$fillStyle('#000000');
  context.set$font('bold 12px sans-serif');
  context.fillText$3(label, $.sub(x, 6), $.add(y, 6));
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.PathTable$0 = function() {
  var t1 = new $.PathTable((void 0));
  t1.PathTable$0();
  return t1;
};

$._EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.Revert = function(RList) {
  if (typeof RList !== 'string' && (typeof RList !== 'object' || (RList.constructor !== Array && !RList.is$JavaScriptIndexingBehavior()))) return $.Revert$bailout(1, RList);
  var TempList = $.List((void 0));
  $.setRuntimeTypeInfo(TempList, ({E: 'Object'}));
  for (var i = RList.length - 1; i >= 0; --i) {
    var t1 = RList.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    TempList.push(RList[i]);
  }
  return TempList;
};

$._IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.HashSetImplementation$0 = function() {
  var t1 = new $.HashSetImplementation((void 0));
  t1.HashSetImplementation$0();
  return t1;
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  }
  if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
    return receiver.split($.regExpGetNative(pattern));
  }
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
};

$._SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$1(receiver);
  return receiver.iterator$0();
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.AStar = function(GraphToProcess) {
  var CU_QTable = $.PathTable$0();
  var InitialRow = $.PathRow$0();
  var InitialPath = $.Path$0();
  InitialPath.AddNode$1(GraphToProcess.get$InitialState());
  InitialPath.Value = 0;
  InitialRow.AddPath$1(InitialPath);
  var ResultTable = '' + ('<div class=\'pathrow\'>' + $.S(InitialRow.PrintPaths$1(true)) + '</div>');
  CU_QTable.AddRow$1(InitialRow);
  var NewRow = (void 0);
  var TempRow = (void 0);
  do {
    TempRow = CU_QTable.GetLastRow$0();
    NewRow = $.PathRow$0();
    if (TempRow.GetLowestHeuristicPath$0().hasFinalNode$0() === true) break;
    for (var i = 0; $.ltB(i, $.get$length(TempRow.GetLowestHeuristicPath$0().ExtendPath$0())); ++i) {
      NewRow.AddPath$1($.index(TempRow.GetLowestHeuristicPath$0().ExtendPath$0(), i));
    }
    $.addAll(NewRow.Paths, TempRow.GetUnexpandedPaths$0());
    CU_QTable.AddRow$1(NewRow);
    ResultTable = $.concat(ResultTable, '<div class=\'pathrow\'>' + $.S(NewRow.PrintHeuristicPaths$1(true)) + '</div>');
  } while (true);
  return '<div class=\'pathtable\'>' + $.S(ResultTable) + '</div>';
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b) === true;
};

$.atan2 = function(a, b) {
  return $.atan20(a, b);
};

$.atan20 = function(a, b) {
  return Math.atan2($.checkNum(a), $.checkNum(b));
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') return !($.indexOf$2(receiver, other, startIndex) === -1);
  if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.abs$0();
  return Math.abs(receiver);
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b) === true;
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$1('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(pattern, (String(e))));
  }
};

$.BadNumberFormatException$1 = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$._FrozenElementListIterator$1 = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length === 0;
  }
  return receiver.isEmpty$0();
};

$._XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && (o.constructor === Array || o.is$List0()) ? '[...]' : '{...}');
    } else $._emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $._emitMap(o, result, visiting);
    } else {
      $.add$1(result, $.eqNullB(o) ? 'null' : o);
    }
  }
};

$._emitMap = function(m, result, visiting) {
  var t1 = ({});
  t1.visiting_2 = visiting;
  t1.result_1 = result;
  $.add$1(t1.visiting_2, m);
  $.add$1(t1.result_1, '{');
  t1.first_3 = true;
  $.forEach(m, new $.Closure13(t1));
  $.add$1(t1.result_1, '}');
  $.removeLast(t1.visiting_2);
};

$._IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.isFirefox = function() {
  return $.contains$2($.userAgent(), 'Firefox', 0);
};

$._TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.FirstWide = function(GraphToProcess) {
  var CU_QTable = $.PathTable$0();
  var InitialRow = $.PathRow$0();
  var InitialPath = $.Path$0();
  InitialPath.AddNode$1(GraphToProcess.get$InitialState());
  InitialPath.Value = 0;
  InitialRow.AddPath$1(InitialPath);
  var ResultTable = '' + ('<div class=\'pathrow\'>' + $.S(InitialRow.GetPathStr$0()) + '</div>');
  CU_QTable.AddRow$1(InitialRow);
  var NewRow = (void 0);
  var TempRow = (void 0);
  do {
    TempRow = CU_QTable.GetLastRow$0();
    NewRow = $.PathRow$0();
    if (TempRow.GetFirstPath$0().hasFinalNode$0() === true) break;
    for (var i = 0; $.ltB(i, $.get$length(TempRow.GetFirstPath$0().ExtendPath$0())); ++i) {
      NewRow.AddPath$1($.index(TempRow.GetFirstPath$0().ExtendPath$0(), i));
    }
    var TempList = $.List((void 0));
    $.setRuntimeTypeInfo(TempList, ({E: 'Path'}));
    $.addAll(TempList, TempRow.GetUnexpandedPaths$0());
    $.addAll(TempList, NewRow.Paths);
    NewRow.Paths = TempList;
    CU_QTable.AddRow$1(NewRow);
    ResultTable = $.concat(ResultTable, '<div class=\'pathrow\'>' + $.S(NewRow.GetPathStr$0()) + '</div>');
  } while (true);
  return '<div class=\'pathtable\'>' + $.S(ResultTable) + '</div>';
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.DrawNode$4 = function(x, y, value, heuristic) {
  var t1 = new $.DrawNode((void 0), false, false, true, 0, '', '', '', (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.DrawNode$4(x, y, value, heuristic);
  return t1;
};

$.DrawNode0 = function(context, x, y, label, heuristic, isSelected) {
  context.set$fillStyle('#FF0000');
  context.beginPath$0();
  context.arc$6(x, y, 20, 0, 6.283185307179586, true);
  context.closePath$0();
  context.fill$0();
  if (isSelected === true) context.set$strokeStyle('#AAAAAA');
  else context.set$strokeStyle('#0B173B');
  context.set$lineWidth(4);
  context.beginPath$0();
  context.arc$6(x, y, 20, 0, 6.283185307179586, true);
  context.closePath$0();
  context.stroke$0();
  context.set$fillStyle('#000000');
  context.set$font('bold 30px sans-serif');
  context.fillText$3(label, $.sub(x, 11), $.add(y, 8));
  context.set$fillStyle('#0000FF');
  context.set$font('bold 20px sans-serif');
  context.fillText$3(heuristic, $.sub(x, 16), $.sub(y, 27));
};

$.GraphAriste$2 = function(value, Node$) {
  return new $.GraphAriste(Node$, value);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(start));
    return $.indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$._FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.DrawLine = function(context, x1, y1, x2, y2, isSelected) {
  $.Math$0();
  var XLong = $.sub(x2, x1);
  if (typeof y2 !== 'number') throw $.iae(y2);
  var t1 = -1 * y2;
  if (typeof y1 !== 'number') throw $.iae(y1);
  var t2 = -1 * y1;
  if (typeof XLong !== 'number') throw $.iae(XLong);
  var Angle = $.mul($.atan((t1 - t2) / XLong), 57.29577951308232);
  if ($.ltB(Angle, 0)) {
    if (typeof Angle !== 'number') throw $.iae(Angle);
    Angle += 180;
  }
  if (y2 > y1) {
    if (typeof Angle !== 'number') throw $.iae(Angle);
    Angle += 180;
  }
  var t3 = $.cos($.div($.mul(Angle, 3.141592653589793), 180));
  if (typeof t3 !== 'number') throw $.iae(t3);
  var fixX = 20.0 * t3;
  t3 = $.sin($.div($.mul(Angle, 3.141592653589793), 180));
  if (typeof t3 !== 'number') throw $.iae(t3);
  var fixY = 20.0 * t3;
  var fixedX1 = $.add(x1, fixX);
  var fixedY1 = y1 - fixY;
  XLong = $.sub(x1, x2);
  if (typeof XLong !== 'number') throw $.iae(XLong);
  Angle = $.mul($.atan((t2 - t1) / XLong), 57.29577951308232);
  if ($.ltB(Angle, 0)) {
    if (typeof Angle !== 'number') throw $.iae(Angle);
    Angle += 180;
  }
  if (y1 > y2) {
    if (typeof Angle !== 'number') throw $.iae(Angle);
    Angle += 180;
  }
  t1 = $.cos($.div($.mul(Angle, 3.141592653589793), 180));
  if (typeof t1 !== 'number') throw $.iae(t1);
  fixX = 20.0 * t1;
  t1 = $.sin($.div($.mul(Angle, 3.141592653589793), 180));
  if (typeof t1 !== 'number') throw $.iae(t1);
  fixY = 20.0 * t1;
  var fixedX2 = $.add(x2, fixX);
  var fixedY2 = y2 - fixY;
  context.set$fillStyle('rgb(0,0,0)');
  $.drawArrow(context, fixedX1, fixedY1, fixedX2, fixedY2, 20, 3, 1, 0.39269908169872414);
  context.beginPath$0();
  context.set$fillStyle('rgb(0,0,0)');
  context.set$strokeStyle('rgb(0,0,0)');
  t1 = $.div($.add(x1, x2), 2);
  t2 = (y1 + y2) / 2;
  context.arc$6(t1, t2, 15, 0, 6.283185307179586, true);
  context.closePath$0();
  context.fill$0();
  context.beginPath$0();
  if (isSelected !== true) context.set$fillStyle('rgb(225,225,225)');
  else context.set$fillStyle('rgb(200,100,100)');
  context.arc$6($.div($.add(x1, x2), 2), t2, 13, 0, 6.283185307179586, true);
  context.closePath$0();
  context.fill$0();
};

$.concat = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.concat$1(other);
  if (!(typeof other === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(other));
  return receiver + other;
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.eqNullB = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1((void 0)) === true;
    return false;
  }
  return typeof a === "undefined";
};

$.Element$tag = function(tag) {
  return document.createElement(tag);
};

$._FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  }
  return a.operator$add$1(b);
};

$.List$from = function(other) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  var t1 = ({});
  var canvas = $.document().query$1('#canvas');
  t1.ctx_1 = canvas.getContext$1('2d');
  t1.GraphN_2 = $.DrawGraph$0();
  t1.alpth_3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  t1.it_4 = 0;
  $.add$1($.document().query$1('#add').get$on().get$click(), new $.Closure(t1));
  $.add$1($.document().query$1('#join').get$on().get$click(), new $.Closure0(t1));
  $.add$1($.document().query$1('#move').get$on().get$click(), new $.Closure1(t1));
  $.add$1($.document().query$1('#remove').get$on().get$click(), new $.Closure2(t1));
  $.add$1($.document().query$1('#select').get$on().get$click(), new $.Closure3(t1));
  $.add$1($.document().query$1('#process').get$on().get$click(), new $.Closure4(t1));
  $.add$1($.document().get$on().get$keyPress(), new $.Closure5(t1));
  $.add$1(canvas.get$on().get$click(), new $.Closure6(t1));
  $.add$1(canvas.get$on().get$mouseMove(), new $.Closure7(t1));
  $.add$1(canvas.get$on().get$mouseDown(), new $.Closure8(t1));
  $.add$1(canvas.get$on().get$mouseUp(), new $.Closure9(t1));
  $.add$1(canvas.get$on().get$click(), new $.Closure10(t1));
  $.add$1(canvas.get$on().get$click(), new $.Closure11(t1));
  $.add$1(canvas.get$on().get$click(), new $.Closure12(t1));
};

$._AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$1 = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$.ProcessGraph = function(graph) {
  var NodeGraph = $.Graph$0();
  for (var i = 0; $.ltB(i, $.get$length(graph.get$Nodes())); ++i) {
    $.index(graph.get$Nodes(), i).SetNodeValue$0();
  }
  $.last(graph.get$Nodes()).get$node().setFinal$0();
  for (i = 0; $.ltB(i, $.get$length(graph.get$Aristes())); ++i) {
    $.index(graph.get$Aristes(), i).get$IsBlocked() !== true && $.index(graph.get$Aristes(), i).SetJoin$0();
  }
  for (i = 0; $.ltB(i, $.get$length(graph.get$Nodes())); ++i) {
    $.add$1(NodeGraph.NodesCollecion, $.index(graph.get$Nodes(), i).get$node());
  }
  NodeGraph.setInitialState$1($.index(graph.get$Nodes(), 0).get$node());
  NodeGraph.setFinalState$1($.last(graph.get$Nodes()).get$node());
  var t1 = $.FirstDeep(NodeGraph);
  $.document().query$1('#first-deep').set$innerHTML(t1);
  t1 = $.FirstWide(NodeGraph);
  $.document().query$1('#first-wide').set$innerHTML(t1);
  t1 = $.FirstBest(NodeGraph);
  $.document().query$1('#first-best').set$innerHTML(t1);
  t1 = $.UniFormCost(NodeGraph);
  $.document().query$1('#uniform-cost').set$innerHTML(t1);
  t1 = $.AStar(NodeGraph);
  $.document().query$1('#a-star').set$innerHTML(t1);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  }
  return receiver.isNaN$0();
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.isInfinite$0();
  return (receiver == Infinity) || (receiver == -Infinity);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a <= b;
  }
  return a.operator$le$1(b);
};

$._ChildrenElementList$_wrap$1 = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.Math$0 = function() {
  return new $.Math();
};

$.copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || (src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))) return $.copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || ((dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())) return $.copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof count !== 'number') return $.copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart === (void 0)) srcStart = 0;
  if (typeof srcStart !== 'number') return $.copy$bailout(2, src, dst, dstStart, count, srcStart);
  if (dstStart === (void 0)) dstStart = 0;
  if (typeof dstStart !== 'number') return $.copy$bailout(3, src, dst, count, srcStart, dstStart);
  if (srcStart < dstStart) {
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = src.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t3 = dst.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      dst[j] = t2;
    }
  } else {
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i !== (i | 0)) throw $.iae(i);
      t2 = src.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t4 = dst.length;
      if (j < 0 || j >= t4) throw $.ioore(j);
      dst[j] = t3;
    }
  }
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.drawHead = function(ctx, x0, y0, x1, y1, x2, y2, style) {
  ctx.save$0();
  ctx.beginPath$0();
  ctx.moveTo$2(x0, y0);
  ctx.lineTo$2(x1, y1);
  ctx.lineTo$2(x2, y2);
  switch (style) {
    case 0:
      var backdist = $.sqrt($.add($.mul($.sub(x2, x0), $.sub(x2, x0)), $.mul($.sub(y2, y0), $.sub(y2, y0))));
      if (typeof backdist !== 'number') throw $.iae(backdist);
      ctx.arcTo$5(x1, y1, x0, y0, 0.55 * backdist);
      ctx.fill$0();
      break;
    case 1:
      ctx.lineTo$2(x0, y0);
      ctx.fill$0();
      break;
    case 2:
      ctx.stroke$0();
      break;
    case 3:
      ctx.quadraticCurveTo$4($.div($.add($.add(x0, x1), x2), 3), $.div($.add($.add(y0, y1), y2), 3), x0, y0);
      ctx.fill$0();
      break;
    case 4:
      if ($.eqB(x2, x0)) {
        backdist = $.sub(y2, y0);
        var cp1x = $.div($.add(x1, x0), 2);
        var cp2x = $.div($.add(x1, x0), 2);
        var cp1y = $.add(y1, $.div(backdist, 5));
        var cp2y = $.sub(y1, $.div(backdist, 5));
      } else {
        backdist = $.sqrt($.add($.mul($.sub(x2, x0), $.sub(x2, x0)), $.mul($.sub(y2, y0), $.sub(y2, y0))));
        var xback = $.div($.add(x0, x2), 2);
        var yback = $.div($.add(y0, y2), 2);
        var xmid = $.div($.add(xback, x1), 2);
        var ymid = $.div($.add(yback, y1), 2);
        var m = $.div($.sub(y2, y0), $.sub(x2, x0));
        var t1 = $.sqrt($.add($.mul(m, m), 1));
        if (typeof t1 !== 'number') throw $.iae(t1);
        var dx = $.div($.div(backdist, 2 * t1), 5);
        var dy = $.mul(m, dx);
        cp1x = $.sub(xmid, dx);
        cp1y = $.sub(ymid, dy);
        cp2x = $.add(xmid, dx);
        cp2y = $.add(ymid, dy);
      }
      ctx.bezierCurveTo$6(cp1x, cp1y, cp2x, cp2y, x0, y0);
      ctx.fill$0();
      break;
  }
  ctx.restore$0();
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.atan = function(x) {
  return $.atan0(x);
};

$.atan0 = function(value) {
  return Math.atan($.checkNum(value));
};

$.DrawAriste$3 = function(initialNode, finalNode, value) {
  var t1 = new $.DrawAriste(0, '', '', '', false, false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
  t1.DrawAriste$3(initialNode, finalNode, value);
  return t1;
};

$._WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b) === true;
};

$.FilteredElementList$1 = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure === (void 0)) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $, arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$._FrozenElementList$_wrap$1 = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  return $.stringJoinUnchecked($._toJsStringArray(strings), '');
};

$.userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.getRange$2(start, length$);
  if (0 === length$) return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) throw $.captureStackTrace($.IndexOutOfRangeException$1(length$));
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  return receiver.slice(start, end);
};

$.getRange0 = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.getRange0$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number') return $.getRange0$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  if (typeof length$ !== 'number') throw $.iae(length$);
  var end = start + length$;
  if (end > a.length) throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(value));
  return res;
};

$._TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$._DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r === (void 0) ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  return object;
};

$.FirstDeep = function(GraphToProcess) {
  var CU_QTable = $.PathTable$0();
  var InitialRow = $.PathRow$0();
  var InitialPath = $.Path$0();
  InitialPath.AddNode$1(GraphToProcess.get$InitialState());
  InitialPath.Value = 0;
  InitialRow.AddPath$1(InitialPath);
  var ResultTable = '' + ('<div class=\'pathrow\'>' + $.S(InitialRow.GetPathStr$0()) + '</div>');
  CU_QTable.AddRow$1(InitialRow);
  var NewRow = (void 0);
  var TempRow = (void 0);
  do {
    TempRow = CU_QTable.GetLastRow$0();
    NewRow = $.PathRow$0();
    if (TempRow.GetFirstPath$0().hasFinalNode$0() === true) break;
    for (var i = 0; $.ltB(i, $.get$length(TempRow.GetLastPath$0().ExtendPath$0())); ++i) {
      NewRow.AddPath$1($.index(TempRow.GetLastPath$0().ExtendPath$0(), i));
    }
    var TempList = $.List((void 0));
    $.setRuntimeTypeInfo(TempList, ({E: 'Path'}));
    $.addAll(TempList, NewRow.Paths);
    $.addAll(TempList, TempRow.GetUnexpandedPaths$0());
    NewRow.Paths = TempList;
    CU_QTable.AddRow$1(NewRow);
    ResultTable = $.concat(ResultTable, '<div class=\'pathrow\'>' + $.S(NewRow.GetPathStr$0()) + '</div>');
  } while (true);
  return '<div class=\'pathtable\'>' + $.S(ResultTable) + '</div>';
};

$._EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$1(b));
  }
  return false;
};

$.PathRow$0 = function() {
  var t1 = new $.PathRow((void 0));
  t1.PathRow$0();
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  }
  return a.operator$lt$1(b);
};

$.FirstBest = function(GraphToProcess) {
  var CU_QTable = $.PathTable$0();
  var InitialRow = $.PathRow$0();
  var InitialPath = $.Path$0();
  InitialPath.AddNode$1(GraphToProcess.get$InitialState());
  InitialPath.Value = 0;
  InitialRow.AddPath$1(InitialPath);
  var ResultTable = '' + ('<div class=\'pathrow\'>' + $.S(InitialRow.PrintPaths$1(true)) + '</div>');
  CU_QTable.AddRow$1(InitialRow);
  var NewRow = (void 0);
  var TempRow = (void 0);
  do {
    TempRow = CU_QTable.GetLastRow$0();
    NewRow = $.PathRow$0();
    if (TempRow.GetLowestHeuristic$0().hasFinalNode$0() === true) break;
    for (var i = 0; $.ltB(i, $.get$length(TempRow.GetLowestHeuristic$0().ExtendPath$0())); ++i) {
      NewRow.AddPath$1($.index(TempRow.GetLowestHeuristic$0().ExtendPath$0(), i));
    }
    $.addAll(NewRow.Paths, TempRow.GetUnexpandedPaths$0());
    CU_QTable.AddRow$1(NewRow);
    ResultTable = $.concat(ResultTable, '<div class=\'pathrow\'>' + $.S(NewRow.PrintHeuristic$1(true)) + '</div>');
  } while (true);
  return '<div class=\'pathtable\'>' + $.S(ResultTable) + '</div>';
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$1(index));
      if (!($.truncate(index) === index)) throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.drawArrow = function(ctx, x1, y1, x2, y2, d, style, which, angle) {
  var dist = $.sqrt($.add($.mul($.sub(x2, x1), $.sub(x2, x1)), $.mul($.sub(y2, y1), $.sub(y2, y1))));
  var ratio = $.div($.sub(dist, $.div(d, 3)), dist);
  if ($.eqB(which, 1)) {
    var tox = $.add(x1, $.mul($.sub(x2, x1), ratio));
    var toy = $.add(y1, $.mul($.sub(y2, y1), ratio));
  } else {
    tox = x2;
    toy = y2;
  }
  if ($.eqB(which, 2)) {
    var t1 = $.sub(x2, x1);
    if (typeof ratio !== 'number') throw $.iae(ratio);
    var t2 = 1 - ratio;
    var fromx = $.add(x1, $.mul(t1, t2));
    var fromy = $.add(y1, $.mul($.sub(y2, y1), t2));
  } else {
    fromx = x1;
    fromy = y1;
  }
  ctx.beginPath$0();
  ctx.moveTo$2(fromx, fromy);
  ctx.lineTo$2(tox, toy);
  ctx.stroke$0();
  var lineangle = $.atan2($.sub(y2, y1), $.sub(x2, x1));
  var h = $.abs($.div(d, $.cos(angle)));
  if ($.eqB(which, 1)) {
    var angle1 = $.add($.add(lineangle, 3.141592653589793), angle);
    var topx = $.add(x2, $.mul($.cos(angle1), h));
    var topy = $.add(y2, $.mul($.sin(angle1), h));
    var angle2 = $.sub($.add(lineangle, 3.141592653589793), angle);
    $.drawHead(ctx, topx, topy, x2, y2, $.add(x2, $.mul($.cos(angle2), h)), $.add(y2, $.mul($.sin(angle2), h)), style);
  }
  if ($.eqB(which, 2)) {
    angle1 = $.add(lineangle, angle);
    topx = $.add(x1, $.mul($.cos(angle1), h));
    topy = $.add(y1, $.mul($.sin(angle1), h));
    angle2 = $.sub(lineangle, angle);
    $.drawHead(ctx, topx, topy, x1, y1, $.add(x1, $.mul($.cos(angle2), h)), $.add(y1, $.mul($.sin(angle2), h)), style);
  }
};

$.Graph$0 = function() {
  var t1 = new $.Graph((void 0), (void 0), (void 0), (void 0));
  t1.Graph$0();
  return t1;
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) return $.collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value === (void 0)) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.Path$0 = function() {
  var t1 = new $.Path((void 0), (void 0), (void 0));
  t1.Path$0();
  return t1;
};

$._toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $._toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(t2));
    }
    var array = strings;
  } else {
    array = $.List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(t2));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = t2;
    }
  }
  return array;
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$1(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$._BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toInt$0();
  if ($.isNaN(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$1('NaN'));
  if ($.isInfinite(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$1('Infinity'));
  var truncated = $.truncate(receiver);
  return (truncated == -0.0) ? 0 : truncated;
};

$._WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f === (void 0)) && (!!f.methods)) {
    return f.methods;
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC7)[name$]);
  if (!(dartMethod === (void 0))) methods['Object'] = dartMethod;
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.print = function(obj) {
  return $.printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$.stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!((typeof t2 === 'number') && (t2 === (t2 | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(t2));
  }
  return String.fromCharCode.apply((void 0), charCodes);
};

$.objectToString = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  return 'Instance of \'' + $.S($.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$) + '\'';
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  }
  return a.operator$gt$1(b);
};

$.indexOf0 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.indexOf0$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.indexOf0$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.indexOf0$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  }
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    hash = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    hash = (536870911 & hash + ((524287 & hash) >>> 0 << 10)) >>> 0;
    hash = (hash ^ $.shr(hash, 6)) >>> 0;
  }
  hash = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  hash = (hash ^ $.shr(hash, 11)) >>> 0;
  return (536870911 & hash + ((16383 & hash) >>> 0 << 15)) >>> 0;
};

$.forEach1 = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object') && (((charCodes.constructor === Array) || charCodes.is$List0())))) throw $.captureStackTrace($.IllegalArgumentException$1(charCodes));
    var charCodes0 = $.List$from(charCodes);
    charCodes = charCodes0;
  }
  return $.stringFromCharCodes(charCodes);
};

$.UniFormCost = function(GraphToProcess) {
  var CU_QTable = $.PathTable$0();
  var InitialRow = $.PathRow$0();
  var InitialPath = $.Path$0();
  InitialPath.AddNode$1(GraphToProcess.get$InitialState());
  InitialPath.Value = 0;
  InitialRow.AddPath$1(InitialPath);
  var ResultTable = '' + ('<div class=\'pathrow\'>' + $.S(InitialRow.PrintPaths$1(true)) + '</div>');
  CU_QTable.AddRow$1(InitialRow);
  var NewRow = (void 0);
  var TempRow = (void 0);
  do {
    TempRow = CU_QTable.GetLastRow$0();
    NewRow = $.PathRow$0();
    if (TempRow.GetLowestPath$0().hasFinalNode$0() === true) break;
    for (var i = 0; $.ltB(i, $.get$length(TempRow.GetLowestPath$0().ExtendPath$0())); ++i) {
      NewRow.AddPath$1($.index(TempRow.GetLowestPath$0().ExtendPath$0(), i));
    }
    $.addAll(NewRow.Paths, TempRow.GetUnexpandedPaths$0());
    CU_QTable.AddRow$1(NewRow);
    ResultTable = $.concat(ResultTable, '<div class=\'pathrow\'>' + $.S(NewRow.PrintPaths$1(true)) + '</div>');
  } while (true);
  return '<div class=\'pathtable\'>' + $.S(ResultTable) + '</div>';
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.forEach0(receiver, f);
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.trim$0();
  return receiver.trim();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method === (void 0) && !($._dynamicMetadata0() === (void 0))) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method === (void 0))) break;
      }
    }
  }
  if (method === (void 0)) {
    method = (methods['Object']);
  }
  var proto = (Object.getPrototypeOf(obj));
  if (method === (void 0)) {
    method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  }
  var nullCheckMethod = (function() {var res = method.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, nullCheckMethod);
  return nullCheckMethod.apply(obj, arguments$);
};

$._MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.forEach0 = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      return a[key];
    }
  }
  return $.index$slow(a, index);
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC5) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  return $.constructorNameFallback;
};

$._ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.toLowerCase$0();
  return receiver.toLowerCase();
};

$.sin = function(x) {
  return $.sin0(x);
};

$.toDouble = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toDouble$0();
  return receiver;
};

$.sin0 = function(value) {
  return Math.sin($.checkNum(value));
};

$.List = function(length$) {
  return $.newList(length$);
};

$._XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
    return a === b;
  }
  return a === b;
};

$.HashMapImplementation$0 = function() {
  var t1 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, (void 0));
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  }
  return a.operator$div$1(b);
};

$.StringBufferImpl$1 = function(content$) {
  var t1 = new $.StringBufferImpl((void 0), (void 0));
  t1.StringBufferImpl$1(content$);
  return t1;
};

$._SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) target.builtin$typeInfo = typeInfo;
};

$.document = function() {
  return document;;
};

$._FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  }
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$0();
      return $.NullPointerException$2((void 0), $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$0();
      return $.NoSuchMethodException$4('', name$, [], (void 0));
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true) return $.NullPointerException$2((void 0), $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$4('', '<unknown>', [], (void 0));
    }
    return $.ExceptionImplementation$1(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$0();
    return $.IllegalArgumentException$1('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$0();
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.cos = function(x) {
  return $.cos0(x);
};

$.cos0 = function(value) {
  return Math.cos($.checkNum(value));
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$.GraphNode$1 = function(Data) {
  var t1 = new $.GraphNode((void 0), (void 0), (void 0), (void 0));
  t1.GraphNode$1(Data);
  return t1;
};

$.indexOf0$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Revert$bailout = function(state, RList) {
  var TempList = $.List((void 0));
  $.setRuntimeTypeInfo(TempList, ({E: 'Object'}));
  for (var i = $.sub($.get$length(RList), 1); $.geB(i, 0); i = $.sub(i, 1)) {
    TempList.push($.index(RList, i));
  }
  return TempList;
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.copy$bailout = function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var src = env0;
      var srcStart = env1;
      var dst = env2;
      var dstStart = env3;
      var count = env4;
      break;
    case 1:
      src = env0;
      srcStart = env1;
      dst = env2;
      dstStart = env3;
      count = env4;
      break;
    case 1:
      src = env0;
      srcStart = env1;
      dst = env2;
      dstStart = env3;
      count = env4;
      break;
    case 2:
      src = env0;
      dst = env1;
      dstStart = env2;
      count = env3;
      srcStart = env4;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      srcStart = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
    case 1:
      state = 0;
      if (srcStart === (void 0)) srcStart = 0;
    case 2:
      state = 0;
      if (dstStart === (void 0)) dstStart = 0;
    case 3:
      state = 0;
      if ($.ltB(srcStart, dstStart)) {
        for (var i = $.sub($.add(srcStart, count), 1), j = $.sub($.add(dstStart, count), 1); $.geB(i, srcStart); i = $.sub(i, 1), j = $.sub(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      } else {
        for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.add(i, 1), j = $.add(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      }
  }
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.getRange0$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  if ($.ltB(start, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1)) {
    $.add$1(accumulator, $.index(a, i));
  }
  return accumulator;
};

$._toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(string));
    }
    var array = strings;
  } else {
    array = $.List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$1(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC2 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC3 = new Isolate.$isolateProperties.NotImplementedException((void 0));
$.CTC4 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC1 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC6 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC5 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC7 = new Isolate.$isolateProperties.Object();
$.CTC0 = new Isolate.$isolateProperties.NoMoreElementsException();
$._getTypeNameOf = (void 0);
$._cachedBrowserPrefix = (void 0);
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$List0', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$Element', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function() {
  return this.toString();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$font: function(value) {
  this.setProperty$3('font', value, '');
 },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["strokeStyle!", "lineWidth!", "font!", "fillStyle!"], {
 stroke$0: function() {
  return this.stroke();
 },
 save$0: function() {
  return this.save();
 },
 restore$0: function() {
  return this.restore();
 },
 quadraticCurveTo$4: function(cpx, cpy, x, y) {
  return this.quadraticCurveTo(cpx,cpy,x,y);
 },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
 },
 fillText$4: function(text, x, y, maxWidth) {
  return this.fillText(text,x,y,maxWidth);
 },
 fillText$3: function(text,x,y) {
  return this.fillText(text,x,y);
},
 fill$0: function() {
  return this.fill();
 },
 closePath$0: function() {
  return this.closePath();
 },
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
 },
 bezierCurveTo$6: function(cp1x, cp1y, cp2x, cp2y, x, y) {
  return this.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
 },
 beginPath$0: function() {
  return this.beginPath();
 },
 arcTo$5: function(x1, y1, x2, y2, radius) {
  return this.arcTo(x1,y1,x2,y2,radius);
 },
 arc$6: function(x, y, radius, startAngle, endAngle, anticlockwise) {
  return this.arc(x,y,radius,startAngle,endAngle,anticlockwise);
 }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$1(this);
 }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value?"], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', [], {
 query$1: function(selectors) {
  if ($.CTC1.hasMatch$1(selectors) === true) return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 get$on: function() {
  return $._DocumentEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$1(this);
 },
 click$0: function() {
 },
 get$click: function() { return new $.Closure29(this, 'click$0'); },
 get$parent: function() {
  return;
 },
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
 },
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
 },
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
    $.clear(this.get$nodes());
  var e = $.Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  if ($.eqNullB(this._elements)) this._elements = $.FilteredElementList$1(this);
  return this._elements;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('Element', ["innerHTML!"], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$$$dom_lastElementChild: function() {
  return this.lastElementChild;;
 },
 get$$$dom_firstElementChild: function() {
  return this.firstElementChild;;
 },
 click$0: function() {
  return this.click();
 },
 get$click: function() { return new $.Closure29(this, 'click$0'); },
 get$$$dom_children: function() {
  return this.children;;
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
    return $._ChildrenElementList$_wrap$1(this);
  } else {
    return Object.prototype.get$elements.call(this);
  }
 },
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
    var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
  } else {
    return Object.prototype.set$elements.call(this, value);
  }
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', [], {
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1));
 },
 moveTo$2: function(parent$,name$) {
  return this.moveTo(parent$,name$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
 },
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
 }
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$1(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["lib$_FieldSetElementImpl$elements?"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBObjectStore', [], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["value?", "pattern?"], {
 get$on: function() {
  return $._InputElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLKeygenElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function() {
  return $._MediaElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessagePort', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLMetaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MouseEvent', ["offsetY?", "offsetX?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }
  return this;
 },
 remove$0: function() {
  !$.eqNullB(this.get$parent()) && this.get$parent().$dom_removeChild$1(this);
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$1(this);
 }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange0(this, start, rangeLength, []));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 get$first: function() {
  return this.operator$index$1(0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter1(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !$.eqNullB(result) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._parent; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLOListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOutputElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', ["value?"], {
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value?"], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', ["cy?", "cx?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 set$innerHTML: function(svg) {
  var container = $.Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
 },
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
 },
 get$elements: function() {
  return $.FilteredElementList$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$1(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', ["cy?", "cx?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value?"], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value?"], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPatternElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', ["cy?", "cx?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["value?", "length="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["lib$_ShadowRootImpl$innerHTML!"], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', [], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLSourceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$1(this);
 }
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('HTMLStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextTrack', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$1(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('UIEvent', ["charCode?"], {
});

$.$defineNativeClass('HTMLUListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange0(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf0(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter1(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach1(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List0: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 lineWidth$1: function(width) {
  return this.lineWidth(width);
 }
});

$.$defineNativeClass('WebSocket', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$1(this);
 }
});

$.$defineNativeClass('WheelEvent', ["offsetY?", "offsetX?"], {
});

$.$defineNativeClass('DOMWindow', ["navigator?", "length?"], {
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$1(this);
 }
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$1(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$1(this);
 }
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$1(this);
 }
});

// 279 dynamic classes.
// 301 classes
// 27 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v2/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v3/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v4/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v5/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v6/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v7/*class(_ElementImpl)*/ = [v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v8/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v9/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v10/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v11/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v12/*class(_NodeImpl)*/ = [v7/*class(_ElementImpl)*/,v8/*class(_DocumentFragmentImpl)*/,v9/*class(_DocumentImpl)*/,v10/*class(_CharacterDataImpl)*/,v7/*class(_ElementImpl)*/,v8/*class(_DocumentFragmentImpl)*/,v9/*class(_DocumentImpl)*/,v10/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v13/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v14/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v15/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v1/*class(_SVGTextContentElementImpl)*/],
    ['UIEvent', 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent'],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AbstractWorker', v15/*class(_AbstractWorkerImpl)*/],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v11/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v10/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v9/*class(_DocumentImpl)*/],
    ['DocumentFragment', v8/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v2/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v3/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v4/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v5/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v6/*class(_MediaElementImpl)*/],
    ['Element', v7/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Node', v12/*class(_NodeImpl)*/],
    ['MediaStream', v13/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v14/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v11/*class(_WorkerContextImpl)*/,v12/*class(_NodeImpl)*/,v13/*class(_MediaStreamImpl)*/,v14/*class(_IDBRequestImpl)*/,v15/*class(_AbstractWorkerImpl)*/,v11/*class(_WorkerContextImpl)*/,v12/*class(_NodeImpl)*/,v13/*class(_MediaStreamImpl)*/,v14/*class(_IDBRequestImpl)*/,v15/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var collected in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, collected)) {
      var desc = collectedClasses[collected];
      Isolate.$defineClass(collected, desc.super, desc[''], desc);
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
