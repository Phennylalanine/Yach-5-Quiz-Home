window.addEventListener("DOMContentLoaded", () => {
  const overallLevelEl = document.getElementById("overallLevel");
  const levelsListEl = document.getElementById("levelsList");

  // Array of quiz levels with their specific multipliers and display names
  const quizData = [
    { key: "monthsSlevel", multiplier: 0.7, name: "Level 1 Months" },
    { key: "EventSlevel", multiplier: 0.7, name: "Level 1 Activities" },
    { key: "monthsMlevel", multiplier: 1.2, name: "Level 2 Months" },
    { key: "eventsMlevel", multiplier: 1.2, name: "Level 2 Activities" },
  ];

  // Calculate the weighted overall level
  const overallLevel = quizData.reduce((sum, { key, multiplier }) => {
    const value = parseInt(localStorage.getItem(key)) || 0;
    return sum + value * multiplier;
  }, 0);

  // Display the overall level (rounded to the nearest whole number)
  overallLevelEl.textContent =
    overallLevel > 0
      ? `Overall Level: ${overallLevel.toFixed(0)}`
      : "Overall Level: No data yet.";

  // Clear any existing content in levels list
  if (levelsListEl) {
    levelsListEl.innerHTML = "";

    // Create and append a list item for each quiz level
    quizData.forEach(({ key, name }) => {
      const levelValue = parseInt(localStorage.getItem(key)) || 0;
      const li = document.createElement("li");
      li.textContent = `${name}: ${levelValue}`;
      levelsListEl.appendChild(li);
    });
  }
});
