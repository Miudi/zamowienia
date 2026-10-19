const company = document.getElementById("company");
const employee = document.getElementById("employee");
const savedCompany = localStorage.getItem("company");
if (savedCompany) {
  company.value = savedCompany;
}
const savedEmployee = localStorage.getItem("employee");
if (savedEmployee) {
  employee.value = savedEmployee;
}
company.addEventListener("change", () => {
  localStorage.setItem("company", company.value);
});
employee.addEventListener("input", () => {
  localStorage.setItem("employee", employee.value);
});



const products = [
  ["Ryż", 5],
  ["Przyprawy", 6],
  ["Kiełbasa", 20],
  ["Sos barbeque", 8],
  ["Kostki lodu", 6],
  ["Cytryna", 12],
  ["Mięta", 10],
  ["Energetyk junk", 6],
  ["Cukier", 5],
  ["Mąka", 6],
  ["Dżem jabłkowy", 6],
  ["Woda niegazowana", 6],
  ["Panierka", 6],
  ["Paczka ziaren kawy", 15],
  ["Olej", 7],
  ["Orzeszki ziemne", 7],
  ["Zupa", 8],
  ["Sos serowy", 8],
  ["Sos chili", 8],
  ["Sos czekoladowy", 8],
  ["Sos śmietankowy", 8],
  ["Sos sojowy", 8],
  ["Sos owocowy", 8],
  ["Sos czosnkowy", 8],
  ["Ketchup", 8],
  ["Majonez", 8],
  ["Musztarda", 8],
  ["Sos salsa", 8],
  ["Sos teriyaki", 8],
  ["Sos pomidorowy", 8],
  ["Sos tzatziki", 8],
  ["E-cola", 6],
  ["Woda gazowana", 6],
  ["Syrop owocowy", 6],
  ["Orange-O-Tang", 6],
  ["Puszka sprunk", 6],
  ["Tonic", 6],
  ["Zioła", 11],
  ["Tabasco", 7],
  ["Pieczywo", 8],
  ["Ciastko", 8],
  ["Miód", 8],
  ["Nori do sushi", 5],
  ["Makaron", 5],
  ["Tortilla", 7],
  ["Rak amerykański", 15],
  ["Małża", 9],
  ["Owoce morza", 11],
  ["Krewetka", 10],
  ["Dżem winogronowy", 6],
  ["Banan", 12],
  ["Borówka", 12],
  ["Dziki agrest", 12],
  ["Jabłko", 12],
  ["Jagoda amerykańska", 12],
  ["Jeżyna", 12],
  ["Kiść winogron", 12],
  ["Limonka", 12],
  ["Malina", 12],
  ["Pomarańcze", 12],
  ["Poziomka", 12],
  ["Cytrusy", 18],
  ["Owoce", 18],
  ["Baranina", 20],
  ["Mięso z indyka", 20],
  ["Wołowina", 26],
  ["Wieprzowina", 26],
  ["Mięso z kaczki", 20],
  ["Mięso z kurczaka", 20],
  ["Żeberka", 26],
  ["Karp", 38],
  ["Makrela pacyficzna", 18],
  ["Pstrąg potokowy", 18],
  ["Sardynka pacyficzna", 18],
  ["Śledź pacyficzny", 18],
  ["Łosoś królewski", 32],
  ["Sum pospolity", 32],
  ["Cebula", 10],
  ["Papryka", 10],
  ["Ziemniaki", 11],
  ["Bita śmietana", 13],
  ["Jogurt", 13],
  ["Mleko", 11],
  ["Masło", 12],
  ["Śmietana", 10],
  ["Boczniak ostrygowaty", 11],
  ["Borowik królewski", 11],
  ["Kurka złocista", 11],
  ["Maślak", 11],
  ["Opieńka miodowa", 11],
  ["Rydz amerykański", 11],
  ["Smardz leśny", 11],
  ["Jajko", 10],
  ["Warzywa", 15],
  ["Paczka liści herbaty", 15],
  ["Woda niegazowana PROMO", 11700],
  ["Lunch Box Służbowy", 80],
  ["Lunch Box Biznesowy", 50],
  ["E-Cola PROMO", 7800]
];





const cart = {};
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
const results = document.getElementById("results");
const cartDiv = document.getElementById("cart");
const onlyFavoritesCheckbox = document.getElementById("onlyFavorites");


// Odczyt wybranej opcji pokazywania tylko ulubionych z localStorage
if (localStorage.getItem("onlyFavorites") === "true") {
  onlyFavoritesCheckbox.checked = true;
}

function renderProducts(filter = "") {
  results.innerHTML = "";
  const showOnlyFavs = onlyFavoritesCheckbox.checked;
  const filtered = products.filter(p => {
    const matchesName = p[0].toLowerCase().includes(filter.toLowerCase());
    const isFav = favorites.includes(p[0]);
    if (showOnlyFavs) {
      return matchesName && isFav;
    }
    return matchesName;
  }).sort((a, b) => {
    const aFavorite = favorites.includes(a[0]);
    const bFavorite = favorites.includes(b[0]);
    if (aFavorite !== bFavorite) {
      return aFavorite ? -1 : 1;
    }
    return a[0].localeCompare(b[0]);
  });
  if (filtered.length === 0) {
    results.innerHTML = `
                <div style="text-align:center; color:#888; padding:20px;">Brak produktów spełniających kryteria.</div>`;
    return;
  }
  filtered.forEach(p => {
    const isFavorite = favorites.includes(p[0]);
    results.innerHTML += `
  
                <div class="product ${isFavorite ? "favorite-card" : ""}">
                  <div>
                    <b>${p[0]}</b>
                    <br>
                      <span style="color:#7fff95">$${p[1]}</span>
                    </div>
                    <div class="productActions">
                      <button
              class="favoriteButton ${isFavorite ? "isFavorite" : "notFavorite"}"
              onclick="toggleFavorite('${p[0]}')"
              title="${isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}"
              aria-label="${isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}"
          >♥</button>
                      <button onclick="addProduct('${p[0]}',${p[1]})">Dodaj</button>
                    </div>
                  </div>
  `;
  });
}

function toggleFavorite(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(item => item !== name);
  } else {
    favorites.push(name);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderProducts(document.getElementById("search").value);
}

function addProduct(name, price) {
  if (cart[name]) {
    cart[name].qty++;
  } else {
    cart[name] = {
      price,
      qty: 1
    };
  }
  renderCart();
}

function renderCart() {
  cartDiv.innerHTML = "";
  let total = 0;
  for (let name in cart) {
    let item = cart[name];
    let value = item.price * item.qty;
    total += value;
    cartDiv.innerHTML += `


                  <div class="cartItem">
                    <div>
                      <b>${name}</b>
                      <div class="price">$${value}</div>
                    </div>
                    <div class="qty">
                      <button onclick="changeQty('${name}',-1)">-</button>
                      <input value="${item.qty}" onchange="setQty('${name}',this.value)">
                        <button onclick="changeQty('${name}',1)">+</button>
                      </div>
                      <button class="remove" onclick="removeItem('${name}')">🗑️</button>
                    </div>

`;
  }
  document.getElementById("sum").innerText = total;
}

function changeQty(name, d) {
  cart[name].qty += d;
  if (cart[name].qty <= 0) delete cart[name];
  renderCart();
}

function setQty(name, val) {
  val = parseInt(val);
  if (isNaN(val) || val <= 0) {
    delete cart[name];
  } else {
    cart[name].qty = val;
  }
  renderCart();
}

function removeItem(name) {
  delete cart[name];
  renderCart();
}

function clearCart() {
  for (let k in cart) delete cart[k];
  renderCart();
}

function copyOrder() {
  const company = document.getElementById("company").value.trim();
  const employee = document.getElementById("employee").value.trim();
  if (company === "") {
    alert("Wybierz firmę!");
    return;
  }
  if (employee === "") {
    alert("Podaj osobę zamawiającą!");
    return;
  }
  if (Object.keys(cart).length === 0) {
    alert("Dodaj przynajmniej jeden produkt do zamówienia!");
    return;
  }
  // --- AUTOMATYCZNE DODAWANIE DO ULUBIONYCH I ZAPIS W LOCALSTORAGE ---
  let addedNewFavorites = false;
  for (let name in cart) {
    if (!favorites.includes(name)) {
      favorites.push(name);
      addedNewFavorites = true;
    }
  }
  if (addedNewFavorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderProducts(document.getElementById("search").value);
  }
  // -------------------------------------------------------------------
  let txt = "```\n";
  txt += `Firma: ${company}\n`;
  txt += `Osoba: ${employee}\n`;
  txt += `Typ produktu\n`;
  for (let name in cart) {
    txt += `${name} ${cart[name].qty}\n`;
  }
  txt += "```";
  navigator.clipboard.writeText(txt);
  alert("Skopiowano listę produktów i dodano zamówione przedmioty do ulubionych!");
}
document.getElementById("search").addEventListener("input", e => renderProducts(e.target.value));
onlyFavoritesCheckbox.addEventListener("change", e => {
  localStorage.setItem("onlyFavorites", e.target.checked);
  renderProducts(document.getElementById("search").value);
});
renderProducts();
