// Declare booksArray to be assigned a value after fetch.
let booksArray;
// Fetch json file to get booksArray and parse json to convert to an array of objects.

fetch("../books.json")
  .then((response) => response.json())
  .then((data) => {
    //Target the menu list
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = data.books
      .map(
        (book) =>
          "<li class='book-item' data-isbn='" +
          book.isbn +
          "'>" +
          formatISBN(book.isbn) +
          "<span> > </span>" +
          "</li>"
      )
      .join("");

    const bookItems = document.querySelectorAll(".book-item");
    bookItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        displayBook(item.dataset.isbn);
        setActive(e);
      });
    });
  })
  .catch((error) => console.log(error));

// Books Function Navigation
function setActive(e) {
  const bookItems = document.querySelectorAll(".book-item");
  bookItems.forEach((item) => {
    item.classList.remove("active");
  });
  e.target.classList.add("active");
}

// Book Functions
function displayBook(isbn) {
  const bookInfo = document.getElementById("book-info");
  const coverImage = document.getElementById("cover-image");
  const bookTitle = document.getElementById("book-title");
  const bookISBN = document.getElementById("book-isbn");
  const bookApendix = document.getElementById("book-appendix");
  fetch("../books.json")
    .then((response) => response.json())
    .then((data) => {
      let currentBook = data.books.filter((book) => book.isbn === isbn);
      bookTitle.innerHTML = currentBook[0].title;
      const validateIsbn = isValidISBN(isbn);
      bookISBN.innerHTML = formatISBN(currentBook[0].isbn);
      bookApendix.innerHTML = transformToRoman(currentBook[0].appendixPage);
      if (validateIsbn) {
        coverImage.src = `../images/images/${currentBook[0].isbn}.jpg`;
      } else {
        coverImage.src = `../images/images/default.jpg`;
      }
    })
    .catch((error) => console.log(error));
}
