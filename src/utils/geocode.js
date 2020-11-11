const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm94MTIzIiwiYSI6ImNrZ3J5OHVteTBqc3MycXF3MXYweWE1b2YifQ.cHUqou6MPV_v5y59ASuEWA&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to location services!', undefined )
        } else if (body.message) {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, {
               
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].text
            })
        }

    })
}

const forecast = (address, callback) => {



    const parsedurl = 'https://www.metaweather.com/api/location/search/?query=' + encodeURIComponent(address)

    // nested request function being used here so as to take address from the function in 'app.js' and converting 
    // it into woeid and using that woeid to find the weather conditions of that particular place

    request({url: parsedurl, json: true }, (error, response) => {

        
        const url = 'https://www.metaweather.com/api/location/' + response.body[0].woeid + '/'

    request({ url, json: true }, (error, { body }) => {             // using shorthand index for url in request function

    if (error) {
        callback('Unable to connect to weather services!', undefined)
    } else if (body.detail)   // or response.body.error
        callback("Unable to find location!", undefined)
    else {

         //console.log(response.body.consolidated_weather[0])
    callback(undefined, body.consolidated_weather[0].weather_state_name + 'It is currently ' + body.consolidated_weather[0].the_temp + ' out there. There is ' + body.consolidated_weather[0].humidity + '% humidity in ')
    
    }
   
}) 

    })
    

}
module.exports = {
    geocode: geocode,
    forecast: forecast
}