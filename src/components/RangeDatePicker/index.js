"use client";

import Datepicker from "react-tailwindcss-datepicker"; 

export default function RangeDatePicker({ onChange, value}) {
  const handleValueChange = (newValue) => {
    onChange(newValue); 
  } 

  return (
    <Datepicker 
      name="rangeDatePicker"
      value={value} 
      onChange={handleValueChange} 
      showShortcuts={true} 
    /> 
  );
}
