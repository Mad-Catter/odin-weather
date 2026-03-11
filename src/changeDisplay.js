const location = document.querySelector('#location');
const icon = document.querySelector('#icon');
const currentTemp = document.querySelector('.current');
const tempMax = document.querySelector('.max');
const tempMin = document.querySelector('.min');
const desc = document.querySelector('.desc');

function changeDisplay(data) {
  // Need to change the first letter to be capped
  location.textContent = data.location;
  // icon.src = ????
  currentTemp.textContent = data.temp;
  tempMax.textContent = data.tempMax;
  tempMin.textContent = data.tempMin;
  desc.textContent = data.desc;

  // GIPHY BACKGROUND CHANGE HERE
}

export default changeDisplay;
