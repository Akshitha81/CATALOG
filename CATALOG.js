const fs = require("fs");

// Read JSON input from file
const jsonInput = fs.readFileSync("input.json", "utf8");

function baseToDecimal(valueStr, base) {
  return BigInt(parseInt(valueStr, base));
}

function computeConstantTerm(pointsArray) {
  let constantTerm = BigInt(0);

  for (let i = 0; i < pointsArray.length; i++) {
    let term = pointsArray[i].yValue;
    let denominator = BigInt(1);

    for (let j = 0; j < pointsArray.length; j++) {
      if (j !== i) {
        term *= BigInt(-pointsArray[j].xValue);
        denominator *= BigInt(pointsArray[i].xValue - pointsArray[j].xValue);
      }
    }

    constantTerm += term / denominator;
  }

  return constantTerm;
}

// Parse JSON input
const jsonData = JSON.parse(jsonInput);

// Extract points
const pointsArray = [];
for (const id in jsonData) {
  if (id !== "keys") {
    const base = parseInt(jsonData[id].base, 10);
    const valueStr = jsonData[id].value;
    const yValue = baseToDecimal(valueStr, base);
    const xValue = parseInt(id, 10);
    pointsArray.push({ xValue, yValue });
  }
}

// Calculate the constant term
const constantTerm = computeConstantTerm(pointsArray);

// Output the constant term
console.log(`Constant term (coefficient of x^0): ${constantTerm.toString()}`);
