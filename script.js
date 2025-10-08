window.addEventListener("DOMContentLoaded", () => { 
  const overallLevelEl = document.getElementById("overallLevel");

  // Array of quiz levels with multipliers and keys matching data-key in HTML
  const quizData = [
    { key: "monthsSlevel", multiplier: 0.3 },
    { key: "EventSlevel", multiplier: 0.3 },
    { key: "FamilySlevel", multiplier: 0.3 },
    { key: "CharacterSlevel", multiplier: 0.3 },
    { key: "oppositeSlevel", multiplier: 0.3 },
    { key: "monthsMlevel", multiplier: 0.5 },
    { key: "eventsMlevel", multiplier: 0.5 },
    { key: "FamilyMlevel", multiplier: 0.5 },
    { key: "CharacterMlevel", multiplier: 0.5 },
    { key: "oppositeMlevel", multiplier: 0.5 },
      ];

  // Calculate weighted overall level
  const overallLevel = quizData.reduce((sum, { key, multiplier }) => {
    const value = parseInt(localStorage.getItem(key)) || 0;
    return sum + value * multiplier;
  }, 0);

  // Display overall level or fallback message
  overallLevelEl.textContent =
    overallLevel > 0
      ? `Overall Level: ${overallLevel.toFixed(0)}`
      : "Overall Level: No data yet.";

  // Update each span with class "levelValue" using the data-key attribute
  document.querySelectorAll(".levelValue").forEach((span) => {
    const key = span.getAttribute("data-key");
    const levelValue = parseInt(localStorage.getItem(key)) || 0;
    span.textContent = `(Level: ${levelValue})`;
  });
});
