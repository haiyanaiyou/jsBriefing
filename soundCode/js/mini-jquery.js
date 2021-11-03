// jQuery基本概括
(function(global, factory){
  'use strict';
  if(typeof module === 'object' && typeof module.exports === 'object'){
    // commonJS 模块规范下使用
    module.exports = global.document ?
          factory(global, true) : 
          function(w) {
            if(!w.document){
              return new Error('jQuery requires a window with a document')
            }
            return factory(w);
          }
  }else{
    factory(global);
  }
})(typeof window !== 'undefined' ? window : this, function(window, noGrobal){
  'use strict';
  var version = '3.4.1',
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      };
  
  // jQuery.fn 是jQuery原型设置的一个别名，原型重置之后，默认的constructor就没有了，需要重新指定constructor
  jQuery.fn = jQuery.prototype = {
    // 添加公共的属性和方法
    jquery: version,
    constructor: jQuery,

    /*
      this 一般是指当前类（jQuery）的实例
      把当前类的实例转换为数组
    */ 
    toArray: function() {
      return Array.prototype.slice.call(this);
    },

    length: 0,

  };

  function isArrayLike(obj) {


  }


  jQuery.ajax = function() {}


  var init = jQuery.fn.init = function(selector, context, root) {

  }
  
  init.prototype = jQuery.fn;

  // 扩展到jQuery对象上，目的是为了完善类库，提供更多的工具方法
  jQuery.extend = jQuery.fn.extend = function(){

  }


  if(!noGrobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
});
