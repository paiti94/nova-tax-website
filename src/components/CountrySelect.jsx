// import React, { useEffect, useState } from 'react';
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// // CountrySelect Component
// const CountrySelect = ({ name, onChange }) => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       const response = await fetch('https://restcountries.com/v3.1/all');
//       const data = await response.json();
//       setCountries(data);
//     };

//     fetchCountries();
//   }, []);

//   return (
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id={`${name}-label`}>Select a Country</InputLabel>
//       <Select
//         labelId={`${name}-label`}
//         name={name}
//         onChange={onChange}
//         defaultValue=""
//         label="Select a Country"
//       >
//         <MenuItem value=""><em>Select a Country</em></MenuItem>
//         {countries.map((country) => (
//           <MenuItem key={country.cca2} value={country.name.common}>
//             {country.name.common}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default CountrySelect;