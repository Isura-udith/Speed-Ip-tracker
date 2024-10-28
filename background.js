let lastTime = Date.now();
let lastData = 0;

function calculateNetworkSpeed() {
  const now = Date.now();
  
  // Use navigator.connection.downlink if available
  if (navigator.connection && navigator.connection.downlink) {
    const speedMbps = navigator.connection.downlink;
    chrome.storage.local.set({ speed: speedMbps.toFixed(2) + " Mbps" });
  } else {
    const currentData = performance.getEntriesByType("resource")
      .map(entry => entry.transferSize)
      .reduce((a, b) => a + b, 0);

    const timeDiff = (now - lastTime) / 1000;
    const dataDiff = (currentData - lastData) / (1024 * 1024);
    
    lastTime = now;
    lastData = currentData;
    
    const speedMbps = (dataDiff / timeDiff) * 8;
    chrome.storage.local.set({ speed: speedMbps.toFixed(2) + " Mbps" });
  }
}

setInterval(calculateNetworkSpeed, 1000);  // Every second for real-time speed
