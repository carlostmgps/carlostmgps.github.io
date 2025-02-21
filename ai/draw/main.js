const container = document.querySelector('.container')
const sizeEl = document.querySelector('.size')
let size = sizeEl.value
const color = document.querySelector('.color')
const resetBtn = document.querySelector('.btn')
const datap = document.querySelector('.data')
let draw = false
var data = new Array(16);
function test(){
  alert("See in console");
  console.log(ainetwork.activate(data));
}

function populate(size) {
  if (data.length != (size * size)){
    data = new Array(size * size)
  }
  container.style.setProperty('--size', size)
  for (let i = 0; i < size * size; i++) {
    data[i] = 0
    const div = document.createElement('div')
    div.classList.add('pixel')
    div.addEventListener('mouseover', function(){
        data[i] = 0
        if(!draw) return
        div.style.backgroundColor = color.value
        data[i] = 1
    })
    div.addEventListener('mousedown', function(){
        div.style.backgroundColor = color.value
        data[i] = 1
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
    data = new Array(16);
    container.innerHTML = ''
    populate(size)
}
setInterval(
  updatedata
,1)
var ainetwork = customizeNetwork([16,32,10]);
function train(ans){
  ainetwork.train(100,data,[ans]);
}
function updatedata(){
    datap.innerHTML = String(data);
}
resetBtn.addEventListener('click', reset)



function exp(){
  download(ainetwork.toJSON());
}
function imp(){
  data = prompt("Paste Network.txt here:");
  ainetwork = Network.fromJSON(data)
}

function download(data) {
  const file = new File([data], 'Network.txt', {
  type: 'text/plain',
  })
  const link = document.createElement('a')
  const url = URL.createObjectURL(file)

  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

sizeEl.addEventListener('keyup', function(){
    size = sizeEl.value
    reset()
})

populate(size)
