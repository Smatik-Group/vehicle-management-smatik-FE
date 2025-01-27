import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const Personenwagen = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCar, setCurrentCar] = useState({});

  const fuelOptions = [
    "Benzin",
    "Diesel",
    "Mild-Hybrid Benzin/Elektro",
    "Mild-Hybrid Diesel/Elektro",
    "Plug-in hybrid Benzin/Elektro",
    "Plug-in hybrid Diesel/Elektro",
    "Voll-Hybrid Benzin/Elektro",
    "Voll-Hybrid Diesel/Elektro",
  ];
  const vehicleTypeOptions = [
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
  const driveOptions = [
    "Vorderradantrieb",
    "Hinterradantrieb",
    "Allradantrieb",
  ];
  const gearboxOptions = ["Manuell", "Automatik"];
  const licenseCategoryOptions = ["B", "BE", "C", "C1", "D", "D1"];
  const energyLabelOptions = ["A", "B", "C", "D", "E", "F", "G"];

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    setLoading(true);
    axios
      .get("https://vehicle-management-smatik-be.vercel.app/vehicle")
      .then((response) => {
        console.log("response: ", response);
        setCars(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten:", error);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddNewCar = () => {
    const carSchema = {
      tg: "",
      fahrzeugart: "",
      marke: "",
      modell: "",
      inverkehr: "",
      aufbau: "",
      treibstoff: "",
      antrieb: "",
      tueren: "",
      sitze: "",
      ps_kw: "",
      hubraum_cm3: "",
      zylinder: "",
      anzahl_gaenge: "",
      inverkehrsetzung: "",
      co2_emission: "",
      energieetikette: "",
      abgasnorm: "",
      verbrauch_stadt: "",
      verbrauch_land: "",
      verbrauch_l_100km: "",
      euro_norm: "",
      chassisnummer: "",
      laenge: "",
      breite: "",
      hoehe: "",
      nutzlast: "",
      radstand_mm: "",
      gesamtgewicht: "",
      anhaengelast_gebremst: "",
      leergewicht: "",
      lizenzkategorie: "",
      motorbauart: "",
      erstellungsdatum: "",
      aktualisierungsdatum: "",
    };
    setCurrentCar(carSchema);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditCar = (car) => {
    setCurrentCar({ ...car });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveCar = () => {
    const method = isEditing
      ? axios.put(
          `https://vehicle-management-smatik-be.vercel.app/vehicle/${currentCar.id}`,
          currentCar
        )
      : axios.post(
          "https://vehicle-management-smatik-be.vercel.app/vehicle",
          currentCar
        );

    method
      .then(() => {
        fetchCars();
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Fehler beim Speichern:", error));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentCar({});
  };

  const filteredCars =
    search?.length > 0
      ? cars?.filter((car) =>
          car?.tg?.toLowerCase().includes(search.toLowerCase())
        )
      : cars;

  if (loading) {
    return <div className="text-center text-white">Lade Fahrzeuge...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <Header />

      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Suche nach Typenscheinnummer (TG)"
          value={search}
          onChange={handleSearch}
          className="w-1/2 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddNewCar}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Neues Fahrzeug hinzufügen
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full backdrop-blur-md bg-opacity-20 bg-gray-700 rounded-lg shadow-md">
          <thead className="bg-gray-800 bg-opacity-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                TG
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Fahrzeugart
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Marke
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Modell
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                PS/KW
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCars?.map((car, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-800 hover:bg-opacity-50"
              >
                <td className="px-6 py-4">{car.tg || "Nicht verfügbar"}</td>
                <td className="px-6 py-4">
                  {car.fahrzeugart || "Nicht verfügbar"}
                </td>
                <td className="px-6 py-4">{car.marke || "Nicht angegeben"}</td>
                <td className="px-6 py-4">{car.modell || "Nicht angegeben"}</td>
                <td className="px-6 py-4">{car.ps_kw || "Unbekannt"}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleEditCar(car)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                  >
                    Bearbeiten
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-black">
              {isEditing ? "Fahrzeug bearbeiten" : "Neues Fahrzeug hinzufügen"}
            </h2>
            <form className="space-y-4">
              {Object.keys(currentCar).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-black">
                    {key}
                  </label>
                  {key === "treibstoff" ? (
                    <select
                      value={currentCar[key] || ""}
                      onChange={(e) =>
                        setCurrentCar({ ...currentCar, [key]: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Bitte auswählen</option>
                      {fuelOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : key === "fahrzeugart" ? (
                    <select
                      value={currentCar[key] || ""}
                      onChange={(e) =>
                        setCurrentCar({ ...currentCar, [key]: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg text-black"
                    >
                      <option value="">Bitte auswählen</option>
                      {vehicleTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={currentCar[key] || ""}
                      onChange={(e) =>
                        setCurrentCar({ ...currentCar, [key]: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg text-black"
                    />
                  )}
                </div>
              ))}
            </form>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveCar}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personenwagen;
