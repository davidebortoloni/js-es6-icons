const typeFilter = document.querySelector("#filter-section select");
const nameFilter = document.getElementById("name-filter");
const cardsRow = document.querySelector("#cards-section .row");
const capitalize = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};
const renderCards = (cards, element) => {
  let display = "";
  cards.forEach((card) => {
    display += `
        <div class="col">
        <div class="card justify-content-center rounded-3">
                    <i class="${card.family} ${card.prefix}${card.name} ${
      card.prefix
    }2x ${card.type}"></i>
                    <div class="mt-2">
                    <strong>${card.name.toUpperCase()}</strong>
                    </div>
                    </div>
            </div>
        </div>
        `;
  });
  element.innerHTML = display;
};
const getFilter = (cards, property) => {
  const filterOptions = [];
  cards.forEach((card) => {
    if (!filterOptions.includes(card[property])) {
      filterOptions.push(card[property]);
    }
  });
  const filter = filterOptions.reduce((result, option) => {
    return (result += `<option value="${option}">${capitalize(
      option
    )}</option>`);
  }, `<option value="all">All</option>`);
  return filter;
};

renderCards(icons, cardsRow);
typeFilter.innerHTML = getFilter(icons, "type");

typeFilter.addEventListener("change", () => {
  if (typeFilter.value == "all") {
    renderCards(icons, cardsRow);
  } else {
    const filteredIcons = icons.filter((icon) => icon.type == typeFilter.value);
    renderCards(filteredIcons, cardsRow);
  }
});

nameFilter.addEventListener("input", () => {
  typeFilter.value = "all";
  if (nameFilter.value == "") {
    renderCards(icons, cardsRow);
  } else {
    const filteredIcons = icons.filter((icon) =>
      icon.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    );
    renderCards(filteredIcons, cardsRow);
  }
});
