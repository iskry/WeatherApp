// global variables
var api_key = "7ee0556fd27777e1ec83e88a645a43fd"
var increm = (localStorage.getItem('index')) ? localStorage.getItem('index'):0
var searchHistory = document.getElementById("searchHistory")
var historyContainer = document.getElementById("histContainer")
var weatherCardsContainer = document.getElementById("weatherCards")
var currentWeatherContainer = document.getElementById("currentWeatherCard")





// search button handler
document.getElementById("searchBtn").addEventListener("click", function(event) {
    // prevents click default behavior
    event.preventDefault()
    weatherData()
})


// fetch weather data and adds search to current session searches
function weatherData() {
    // search input
    var cityName = document.getElementById("searchInput").value
    // initial fetch for searches lat and lon for next fetch
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${api_key}`)
    .then(function (response) {
        // response returns in json 
        return response.json()
        }).then(function (data) {
            // if statement to catch bad searches
            if (data[0] == undefined) {
                alert("Please input a city")
            } else
            // daily fetch takes lat and lon from previous fetch
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&exclude=minutely,hourly,alerts&appid=${api_key}`)
        .then(function (response) {
            // response returns json
            return response.json()
        }).then(function (data) {

            // current weather handler 
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&units=metric&exclude=minutely,hourly,alerts&appid=${api_key}`)
            .then(function (response) {
                return response.json()
            }).then(function (data)
            {
                console.log(data)
                currentWeatherContainer.innerText = ""

                                // create weathercard HTML
                                var currentWeatherDiv = document.createElement("div")
                                currentWeatherContainer.appendChild(currentWeatherDiv)
                                currentWeatherDiv.classList.add("card")
                                currentWeatherDiv.classList.add("m-3")
                                var currentWeatherBody = document.createElement("div")
                                currentWeatherDiv.appendChild(currentWeatherBody)
                                currentWeatherBody.classList.add("card-body")
                                var currentWeatherData = data.main
                                // uses momentJS to convert weather
                                var dateResults  = moment(currentWeatherData.dt).format('lll')
                                // appends weather data
                                var date = ("Current Date: " + dateResults )
                                var temp = ("Temp: " + data.main.temp + "\n")
                                var humidity = ("Humidity: " + data.main.humidity + "\n")
                                var wind = ("Wind:  " + data.wind.speed + "\n")
                                var currentWeatherIcon = data.weather[0].icon
                                var currentimg = document.createElement("img")
                                currentimg.src = "http://openweathermap.org/img/wn/"+ currentWeatherIcon + "@" + "2x.png"
                                currentWeatherBody.innerHTML = date + "<br/>"  + temp + "<br/>"  + humidity + "<br/>"  + wind +  "<br/>"  
                                currentWeatherBody.append(currentimg)
                                // styling
                                currentWeatherBody.classList.add("bg-dark")
                                currentWeatherBody.classList.add("text-white")
                                currentWeatherBody.style.minWidth = "155px"
                                currentWeatherBody.style.minHeight = "200px"


            })
            // increments value for search index. index should equal total searches. used to pull history
            increm++
            // stores increment value into localstorage
            localStorage.setItem("index", increm)
            // stores current increment value and city name
            localStorage.setItem(increm, data["city"].name)
            // creates current session searches 
            var recentInput = document.createElement("button")
            // appends current session searches to html
            document.getElementById("sessionSearchesContainer").appendChild(recentInput)
            // unhides section
            document.getElementById("sessionSearchesHeader").classList.remove("invisible")
            // styling
            recentInput.classList.add("bg-dark")
            recentInput.classList.add("text-white")
            recentInput.classList.add("btn")
            recentInput.classList.add("m-1")
            recentInput.classList.add("p-2")
            recentInput.setAttribute('id', "history" + i)
            recentInput.innerText = data.city.name
            
            var HistoryButtons = document.querySelectorAll("button:not(#searchBtn)")
            // event listner for history buttons
            HistoryButtons.forEach(function(button) {
                button.addEventListener("click", function() {
                    document.getElementById("searchInput").value = button.innerText
                })              
            })


            // blanks weather carderText = ""
            weatherCardsContainer.innerText = ""
            // loops through returned data to get weather data. 
            for (var i = 0; i <= 39; i++) {
                // only returns results if divisible by 8 which would equal one day
                if (i % 8 === 0) {
                // create weathercard HTML
                var weatherCardDiv = document.createElement("div")
                weatherCardsContainer.appendChild(weatherCardDiv)
                weatherCardDiv.classList.add("card")
                weatherCardDiv.classList.add("m-3")
                var weatherCardBodyDiv = document.createElement("div")
                weatherCardDiv.appendChild(weatherCardBodyDiv)
                weatherCardBodyDiv.classList.add("card-body")
                var weatherData = data.list[i]
                // uses momentJS to convert weather
                var dateResults  = moment(weatherData.dt_txt).format('YYYY/MM/DD')
                // appends weather data
                weatherCardBodyDiv.append("Date: " + dateResults + "\n")
                weatherCardBodyDiv.append("Temp: " + data.list[i].main.temp + "\n")
                weatherCardBodyDiv.append("Humidity: " + data.list[i].main.humidity + "\n")
                weatherCardBodyDiv.append("Wind:  " + data.list[i].wind.speed + "\n")
                var weatherIcon = data.list[i].weather[0].icon
                var img = document.createElement("img")
                img.src = "http://openweathermap.org/img/wn/"+ weatherIcon + "@" + "2x.png"
                weatherCardBodyDiv.append(img)
                // styling
                weatherCardBodyDiv.classList.add("bg-light")
                weatherCardBodyDiv.style.maxWidth = "155px"
                weatherCardBodyDiv.style.minHeight = "50px"
                weatherCardBodyDiv.style.maxHeight = "200px"
                }
            }
        })
    }
)} 

// history handler using localstorage. uses previous incrememnted index stored in localstorage
for (var i = localStorage.index;  i > 0 ; i--) {
    // returns only 5 items from local storage
    if (i === localStorage.index - 5) {
        break
    } else
    {
    var searchHistoryItem = localStorage[i]
    // creates html and styling
    var lineItem = document.createElement("button")
    historyContainer.appendChild(lineItem)
    document.getElementById("prevSearchesHeader").classList.remove("invisible")
    lineItem.classList.add("bg-dark")
    lineItem.classList.add("text-white")
    lineItem.classList.add("btn")
    lineItem.classList.add("m-1")
    lineItem.classList.add("p-2")
    lineItem.setAttribute('id', "history" + i)
    lineItem.innerText = searchHistoryItem

    var allHistoryButtons = document.querySelectorAll("button:not(#searchBtn)")
    // eventlistener for history buttons
    allHistoryButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            document.getElementById("searchInput").value = button.innerText

        })
        
    }
    )
} 

}



