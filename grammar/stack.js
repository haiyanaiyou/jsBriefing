// 创建栈
function Stack() {
  // 各种属性和方法的声明

  // 保存栈中的元素
  let items = []
  this.push =function(element){
    items.push(element)
  }
  // 移出的是最后添加进去的值
  this.pop = function(){
    return items.pop()
  }
  // 查看栈顶元素
  this.peek = function(){
    return items[items.length-1]
  }
  this.isEmpty = function(){
    return !!items.length
  }
  this.size = function(){
    return items.length
  }
  this.clear = function(){
    items = []
  }
  this.print = function(){
    console.log(items.toString())
  }
}