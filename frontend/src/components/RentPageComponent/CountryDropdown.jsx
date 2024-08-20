import React, { useState } from "react";
import Select from "react-select";
import countries from "world-countries";

// Map the countries to { value, label } format for react-select
const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
}));

const CountryDropdown = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    console.log("Selected country:", selectedOption);
  };

  return (
    <div>
      <h2>Select a Country</h2>
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={handleChange}
        placeholder="Select a country..."
        isSearchable
      />
    </div>
  );
};

export default CountryDropdown;
