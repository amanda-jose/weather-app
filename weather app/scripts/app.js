const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    
    // before destructuring 
    // const cityDetails = data.cityDetails
    // const weather = data.weather

    //destructure properties

    const {cityDetails, weather} = data;

    // update the details template
    details.innerHTML= ` 
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `   // .details is the parent element


    // update the night/day and icon images 
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)

    // let timeSrc = null
    // if (weather.IsDayTime) {
    //     timeSrc = 'img/day.svg'
    // } else {
    //     timeSrc = 'img/night.svg'
    // }
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    time.setAttribute('src', timeSrc)

    //remove d-none class if present 
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }

}

const updateCity = async (city) => {

    const cityDetails = await getCity(city)
    const weather = await getWeather(cityDetails.Key)

    return {
        cityDetails: cityDetails,
        weather: weather
    }
}


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value from user input
    const city = cityForm.city.value.trim()
    cityForm.reset()

    // update ui with the new city from the updateCity function 
    updateCity(city)
    .then(data => updateUI(data)) // the data here is the returned object with citydetails and the weather
    .catch(err => console.log(err))

})