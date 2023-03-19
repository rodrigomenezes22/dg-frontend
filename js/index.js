// Declare booksArray to be assigned a value after fetch.
let booksArray;
// Fetch json file to get booksArray and parse json to convert to an array of objects.

fetch("../books.json")
  .then((response) => response.json())
  .then((data) => {
    // Console log Books Array of Objects
    console.log(data.books);

    //Target the menu list
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = data.books
      .map(
        (book) =>
          "<li class='book-item' data-isbn='" +
          book.isbn +
          "'>" +
          formatISBN(book.isbn) +
          "</li>"
      )
      .join("");

    const bookItems = document.querySelectorAll(".book-item");
    bookItems.forEach((item) => {
      item.addEventListener("click", () => {
        displayBook(item.dataset.isbn);
      });
    });
  })
  .catch((error) => console.log(error));

// Books Functions
function displayBook(isbn) {
  const bookInfo = document.getElementById("book-info");
  const coverImage = document.getElementById("cover-image");
  const bookTitle = document.getElementById("book-title");
  const bookISBN = document.getElementById("book-isbn");
  const bookApendix = document.getElementById("book-appendix");
  fetch("../books.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.books);
      let currentBook = data.books.filter((book) => book.isbn === isbn);
      console.log(currentBook[0]);
      bookTitle.innerHTML = currentBook[0].title;
      console.log(typeof currentBook[0].isbn);
      const validateIsbn = isValidISBN(isbn);
      console.log(validateIsbn);
      bookISBN.innerHTML = formatISBN(currentBook[0].isbn);
      bookApendix.innerHTML = transformToRoman(currentBook[0].appendixPage);
      if (validateIsbn) {
        coverImage.src = `../images/images/${currentBook[0].isbn}.jpg`;
      } else {
        coverImage.src = `../images/images/default.jpg`;
      }
    })
    .catch((error) => console.log(error));

  console.log("Clicked on book with ISBN:", isbn);
}

// Format ISBN Numbers with hyphens.
function formatISBN(number) {
  const formattedNumber = `${number.slice(0, 3)}-${number.slice(
    3,
    4
  )}-${number.slice(4, 9)}-${number.slice(9, 12)}-${number.slice(12)}`;
  return formattedNumber;
}

// Roman Letters Array
const romanNumerals = [
  { number: 1000, roman: "M" },
  { number: 900, roman: "CM" },
  { number: 500, roman: "D" },
  { number: 400, roman: "CD" },
  { number: 100, roman: "C" },
  { number: 90, roman: "XC" },
  { number: 50, roman: "L" },
  { number: 40, roman: "XL" },
  { number: 10, roman: "X" },
  { number: 9, roman: "IX" },
  { number: 5, roman: "V" },
  { number: 4, roman: "IV" },
  { number: 1, roman: "I" },
];

// Number to Roman converter
transformToRoman = (number) => {
  let rommanValue = "";

  for (let i = 0; i < romanNumerals.length; i++) {
    if (romanNumerals[i].number <= number) {
      number = number - romanNumerals[i].number;

      rommanValue = rommanValue + romanNumerals[i].roman;

      i--;
    }
  }

  return rommanValue;
};

console.log(transformToRoman(27));

// ISBN Validator

function isValidISBN(isbn) {
  if (/[^0-9]/.test(isbn)) return false;

  let checksum = 0;
  for (let i = 0; i < isbn.length; i++) {
    const digit = parseInt(isbn[i]);
    if (i % 2 === 0) {
      checksum += digit;
    } else {
      checksum += 3 * digit;
    }
  }

  return checksum % 10 === 0;
}
