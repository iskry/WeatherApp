var api_key = "7ee0556fd27777e1ec83e88a645a43fd"



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
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${api_key}`)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data)
            console.log(data["city"].name)
            console.log(data["list"])
        })
    }
    )
}