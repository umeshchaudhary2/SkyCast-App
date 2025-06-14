document.getElementById("searchBtn").addEventListener("click", async () => {
  const location = document.getElementById("locationInput").value.trim();
  if (!location) return;

  const apiKey = "36b359508a1e4ac08b555127250906";
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.error) {
      alert("Location not found!");
      return;
    }

    document.getElementById("mainWeather").classList.remove("hidden");
    document.getElementById("cityName").textContent = data.location.name;
    document.getElementById("temp").textContent = data.current.temp_c;
    document.getElementById("condition").textContent = data.current.condition.text;
    document.getElementById("humidity").textContent = data.current.humidity;
    document.getElementById("wind").textContent = data.current.wind_kph;

    const condition = data.current.condition.text.toLowerCase();
    let icon = "🌤️";
    if (condition.includes("rain")) icon = "🌧️";
    else if (condition.includes("cloud")) icon = "☁️";
    else if (condition.includes("sun")) icon = "☀️";
    else if (condition.includes("thunder")) icon = "⛈️";

    document.getElementById("iconWeather").textContent = icon;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    });
    document.getElementById("date").textContent = formattedDate;

  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Something went wrong!");
  }
});
