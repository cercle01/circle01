async function loadMenu(){
  const res = await fetch("menu-data.json");
  const data = await res.json();

  const nav = document.getElementById("categoryNav");
  const menu = document.getElementById("menu");

  data.sections.forEach((section, index) => {
    const id = `section-${index + 1}`;
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = section.name;
    nav.appendChild(link);

    const sectionEl = document.createElement("section");
    sectionEl.className = "menu-section";
    sectionEl.id = id;
    sectionEl.innerHTML = `
      <div class="section-title">
        <h2>${section.name}</h2>
        <span class="section-number">${String(index + 1).padStart(2,"0")}</span>
      </div>
    `;

    section.items.forEach(([name, price, image]) => {
      const item = document.createElement("article");
      item.className = "item";
      item.innerHTML = `
        <img class="item-image" src="${image}" alt="${name}" loading="lazy">
        <div class="item-info">
          <div class="item-name">${name}</div>
          <div class="item-price">${Number(price).toLocaleString("en-US")} <small>IQD</small></div>
        </div>
      `;
      sectionEl.appendChild(item);
    });
    menu.appendChild(sectionEl);
  });
}
loadMenu().catch(() => {
  document.getElementById("menu").innerHTML =
    "<p>تعذر تحميل القائمة. تأكد من وجود ملف menu-data.json.</p>";
});
