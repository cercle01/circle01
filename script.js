const translations = {
  sections: {
    "الإسبريسو": "Espresso",
    "القهوة الحارة": "Hot Coffee",
    "الفِلتر": "Filter",
    "المشروبات الباردة": "Cold Drinks",
    "العصائر": "Juices"
  },

  items: {
    "إسبريسو": "Espresso",
    "برازيلي": "Brazilian",
    "كولمبي": "Colombian",
    "لاتية هوت": "Hot Latte",
    "فلات وايت": "Flat White",
    "كورتادو": "Cortado",
    "لاتية كلاسك": "Classic Latte",
    "كابتشينو": "Cappuccino",
    "سبانش لاتيه": "Spanish Latte",
    "موكا": "Mocha",
    "Angel": "Angel",
    "هوت شوكليت": "Hot Chocolate",
    "امريكانو": "Americano",
    "كولد برو": "Cold Brew",
    "V60": "V60",
    "الايس تي": "Iced Tea",
    "ليمون": "Lemon",
    "باشن فروت": "Passion Fruit",
    "فراولة": "Strawberry",
    "اناناس": "Pineapple",
    "منكا": "Mango",
    "بلو بيري": "Blueberry",
    "وميكس": "Mix",
    "عصير برتقال": "Orange Juice",
    "كركديه": "Hibiscus"
  }
};

let currentLanguage = "ar";
let menuData = null;

async function loadMenu() {
  const res = await fetch("menu-data.json");
  menuData = await res.json();

  renderMenu();
}

function renderMenu() {
  const nav = document.getElementById("categoryNav");
  const menu = document.getElementById("menu");

  nav.innerHTML = "";
  menu.innerHTML = "";

  menuData.sections.forEach((section, index) => {

    const id = `section-${index + 1}`;

    const sectionName =
      currentLanguage === "en"
        ? (translations.sections[section.name] || section.name)
        : section.name;

    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = sectionName;

    nav.appendChild(link);

    const sectionEl = document.createElement("section");
    sectionEl.className = "menu-section";
    sectionEl.id = id;

    sectionEl.innerHTML = `
      <div class="section-title">
        <h2>${sectionName}</h2>
        <span class="section-number">
          ${String(index + 1).padStart(2, "0")}
        </span>
      </div>
    `;

    section.items.forEach(([name, price, image]) => {

      const itemName =
        currentLanguage === "en"
          ? (translations.items[name] || name)
          : name;

      const item = document.createElement("article");
      item.className = "item";

      item.innerHTML = `
        <img
          class="item-image"
          src="${image}"
          alt="${itemName}"
          loading="lazy"
        >

        <div class="item-info">

          <div class="item-name">
            ${itemName}
          </div>

          <div class="item-price">
            ${Number(price).toLocaleString("en-US")}
            <small>IQD</small>
          </div>

        </div>
      `;

      sectionEl.appendChild(item);
    });

    menu.appendChild(sectionEl);
  });
}


function setLanguage(language) {

  currentLanguage = language;

  document.documentElement.lang = language;
  document.documentElement.dir =
    language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar]").forEach(el => {

    const text =
      language === "ar"
        ? el.getAttribute("data-ar")
        : el.getAttribute("data-en");

    if (text.includes("<")) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  document.getElementById("arBtn")
    ?.classList.toggle("active", language === "ar");

  document.getElementById("enBtn")
    ?.classList.toggle("active", language === "en");

  document.title =
    language === "ar"
      ? "KALD CAFFE — المنيو"
      : "KALD CAFFE — Menu";

  renderMenu();
}


loadMenu().catch(() => {

  const message =
    currentLanguage === "ar"
      ? "تعذر تحميل القائمة. تأكد من وجود ملف menu-data.json."
      : "Unable to load the menu. Please check menu-data.json.";

  document.getElementById("menu").innerHTML =
    `<p>${message}</p>`;
});