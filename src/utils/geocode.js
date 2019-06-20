const request = require('request')
const geoCode =(address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmF5YWsyIiwiYSI6ImNqd3M4NWZnZDAxMmI0OXM1dnoyeWhzYnkifQ.6uvJ9z0pu0yQlNz_a06UAQ&limit=1'
    request({ url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location Service', undefined)
        }else if(!body.features) {
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode