// function searchWeather(searchTerm) {
//     fetch(`http://api.weatherapi.com/v1/forecast.json?key=3ea9677e497c4c4484a92657231311&q=${searchTerm}&days=3&aqi=yes&alerts=yes
//     `)
//     .then(function(response) {
//         return response.json()
//     })
//     .then(function(response) {

//     })
// }

// searchWeather(London);

async function getLocationName(searchTerm) {
    const location = document.querySelector('.location');

    const locationName = await getData(searchTerm);
    location.textContent = `${locationName.location.name}, ${locationName.location.country}`;
}


async function getData(searchTerm) {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3ea9677e497c4c4484a92657231311&q=${searchTerm}&days=3&aqi=yes&alerts=yes`)
    const data = await response.json();
    return data;
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

getLocationName('tokyo');
test();