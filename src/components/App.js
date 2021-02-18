import React, { useState } from 'react'
import "../styles/App.scss"

const App = () => {
    const [country, setCountry] = useState("")
    const [search, setSearch] = useState()
    const [title, setTitle] = useState("Busca una ciudad")

    const handleSearch = (e) => {
        if(e.key === "Enter") {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=68d4327870a955115dc7f2ab8801f0ce`)
            .then(res => res.json())
            .then(data => {
                if(data.cod === 200) {
                    setSearch(data)
                    setCountry("")
                }
                else {
                    setTitle("La ciudad introducida no es valida")
                    setSearch()
                }
            })
        }
    }
    
    const construirFecha = (d) => {
        const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

        const day = days[d.getDay()]
        const month = months[d.getMonth()]
        const date = d.getDate()
        const year = d.getFullYear()


        return `${day} ${date} de ${month} del ${year}`
    }


    return (
        <div className="Container">
            <input
            placeholder="Buscar ciudad"
            className="Search__input"
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            onKeyPress={handleSearch}
            />
            {
                (typeof search === "undefined") ? <div className="Weather__container"><h2>{title}</h2></div>
            
        :   <div className="Weather__container">
                <div className={search.main.temp > 24 ? "Weather__item warm" : "Weather__item cold"}>
                    <h2 className="Weather__item-title">{search.name +", " + search.sys.country}</h2>
                    <p className="Weather__item-date">{construirFecha(new Date())}</p>
                    <p className="Weather__item-temp-min">Minima: <span>{Math.round(search.main.temp_min)}</span>°C</p>
                    <p className="Weather__item-temp">Actual: <span>{Math.round(search.main.temp)}</span>°C</p>
                    <p className="Weather__item-temp-max">Maxima: <span>{Math.round(search.main.temp_max)}</span>°C</p>
                    <p className="Weather__item-humidity">Humedad: <span>{Math.round(search.main.humidity)}</span>%</p>
                </div>
            </div>
                 
            }
        </div>
    )
}

export default App
