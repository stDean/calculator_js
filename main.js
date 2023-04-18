const keys = document.querySelectorAll(".key");
let display_input = document.querySelector(".display .input");
let display_output = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
  let value = key.dataset.key;

  key.addEventListener("click", () => {
    switch (value) {
      case "clear":
        input = "";
        display_input.innerHTML = "";
        display_output.innerHTML = "";
        break;
      case "backspace":
        input = input.slice(0, -1);
        display_input.innerHTML = cleanInput(input);
        break;
      case "=":
        let result = eval(prepareInput(input));
        display_output.innerHTML = cleanOutput(result);
        break;
      case "bracket":
        /**
         *  If there is no first bracket ("(") add a start bracket
         *  Or if we have an index of starting bracket and we have an outer bracket
         *  And if starting bracket position is less than the closing bracket then you can add another opening bracket
         */
        if (input.indexOf("(") == -1 || input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")")) {
          input += "(";
        } else if (input.indexOf("(") != -1 && input.indexOf(")") == -1 ||
          input.indexOf("(") != -1 && input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")")) {
          // if opening bracket exist and no closing bracket add a close bracket
          input += ")";
        }
        display_input.innerHTML = cleanInput(input);
        break;
      default:
        if (validateInput(value)) {
          input += value;
          display_input.innerHTML = cleanInput(input);
        }
        break
    }
  })
}

// this function changes the value of the operators from the input value
function cleanInput(input) {
  let inputArray = input.split("");

  let formattedArray = inputArray.map(val => {
    if (val === "*") {
      return ` <span class="operator">x</span> `;
    } else if (val === "/") {
      return ` <span class="operator">÷</span> `;
    } else if (val === "+") {
      return ` <span class="operator">+</span> `;
    } else if (val === "-") {
      return ` <span class="operator">-</span> `;
    } else if (val === "(") {
      return ` <span class="brackets">(</span> `;
    } else if (val === ")") {
      return ` <span class="brackets">)</span> `;
    } else if (val === "%") {
      return ` <span class="percent">%</span> `;
    } else {
      return val;
    }
  })

  return formattedArray.join("");
}

/**
 *  first convert the output val to a string
 *  convert the string into an array, the get the value before the decimal and after the decimal,
 *  if the length of the element in d array is > 3, add a comma,
 *  if there is a decimal add it!
 */
function cleanOutput(output) {
  let outputStr = output.toString();
  let decimal = outputStr.split(".")[1];
  outputStr = outputStr.split(".")[0];

  let outputArr = outputStr.split("");
  if (outputArr.length > 3) {
    for (let i = outputArr.length - 3; i > 0; i -= 3) {
      outputArr.splice(i, 0, ",")
    }
  }

  if (decimal) {
    outputArr.push(".");
    outputArr.push(decimal);
  }

  return outputArr.join("");
}

// this function makes sure the input entered is valid i.e you cannot have multiple operators as last value of the input
function validateInput(val) {
  let lastInput = input.slice(-1);
  let operator = ["+", "-", "/", "*"];

  if (val === "." && lastInput === ".") {
    return false
  }

  if (operator.includes(val)) {
    if (operator.includes(lastInput)) {
      return false;
    } else {
      return true;
    }
  }

  return true
}

// 
function prepareInput(input) {
  let inputArray = input.split("");

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == "%") {
      inputArray[i] = "/100";
    }
  }

  return inputArray.join("");
}