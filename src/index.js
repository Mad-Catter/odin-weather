import key from './key.js';
import changeDisplay from './changeDisplay.js';
import './style.css';
async function getWeather(location) {
  async function getWeather(location) {
    const link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}${key}`;
    let response;
    try {
      response = await fetch(link);
    } catch (error) {
      console.log(error);
    }
    if (!response.ok) {
      const text = await response.text();
      console.log(text);
      throw new Error(`Error: ${response.status}.  Message: ${text}`);
    }
    const json = await response.json();
    console.log(json);
    const data = {
      location: json.address,
      icon: json.currentConditions.icon,
      temp: json.currentConditions.temp,
      tempMax: json.days[0].tempmax,
      tempMin: json.days[0].tempmin,
      desc: json.description,
    };
    console.log(data);
    return data;
  }
  return getWeather(location).catch((error) => {
    console.log(error);
  });
}
const defaultLocation = 'belchertown';

// getWeather(defaultLocation);
getWeather(defaultLocation).catch((error) => {
  console.log('weee');
  console.log(error);
});
const button = document.querySelector('button');
const search = document.querySelector('#search');
button.addEventListener('click', async (e) => {
  let data = await getWeather(search.value);
  changeDisplay(data);
});
// Function to take a location and get data from the api.
// Need to have an error handling for both if the user inputs nonsense or if the api is somehow broken.
// After the json is retrieved.  Need a function that takes the Current temp, max and min temps of the day(day 0), the short description, current weather, and icon
// This info is handed off into a new module for displaying the info.
// The display module will display the current temps in bold white with a transparent background for visibility.  The entire page will have a background for these weathers:
// Clear, rain, cloudy, thunder, snow, windy???
