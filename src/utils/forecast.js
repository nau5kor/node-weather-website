const request = require('request')
// const url1 = 'https://api.darksky.net/forecast/303462572633660746c57f1df2ff0108/37.8267,-122.4233'
// const url = 'https://api.darksky.net/forecast/303462572633660746c57f1df2ff0108/'+ latitude+','+ longitide

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/303462572633660746c57f1df2ff0108/'+ latitude+','+ longitude
    request({url,json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to forecast service',undefined)
        }else if(body.error){
            callback('Invalid location',undefined)
        }else{
            callback(undefined,{
                summary:body.currently.summary,
                temparature: body.currently.temperature,
                forecast: body.daily.summary
            })
        }

    })
}
module.exports = forecast