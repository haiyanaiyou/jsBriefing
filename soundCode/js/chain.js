let _ = {};
_.mixin = function(obj) {
	_.each(_.functions(obj), function(name) {
	var func = _[name] = obj[name];
	_.prototype[name] = function() {
		var args = [this._wrapped];
		push.apply(args, arguments);
		return chainResult(this, func.apply(_, args));
	};
	});
	// 最终返回 _ 函数对象。
	return _;
};

function chainResult(instance) {
  return instance.chain ? instance.chain() : instance

}
_.mixin({
  log: function() {
    console.log('log')
  }
})
_.log();