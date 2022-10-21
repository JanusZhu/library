let myLibrary = [];
let id = 0;
const table = document.querySelector("table");
const $name = document.querySelector("#name");
const $pages = document.querySelector("#pages");
const $status = document.querySelector("#status");
const $author = document.querySelector("#author");
const $form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(Boolean($status.value));
  let book = new Book($name.value, $author.value, $pages.value, $status.value);
  addBookToLibrary(book);
  render();
  clearForm();
});

function clearForm() {
  $name.value = null;
  $author.value = null;
  $pages.value = null;
  $status.value = null;
}

function submitForm() {}

function Book(name, author, pages, status) {
  // the constructor...
  this.id = id;
  id += 1;
  this.name = name;
  this.author = author;
  this.pages = Number(pages);
  this.status = Boolean(status);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

//add delete addEventListener
function addDelete() {
  const btns = Array.from(document.querySelectorAll(".delete"));

  btns.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("clicked");
      myLibrary = myLibrary.filter((book) => {
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
      for (let book of myLibrary) {
        if (book.id == button.getAttribute("data-id")) {
          book.status = !book.status;
        }
      }
      //after filter ender again
      render();
    });
  });
}

function render() {
  let result = `<tr>
  <th>Name</th>
  <th>Author</th>
  <th>Pages</th>
  <th>Status</th>
  <th>&nbsp</th>
</tr>`;

  for (let book of myLibrary) {
    console.log(book);
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

let book1 = new Book("Harry Potter", "JK Rolling", 493, true);
let book2 = new Book("House of Dragon", "George Martin", "589", false);
addBookToLibrary(book1);
addBookToLibrary(book2);

render();
