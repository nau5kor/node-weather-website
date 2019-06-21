const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//Set the port instead of 3000 to what heroku. For locally we || 3000
const port = process.env.PORT || 3000

//Define path for expres
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Start the template handlebars engine
app.set('view engine', 'hbs')

//Provide template views path which we want to use.
app.set('views', viewPath)

//Register partials with HBS. Partials are templates which are used to keep consitency in web pages display
hbs.registerPartials(partialsPath)

//Setup static directory 
app.use(express.static(publicDirPath))
//render using the hbs file instead of index.html
app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ganesh Nayak'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ganesh Nayak'
    })
})

app.get('/products',(req, res)=>{

    if(!req.query.search){
        //Doing return stops the execution
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })

})

// app.get('/weather',(req,res)=>{
//     if(!req.query.address){
//         return res.send({
//             error:'address is required'
//         })
//     }
//     res.send({
//         address:req.query.address
//     })
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'address is required'
        })
    }
    geocode(req.query.address,(gerror,gres)=>{
        if (!gerror){
            console.log('Inside Geocode')
            forecast(gres.latitude,gres.longitude,(ferror,fres)=>{
                if(!ferror){
                    console.log('Inside Forecast')
                    console.log(fres)
                    res.send({
                        summary:fres.summary,
                        temparature:fres.temparature,
                        location:req.query.address
                    })
                }else{
                    res.send(ferror)
                }
            })
        }else{
            res.send(gerror)
        }
    })
})


app.get('/help',(req, res)=>{
    res.render('help',{
        message:'I am here to help',
        title:'help',
        name:'Ganesh Nayak'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404 Error',
        error:'Help article not found',
        name:'Ganesh Nayak'
    })
})

//* says match anything not used above so all other routes will be bad URL
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        error:'404 web page not found',
        name:'Ganesh Nayak'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port'+port)
})