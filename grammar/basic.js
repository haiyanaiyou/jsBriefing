console.log({a:1} === {a:1})

// let的变量作用域
let movie = 'lord of the Rings'
function startWarsFan() {
  let movie = 'star'
  return movie
}
function marvelFan() {
  movie= 'the marvelFan'
  return movie
}
function blizzardFan() {
  let isFan = true
  let phrase = 'warcraft'
  console.log('before:'+ phrase)
  if(isFan){
    let phrase = 'initial text'
    phrase = 'for the horde'
    console.log('inside:'+ phrase)
  }
  phrase = 'for the Alliance'
  console.log('after:'+ phrase)
}

console.log(movie)
console.log(startWarsFan())
console.log(marvelFan())
console.log(movie)
blizzardFan()