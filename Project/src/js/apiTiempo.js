window.addEventListener('load', () => {
    let lon;
    let lat;

    const temperaturaValor = document.getElementById('temperatura-valor')  
    const ubicacion = document.getElementById('ubicacion');
    const iconoAnimado = document.getElementById('icono-animado');
    const vientoVelocidad = document.getElementById('viento-velocidad');
    const key = "47d56af836728057d1d332e08065d0a6";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            // ubicación actual    
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

            fetch(url)
                .then(response => { return response.json() })
                .then(data => {

                    console.log(data)
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp-273}`

                    ubicacion.textContent = data.name;
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;

                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                          iconoAnimado.src='./assets/animated/thunder.svg'
                          break;
                        case 'Drizzle':
                          iconoAnimado.src='./assets/animated/rainy-2.svg'
                          break;
                        case 'Rain':
                          iconoAnimado.src='./assets/animated/rainy-7.svg'
                          break;
                        case 'Snow':
                          iconoAnimado.src='./assets/animated/snowy-6.svg'
                          break;                        
                        case 'Clear':
                            iconoAnimado.src='./assets/animated/day.svg'
                          break;
                        case 'Atmosphere':
                          iconoAnimado.src='./assets/animated/weather.svg'
                            break;  
                        case 'Clouds':
                            iconoAnimado.src='./assets/animated/cloudy.svg'
                            break;  
                        default:
                          iconoAnimado.src='./assets/animated/cloudy-day-1.svg'
                      }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        });
    }
});
