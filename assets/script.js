var api_key = "7ee0556fd27777e1ec83e88a645a43fd"
var increm = (localStorage.getItem('index')) ? localStorage.getItem('index'):0
var searchHistory = document.getElementById("searchHistory")
var historyContainer = document.getElementById("histContainer")
var weatherCardsContainer = document.getElementById("weatherCards")

// use blob to pull icon? 



document.getElementById("searchBtn").addEventListener("click", function(event) {
    event.preventDefault()
    weatherData()
})

function weatherData() {
    var cityName = document.getElementById("searchInput").value
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${api_key}`)
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        if (data[0] == undefined) {
            alert("Please input a city")
        } else
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&exclude=minutely,hourly,alerts&appid=${api_key}`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            increm++
            localStorage.setItem("index", increm)
            localStorage.setItem(increm, data["city"].name)
            var recentInput = document.createElement("button")

            document.getElementById("sessionSearchesContainer").appendChild(recentInput)
            document.getElementById("sessionSearchesHeader").classList.remove("invisible")
            recentInput.classList.add("bg-dark")
            recentInput.classList.add("text-white")
            recentInput.classList.add("btn")
            recentInput.classList.add("m-1")
            recentInput.classList.add("p-2")
            recentInput.setAttribute('id', "history" + i)
            recentInput.innerText = data.city.name
            
            var HistoryButtons = document.querySelectorAll("button:not(#searchBtn)")

            HistoryButtons.forEach(function(button) {
                button.addEventListener("click", function() {
                    document.getElementById("searchInput").value = button.innerText
                })                
            })


            
            console.log(data)
            weatherCardsContainer.innerText = ""
            for (var i = 0; i <= 40; i++) {
                if (i % 8 === 0) {
                console.log(i)
                var weatherCardDiv = document.createElement("div")
                weatherCardsContainer.appendChild(weatherCardDiv)
                weatherCardDiv.classList.add("card")
                weatherCardDiv.classList.add("m-3")

                var weatherCardBodyDiv = document.createElement("div")
                weatherCardDiv.appendChild(weatherCardBodyDiv)
                weatherCardBodyDiv.classList.add("card-body")
                var weatherData = data.list[i]

                var dateResults  = moment(weatherData.dt_txt).format("YYYYMMDD")

                weatherCardBodyDiv.append("Date " + dateResults + "\n")
                weatherCardBodyDiv.append("Temp " + data.list[i].main.temp + "\n")
                weatherCardBodyDiv.append("Humidity " + data.list[i].main.humidity + "\n")
                weatherCardBodyDiv.append(data.list[i].weather[0].icon + "\n")
                weatherCardBodyDiv.classList.add("bg-light")
                weatherCardBodyDiv.style.maxWidth = "105px"
                weatherCardBodyDiv.style.minHeight = "100px"
            }   
        }       
        })
    }
    )
}

for (var i = localStorage.index;  i > 0 ; i--) {
    if (i === localStorage.index - 5) {
        break
    } else
    {
    console.log(i)
    console.log(localStorage[i])
    var searchHistoryItem = localStorage[i]

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

    allHistoryButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            document.getElementById("searchInput").value = button.innerText
        })
        
    }
    )
} 

}



