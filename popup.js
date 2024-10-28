function updateNetworkSpeed() {
  chrome.storage.local.get("speed", ({ speed }) => {
    document.getElementById("speed").innerText = speed || "Calculating...";
  });
}

setInterval(updateNetworkSpeed, 1000);

fetch("http://ip-api.com/json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("ip").innerText = data.query;
    document.getElementById("location").innerText = `${data.city}, ${data.country}`;
    document.getElementById("details").innerText = `Lat: ${data.lat}, Lon: ${data.lon}`;
  })
  .catch(error => {
    document.getElementById("ip").innerText = "Unable to fetch IP";
    document.getElementById("location").innerText = "Location unavailable";
    document.getElementById("details").innerText = "";
  });

// Close button functionality
document.getElementById("close-btn").addEventListener("click", () => {
  window.close();
});
