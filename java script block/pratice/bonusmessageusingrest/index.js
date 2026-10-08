function sendmessage(text,sender,...names){
    `<div>
    <h1>Hey ${names}</h1>
    
    <p>${text} </p>
    <p> "from goat ${sender}"</p>
    </div>
    
    `

}

const text = 'Thank you for all your hard work throughout the year! A'
const sender = 'Tom'
document.getElementById('labels-container').innerHTML = sendmessage(
text,
sender,
{name: 'Sally'},
{name: 'Mike'},
{name: 'Rob'},
{name: 'Harriet'}
)
