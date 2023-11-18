async function searchLocation() {
    const button = document.querySelector('.searchButton');
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const searchTerm = document.querySelector('#search').value;
        getForecast(searchTerm);

        const locationNameData = await getData(searchTerm);
        if (locationNameData) {
            const location = document.querySelector('.location');
            location.textContent = `${locationNameData.location.name}, ${locationNameData.location.country}`;
        } else {
            return alert("No search term provided")
        }
        console.log('this works');
    });
}

async function getData(searchTerm = '') {
    if (searchTerm.trim() !== '') {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3ea9677e497c4c4484a92657231311&q=${searchTerm}&days=3&aqi=yes&alerts=yes`);
        const data = await response.json();
        return data;
    } else {
        return null
    }
}


async function getLocationName(searchTerm) {
    const location = document.querySelector('.location');

    const locationName = await getData(searchTerm);
    location.textContent = `${locationName.location.name}, ${locationName.location.country}`;
}


function test() {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=3ea9677e497c4c4484a92657231311&q=tokyo&days=3&aqi=yes&alerts=yes`)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response)
    })
}

async function initial(searchTerm) {
    const location = document.querySelector('.location');

    const locationName = await getData(searchTerm);
    location.textContent = `${locationName.location.name}, ${locationName.location.country}`;
}

const forecastDays = [];

async function getForecast(searchTerm) {
    forecastDays.length = 0;
    const forecastData = await getData(searchTerm);

    forecastData.forecast.forecastday.forEach(forecastDay => {
        forecastDays.push(forecastDay);
    });

    console.log(forecastDays);
    updateImages();
    updateTemp();

// forecastData = getData > for each forecastDay > fill card with 
// forecastData.forecast.forecastday[0, 1, 2].condition/date/maxtemp/mintemp/humidity
}


function updateImages() {
    const cardImages = document.querySelectorAll('.card img');
    cardImages.forEach((imgElement, index) => {
        imgElement.src = 'http:' + forecastDays[index].day.condition.icon
    })
}


function updateTemp() {
    const low = document.querySelectorAll('.low');
    const high = document.querySelectorAll('.high');

    low.forEach((tempElement, index) => {
        tempElement.textContent = forecastDays[index].day.mintemp_c + "°C"
    })
    high.forEach((tempElement, index) => {
        tempElement.textContent = forecastDays[index].day.maxtemp_c + "°C"
    })
}

searchLocation();
initial('tokyo');
test();