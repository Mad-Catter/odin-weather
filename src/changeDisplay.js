import fog from './backgrounds/fog.gif';
import sun from './backgrounds/sun.gif';
import moon from './backgrounds/moon.gif';
import weather from './backgrounds/weather.gif';
import rain from './backgrounds/rain.gif';
import snow from './backgrounds/snow.gif';
import thunder from './backgrounds/thunder.gif';
import wind from './backgrounds/wind.gif';
import { giphyKey } from './key.js';

const location = document.querySelector('#location');
const icon = document.querySelector('#icon');
const currentTemp = document.querySelector('.current');
const tempMax = document.querySelector('.max');
const tempMin = document.querySelector('.min');
const desc = document.querySelector('.desc');

async function changeDisplay(data) {
  const svg = await import(`./weather-icons/${data.icon}.svg`);
  icon.src = svg.default;
  icon.alt = data.icon;
  // The regex capitalizes the start of each word so something like: burkina faso becomes Burkina Faso
  location.textContent = data.location.replace(/(^|\s)\S/g, (match) => match.toUpperCase());

  currentTemp.textContent = data.temp;
  tempMax.textContent = data.tempMax;
  tempMin.textContent = data.tempMin;
  desc.textContent = data.desc;
  getBackground(data.icon);
}
async function getBackground(icon) {
  // This function takes the icon given from data and then searches Giphy for a related background to use.
  //   If there is an error, a preselected gif will be used as a background instead
  let search;
  let image;
  const body = document.querySelector('body');
  if (icon.includes('snow') || icon.includes('hail') || icon.includes('sleet')) {
    search = 'snow';
  } else if (icon.includes('rain') || icon.includes('showers')) {
    search = 'rain';
  } else if (icon.includes('thunder')) {
    search = 'thunder';
  } else if (icon.includes('cloud')) {
    search = 'cloud';
  } else if (icon.includes('wind')) {
    search = 'wind';
  } else if (icon.includes('fog')) {
    search = 'fog';
  } else if (icon.includes('day')) {
    search = 'sun';
  } else if (icon.includes('night')) {
    search = 'moon';
  } else {
    search = 'weather';
  }
  try {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${search}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response);
    }
    const responseJSON = await response.json();
    image = responseJSON.data.images.original.url;
  } catch (error) {
    console.log(error);
    const backgrounds = {
      fog,
      sun,
      moon,
      weather,
      rain,
      snow,
      thunder,
      wind,
    };

    image = backgrounds[search];
  }
  body.style.backgroundImage = `url("${image}")`;
}

export default changeDisplay;
