import menu from "./db.js";
import { buttonsData } from "./db.js";

// HTML'den gelen öğeleri al
const menuContainer = document.getElementById("menu-container");
const buttonsArea = document.getElementById("buttons-area");

// Sayfa yüklendiğinde menü öğelerini görüntüleyen fonksiyonu çalıştır
document.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu);
  showButtons("all");
});

// Menü öğelerini ekrana listelemek için fonksiyon
function displayMenuItems(menuItems) {
  console.log(menuItems);

  // Her bir öğe için HTML oluştur ve diziye ekle
  //map() yöntemi, her öğe için döngü oluşturur ve öğe özelliklerini kullanarak bir HTML şablonu oluşturur.
  let displayMenu = menuItems.map(
    (item) => `
    <a href="productDetail.html?id=${item.id}" id="card" class="d-flex gap-3 flex-column flex-md-row text-decoration-none text-dark">

        <img class="rounded shadow" src=${item.img} />
        <div>
          <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success">$ ${item.price}</p>
          </div>

          <p class="lead">
            ${item.desc}
          </p>
        </div>
      </a>
 `
  );

  // Diziyi birleştirerek virgülü kaldır
  //HTML'i ekranda görüntülemek için tek bir metin dizesine ihtiyaç vardır.
  // Bu nedenle, join(" ") yöntemi kullanılarak dizi elemanları arasına birer boşluk karakteri eklenerek dizi bir metin dizesine dönüştürülür.
  displayMenu = displayMenu.join(" ");

  // Oluşturulan menü öğelerini HTML'e ekleme
  menuContainer.innerHTML = displayMenu;
}

// Butonlara tıklanma olayını dinle
buttonsArea.addEventListener("click", searchCategory);

// Tıklanan butona göre ilgili kategorinin öğelerini ekrana basan fonksiyon
function searchCategory(e) {
  const category = e.target.dataset.category;

  // Tüm öğeler arasından sadece tıklanan butonun kategorisiyle aynı olanları filtrele
  const filteredMenu = menu.filter(
    (menuItem) => menuItem.category === category
  );

  // Eğer "all" seçildiyse tüm menüyü ekrana bas
  if (category === "all") {
    displayMenuItems(menu);
  } else {
    // Filtrelenmiş diziyi ekrana bas
    displayMenuItems(filteredMenu);
  }

  // Butonları güncelle
  showButtons(category);
}

// Menü butonlarını ekrana basan fonksiyon
function showButtons(active) {
  // Önceki butonları temizle
  buttonsArea.innerHTML = "";

  // Yeni butonları oluştur ve ekle
  buttonsData.forEach((btn) => {
    // HTML butonu oluştur
    const buttonElement = document.createElement("button");

    // Gerekli sınıfları ekle
    buttonElement.className = "btn btn-outline-dark filter-btn";

    // Yazıyı değiştir
    buttonElement.innerText = btn.text;

    // Veri kategorisini tanımla
    buttonElement.dataset.category = btn.data;

    // Aktif butona ayrıca sınıf ekle
    if (buttonElement.dataset.category === active) {
      buttonElement.classList.add("bg-dark", "text-light");
    }

    // HTML'e ekle
    buttonsArea.appendChild(buttonElement);
  });
}
