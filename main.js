const key = "c4c5daf9081441b68f8110410240702"
const container = document.querySelector(".container")
const seachBox = document.querySelector("#city-search")
const form = document.querySelector("#frm")
const searchText = document.querySelector("#search-text")

let city 

function getInput(form) {
    city = form.city.value
    form.city.value = ""
}

seachBox.onkeydown = (e) => {
    if(e.keyCode == '13'){
        e.preventDefault()
        city = document.querySelector("#frm").city.value
        fetchData()
        document.querySelector("#frm").city.value = ""
    }
}

const fetchData = async () => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}`)
    const data = await response.json()
    console.log(data)
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
    <div class = "city-text">
        <h1>Weather</h1>
        <h2>Location: ${data.location.name}</h2>
        <h3>Country: ${data.location.country}</h3>
    </div>
    <div class = "condition">
        <div class = "image">
            <img src = "${data.current.condition.icon}" alt = "weather icon">
        </div>
        <h2>${data.current.condition.text}</h2>
        <h3>Temperature: ${data.current.temp_c} &deg C</h3>
        <h3>Feels like: ${data.current.feelslike_c} &deg C</h3>
        <h3>Humidity: ${data.current.humidity}</h3>
    </div>
    <div class = "city-text">
        <h1>Forecast</h1>
    </div>
    <div class = "condition">
        <div class = "image">
            <img src = "${data.forecast.forecastday[0].day.condition.icon}" alt = "weather icon">
        </div>
        <h2>${data.forecast.forecastday[0].day.condition.text}</h2>
        <h3>Avg Temperature: ${data.forecast.forecastday[0].day.avgtemp_c} &deg C</h3>
        <h3>Avg Humidity: ${data.forecast.forecastday[0].day.avghumidity}</h3>
    </div>
    `
    form.classList.remove('hidden')
    searchText.remove()
    container.appendChild(card)
}

// fetchData()
