
//js code for black jack
let card= []
let sum = 0
let hasBlackJack = false
let isAlive = false
let start= document.getElementById("start")
let newA= document.getElementById("new")
let message=document.getElementById("message-el")
let cards=document.getElementById("cards-el")
let sumEl=document.getElementById("sum-el")
   newA.style.display="none"
function getRandomCard(){
    let randnum= Math.floor(Math.random()*13)+1
    return randnum
}
function startGame(){
    isAlive=true
    let firstCard=getRandomCard()
    let secondCard=getRandomCard()
    card=[firstCard,secondCard]
    sum=firstCard+secondCard
    renderGame()
   start.style.display="none"
   newA.style.display="block"

}
function renderGame(){
    card.textContent="Cards:"
    for(let i=0;i<card.length;i++){
        cards.textContent+=card[i]+"-"

    }
    sumEl.textContent="Sum: "+sum
    if (sum<21){
        message.textContent="Do you want to draw a new card?"
    }
    else if(sum===21){
        message.textContent="Wohoo! You've got Blackjack!"
        hasBlackJack=true
        newA.style.display= "none"
        start.style.display="block"
        cards.textContent= "Cards: "
    }
    else{
        message.textContent="You're out of the game!"
        isAlive=false
        newA.style.display= "none"
        start.style.display="block"
        cards.textContent= "Cards: "
    }
}
function newCard(){
    if (isAlive===true && hasBlackJack===false)  {
        let newcard = getRandomCard()
        sum += newcard
        renderGame()
        }
    
    }