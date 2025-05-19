document.getElementById("calculate-btn").addEventListener("click", function () {
  const firstNum = parseInt(document.getElementById("first-number").value);
  const secondNum = parseInt(document.getElementById("second-number").value);
  const operator = document.querySelector(".operator.active");

  
  if (!operator) {
    document.getElementById("error-message").style.display = "block";
    document.querySelector(".operator-buttons").classList.add("shake");
    return; 
  }

  
  document.getElementById("error-message").style.display = "none";
  document.querySelector(".operator-buttons").classList.remove("shake");

  let result;
  switch (operator.id) {
    case "plus":
      result = firstNum + secondNum;
      break;
    case "minus":
      result = firstNum - secondNum;
      break;
    case "multiply":
      result = firstNum * secondNum;
      break;
    case "divide":
      if (secondNum === 0) {
        result = "Cannot divide by 0";
      } else {
        result = firstNum / secondNum;
      }
      break;
  }

  document.getElementById("answer").value = result;
  updateAbacus(result);
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".operator")
      .forEach((op) => op.classList.remove("active"));
    button.classList.add("active");
  });
});

document.getElementById("color").addEventListener("input", function (e) {
  document.querySelector(".calculator").style.backgroundColor = e.target.value;
});

document.getElementById("clear-btn").addEventListener("click", function () {
  document.getElementById("first-number").value = "";
  document.getElementById("second-number").value = "";
  document.getElementById("answer").value = "";
  document.getElementById("error-message").style.display = "none";
  document
    .querySelectorAll(".operator")
    .forEach((op) => op.classList.remove("active"));
  document.querySelector(".operator-buttons").classList.remove("shake");
  resetAbacus();
});


function resetAbacus() {
  const abacus = document.getElementById("abacus");
  abacus.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("abacus-row");
    for (let j = 0; j < 10; j++) {
      const bead = document.createElement("div");
      bead.classList.add("bead", "inactive");
      row.appendChild(bead);
    }
    abacus.appendChild(row);
  }
}

function updateAbacus(result) {
  const abacus = document.getElementById("abacus");
  abacus.innerHTML = "";

  
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("abacus-row");

    for (let j = 0; j < 10; j++) {
      const bead = document.createElement("div");
      bead.classList.add("bead");
      if (result > i * 10 + j) bead.classList.add("active");
      else bead.classList.add("inactive");
      row.appendChild(bead);
    }

    abacus.appendChild(row);
  }
}
