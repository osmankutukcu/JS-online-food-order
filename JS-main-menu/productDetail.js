// productDetail.js

// productDetail.js

import menu from "./db.js";

const productId = new URLSearchParams(window.location.search).get("id");
const product = menu.find((item) => item.id === parseInt(productId));

if (product) {
  const productDetailContainer = document.getElementById("product-detail");

  const html = `
    <div class="col-12 col-md-6 product-image">
      <img src="${product.img}" alt="${product.title}" class="img-fluid rounded shadow">
    </div>
    <div class="col-12 col-md-6 product-details">
      <h2>${product.title}</h2>
      <p class="text-success">$ ${product.price}</p>
      <p>${product.desc}</p>
    </div>
    <div class="col-12 mt-4">
      <button id="go-back-btn" class="btn btn-outline-primary">Ana Sayfaya Dön</button>
    </div>
  `;

  productDetailContainer.innerHTML = html;

  const goBackBtn = document.getElementById("go-back-btn");
  goBackBtn.addEventListener("click", goBack);
}

function goBack() {
  window.history.back();
}
