var api_key = "7ee0556fd27777e1ec83e88a645a43fd"
var increm = (localStorage.getItem('index')) ? localStorage.getItem('index'):0



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
            console.log(localStorage)
        })
    }
    )
}