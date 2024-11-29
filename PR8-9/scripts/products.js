document.addEventListener("DOMContentLoaded", function () {
    const productContainer = document.querySelector(".swiper-wrapper");
    const languageSelect = document.querySelector("#language-select"); 
    const jsonUrl = "products.json";
  
    function createProductCard(product) {
      const productCard = document.createElement("div");
      productCard.classList.add("swiper-slide");
  
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-title">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <button class="btn ${product.availability === "У продажу скоро" || product.availability === "Coming Soon" ? "btn-soon" : "btn-cart"}">
          ${product.availability}
        </button>
      `;
  
      return productCard;
    }
  
    async function loadProducts(language = "uk") {
      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) throw new Error("Не вдалося завантажити дані");
        const data = await response.json();
  
        const products = data[language];
        productContainer.innerHTML = "";
  
        products.forEach((product) => {
          const productCard = createProductCard(product);
          productContainer.appendChild(productCard);
        });

        new Swiper(".swiper", {
          slidesPerView: 3,
          spaceBetween: 20,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
      } catch (error) {
        console.error("Помилка завантаження товарів:", error);
      }
    }
    languageSelect.addEventListener("change", (event) => {
      const selectedLanguage = event.target.value;
      localStorage.setItem("language", selectedLanguage); 
      loadProducts(selectedLanguage);
    });
    const savedLanguage = localStorage.getItem("language") || "uk";
    languageSelect.value = savedLanguage;
    loadProducts(savedLanguage);
  });
  