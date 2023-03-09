// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { getJSON } from './utils/getJSON';


let persons,

    chosenHobbyFilter = 'all',

    chosenSortOption,

    hobbies = [];


async function start() {

    persons = await getJSON('/json/books.json');

    displayPersons();

}



function displayPersons() {

    // filter according to hobby and call displayPersons

    let filteredPersons = persons.filter(

        ({ hobby }) => chosenHobbyFilter === 'all'

            || chosenHobbyFilter === hobby

    );

    if (chosenSortOption === 'Last name') { sortByLastName(filteredPersons); }

    if (chosenSortOption === 'Age') { sortByAge(filteredPersons); }

    let htmlArray = filteredPersons.map(({

        id, title, author, description, category, price, image

    }) => `
    <div class="col-xl-3">
        <img class="book" src="${image}">
        <h6>${title}</h1>
        <p>${author}</p>
        <p style="margin-top: -10px; font-weight: bold;">${price} SEK</p>

    </div>
  `);

    document.querySelector('.bookList').innerHTML = htmlArray.join('');

}


start();