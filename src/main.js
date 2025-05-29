import axios from "axios";

let photoInput = document.querySelector("#form-name-input-2");
let factInput = document.querySelector("#form-name-input");
const imgBtn = document.querySelector("#searchBtn2");
const factBtn = document.querySelector("#searchBtn1");
const result = document.querySelector(".result");

async function getCatPhotos() {
  result.innerHTML = "";

  try {
    let numOfPhotos = Number(photoInput.value);
    if (numOfPhotos < 1) numOfPhotos = 1;
    if (numOfPhotos > 10) numOfPhotos = 10;

    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${numOfPhotos}`);
    const data = response.data;

    for (let i = 0; i < data.length; i++) {
      const div = document.createElement("div");
      div.classList.add("image-results");
      div.style.backgroundImage = `url(${data[i].url})`;
      div.style.width = "500px";
      div.style.height = "350px";
      div.style.backgroundSize = "cover";
      div.style.marginBottom = "1rem";
      result.appendChild(div);
    }

  } catch (error) {
    result.textContent = "Failed to load cat images.";
  }
}

async function getCatFacts() {
  result.innerHTML = "";

  try {
    let numOfFacts = Number(factInput.value);
    if (numOfFacts < 1) numOfFacts = 1;
    if (numOfFacts > 50) numOfFacts = 50;

    const response = await axios.get(`https://meowfacts.herokuapp.com/?count=${numOfFacts}`);
    const data = response.data;

    const ol = document.createElement("ol");
    for (let i = 0; i < data.data.length; i++) {
      const li = document.createElement("li");
      li.textContent = data.data[i];
      ol.appendChild(li);
    }

    result.appendChild(ol);

  } catch (error) {
    result.textContent = "Failed to load cat facts.";
  }
}

imgBtn.addEventListener("click", function (e) {
  e.preventDefault();
  result.style.display = "flex";
  getCatPhotos();
});

factBtn.addEventListener("click", function (e) {
  e.preventDefault();
  result.style.display = "flex";
  getCatFacts();
});
