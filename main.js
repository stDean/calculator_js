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
        let result = eval(input);
        display_output.innerHTML = result;
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
        input += value;
        display_input.innerHTML = cleanInput(input);
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