import './style.css'

// src/main.js
import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  const timeframeButtons = document.querySelectorAll("button");
  const cards = document.querySelectorAll("section[class^='bg-card']");

  const periodMap = {
    "Daily": "daily",
    "Weekly": "weekly",
    "Monthly": "monthly"
  };

  const periodLabel = {
    daily: "Day",
    weekly: "Week",
    monthly: "Month"
  };

  function updateDashboard(period) {
    fetch("data.json")
      .then(res => {
        if (!res.ok) throw new Error("data.json not found");
        return res.json();
      })
      .then(data => {
        cards.forEach((card, i) => {
          const { current, previous } = data[i].timeframes[period];
          const currentEl = card.querySelector(".current-hrs");
          const prevEl = card.querySelector(".prev-hrs");

          if (currentEl) currentEl.textContent = `${current}hrs`;
          if (prevEl) prevEl.textContent = `Last ${periodLabel[period]} - ${previous}hrs`;
        });
      })
      .catch(err => {
        console.error("Error loading data:", err);
        alert("data.json not found! Make sure it's in the same folder as index.html");
      });
  }

  timeframeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.textContent.trim();
      const period = periodMap[text];

      // Reset all
      timeframeButtons.forEach(b => {
        b.classList.remove("text-white", "font-medium");
        b.classList.add("text-text-2");
      });

      // Activate clicked
      btn.classList.remove("text-text-2");
      btn.classList.add("text-white", "font-medium");

      updateDashboard(period);
    });
  });

  // Initial load — Weekly
  updateDashboard("weekly");
});