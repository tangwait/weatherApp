async function searchLocation() {
    const button = document.querySelector('.searchButton');
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const searchTerm = document.querySelector('#search').value;

        const locationNameData = await getData(searchTerm);
        if (locationNameData) {
            const location = document.querySelector('.location');
            location.textContent = `${locationNameData.location.name}, ${locationNameData.location.country}`;
        } else {
            return "No search term provided"
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
        return "No search term provided"
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

searchLocation();
initial('tokyo');
test();