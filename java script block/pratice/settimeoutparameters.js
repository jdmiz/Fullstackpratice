
function mycountry(answer,money){
    console.log(`I am from ${answer} and I got $${money}`)
}
   const answerofit =setTimeout(mycountry,2000,'Nepal',1000)
    document.getIdByElement('stop').addEventListner(click,function(){
        clearTimeout(answerofit)
        console.log('you have stopped the timeout')
    })