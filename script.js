// 1. Configuración inicial
const apiKey = "53af2a587748aae5d8c43ffc0f6580e4"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// 2. Función principal para obtener el clima
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        alert("Ciudad no encontrada");
    } else {
        const data = await response.json();

        // Actualización de la interfaz
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const mainWeather = data.weather[0].main;
        const body = document.body;

        // 3. Lógica de Iconos y Fondos Dinámicos
        if (mainWeather == "Clouds") {
            weatherIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
            body.className = "nublado";
        } 
        else if (mainWeather == "Clear") {
            weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
            body.className = "despejado";
        }
        else if (mainWeather == "Rain" || mainWeather == "Drizzle") {
            weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
            body.className = "lluvioso";
        }
        else if (mainWeather == "Snow") {
            weatherIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
            body.className = "nublado";
        }
        else {
            weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png";
            body.className = "nublado";
        }

        console.log("Datos recibidos:", data);
    }
}

// 4. Controladores de Eventos
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});

// 5. Configuración de fecha y estado inicial
const ahora = new Date();
const opciones = { weekday: 'long', day: 'numeric', month: 'long' };
document.querySelector(".date").innerHTML = ahora.toLocaleDateString('es-ES', opciones);

checkWeather("Murcia");