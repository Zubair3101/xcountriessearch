import React, { useEffect, useState } from "react";
import Cardformat from "./Cardformat";
import "./Countries.css";

function Countries() {
  let [allCountries, setAllCountries] = useState([]);
  let [countriesData, setCountriesData] = useState([]);
  let [search, setSearch] = useState("");
  let [debounceTimer, setDebounceTimer] = useState(null);

  const debounceSearch = (e) => {
    setSearch(e.target.value);

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      const filtered = allCountries.filter((country) =>
        country.common.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCountriesData(filtered);
    }, 500);

    setDebounceTimer(timer);
  };

  useEffect(() => {
    async function getCountriesData() {
      try {
        let rawData = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        let finalData = await rawData.json();
        setAllCountries(finalData);
        setCountriesData(finalData);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }

    getCountriesData();
  }, []);

  return (
    <>
      <div
        style={{
          margin: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={search}
          placeholder="Search Country"
          style={{
            width: "600px",
            height: "25px",
            border: "1px solid black",
            borderRadius: "3px",
          }}
          onChange={(e) => debounceSearch(e)}
        />
      </div>
      <div className="country-sec">
        {countriesData.map((country, idx) => (
          <Cardformat name={country.common} flag={country.png} key={idx} />
        ))}
      </div>
    </>
  );
}

export default Countries;
