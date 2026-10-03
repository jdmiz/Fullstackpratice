  let counting=0
   let saved = document.getElementById("saved")
    let count = document.getElementById("count")
function increment(){
  
   //count.innerText = parseInt(count.textContent) +1

  counting = counting +1
    count.textContent = counting
}

function save(){
   
let countStr = count.textContent + " - "
    saved.textContent = saved.textContent + countStr
    count.textContent = 0
}