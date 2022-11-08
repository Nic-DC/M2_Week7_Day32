console.log("wiii");

/* ---------------------
GLOBAL variables:
----------------------*/
let allImagesFirstQuery = [];
let allImagesSecondQuery = [];
let searchedImages = [];
let carouselImages = [];

/* ---------------------
DOM elements:
----------------------*/
const loadImages = document.querySelector(".btn.btn-primary.my-2"); // Load Images button
const loadSecondaryImages = document.querySelector(".btn.btn-secondary.my-2"); // Load Secondary Images button
const allCards = document.querySelectorAll(".card"); // cards div
const allCardBodies = document.querySelectorAll(".card-body"); // card-body divs
const imgs = document.querySelectorAll(".card.shadow-sm"); // image divs
const editBtns = document.querySelectorAll(".btn-group *:nth-child(2)"); // all edit buttons
const minutes = document.querySelectorAll(".btn-group + .text-muted"); // minutes
const searchInput = document.getElementById("searchInput"); // search input in jumbotron
const searchBtn = document.getElementById("searchBtn"); // search button
const carouselImage = document.querySelectorAll(".carousel-images"); // carousel images
const viewBtns = document.querySelectorAll(".btn-group *:nth-child(1)");

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

    // Ex5:
    minutes[i].innerText = allImagesFirstQuery[i].id;
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

    // Ex5:
    minutes[i].innerText = allImagesSecondQuery[i].id;
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

/* ---------------------
EX4:
----------------------*/
const allHoverBtns = document.querySelectorAll(".btn-group *:nth-child(2)"); // all hover buttons

const hideWhenHoverClicked = () => {
  for (let i = 0; i < allHoverBtns.length; i++) {
    allHoverBtns[i].addEventListener("click", () => {
      allCards[i].hidden = !allCards[i].hidden;
    });
  }
};
hideWhenHoverClicked();

/* ---------------------
EX6:
----------------------*/
const changeImagesWithSearch = () => {
  let input = searchInput.value;
  console.log(input);
  //   if (input !== "") {
  fetch(`https://api.pexels.com/v1/search?query=${input}`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      searchedImages = response.photos;

      for (let i = 0; i < allCards.length; i++) {
        // imgs[i].innerHTML = "";
        const image = document.createElement("img");
        image.classList.add("img-fluid");
        //image.classList.add("order");
        image.classList.add("card-image");
        image.src = searchedImages[i].src.medium;

        imgs[i].appendChild(image);

        // Ex5:
        minutes[i].innerText = searchedImages[i].id;
      }
    });

  console.log({ searchedImages });
};

searchBtn.addEventListener("click", changeImagesWithSearch);

/* ---------------------
EX7:
----------------------*/

/* ---------------------
EX8:
----------------------*/
const populateCarousel = () => {
  fetch("https://api.pexels.com/v1/search?query=forest", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      carouselImages = response.photos;
      for (let i = 0; i < carouselImage.length; i++) {
        carouselImage[i].src = carouselImages[i].src.large;
      }
    });
};
populateCarousel();

/* ---------------------
EX9:
----------------------*/
// viewBtns

// <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#imageModal">
//       Launch demo modal
//     </button >

const viewImageInModal = () => {
  const modal = document.querySelector(".modal-body");
  console.log({ modal });
  const images = document.querySelector(".card-image");
  for (let i = 0; i < viewBtns.length; i++) {
    viewBtns[i].addEventListener("click", () => {
      console.log("click");
      console.log({ modal });
      viewBtns[i].setAttribute("data-toggle", "modal");
      viewBtns[i].setAttribute("data-target", "#imageModal");
      //viewBtns[i].dataTarget = "#imageModal";
      modal.innerHTML = `<img class="img-fluid card-image" src=${allImagesFirstQuery[i].src.medium} />`;
    });
  }
};
viewImageInModal();
