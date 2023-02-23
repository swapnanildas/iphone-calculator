

var numerics = document.querySelectorAll(".numeric input");
var specials = document.querySelectorAll(".special input");
var operations = document.querySelectorAll(".operation input");
var display = document.querySelector(".display");

var number1;
var number2;
var output = false;
var operation;
var nextNum = false;
var firstEntry = true;
for (const numeric of numerics) {
  numeric.addEventListener("click", print);
}

for (const special of specials) {
  special.addEventListener("click", transform);
}

for (const operation of operations) {
  operation.addEventListener("click", operate);
}
function print() {
  if (firstEntry == true || nextNum == true) {
    display.style.fontSize = "4rem";
    display.textContent = "";
    nextNum = false;
    firstEntry = false;
  }
  if (display.textContent.length <= 9) {
    display.textContent += this.value;
  }
  if (display.textContent.length >= 9) display.style.fontSize = "3.8rem";
  if (display.textContent.length >= 10) display.style.fontSize = "3.2rem";
}
function transform() {
  if (this.value == "AC") {
    display.textContent = "0";
    display.style.fontSize = "4rem";
    output = false;
    firstEntry = true;
  } else if (this.value == "+/-") {
    display.textContent = "-1" * display.textContent;
  } else display.textContent = "0.01" * display.textContent;
}
function operate() {
  if (this.value == "+") {
    operation = 0;
    number1 = display.textContent;
    nextNum = true;
  } else if (this.value == "-") {
    operation = 1;
    number1 = display.textContent;
    nextNum = true;
  } else if (this.value == "×") {
    operation = 2;
    number1 = display.textContent;
    nextNum = true;
  } else if (this.value == "÷") {
    operation = 3;
    number1 = display.textContent;
    nextNum = true;
  } else if (this.value == "=") {
    if (output == false && typeof output == "boolean") {
      //console.log(output);
      number2 = display.textContent;
      output = evaluate(number1, number2, operation);
    } else {
      output = evaluate(output, number2, operation);
    }

    output = truncate(output);
    nextNum = true;
    display.textContent = output;
    //console.log(number1+" "+number2+" "+output+" "+display.textContent);
  }
}

function evaluate(a, b, op) {
  a = parseFloat(a, 10);
  b = parseFloat(b, 10);
  if (op == 0) return a + b;
  else if (op == 1) return a - b;
  else if (op == 2) return a * b;
  else if (op == 3) {
    if (b == 0) return "Error";
    else return a / b;
  }
}

function truncate(output) {
  var len = output.toString().length;
  if (len > 10) {
    output = output.toExponential(4);
    let len = output.toString().length;
    if (len > 9) display.style.fontSize = "3rem";
    return output;
  }
  return output;
}
