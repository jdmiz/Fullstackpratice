function sendmessage(text,sender,...names){
    return names.map(staff=> `<div>
    <h1>Hey ${staff.name}</h1>
    
    <p>${text} </p>
    <p> "from goat ${sender}"</p>
    </div>
    
    `).join()

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
