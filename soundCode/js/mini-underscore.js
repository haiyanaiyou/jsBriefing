(function(){
  // this判别
  var root = (typeof self === 'object' && self.self === self && self) ||
             (typeof global === 'object' && global.global === global && global) ||
             this ||
             {};
  // _定义
  var _ = function(obj) {
    if(obj instanceof _) return obj;
    if(!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }

  // this中添加_
  if(typeof exports !== 'undefined' && !exports.nodeType){
    if(typeof module !== 'undefined' && !module.nodeType && module.exports ) {
      exports = module.exports = _;
    }else{
      exports._ = _;
    }
  } else {
    root._ = _;
  }
  _.VERSION = '0.1';

  // 调用mixin 将_上的方法绑定到_.prototype上
  // 会用到 _.each() 
  // _.functions()
  // isArrayLike()
  // _.isFunction()

  var ArrayProto = Array.prototype, 
      ObjProto = Object.prototype;
  
  var MAX_ARRAY_INDEX= Math.pow(2,53) -1;

  // 常见方法的引用，避免属性查找的性能开销
  var push = ArrayProto.push,
      hasOwnProperty = ObjProto.hasOwnProperty,
      toString = ObjProto.toString;

  function isArrayLike(collection) {
    var length = collection.length;
    return typeof length === 'number' && length >=0 && length <= MAX_ARRAY_INDEX;
  }

  _.each = function(obj, callback) { 
    var length,i = 0;
    // 数组和类数组
    if(isArrayLike(obj)){
      length = obj.length;
      for(;i<length;i++) {
        // 当回调函数返回false时，就中止循环
        if(callback.call(obj[i], obj[i], i) === false){
          break;
        }
      }
    }else{
      // 对象
      for(i in obj) {
        if(callback.call(obj[i], obj[i], i) === false){
          break;
        }
      }
    }
    return obj;
  }

  _.isFunction = function(obj){
    return typeof obj === 'function' || false;
  }

  _.functions = function(obj) {
    var names = [];
    for(var key in obj){
      if(_.isFunction(obj[key])){
        names.push(key);
      }
    }
    return names.sort();
  }

  // 自定义方法
  _.log = function(obj){
    return obj;
  }

  // 判断是否为数组，兼容写法
  _.isArray = function(obj) {
    Array.isArray(obj) || function(obj){
      return toString.call(obj) === '[object Array]';
    }
  }

  // 判断是否为对象，剔除null
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'object' || type === 'function' && !!obj;
  }

  // 其他类型判断，比如 function arguments date regexp
  _.each(['Function','Arguments','String', 'Number', 'Date', 'RegExp', 'Error'],function(name) {
    _[`is${name}`] = function(obj){
      return toString.call(obj) === `[object ${name}]`
    }
  })

  // isArguments 兼容处理
  // 当IE<9时，arguments 调用 Object.prototype.toString.call，结果是 [object Object]
  // 此时就只能通过callee属性来判断（arguments.callee 能返回当前arguments所在的函数）
  if(!_.isArguments(arguments)) {
    _.isArguments = function(obj){
      return _.has(obj,'callee');
    }
  }

  // 判断对象里是否具有属性key
  _.has = function(obj, key){
    return obj != null && hasOwnProperty.call(obj,key);
  }

  // 判断是不是dom元素，nodeType为1，并且不为null
  _.isElement = function(obj){
    return !!(obj && obj.nodeType === 1);
  }

  // 扩展对象，会继承传入对象的所有属性
  _.extend = createAssigner(_.allkeys);

  // 扩展对象，但只会接收传入对象的人自身属性
  _.extendOwn = createAssigner(_.keys);

  // 扩展对象，但如果传入对象的key与已有的相同时，取之前的值，不会被覆盖
  _.defaults = createAssigner(_.allkeys, true);

  /*
   * 分配器函数，分配属性到目标对象上
   * @param {Function} keysFunc 获取待分配的keys方法
   * @param {Boolean} defaults 默认false，相同属性的值会被覆盖
   * 如果传入为true， 则不会被覆盖，只会接收未定义过的属性
  */ 
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if(defaults) obj = Object(obj);
      if(length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
            var key = keys[i];
            if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    }
  }

  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return func.apply(_, args);
      }
    })
    return _;
  }; 
  _.mixin(_);
})()
