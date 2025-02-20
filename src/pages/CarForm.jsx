import React from "react";
import DatePicker from "react-datepicker";

// Constants for form options
const AUFBAU_OPTIONS = [
  "Kombi",
  "SUV / Geländewagen",
  "Limousine",
  "Cabriolet",
  "Coupé",
  "Kleinwagen",
  "Pick-up",
  "Kompaktvan / Minivan",
  "Bus",
];

const TREIBSTOFF_OPTIONS = [
  "Benzin",
  "Diesel",
  "Hybrid",
  "Mild-Hybrid Benzin/Elektro",
  "Mild-Hybrid Diesel/Elektro",
  "Plug-in hybrid Benzin/Elektro",
  "Plug-in hybrid Diesel/Elektro",
  "Voll-Hybrid Benzin/Elektro",
  "Voll-Hybrid Diesel/Elektro",
  "Elektro",
  "Gas",
  "Erdgas (CNG) / Benzin",
  "Flüssiggas (LPG) / Benzin",
  "Weitere Treibstoffe",
  "Bioethanol",
  "Wasserstoff",
];

const ANTRIEB_OPTIONS = [
  "Allrad",
  "Geländegängig",
  "Hinterrad",
  "Raupenantrieb",
  "Vorderrad",
];
const GEARS = [
  "Automat",
  "Halbautomatisches Getriebe",
  "Stufenlos ",
  "Schaltgetriebe manuell",
];
const EXCLUDED_FIELDS = ["createdAt", "updatedAt", "ID"];

const CarForm = ({ currentCar, setCurrentCar, errors = {} }) => {
  const handleInputChange = (key, value) => {
    setCurrentCar({ ...currentCar, [key]: value });
  };
  const handleDateChange = (key) => (date) => {
    setCurrentCar({ ...currentCar, [key]: date });
  };
  const CheckboxGroup = ({ field, options }) => (
    <div className="grid grid-cols-3 gap-4">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <input
            type="radio"
            id={`${field}-${option}`}
            name={field}
            value={option}
            checked={currentCar[field] === option}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor={`${field}-${option}`} className="text-sm text-black">
            {option}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <form className="space-y-4">
      {Object.keys(currentCar)
        .filter((key) => !EXCLUDED_FIELDS.includes(key))
        .map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-black">
              {key === "ps_kw"
                ? "PS/KW"
                : key === "chassisnummer"
                ? "Stammnummer"
                : key.replace(/_/g, " ")}
            </label>

            {key === "aufbau" || key === "treibstoff" ? (
              <CheckboxGroup
                field={key}
                options={key === "aufbau" ? AUFBAU_OPTIONS : TREIBSTOFF_OPTIONS}
              />
            ) : key === "treibstoff" || key === "antrieb" || key === "gears" ? (
              <select
                value={currentCar[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className={`w-full p-2 border rounded-lg text-black ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select {key}
                </option>
                {(key === "treibstoff"
                  ? TREIBSTOFF_OPTIONS
                  : key === "antrieb"
                  ? ANTRIEB_OPTIONS
                  : GEARS
                ).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : key.includes("datum") ||
              key.includes("inverkehrsetzung") ||
              key.includes("inverkehr_von") ||
              key.includes("inverkehr_bis") ? (
              <DatePicker
                selected={currentCar[key] ? new Date(currentCar[key]) : null}
                onChange={handleDateChange(key)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
                placeholderText="Monat und Jahr auswählen"
                minDate={new Date(2000, 0)} // January 2013
              />
            ) : (
              <input
                type={typeof currentCar[key] === "number" ? "number" : "text"}
                value={currentCar[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)} // Correct: handleInputChange
                className={`w-full p-2 border rounded-lg text-black ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={key.replace(/_/g, " ")}
              />
            )}
            {errors[key] && (
              <p className="text-red-500 text-sm">{errors[key]}</p>
            )}
          </div>
        ))}
      {errors.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}
    </form>
  );
};

export default CarForm;
