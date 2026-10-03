let saved=[]
const a= document.getElementById("save")
const b= document.getElementById("out")
const c= document.getElementById("inp")
const d= document.getElementById("delete")
const s= document.getElementById("storage")
let localstoragefetch = JSON.parse(localStorage.getItem("Item"))
console.log(localstoragefetch)
if (localstoragefetch){
    saved= localstoragefetch
    render(saved)
}
a.addEventListener("click", function(){
    
 saved.push(c.value) 
 localStorage.setItem("Item", JSON.stringify(saved))
render(saved)

console.log(localStorage.getItem("Item"))
})
d.addEventListener("click", function(){
    
 localStorage.clear("Item")
 saved=[]
render(saved)

console.log(localStorage.clear("Item"))

})
s.addEventListener("click", function(){
    
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    // and use that tab to fill in out title and url
    
    saved.push(tabs[0].url);
     localStorage.setItem("Item", JSON.stringify(saved))
     render(saved)
});



})

function render(leads){
let lead= " "
   for(let i =0 ;i<leads.length; i++)
{

  lead += `<li>
  <a  target= "_blank"href='${leads[i]}'>${leads[i]}</a>
  </li>`
} 
  b.innerHTML =lead
}