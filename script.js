class Library {
  constructor() {
    this.myList = [];
    this.id = 0;
  }

  addBookToLibrary(book) {
    this.myList.push(book);
  }

  increaseId() {
    this.id += 1;
  }

  get books() {
    return this.myList;
  }

  get currentId() {
    this.increaseId();
    return this.id - 1;
  }

  set books(newList) {
    this.myList = newList;
  }
}

class Book {
  // the constructor...
  constructor(id, name, author, pages, status) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.pages = Number(pages);
    this.status = Boolean(status);
  }
}

function render() {
  let result = `<tr>
  <th>Name</th>
  <th>Author</th>
  <th>Pages</th>
  <th>Status</th>
  <th>&nbsp</th>
</tr>`;

  for (let book of library.books) {
    //console.log(book);
    result += `
      <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><button class="${
          book.status === true ? "read" : "unread"
        } status" data-id = ${book.id}>${
      book.status === true ? "read" : "unread"
    }</td>
        <td><button id=${book.id} class="delete">delete</button></td>
      </tr>
    `;
  }
  table.innerHTML = result;
  addDelete();
  addToggle();
}

function clearForm() {
  $name.value = null;
  $author.value = null;
  $pages.value = null;
  $status.value = null;
}

//add delete addEventListener
function addDelete() {
  const btns = Array.from(document.querySelectorAll(".delete"));

  btns.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("clicked");
      library.books = library.books.filter((book) => {
        return book.id != button.id;
      });
      //after filter ender again
      render();
    });
  });
}

function addToggle() {
  const statusButtons = Array.from(document.querySelectorAll(".status"));

  statusButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      for (let book of library.books) {
        if (book.id == button.getAttribute("data-id")) {
          book.status = !book.status;
        }
      }
      //after filter ender again
      render();
    });
  });
}

let library = new Library();
const table = document.querySelector("table");
const $name = document.querySelector("#name");
const $pages = document.querySelector("#pages");
const $status = document.querySelector("#status");
const $author = document.querySelector("#author");
const $form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(Boolean($status.value));
  let book = new Book(
    library.currentId,
    $name.value,
    $author.value,
    $pages.value,
    $status.value
  );
  library.addBookToLibrary(book);
  render();
  clearForm();
});
let book1 = new Book(
  library.currentId,
  "Harry Potter",
  "JK Rolling",
  493,
  true
);
let book2 = new Book(
  library.currentId,
  "House of Dragon",
  "George Martin",
  "589",
  false
);
library.addBookToLibrary(book1);
library.addBookToLibrary(book2);

render();
