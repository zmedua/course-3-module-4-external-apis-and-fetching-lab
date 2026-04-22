// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="



function fetchWeatherAlerts(state) {
  const display = document.getElementById("alerts-display");
  const errorBox = document.getElementById("error-message");
  const input = document.getElementById("state-input");

  if (!state) {
    showError("Please enter a state abbreviation (e.g., CA for California)");
    return;
  }

  fetch(`${weatherApi}${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("API error");
      }
      return response.json();
    })
    .then(data => {
      
      errorBox.textContent = "";
      errorBox.classList.add("hidden");

      displayAlerts(data);

      input.value = "";
    })
    .catch(errorObject => {
      display.innerHTML = "";
      showError(errorObject.message); // ✅ REQUIRED

      input.value = "";
    });
}


function displayAlerts(data) {
  const display = document.getElementById("alerts-display");

  display.innerHTML = "";

  const alerts = data.features;

  const summary = document.createElement("h2");
  summary.textContent = `${data.title}: ${alerts.length}`;
  display.appendChild(summary);

  const ul = document.createElement("ul");

  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  display.appendChild(ul);
}

function showError(message) {
  const errorBox = document.getElementById("error-message");

  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

document.getElementById("fetch-alerts").addEventListener("click", () => {
  const state = document.getElementById("state-input").value.trim();
  fetchWeatherAlerts(state);
});