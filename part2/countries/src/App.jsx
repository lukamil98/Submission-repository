import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [searchQuery, setSearchQuery] = useState("") // State variable to store the search query
  const [countryData, setCountryData] = useState([]) // State variable to store the fetched country data
  const [weatherData, setWeatherData] = useState(null) // State variable to store the fetched weather data
  const [errorMessage, setErrorMessage] = useState("") // State variable to store error message
  const [selectedCountry, setSelectedCountry] = useState(null) // State variable to store the currently selected country
  const [countriesDisplayed, setCountriesDisplayed] = useState(false) // State variable to track if countries have been displayed

  // Event handler for input change
  const handleChange = (event) => {
    setSearchQuery(event.target.value) // Update the search query state with the input value
  }

  // Function to fetch weather data from the API
  const fetchWeatherData = async (capital) => {
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }
      const data = await response.json()

      if (response.ok) {
        setWeatherData(data)
      } else {
        setWeatherData(null)
        console.error("Error fetching weather data:", data.message)
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
      setWeatherData(null)
    }
  }

  // Event handler for clicking on a country to show/hide details
  const handleCountryClick = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry(null)
      setWeatherData(null)
    } else {
      setSelectedCountry(country)
      fetchWeatherData(country.capital?.[0])
    }
  }

  // Effect hook to fetch country data based on search query
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        if (!searchQuery.trim()) {
          setCountryData([])
          setErrorMessage("")
          return
        }

        const response = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(
            searchQuery
          )}`
        )
        const data = await response.json()

        if (response.ok) {
          if (data.length > 10) {
            setCountryData([])
            setWeatherData(null)
            setErrorMessage("Too many matches, please specify your query")
          } else {
            setCountryData(data)
            setWeatherData(null)
            setErrorMessage("")
            setCountriesDisplayed(true)
            if (data.length === 1) {
              setSelectedCountry(data[0])
              fetchWeatherData(data[0].capital?.[0])
            }
          }
        } else {
          setCountryData([])
          setWeatherData(null)
          setErrorMessage("Error fetching country data")
        }
      } catch (error) {
        console.error("Error fetching country data:", error)
        setCountryData([])
        setWeatherData(null)
        setErrorMessage("Error fetching country data")
      }
    }

    fetchCountryData()
  }, [searchQuery])

  return (
    <div className="App">
      <h1>Country Information App</h1>
      {/* Input field for searching country */}
      <input
        type="text"
        placeholder="Enter country name"
        value={searchQuery}
        onChange={handleChange}
      />
      {/* Display error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Display country information if data is available and countries have been displayed */}
      {countriesDisplayed && countryData.length > 0 && (
        <div className="country-info">
          {/* Map through countryData to display each country */}
          {countryData.map((country) => (
            <div key={country.name.common}>
              {/* Display country name */}
              <h2>
                {country.name && country.name.common
                  ? country.name.common
                  : "N/A"}
              </h2>
              {/* Button to show/hide details */}
              <button onClick={() => handleCountryClick(country)}>
                {selectedCountry === country ? "Hide Details" : "Show Details"}
              </button>
              {/* Display details if the country is selected */}
              {selectedCountry === country && (
                <>
                  <p>
                    <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                  </p>
                  <p>
                    <strong>Area:</strong>{" "}
                    {country.area
                      ? `${country.area.toLocaleString()} km²`
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Languages:</strong>{" "}
                    {country.languages
                      ? Object.values(country.languages).join(", ")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Flag:</strong>{" "}
                    <img
                      src={country.flags?.svg || ""}
                      alt="Flag"
                      width="150"
                    />
                  </p>
                  {/* Display weather info if available */}
                  {weatherData && (
                    <div className="weather-info">
                      <h3>Weather in {country.capital?.[0]}</h3>
                      <p>
                        <strong>Temperature:</strong> {weatherData.main?.temp}°C
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {weatherData.weather?.[0]?.description || "N/A"}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
