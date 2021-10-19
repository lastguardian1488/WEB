function updatePrice() {
  // Находим select по имени в DOM.
  let s = document.getElementsByName("prodType");
  let select = s[0];
  let price = 0;
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
  }
  
  //умножаем на количество и проверяем правильно ли оно введено
  const reg = /[^0-9]|\b0[0-9]+/;
  let flag = true;
  let prodAmount = document.getElementsByName("prodAmount");
  if(reg.test(prodAmount[0].value) === true){
    alert("Вводите только пололожительные числа!");
    flag = false;
  }
  price*=prodAmount[0].value;

  // Скрываем или показываем радиокнопки.
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = (select.value == "2" ? "block" : "none");
  
  // Смотрим какая товарная опция выбрана.
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });

  // Скрываем или показываем чекбоксы.
  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = (select.value == "3" ? "block" : "none");

  // Смотрим какие товарные свойства выбраны.
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });

  if(flag){
    let prodPrice = document.getElementById("prodPrice");
    prodPrice.innerHTML = price + " рублей";
  }
}

function getPrices() {
  return {
    prodTypes: [395, 299, 589],
    prodOptions: {
      option1: 156,
      option2: 488,
    },
    prodProperties: {
      prop1: 9989,
    }
  };
}

function clearFields() {
  document.getElementsByName("prodAmount")[0].value = "";
  let select = document.getElementsByName("prodType");
  select[0].value = "";
  let radios = document.getElementById("radios");
  radios.style.display = ("none");
  let checkbox = document.getElementById("checkboxes");
  checkbox.style.display = ("none");
  let result = document.getElementById("prodPrice");
  result.innerHTML = "0 рублей";
  return false;
}

window.addEventListener('DOMContentLoaded', function (event) {
  // Скрываем радиокнопки.
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";

  //обработчик событий на количетсво товара
  let pA = document.getElementsByName("prodAmount");
  let prodAmount = pA[0];
  prodAmount.addEventListener("change", function(event) {
    updatePrice;  
  });

  // Находим select по имени в DOM.
  let s = document.getElementsByName("prodType");
  let select = s[0];
  // Назначаем обработчик на изменение select.
  select.addEventListener("change", function(event) {
    let target = event.target;
    console.log(target.value);
    updatePrice();
  });
  
  // Назначаем обработчик радиокнопок.  
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      let r = event.target;
      console.log(r.value);
      updatePrice();
    });
  });

    // Назначаем обработчик радиокнопок.  
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function(event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      updatePrice();
    });
  });

  //обработчик кнопки очистки формы
  let clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", function(event) {
    clearFields();
  });

  updatePrice();
});
