// Initialize the calculator when the page loads
document.addEventListener("DOMContentLoaded", function () {
  initializeAbacus();
  addSparkleEffect();
  initializeBackgroundColorChanger();
});

// Calculate button functionality
document.getElementById("calculate-btn").addEventListener("click", function () {
  const firstNum = parseInt(document.getElementById("first-number").value);
  const secondNum = parseInt(document.getElementById("second-number").value);
  const operator = document.querySelector(".operator.active");
  const errorMessage = document.getElementById("error-message");
  const answerField = document.getElementById("answer");

  // Clear previous error states
  errorMessage.style.display = "none";
  document.querySelector(".operator-buttons").classList.remove("shake");

  // Validate inputs
  if (isNaN(firstNum) || isNaN(secondNum)) {
    showError("🤔 Please enter both numbers!");
    return;
  }

  if (!operator) {
    showError("🤔 Oops! Please pick an operation (+, -, ×, ÷)");
    document.querySelector(".operator-buttons").classList.add("shake");
    return;
  }

  let result;
  let isValidResult = true;

  // Perform calculation based on selected operator
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
        showError("🚫 Oops! Can't divide by zero!");
        isValidResult = false;
      } else {
        result = Math.round((firstNum / secondNum) * 100) / 100; // Round to 2 decimal places
      }
      break;
  }

  if (isValidResult) {
    // Display result with animation
    answerField.value = `🎉 ${result} 🎉`;
    answerField.style.animation = "bounce 0.6s ease";

    // Update abacus visualization
    updateAbacus(Math.abs(Math.floor(result))); // Use absolute value and floor for abacus

    // Change background color based on result
    changeBackgroundBasedOnResult(result);

    // Add success feedback
    setTimeout(() => {
      answerField.style.animation = "";
    }, 600);
  }
});

// Operator button selection
document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all operators
    document
      .querySelectorAll(".operator")
      .forEach((op) => op.classList.remove("active"));

    // Add active class to clicked operator
    button.classList.add("active");

    // Add click effect
    button.style.transform = "scale(1.2)";
    setTimeout(() => {
      button.style.transform = "";
    }, 150);
  });
});

// Color picker functionality
document.getElementById("color").addEventListener("input", function (e) {
  document.body.style.backgroundColor = e.target.value;
});

// Clear button functionality
document.getElementById("clear-btn").addEventListener("click", function () {
  // Clear all inputs
  document.getElementById("first-number").value = "";
  document.getElementById("second-number").value = "";
  document.getElementById("answer").value = "";
  document.getElementById("error-message").style.display = "none";

  // Reset operator selection
  document
    .querySelectorAll(".operator")
    .forEach((op) => op.classList.remove("active"));
  document.querySelector(".operator-buttons").classList.remove("shake");

  // Reset abacus
  resetAbacus();

  // Reset background to default
  document.body.style.backgroundColor = "#FFB6C1";
  document.getElementById("color").value = "#FFB6C1";

  // Add clear animation
  const calculator = document.querySelector(".calculator");
  calculator.style.animation = "pulse 0.3s ease";
  setTimeout(() => {
    calculator.style.animation = "";
  }, 300);
});

// Show error message function
function showError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  errorMessage.classList.add("shake");

  setTimeout(() => {
    errorMessage.classList.remove("shake");
  }, 500);
}

// Initialize abacus with empty state
function initializeAbacus() {
  resetAbacus();
}

// Reset abacus to empty state
function resetAbacus() {
  const abacus = document.getElementById("abacus");
  abacus.innerHTML = "";

  // Create 100 beads (10x10 grid) for numbers up to 100
  for (let i = 0; i < 100; i++) {
    const bead = document.createElement("div");
    bead.classList.add("bead", "inactive");
    bead.setAttribute("data-value", i + 1);

    // Add click interaction for fun
    bead.addEventListener("click", function () {
      this.style.animation = "bounce 0.3s ease";
      setTimeout(() => {
        this.style.animation = "";
      }, 300);
    });

    abacus.appendChild(bead);
  }
}

// Update abacus based on calculation result
function updateAbacus(result) {
  const beads = document.querySelectorAll(".bead");

  // Animate beads sequentially
  beads.forEach((bead, index) => {
    setTimeout(() => {
      if (index < result && result <= 100) {
        bead.classList.remove("inactive");
        bead.classList.add("active");
      } else {
        bead.classList.remove("active");
        bead.classList.add("inactive");
      }
    }, index * 50); // Stagger animation
  });

  // Show result summary
  if (result > 100) {
    setTimeout(() => {
      const abacusSection = document.querySelector(".abacus-section h3");
      const originalText = abacusSection.textContent;
      abacusSection.textContent = `🎊 Wow! ${result} is bigger than our abacus! 🎊`;
      abacusSection.style.color = "#ff6b35";

      setTimeout(() => {
        abacusSection.textContent = originalText;
        abacusSection.style.color = "";
      }, 3000);
    }, 1000);
  }
}

// Change background color based on calculation result
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

  // Use result to determine color (cycle through colors)
  const colorIndex = Math.abs(result) % colors.length;
  const selectedColor = colors[colorIndex];

  document.body.style.backgroundColor = selectedColor;
  document.getElementById("color").value = selectedColor;
}

// Initialize automatic background color changer
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

  // Change background color every 10 seconds
  setInterval(() => {
    // Only change if no calculation has been made recently
    if (document.getElementById("answer").value === "") {
      colorIndex = (colorIndex + 1) % colors.length;
      document.body.style.backgroundColor = colors[colorIndex];
      document.getElementById("color").value = colors[colorIndex];
    }
  }, 10000);
}

// Add sparkle effect for fun
function addSparkleEffect() {
  const body = document.body;

  setInterval(() => {
    if (Math.random() > 0.8) {
      createSparkle();
    }
  }, 2000);
}

// Create sparkle animation
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.innerHTML = "✨";
  sparkle.style.position = "fixed";
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";
  sparkle.style.fontSize = Math.random() * 20 + 10 + "px";
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "1000";
  sparkle.style.animation = "sparkleFloat 3s ease-out forwards";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 3000);
}

// Add sparkle animation keyframes dynamically
const sparkleStyles = document.createElement("style");
sparkleStyles.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-50px) rotate(180deg) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg) scale(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(sparkleStyles);

// Add keyboard support for better accessibility
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

// Add number input validation
document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", function () {
    if (this.value > 99) {
      this.value = 99;
      showError("🔢 Numbers must be between 0 and 99!");
    } else if (this.value < 0) {
      this.value = 0;
    }
  });
});
