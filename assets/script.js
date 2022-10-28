var api_key = "7ee0556fd27777e1ec83e88a645a43fd"
var increm = (localStorage.getItem('index')) ? localStorage.getItem('index'):0
var searchHistory = document.getElementById("searchHistory")
var historyContainer = document.getElementById("histContainer")
var weatherCardsContainer = document.getElementById("weatherCards")

historyHandler()

document.getElementById("searchBtn").addEventListener("click", function(event) {
    event.preventDefault()
    weatherData()
})

function weatherData(history) {
    console.log(history)
    var cityName = document.getElementById("searchInput").value
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${api_key}`)
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        if (data[0] == undefined) {
            alert("Please input a city")
        } else
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${api_key}`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            increm++
            localStorage.setItem("index", increm)
            localStorage.setItem(increm, data["city"].name)
            console.log(data)
            historyHandler()
            for (i = 0; i <= 6; i++) {

                var weatherCardDiv = document.createElement("div")
                weatherCardsContainer.appendChild(weatherCardDiv)
                weatherCardDiv.classList.add("card")
                weatherCardDiv.classList.add("m-3")

                var weatherCardBodyDiv = document.createElement("div")
                weatherCardDiv.appendChild(weatherCardBodyDiv)
                weatherCardBodyDiv.classList.add("card-body")
                var weatherData = data.list[i]
                weatherCardBodyDiv.append(weatherData.dt_txt)
                weatherCardBodyDiv.classList.add("bg-light")
                weatherCardBodyDiv.style.minWidth = "200px"
                weatherCardBodyDiv.style.minHeight = "100px"

                
            }   
            
        })
    }
    )
}


function historyHandler() {if (localStorage.length > 0) {
    historyContainer.innerText = ""
    var lineIndex = 5
    var startHis = localStorage.index 
    var endHis = localStorage.index - 5

    for (startHis + 1; startHis > endHis; startHis--) {
        lineIndex--
        var searchHistoryItem = localStorage[localStorage.getItem("index") - lineIndex]
        var lineItem = document.createElement("button")
        historyContainer.appendChild(lineItem)
        document.getElementById("prevSearchesHeader").classList.remove("invisible")
        lineItem.classList.add("bg-dark")
        lineItem.classList.add("text-white")
        lineItem.classList.add("btn")
        lineItem.classList.add("m-1")
        lineItem.classList.add("p-2")
        lineItem.innerText = searchHistoryItem
    }
}
}


function populateWeatherData() {

}
