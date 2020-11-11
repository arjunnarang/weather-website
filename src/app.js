const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

//console.log(__dirname)
   



const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')   // path is a core node module used to shift directories
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')       //handlebars setting up with express
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)         // it takes path where partials exist



// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arjun'
    })            // render allows us to use one of handlebars template

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Arjun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Arjun'
    })
})
// app.get('', (req, res) => {      // this helps us configure what server should do when
//                                       // someone tries to access the url
    
//     res.send('<h1>Weather</h1>')
// })          

// app.get('/help', (req, res) => {      
    

// res.send([{                        // express will detect an object has been passed and it will
//                                    // stringify the object for us
//     name: 'Arjun'
// }, {
//     name: 'Sarah'
//    }])                   
// })     

// app.get('/about', (req, res) => {      
    

//     res.send('<h1>About page</h1>')
//     })     

app.get('/weather', (req, res) => {   
    if ( !req.query.address)   {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode.geocode(req.query.address, (error, { location } = {}) => {         // setting up default value for object destucturing

        if (error) {
            return res.send({
                error: 'You must provide right address'
            })
        }
    
         geocode.forecast(location, (error, forecastData) => {
             if(error) {
                 return res.send({
                    error: 'You must provide right location'
                })
             }
             res.send({location: location,
             error: error,
             data: forecastData,
             address: req.query.address
             })
            
    })
    
    
         
          
    })
    

    // res.send({
    //     forecast: 'forecast',
    //     weather: 'weather',
    //     address: req.query.address
    // })
    })  
    
// app.get('/products', (req, res) => {
//     if( !req.query.search) {                      // req.query contains the queries, provided to the url in the browser, in json object form
//         return res.send({                 
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })

// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arjun',
        error: 'help'
    

})
})

app.get('*', (req, res) => {               // this route is set up in the last because whenever express gets a request
                                           // it will look for the match in above routes and as soons as it finds the match,
                                           // it will stop searching for matches
        res.render('404', {
            title: '404',
            name: 'Arjun',
            error: ''
        })

    })


app.listen(3000, () => {
    console.log('Server is us on port 3000')
})