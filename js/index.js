// Declare booksArray to be assigned a value after fetch.
let booksArray;
/* Fetch json file to get booksArray and parse json to convert to an array of objects.
   Render the Navigation bar items
*/ 

fetch("./js/books.json")
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

/* On click at navigation bar, fetch book json and filter array to display the respective information in the HTML File.
   While processing the book, ISBN validation is called, formated and displayed. 

   AppendixPage calls transformToRoman function that converts the numbers into Roman Letters. 

   If 
*/ 
displayBook = (isbn) => {
  const coverImage = document.getElementById("cover-image");
  const bookTitle = document.getElementById("book-title");
  const bookISBN = document.getElementById("book-isbn");
  const bookApendix = document.getElementById("book-appendix");
  const booksContent = document.querySelector(".books-content");
  const booksNavigation = document.querySelector(".books-navigation");
  booksContent.classList.add("active");
  booksNavigation.classList.add("hide");
  fetch("./js/books.json")
    .then((response) => response.json())
    .then((data) => {
      let currentBook = data.books.filter((book) => book.isbn === isbn);
      bookTitle.innerHTML = currentBook[0].title;
      const validateIsbn = isValidISBN(isbn);
      bookISBN.innerHTML = formatISBN(currentBook[0].isbn);
      bookApendix.innerHTML = transformToRoman(currentBook[0].appendixPage);
      coverImage.src = validateIsbn ? `../images/images/${currentBook[0].isbn}.jpg` : `../images/images/default.jpg`;
    })
    .catch((error) => console.log(error));
}
