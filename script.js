let library = [];

let add = document.querySelector(".control .add");
let clear = document.querySelector(".control .clear");
let overlay = document.querySelector("#overlay");
let modal = document.querySelector("#add-book-modal");
let title = modal.querySelector("#title");
let author = modal.querySelector("#author");
let pages = modal.querySelector("#pages");
let check = modal.querySelector(".check input");
let submit = modal.querySelector("#submit");
let books = document.querySelector("main .books");
let totalCounter = document.querySelector("#total");
let completeCounter = document.querySelector("#complete");

add.addEventListener("click", addBook);
overlay.addEventListener("click", cancel);
submit.addEventListener("click", addBookToLibrary);
clear.addEventListener("click", clearBooks);

function clearBooks() {
  library = [];
  updateBooks();
}
function addBook() {
  overlay.classList.add("active");
  modal.classList.add("active");
}
function cancel() {
  overlay.classList.remove("active");
  modal.classList.remove("active");
  title.value = "";
  author.value = "";
  pages.value = "";
  check.checked = false;
}
function createBook() {
  let textTitle = title.value;
  let textAuthor = author.value;
  let numPages = pages.value;
  let read = check.checked;
  let book = new Book(textTitle, textAuthor, numPages, read);
  return book;
}

function addBookToLibrary(event) {
  event.preventDefault();
  let book = createBook();
  library.push(book);
  cancel();
  updateBooks();
}
function updateBooks() {
  books.innerHTML = "";
  for (let book of library) {
    let card = buildBook(book);
    books.appendChild(card);
  }
  totalCounter.textContent = library.length;
  completeCounter.textContent = library.filter((item) => item.read).length;
}
function buildBook(book) {
  let card = document.createElement("div");
  card.classList.add("book");
  let h2 = document.createElement("h2");
  h2.textContent = book.title;
  let pAuthor = document.createElement("p");
  pAuthor.textContent = book.author;
  let num = document.createElement("p");
  num.textContent = book.pages + " pages";
  let state = createState(book.read);
  let removeCard = document.createElement("button");
  removeCard.classList.add("remove");
  removeCard.textContent = "Remove";
  removeCard.addEventListener("click", remove);
  card.appendChild(h2);
  card.appendChild(pAuthor);
  card.appendChild(num);
  card.appendChild(state);
  card.appendChild(removeCard);
  card.owner = book;

  return card;
}
function remove() {
  let obj = event.target.parentNode.owner;
  let index = library.indexOf(obj);
  library.splice(index, 1);
  updateBooks();
}
function createState(completed) {
  let state = document.createElement("button");
  state.classList.add("state");
  decideState(state, completed);
  state.addEventListener("click", toggleState);
  return state;
}
function decideState(state, completed) {
  if (completed) {
    state.textContent = "Read";
    state.classList.add("read");
  } else {
    state.textContent = "Not read";
    state.classList.remove("read");
  }
}
function toggleState(event) {
  completed = event.target.parentNode.owner.toggleRead();
  decideState(event.target, completed);
  completeCounter.textContent = library.filter((item) => item.read).length;
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  toggleRead = function () {
    this.read = !this.read;
    return this.read;
  };
}
