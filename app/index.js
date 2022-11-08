console.log("wiii");

/* ---------------------
GLOBAL variables:
----------------------*/
let allImagesFirstQuery = [];
let allImagesSecondQuery = [];

/* ---------------------
DOM elements:
----------------------*/
const loadImages = document.querySelector(".btn.btn-primary.my-2"); // Load Images button
const loadSecondaryImages = document.querySelector(".btn.btn-secondary.my-2"); // Load Secondary Images button
const allCards = document.querySelectorAll(".card"); // cards div
const allCardBodies = document.querySelectorAll(".card-body"); // card-body divs
const imgs = document.querySelectorAll(".card.shadow-sm"); // image divs
const editBtns = document.querySelectorAll(".btn-group *:nth-child(2)"); // all edit buttons

/* ---------------------
Options:
----------------------*/
const options = {
  method: "GET",
  headers: {
    Authorization: "563492ad6f91700001000001fd1460c60a7047a4b70eaa946093fadc",
  },
};

/* ---------------------
First Query:
----------------------*/
fetch("https://api.pexels.com/v1/search?query=people", options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    allImagesFirstQuery = response.photos;
  });

/* ---------------------
Second Query:
----------------------*/
fetch("https://api.pexels.com/v1/search?query=nature", options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    allImagesSecondQuery = response.photos;
  });

/* ---------------------
EX1:
----------------------*/
//   deleting svgs
const allsvg = document.querySelectorAll(".card svg");
const deleteSvg = () => {
  for (let svg of allsvg) {
    svg.remove();
  }
};
deleteSvg();

// appending images

// for (let img of imgs) {
//   img.classList.add("order");
// }

// class to move images first
const setOrderZero = () => {
  for (let cardBody of allCardBodies) {
    cardBody.classList.add("order");
  }
};
setOrderZero();

// appending the images
const appendImgs = () => {
  for (let i = 0; i < allCards.length; i++) {
    // imgs[i].innerHTML = "";
    const image = document.createElement("img");
    image.classList.add("img-fluid");
    //image.classList.add("order");
    image.classList.add("card-image");
    image.src = allImagesFirstQuery[i].src.medium;

    imgs[i].appendChild(image);
  }
};

loadImages.addEventListener("click", appendImgs);

/* ---------------------
EX2:
----------------------*/
const appendSecondaryImages = () => {
  for (let i = 0; i < allCards.length; i++) {
    const image = document.createElement("img");

    image.classList.add("img-fluid");
    //image.classList.add("order");
    image.classList.add("card-image");
    image.src = allImagesSecondQuery[i].src.medium;

    imgs[i].appendChild(image);
  }
};

loadSecondaryImages.addEventListener("click", appendSecondaryImages);

/* ---------------------
EX3:
----------------------*/
const editToHoverBtn = () => {
  for (let btn of editBtns) {
    btn.innerText = "Hover";
  }
};
editToHoverBtn();

const allHoverBtns = document.querySelectorAll(".btn-group *:nth-child(2)"); // all hover buttons

const hideWhenHoverClicked = () => {
  for (let i = 0; i < allHoverBtns.length; i++) {}
};
