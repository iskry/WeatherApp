var api_key = "7ee0556fd27777e1ec83e88a645a43fd"
var increm = (localStorage.getItem('index')) ? localStorage.getItem('index'):0
var searchHistory = document.getElementById("searchHistory")

historyHandler()

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
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${api_key}`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            increm++
            localStorage.setItem("index", increm)
            localStorage.setItem(increm, data["city"].name)
            historyHandler()
        })
    }
    )
}


function historyHandler() {if (localStorage.length > 0) {
    var lineIndex = 5
    var startHis = localStorage.index 
    var endHis = localStorage.index - 5
    for (startHis + 1; startHis > endHis; startHis--) {
    lineIndex--
    var lineItem = document.getElementById("history" + lineIndex)
    var searchHistoryItem = localStorage[localStorage.getItem("index") - lineIndex]
    if (searchHistoryItem == undefined) {
        lineItem.append("")
    } else {
        document.getElementById("prevSearchesHeader").classList.remove("invisible")
        lineItem.textContent = ""
        lineItem.classList.add("p-3")
        lineItem.classList.add("m-4")
        lineItem.classList.add("bg-dark")
        lineItem.classList.add("text-white")
        lineItem.append(searchHistoryItem)
    }
    }}
}

