async function getSunsetTime(
  latitude: number,
  longitude: number
): Promise<string> {
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`
  );
  const data = await response.json();
  const sunsetTime = new Date(data.results.sunset);
  return sunsetTime.toLocaleTimeString();
}

async function displaySunsetTime(): Promise<void> {
  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
    const sunsetTime = await getSunsetTime(
      position.coords.latitude,
      position.coords.longitude
    );
    document.getElementById("sunset-time")!.textContent = sunsetTime;
  } catch (error) {
    console.error(error);
    document.getElementById("sunset-time")!.textContent = "unknown";
  }
}

displaySunsetTime();
