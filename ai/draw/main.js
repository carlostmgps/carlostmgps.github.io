const container = document.querySelector('.container')
const sizeEl = document.querySelector('.size')
let size = sizeEl.value
const color = document.querySelector('.color')
const resetBtn = document.querySelector('.btn')

let draw = false
var data = new Array(64);

function populate(size) {
  if (data.length != (size * size)){
    data = new Array(size * size)
  }
  container.style.setProperty('--size', size)
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div')
    div.classList.add('pixel')
    div.addEventListener('mouseover', function(){
        if(!draw) return
        div.style.backgroundColor = color.value
        data[i] = (color.value == "0xffffff")
    })
    div.addEventListener('mousedown', function(){
        div.style.backgroundColor = color.value
        data[i] = (color.value == "0xffffff")
    })

    container.appendChild(div)
  }
}

window.addEventListener("mousedown", function(){
    draw = true
})
window.addEventListener("mouseup", function(){
    draw = false
})

function reset(){
    data = new Array(64);
    container.innerHTML = ''
    populate(size)
}

resetBtn.addEventListener('click', reset)

sizeEl.addEventListener('keyup', function(){
    size = sizeEl.value
    reset()
})

populate(size)
