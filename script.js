//Variables to do the math
let num1 = "",
    num2 = "",
    total = 0,
    cont = 0,
    contOperator = 0,
    operator,
    btn = [];

// Screen variables
const screenResult = document.querySelector(".result")
const screenOperation = document.querySelector(".operation")

// Operators variables
const btnAdd = document.querySelector("#add")
const btnSubstract = document.querySelector("#substract")
const btnDivide = document.querySelector("#divide")
const btnMultiply = document.querySelector("#multiply")
const btnEquals = document.querySelector("#equals")
const btnClear = document.querySelector(".clear")
const btnDelete = document.querySelector(".delete")

//Operators events
btnAdd.onclick = () => (operationType("+"));
btnSubstract.onclick = () => (operationType("-"));
btnDivide.onclick = () => (operationType("/"));
btnMultiply.onclick = () => (operationType("*"));
btnEquals.onclick = () => (showResult());
btnClear.onclick = () => (clear());
btnDelete.onclick = () => (deleteCharacter());
window.addEventListener('keydown', keyboard)

// Number events
for (let i = 0; i < 10; i++) {
    btn[i] = document.querySelector("#num" + i)
    btn[i].onclick = () => (numbers(i))
}
const btnDot = document.querySelector("#dot")
btnDot.onclick = () => (numbers("."))

// Save numbers before making the operation
function numbers(n) {
    if (n === "." && screenOperation.textContent.includes(".")) {} else {
        if (cont === 0) {
            num1 += n;
            screenOperation.textContent = num1;
        } else if (cont >= 1) {
            num2 += n;
            operation();
        }
    }
}

// Assign value to the operator variable
function operationType(value) {
    if (screenOperation.textContent != "") {
        operator = value;
        if (contOperator === 0) {
            screenOperation.textContent = num1 + " " + value;
            cont++;
            contOperator++;
        } else if (contOperator === 1) {
            num1 = total;
            num2 = "";
            screenOperation.textContent = num1 + " " + value;
            cont++;
        }
    }

}


// Do the operation
function operation() {
    screenOperation.textContent = num1 + " " + operator + " " + num2;
    switch (operator) {
        case "+":
            aux1 = parseFloat(num1);
            aux2 = parseFloat(num2);
            total = aux1 + aux2;
            break;
        case "-":
            total = num1 - num2;
            break;
        case "/":
            if (num2 != 0) {
                total = num1 / num2;
                total = total.toFixed(1);
            } else {
                screenResult.textContent = "ERROR"
                num2 = "";
            }
            break;
        case "*":
            total = num1 * num2;
            break;
    }

}

// Show result
function showResult() {
    if (num1 != "") {
        screenOperation.textContent = num1 + " " + operator + " " + num2;
        screenResult.textContent = total;
    }
}

// Delete everything
function clear() {
    num1 = "", num2 = "", total = 0, cont = 0, contOperator = 0;
    screenOperation.textContent = "";
    screenResult.textContent = "0"
}

// Delete last number clicked
function deleteCharacter() {
    if (cont === 0) {
        num1 = num1.slice(0, -1);
        screenOperation.textContent = num1;
    } else if (cont >= 1) {
        num2 = num2.slice(0, -1);
        screenOperation.textContent = num1 + " " + operator + " " + num2;
    }

}
// Use keyboard to select numbers
function keyboard(e) {
    if (e.key >= 0 && e.key <= 9) numbers(e.key)
    if (e.key === '.') numbers(e.key)
    if (e.key === '=' || e.key === 'Enter') showResult();
    if (e.key === 'Backspace') deleteCharacter();
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        operationType(e.key);
}