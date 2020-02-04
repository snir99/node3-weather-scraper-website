const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const status = document.querySelector('#data-status');
const place = document.querySelector('#data-location');
const image = document.querySelector('#img-data');
const temperature = document.querySelector('#data-temperature');
const humidity = document.querySelector('#data-humidity');
const windspead = document.querySelector('#data-wind');

weatherForm.addEventListener('submit', (e) => {
    
    // Preventing the page to reload itself every time we press the search button.
    // That way we can see the result of our search.
    e.preventDefault();

    // The value of input form.
    const address  = search.value;

    status.textContent = "Loading...";
    place.textContent = "";
    image.src = "";
    temperature.textContent = "TBA";
    humidity.textContent = "TBA";
    windspead.textContent = "TBA";

    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                place.textContent = data.error;
            } else {
                status.textContent = "Overcast";
                place.textContent = data.location;
                image.src = data.image;
                temperature.textContent = data.temperature + 'C';
                humidity.textContent = data.humidity;
                windspead.textContent = data.windspead;
            }
        });
    });
});