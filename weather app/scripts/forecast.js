const key = 'sJZGXh0FbGfqiJW6ZAZoSJHuuqOODjJY'

const getWeather = async (locationKey) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${locationKey}?apikey=${key}`
    // locationId is technically not a query parameter but better to not hardcode it in the base
    // because it can change  

    const response = await fetch(base + query)
    const data = await response.json()

    return data[0]
    // even though it's only one object in the array, have to put [0] to return just the object
    // and not the array itself
}

const getCity = async (city) => {
    
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`
    // ? means adding parameters to the end of the base url 
    // & means adding the next query parameter
    // apiKey= and q= required query parameters that need filling in 

    const response = await fetch(base + query)
    const data = await response.json()

    return data[0]
    // closests match to the city you want since the data returns a list of multiple city objects
    // when you're only just looking for 1 city.
    // so [0] to get the first data object found.
};

// getCity('manchester')
//     .then(data => {
//         return getWeather(data.Key) // getCity gets the key code we need to pass into getWtaher
//     })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => console.log(err))

