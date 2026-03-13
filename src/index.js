import { weatherKey } from './key.js';
import changeDisplay from './changeDisplay.js';
import './style.css';

const dialog = document.querySelector('#error');

async function getWeather(location) {
  // This function is wrapped in another function so that an error handler can be attached to it once, instead of needing to have .catch attached each call.
  async function catchlessGetWeather(location) {
    const link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}${weatherKey}`;
    let response;
    try {
      const now = new Date();
      response = await fetch(link);
      console.log(`Visual Crossing request took: ${(new Date() - now) / 1000} seconds`);
    } catch (error) {
      console.log(error);
    }
    if (!response.ok) {
      const text = await response.text();
      console.log(text);
      throw new Error(text);
    }
    const json = await response.json();
    const data = {
      location: json.address,
      icon: json.currentConditions.icon,
      temp: json.currentConditions.temp,
      tempMax: json.days[0].tempmax,
      tempMin: json.days[0].tempmin,
      desc: json.description,
    };
    return data;
  }
  return catchlessGetWeather(location).catch((error) => {
    dialog.textContent = error.message;
    dialog.show();
    return 'stop';
  });
}

const button = document.querySelector('button');
const search = document.querySelector('#search');
button.addEventListener('click', async () => {
  let data = await getWeather(search.value);
  if (data !== 'stop') await changeDisplay(data);
});
search.addEventListener('keyup', async (e) => {
  dialog.close();
  if (e.key === 'Enter') {
    let data = await getWeather(search.value);
    if (data !== 'stop') await changeDisplay(data);
  }
});
document.querySelector('body').addEventListener('click', () => {
  dialog.close();
});

const firstRun = await getWeather('ouagadougou');
changeDisplay(firstRun);
