// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { getJSON } from './utils/getJSON';


let books,

    chosenHobbyFilter = 'all',

    chosenSortOption,

    hobbies = [];


async function start() {

    books = await getJSON('/json/books.json');

    displayBooks();

}



function displayBooks() {

    // filter according to hobby and call displayPersons
    `
    <div class="row" id="startText">
        <div class="col offset-lg-1 col-lg-10 offset-xl-2 col-xl-8">
          <h2>Welcome!</h2>
          <p>If you would like to filter the books, please use the navigation bar above!</p>
        </div>
      </div>
    `

    let filteredBooks = books.filter(

        ({ hobby }) => chosenHobbyFilter === 'all'

            || chosenHobbyFilter === hobby

    );

    let htmlArray = filteredBooks.map(({

        id, title, author, description, category, price, image

    }) => `
    <div class="col-sm-6 col-lg-4 col-xl-3" book-id="${id}">
        <img class="book" src="${image}">
        <h6>${title}</h1>
        <p>${author}</p>
        <p style="margin-top: -10px; font-weight: bold;">${price} SEK</p>
        <button class="buttonInfo btn btn-success" type="button">More Info</button>
        <button class="buttonPrice btn btn-success" data-price="${price}" type="button">Add To Cart</button>
    </div>
  `);

    document.querySelector('.bookList').innerHTML = htmlArray.join('');
    // add event listeners to all button elements
document.querySelectorAll('.buttonInfo').forEach((button) => {
    button.addEventListener('click', (event) => {
        let idElement = event.target.closest('[book-id]');
    if (idElement) {
      let id = idElement.getAttribute('book-id');
      displayInformation(id);
    } else {
      console.error('Unable to find the book-id.');
    }
    });
  });

  document.querySelectorAll('.buttonPrice').forEach((button) => {
    button.addEventListener('click', (event) => {
        let idElement = event.target.closest('[book-id]');
    if (idElement) {
      let id = idElement.getAttribute('book-id');
      alert(`PRICE You clicked a button with ID ${id}`);
    } else {
      console.error('Unable to find the book-id.');
    }
    });
  });
}

function displayInformation(bookID) {
    let correctBook = books.filter(({ id }) => bookID === id).shift();
    
    if (correctBook) {
        let htmlArray = `
            <div class="col-xxl-12" book-id="${correctBook.id}">
                <img class="book" src="${correctBook.image}">
                <h6>${correctBook.title}</h6>
                <p>${correctBook.author}</p>
                <h5>Category</h5>
                <p>${correctBook.category}</p>
                <h5>Description</h5>
                <p>${correctBook.description}</p>
                <p style="margin-top: -10px; font-weight: bold;">${correctBook.price} SEK</p>
                <button class="buttonGoBack btn btn-success" type="button">Go Back</button>
                <button class="buttonInfoCart btn btn-success" data-price="${correctBook.price}" type="button">Add To Cart</button>
            </div>
        `;
        document.querySelector('.bookList').innerHTML = htmlArray;
    } else {
        document.querySelector('.bookList').innerHTML = "No book found with the given ID";
    }

    // add event listeners to all button elements
document.querySelectorAll('.buttonGoBack').forEach((button) => {
    button.addEventListener('click', displayBooks);
  });

  document.querySelectorAll('.buttonInfoCart').forEach((button) => {
    button.addEventListener('click', () => {
        alert(`PRICE You clicked a button with ID ${bookID}`)})
    });
}

start();