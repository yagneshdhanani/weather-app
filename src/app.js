const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Defines path for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Yagnesh Dhanani"
    });
});

app.get("/about", (req, res) => {
    res.render("about",{
        title: "About Me",
        name: "Yagnesh Dhanani"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Me",
        helpText: "A little help from me!",
        name: "Yagnesh Dhanani"
    })
});

app.get("/weather", (req,res) => {
    const add = req.query.address;
  
    if(!add){
        console.log(!add);
        return res.send({
            err: "You must provide address!"
        });
    }
    geocode(add, (err, {latitude, longitude, location} = {} ) => {
        if (err) {
            return res.send({ err });
        }
        
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({ err });
            }
            res.send({
                location,
                forecast: forecastData
            });
            
        });
    });
});

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Yagnesh Dhanani",
        msg: "Help article not found!"
    })
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Yagnesh Dhanani",
        msg: "My 404 page"
    })
});

app.listen(port, () => {
    console.log(`Server is up on port no ${port}`);
});