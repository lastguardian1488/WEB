function onClick() {
  const reg = /[^0-9]|\b0[0-9]+/;
  let price = document.getElementsByName("prod-price");
  let amount = document.getElementsByName("prod-amount");
  if((reg.test(price[0].value) || reg.test(amount[0].value)) === true){
    alert("Вводите только положительные целые числа!");
  }
  else{
    let result = document.getElementById("result");
    result.innerHTML = parseInt(price[0].value)*parseInt(amount[0].value);
  }
  return false;
}
window.addEventListener("DOMContentLoaded", function name(event) {
  console.log("DOM loaded");
  let button = document.getElementById("calc-button");
  button.addEventListener("click", onClick);
});