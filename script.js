const form = document.querySelector("form");
const billInp = document.getElementById("bill");
const peopleInp = document.getElementById("people");
const peopleEl = document.querySelector(".people__num");
const errMsg = document.querySelector(".error__message");
const tipPercInps = document.querySelectorAll("input[type='radio']");
const customInp = document.getElementById("custom");
const tipAmountEl = document.getElementById("tipAmount");
const totalAmountEl = document.getElementById("totalAmount");
const resetBtn = document.querySelector(".resetBtn");

let bill, tip, people;
const tipArray = [...tipPercInps];

form.addEventListener("input", function (e) {
  if (+billInp.value < 0) {
    bill = null;
  } else {
    bill = +billInp.value;
  }

  if (e.target.id === "custom") {
    customInput(+e.target.value);
  }

  if (e.target.id == form.tip.value) tipBtns();

  if (e.target.id === "people") {
    peopleVal(+e.target.value);
  }
  if (!peopleEl.classList.contains("error") && bill && tip && people) {
    calculateTip();
  } else {
    clearResults();
  }
});

function peopleVal(value) {
  switch (true) {
    case Number.isInteger(value) && value != 0 && value > 0:
      if (peopleEl.classList.contains("error")) {
        peopleEl.classList.remove("error");
      }
      people = value;
      break;
    case value === 0:
      errMsg.textContent = "Can't be zero";
      peopleEl.classList.add("error");
      break;
    case value < 0 || !Number.isInteger(value):
      errMsg.textContent = "Wrong format";
      peopleEl.classList.add("error");
      break;
    default:
      null;
  }
}

function customInput(value) {
  tipArray.forEach((tipEl) => {
    tipEl.checked = false;
  });
  if (+value < 0) {
    tip = null;
  } else {
    tip = +value;
  }
}

function tipBtns() {
  customInp.value = "";
  tipArray.forEach((tipEl) => {
    if (tipEl.checked) {
      tip = tipEl.value;
    }
  });
}

function calculateTip() {
  resetBtn.removeAttribute("disabled");
  let tipAmount = (bill * (tip / 100)) / people;
  tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`;

  let totalAmount = bill / people + tipAmount;
  totalAmountEl.textContent = `$${totalAmount.toFixed(2)}`;

  if (tipAmountEl.textContent.length > 8) {
    tipAmountEl.style.overflowX = "auto";
    totalAmountEl.style.overflow = "auto";
  }
}

function clearResults() {
  tipAmountEl.textContent = `$0.00`;
  totalAmountEl.textContent = `$0.00`;
  resetBtn.setAttribute("disabled", "");
}

resetBtn.addEventListener("click", reset);

window.addEventListener("load", reset);

function reset() {
  form.reset();
  clearResults();
  bill = null;
  tip = null;
  people = null;
}
