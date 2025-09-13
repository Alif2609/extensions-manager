let extensionsContainer = $(".extensions-container");
let allBtn = $(".allBtn");
let activeBtn = $(".activeBtn");
let inactiveBtn = $(".inactiveBtn");
let themeToggleBtn = $(".theme-toggle");
let themeIcon = $(".theme-icon");

themeToggleBtn.click(function () {
  let currentTheme = $("body").attr("data-theme");
  let newTheme = currentTheme === "light" ? "dark" : "light";
  $("body").attr("data-theme", newTheme);
  themeIcon.toggleClass("hide");
});

function checkEmptyContainer() {
  if (extensionsContainer.children().length === 0) {
    extensionsContainer.append("<p class='no-extensions'>No extensions</p>");
  } else {
    extensionsContainer.find(".no-extensions").remove();
  }
}

$.getJSON("data.json", function (data) {
  extensionsContainer.empty();
  $.each(data, function (i, element) {
    let createCard = $("<div class='card'></div>");
    let logo = $(`<img src="${element.logo}" alt="${element.name} logo">`);
    let name = $(`<h2 class='ext-name'>${element.name}</h2>`);
    let description = $(
      `<p class='ext-description'>${element.description}</p>`
    );
    let stateBtnWrap = $("<div class='state-btn-wrap'></div>");
    let removeBtn = $("<button class='remove-btn'>Remove</button>");

    let textWrap = $("<div class='text-wrap'></div>");
    textWrap.append(name, description);
    let buttonWrap = $("<div class='button-wrap'></div>");
    buttonWrap.append(removeBtn, stateBtnWrap);
    let createDiv = $("<div class='logo-name-wrap'></div>");
    createDiv.append(logo, textWrap);
    createCard.data("isActive", element.isActive);

    let uniqueAnchorName = `--state-button-${i}`;
    let extStateBtn = $(
      `<button class='ext-state-btn' style='anchor-name: ${uniqueAnchorName}'></button>`
    );
    let circle = $(
      `<div class='circle' style='position-anchor: ${uniqueAnchorName}'></div>`
    );

    if (element.isActive) {
      extStateBtn.addClass("red-bg");
      circle.addClass("on");
    }

    stateBtnWrap.append(extStateBtn, circle);
    createCard.append(createDiv, buttonWrap);
    $(extensionsContainer).append(createCard);

    removeBtn.click(function () {
      createCard.remove();
      checkEmptyContainer();
    });
  });

  $(document).on("click", ".ext-state-btn", function () {
    let card = $(this).closest(".card");
    let currentState = card.data("isActive");
    let newState = !currentState;

    card.data("isActive", newState);

    let circle = $(this).siblings(".circle");
    if (newState) {
      $(this).addClass("red-bg");
      circle.addClass("on");
    } else {
      $(this).removeClass("red-bg");
      circle.removeClass("on");
    }
  });

  allBtn.click(function () {
    $(".card").removeClass("hide");
    $(".filter-btn").removeClass("selected");
    $(this).addClass("selected");
  });

  activeBtn.click(function () {
    $(".filter-btn").removeClass("selected");
    $(this).addClass("selected");
    $(".card").each(function () {
      if ($(this).data("isActive")) {
        $(this).removeClass("hide");
      } else {
        $(this).addClass("hide");
      }
    });
  });

  inactiveBtn.click(function () {
    $(".filter-btn").removeClass("selected");
    $(this).addClass("selected");
    $(".card").each(function () {
      if (!$(this).data("isActive")) {
        $(this).removeClass("hide");
      } else {
        $(this).addClass("hide");
      }
    });
  });
});

checkEmptyContainer();
