// 自定义排序
var firends = [
  {name: 'john', age:30},
  {name: 'anna', age:20},
  {name: 'chris', age:25},
]
function comparePerson(a,b) {
  if(a.age < b.age){
    return -1
  }
  if(a.age > b.age){
    return 1
  }
  return 0
}
console.log(firends.sort(comparePerson))
