const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.city;
    const unit = "metric";
    const apiKey = "22e10da41f029338a2676f10180fd15a"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function (response) {
        response.on("data", function (data) {
            let weatherData = JSON.parse(data);

            let temp = weatherData.main.temp;
            let weatherDescription = weatherData.weather[0].description;

            res.write("<p>The weather is currently "+ weatherDescription+"</p>")
            res.write("<h1>The current temperature of "+query+" city is "+temp+" degrees celcius</h1>")
            res.send();
           
        })
    })
})

app.listen(3000, function () {
    console.log("Your server is runnig at port 3000");

})



// const express = require("express");
// const https = require("https")
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.urlencoded({extended: true}));

// app.get("/" , function(req, res) {
//     res.sendFile(__dirname + "/index.html");
// })

// app.post("/", function(req, res) {
//     const query = req.body.city;
//     const unit = "metric";
//     const apiKey = "22e10da41f029338a2676f10180fd15a"
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

//     https.get(url , function (response){
//         response.on("data" , function(data) {
//             let weatherData= JSON.parse(data);

//             let temp = weatherData.main.temp;
//             let weatherDescription = weatherData.weather[0].description;

//             res.write("<p>The weather is currently "+ weatherDescription+"</p>")
//             res.write("<h1>The current temperature of "+query+" city is "+temp+" degrees celcius</h1>")
//             res.send();
//             console.log(weatherData)
//         })
//     })
// })

// app.listen(3000 , function(){
//     console.log("Your server is running at port 3000");
// })