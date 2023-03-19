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

// ISBN Validator

isValidISBN = (isbn) => {
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

// Format ISBN Numbers with hyphens.
formatISBN = (number) => {
  const formattedNumber = `${number.slice(0, 3)}-${number.slice(
    3,
    4
  )}-${number.slice(4, 9)}-${number.slice(9, 12)}-${number.slice(12)}`;
  return formattedNumber;
}


// Books Function Navigation
setActive = (e) => {
  const bookItems = document.querySelectorAll(".book-item");
  bookItems.forEach((item) => {
    item.classList.remove("active");
  });
  e.target.classList.add("active");
}

handleBack = () => {
  const booksContent = document.querySelector(".books-content");
  const booksNavigation = document.querySelector(".books-navigation");
  booksContent.classList.remove("active");
  booksNavigation.classList.remove("hide");
}



handleMore = (e) => {

  const booksList = document.getElementById("book-list");
  booksList.classList.toggle("maxHeight");


  if (e.target.innerHTML === "show more...") {
    e.target.innerHTML = "show less...";
  } else {
    e.target.innerHTML = "show more...";
  }

}

// Show and hide book items menu
document.querySelector(".show").addEventListener("click", handleMore);