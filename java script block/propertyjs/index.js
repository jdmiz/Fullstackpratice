import {placeholderPropertyObj as holder} from './placeholder.js'
import {propertyForSaleArr as sale} from './propertsale.js'


function getPropertyHtml( a = [holder]) {
/*
SUPER CHALLENGE 💪

Render out a card for each of the properties in the propertyForSaleArr array (in the 'properties' folder). Each card should have an image, a property location, a price, a comment and the TOTAL property size in square metres (each object has an array with the size in square metres of the individual rooms).

If no array of properties is passed to getPropertyHtml, the placeholder property stored in placeholderPropertyObj (in the 'properties' folder) should be rendered instead.

This is the JS I want you to use to complete this challenge 👇

- import/export (done )
- .map()
- .join()
- Object destructuring
- .reduce()
- Default parameters





The HTML and CSS have been done for you. 
This is the HTML template 👇. Replace everything in UPPERCASE with property data.
*/
//i wont use destruct here tho.
return  a.map(print=> {
    const totalsz= print.roomsM2.reduce((total,current)=> total+current,0)
return `<section class="card">

    <img src="./images/${print.image}">
    <div class="card-right">
        <h2>PROPERTY LOCATION : ${print.propertyLocation}</h2>
        <h3>PRICE GBP: ${print.priceGBP}</h3>
        <p>COMMENT: ${print.comment}</p>
        <h3>TOTAL SIZE IN SQUARE METRES ${totalsz}m&sup2;</h3>
    </div>
</section>`
}).join(" ")

}

/***** Modify 👇 by adding an argument to the function call ONLY. *****/
document.getElementById('container').innerHTML = getPropertyHtml(sale)