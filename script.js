// Select elements
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const addBookBtn = document.getElementById("addBook");
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("search");

// Load books from localStorage
let books = JSON.parse(localStorage.getItem("books")) || [];

// Render books
function displayBooks() {
  bookList.innerHTML = "";
  books.forEach((book, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span><b>${book.title}</b> by ${book.author} (${book.year})</span>
      <button onclick="deleteBook(${index})">Delete</button>
    `;
    bookList.appendChild(li);
  });
}

// Add book
addBookBtn.addEventListener("click", () => {
  let title = titleInput.value.trim();
  let author = authorInput.value.trim();
  let year = yearInput.value.trim();

  if (title && author && year) {
    books.push({ title, author, year });
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
    titleInput.value = authorInput.value = yearInput.value = "";
  } else {
    alert("Please fill all fields!");
  }
});

// Delete book
function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

// Search books
searchInput.addEventListener("input", () => {
  let searchText = searchInput.value.toLowerCase();
  let filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchText)
  );
  bookList.innerHTML = "";
  filteredBooks.forEach((book, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span><b>${book.title}</b> by ${book.author} (${book.year})</span>
      <button onclick="deleteBook(${index})">Delete</button>
    `;
    bookList.appendChild(li);
  });
});

// Initial display
displayBooks();
