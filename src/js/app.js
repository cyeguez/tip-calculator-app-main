let inputBill = document.getElementById("inputBill");
let bill = inputBill.value;
const buttons = [...document.querySelectorAll(".btn")];
let tipValue = parseInt(buttons[0].value);

let tipPerson = document.querySelector(".result-amount");
let tipTotal = document.querySelector(".result-total");
let peopleNum;
let inputCustom = document.querySelector(".input-custom");
const btnReset = document.querySelector(".btn-reset");

inputBill.addEventListener("input", () => {
  onlyNum(inputBill);
  onlyPlus(bill, inputBill);
  bill = parseFloat(inputBill.value);
  if (bill > 0) {
    calculate();
  }
});

let inputPeople = document.getElementById("numPeople");
let numPeople = parseInt(inputPeople.value);
const error = document.querySelector(".error-label");

// colocandole el evento al input de número de personas

inputPeople.addEventListener("input", () => {
  onlyNum(inputPeople);
  onlyPlus(peopleNum, inputPeople);

  peopleNum = parseInt(inputPeople.value);

  if (peopleNum == 0 || isNaN(peopleNum)) {
    error.style.display = "inline";
    inputPeople.classList.add("border-error");
  } else {
    error.style.display = "none";
    inputPeople.classList.remove("border-error");
    calculate();
  }
});

billProp = buttons.value;

inputBill.addEventListener("input", (e) => {
  bill = parseInt(e.target.value);
  calculate();
});

//Agregar los eventos a los botones tipo buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    activeSeleted(buttons, e); //función que activa la clase seleted al boton presionado
    tipValue = parseInt(button.innerText.slice(0, -1));
    calculate();
  });
});

//Agregar los eventos al input custom

inputCustom.addEventListener("input", (e) => {
  onlyNum(inputCustom);
  onlyPlus(tipValue, inputCustom);
  activeSeleted(buttons,e);
  
  tipValue = parseInt(inputCustom.value); //casteando que el valor sea de tipo numérico
  if (tipValue>0 || isNaN(tipValue)){
    calculate();

  }
});

btnReset.addEventListener("click", (e) => {
  inputBill.value = "";
  inputPeople.value = "";
  tipPerson.innerText = "0.00";
  tipTotal.innerText = "0.00";
  inputCustom.value = "Custom";
  activeSeleted(buttons,e);
  buttons[0].classList.add("selected");
    
});



function calculate() {
  if (bill > 0 && tipValue > 0 && peopleNum > 0) {
    tipPerson.innerText = ((bill * tipValue) / 100 / peopleNum).toFixed(2);
    tipTotal.innerText = (((bill * tipValue) / 100 + bill) / peopleNum).toFixed(2);
  }
}

function activeSeleted(array, e) {
  array.forEach((element) => {
    element.classList.remove("selected");
  });
  e.target.classList.add("selected");
}

function onlyNum(input) {
  const regex = /[a-zA-Z]/g;
  const newValue = input.value.replace(regex, "");
  input.value = newValue;
}

function onlyPlus(valNum, input) {
  if (valNum < 0) {
    input.value = Math.abs(valNum);
  }
}
