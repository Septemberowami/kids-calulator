document.addEventListener("DOMContentLoaded", function () {
  initializeAbacus();
  // Removed addSparkleEffect(); as sparkles are emojis
  initializeBackgroundColorChanger();

  // Add a class to the abacus title for initial "online green" styling
  document.querySelector(".abacus-title").classList.add("online-green");
});

document.getElementById("calculate-btn").addEventListener("click", function () {
  const firstNum = parseInt(document.getElementById("first-number").value);
  const secondNum = parseInt(document.getElementById("second-number").value);
  const operator = document.querySelector(".operator.active");
  const errorMessage = document.getElementById("error-message");
  const answerField = document.getElementById("answer");

  errorMessage.style.display = "none";
  document.querySelector(".operator-buttons").classList.remove("shake");

  if (isNaN(firstNum) || isNaN(secondNum)) {
    showError("Please enter both numbers!");
    return;
  }

  if (!operator) {
    showError("Oops! Please pick an operation (+, -, x, ÷)");
    document.querySelector(".operator-buttons").classList.add("shake");
    return;
  }

  let result;
  let isValidResult = true;

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
        showError("Oops! Can't divide by zero!");
        isValidResult = false;
      } else {
        result = Math.round((firstNum / secondNum) * 100) / 100;
      }
      break;
  }

  if (isValidResult) {
    answerField.value = `${result}`;
    answerField.style.animation = "bounce 0.6s ease";

    // Update Abacus after the answer appears
    setTimeout(() => {
      updateAbacus(Math.abs(Math.floor(result)));
    }, 300); // Small delay to let the answer appear first

    changeBackgroundBasedOnResult(result);

    setTimeout(() => {
      answerField.style.animation = "";
    }, 600);
  }
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".operator")
      .forEach((op) => op.classList.remove("active"));

    button.classList.add("active");

    button.style.transform = "scale(1.2)";
    setTimeout(() => {
      button.style.transform = "";
    }, 150);
  });
});

document.getElementById("color").addEventListener("input", function (e) {
  document.body.style.backgroundColor = e.target.value;
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

  document.body.style.backgroundColor = "#FFB6C1";
  document.getElementById("color").value = "#FFB6C1";

  const calculator = document.querySelector(".calculator");
  calculator.style.animation = "pulse 0.3s ease";
  setTimeout(() => {
    calculator.style.animation = "";
  }, 300);
});

function showError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  errorMessage.classList.add("shake");

  setTimeout(() => {
    errorMessage.classList.remove("shake");
  }, 500);
}

function initializeAbacus() {
  resetAbacus();
}

function resetAbacus() {
  const abacus = document.getElementById("abacus");
  abacus.innerHTML = "";

  for (let i = 0; i < 100; i++) {
    const bead = document.createElement("div");
    bead.classList.add("bead", "inactive");
    bead.setAttribute("data-value", i + 1);

    bead.addEventListener("click", function () {
      this.style.animation = "bounce 0.3s ease";
      setTimeout(() => {
        this.style.animation = "";
      }, 300);
    });

    abacus.appendChild(bead);
  }
}

function updateAbacus(result) {
  const beads = document.querySelectorAll(".bead");
  const abacusTitle = document.querySelector(".abacus-section .abacus-title");

  // Remove the "online-green" class when updating the abacus
  abacusTitle.classList.remove("online-green");

  beads.forEach((bead, index) => {
    setTimeout(() => {
      if (index < result && result <= 100) {
        bead.classList.remove("inactive");
        bead.classList.add("active");
      } else {
        bead.classList.remove("active");
        bead.classList.add("inactive");
      }
    }, index * 50);
  });

  if (result > 100) {
    setTimeout(() => {
      const originalText = abacusTitle.textContent;
      abacusTitle.textContent = `Wow! ${result} is bigger than our abacus!`;
      abacusTitle.style.color = "white"; // Keep white fill
      abacusTitle.style.webkitTextStrokeColor = "#ff6b35"; // Change stroke to orange
      abacusTitle.style.textStrokeColor = "#ff6b35"; // Fallback

      setTimeout(() => {
        abacusTitle.textContent = originalText;
        abacusTitle.style.webkitTextStrokeColor = "orange"; // Revert stroke to orange
        abacusTitle.style.textStrokeColor = "orange"; // Fallback
      }, 3000);
    }, 1000);
  }
}

function changeBackgroundBasedOnResult(result) {
  const colors = [
    "#FFB6C1", // Light Pink (default)
    "#98FB98", // Pale Green
    "#87CEEB", // Sky Blue
    "#DDA0DD", // Plum
    "#F0E68C", // Khaki
    "#FFA07A", // Light Salmon
    "#20B2AA", // Light Sea Green
    "#FFE4B5", // Moccasin
    "#D3D3D3", // Light Gray
    "#F5DEB3", // Wheat
  ];

  const colorIndex = Math.abs(result) % colors.length;
  const selectedColor = colors[colorIndex];

  document.body.style.backgroundColor = selectedColor;
  document.getElementById("color").value = selectedColor;
}

function initializeBackgroundColorChanger() {
  const colors = [
    "#FFB6C1", // Light Pink
    "#98FB98", // Pale Green
    "#87CEEB", // Sky Blue
    "#DDA0DD", // Plum
    "#F0E68C", // Khaki
    "#FFA07A", // Light Salmon
    "#20B2AA", // Light Sea Green
    "#FFE4B5", // Moccasin
    "#F5DEB3", // Wheat
  ];

  let colorIndex = 0;

  setInterval(() => {
    if (document.getElementById("answer").value === "") {
      colorIndex = (colorIndex + 1) % colors.length;
      document.body.style.backgroundColor = colors[colorIndex];
      document.getElementById("color").value = colors[colorIndex];
    }
  }, 10000);
}

// Removed addSparkleEffect function and related createSparkle and sparkleFloat keyframes.

const generalStyles = document.createElement("style");
generalStyles.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(generalStyles);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.getElementById("calculate-btn").click();
  } else if (e.key === "Escape") {
    document.getElementById("clear-btn").click();
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    const operatorMap = {
      "+": "plus",
      "-": "minus",
      "*": "multiply",
      "/": "divide",
    };
    const operatorId = operatorMap[e.key];
    if (operatorId) {
      document.getElementById(operatorId).click();
    }
  }
});

document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", function () {
    if (this.value > 99) {
      this.value = 99;
      showError("Numbers must be between 0 and 99!");
    } else if (this.value < 0) {
      this.value = 0;
    }
  });
});
