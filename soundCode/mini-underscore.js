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

  var ArrayProto = Array.prototype;
  var push = ArrayProto.push;
  var MAX_ARRAY_INDEX= Math.pow(2,53) -1;

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
