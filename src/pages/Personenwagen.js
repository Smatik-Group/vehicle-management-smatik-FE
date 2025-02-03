import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { BASE_URL } from "../config";
import Joi from "joi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

// Validation schema using Joi
const vehicleSchema = Joi.object().keys({
  tg: Joi.string().required(),
  fahrzeugart: Joi.string().default("Personenwagen"),
  marke: Joi.string().required(),
  modell: Joi.string().required(),
  inverkehr_von: Joi.date().required(),
  inverkehr_bis: Joi.date().optional(),
  aufbau: Joi.string().required(),
  treibstoff: Joi.string().required(),
  antrieb: Joi.string().required(),
  tueren: Joi.number().integer().required(),
  sitze: Joi.number().integer().required(),
  ps_kw: Joi.string().required(),
  hubraum_cm3: Joi.number().integer().required(),
  zylinder: Joi.number().integer().optional(),
  anzahl_gaenge: Joi.number().integer().required(),
  inverkehrsetzung: Joi.date().optional(),
  co2_emission_g_km: Joi.number().required(),
  energieetikette: Joi.string().required(),
  abgasnorm: Joi.string().required(),
  verbrauch_stadt: Joi.number().required(),
  verbrauch_land: Joi.number().required(),
  verbrauch_l_100km: Joi.number().required(),
  euro_norm: Joi.string().required(),
  chassisnummer: Joi.string().required(),
  laenge: Joi.number().required(),
  breite: Joi.number().required(),
  hoehe: Joi.number().required(),
  nutzlast: Joi.number().required(),
  radstand_mm: Joi.number().integer().required(),
  gesamtgewicht: Joi.number().required(),
  anhaengelast_gebremst: Joi.number().optional(),
  leergewicht: Joi.number().required(),
  lizenzkategorie: Joi.string().required(),
  motorbauart: Joi.string().required(),
  serienmaesigge_ausstatung: Joi.string().optional(),
  erstellungsdatum: Joi.date().optional(),
  aktualisierungsdatum: Joi.date().optional(),
  neupreis: Joi.number().optional(),
  batteriekapazitaet: Joi.number().optional(),
  stromverbrauch: Joi.number().optional(),
  reichweite: Joi.number().optional(),
  ladeleistung: Joi.number().optional(),
  ladezeit: Joi.number().optional(),
  schnellladeleistung: Joi.number().optional(),
  schnellladezeit: Joi.number().optional(),
  elektrisch: Joi.boolean().optional(),
});

const getInitialCar = () => ({
  tg: "",
  fahrzeugart: "Personenwagen",
  marke: "",
  modell: "",
  inverkehr_von: null,
  inverkehr_bis: null,
  aufbau: "",
  treibstoff: "",
  antrieb: "",
  tueren: 0,
  sitze: 0,
  ps_kw: "",
  hubraum_cm3: 0,
  zylinder: 0,
  anzahl_gaenge: 0,
  inverkehrsetzung: null,
  co2_emission_g_km: 0,
  energieetikette: "",
  abgasnorm: "",
  verbrauch_stadt: 0,
  verbrauch_land: 0,
  verbrauch_l_100km: 0,
  euro_norm: "",
  chassisnummer: "",
  laenge: 0,
  breite: 0,
  hoehe: 0,
  nutzlast: 0,
  radstand_mm: 0,
  gesamtgewicht: 0,
  anhaengelast_gebremst: null,
  leergewicht: 0,
  lizenzkategorie: "",
  motorbauart: "",
  serienmaesigge_ausstatung: "",
  erstellungsdatum: null,
  aktualisierungsdatum: null,
  neupreis: 0,
  batteriekapazitaet: 0,
  stromverbrauch: 0,
  reichweite: 0,
  ladeleistung: 0,
  ladezeit: 0,
  schnellladeleistung: 0,
  schnellladezeit: 0,
  elektrisch: false,
});

const Personenwagen = () => {
  const [cars, setCars] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCar, setCurrentCar] = useState(getInitialCar());
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [limit,setLimit] =useState(5) ;

  // useEffect(() => {

  //   fetchCars();
  // }, [limit]);
  useEffect(() => {
    console.log('search: ', search);
    if (search.length >= 3 || search.length === 0 || limit)  {
      
      fetchCars(1);
    }
  }, [search,limit]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCars(1); // Reset to the first page when searching
  };

  const fetchCars = async (pageNumber = pagination.currentPage) => {
    setLoading(true);
    const params = { page: pageNumber,limit:limit};
    if (search.trim()) {
      params.search = search.trim(); // Include search query only if it exists
    }

    try {
      const response = await axios.get(`${BASE_URL}/vehicle`, { params });
      const data = response.data;
      setCars(data.results.results);
      setPagination({
        currentPage: data.results.pagination.currentPage,
        totalPages: data.results.pagination.totalPages,
        totalRecords: data.results.pagination.totalRecords,
      });
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to fetch cars.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      fetchCars(pageNumber);
    }
  };

  const handleAddNewCar = () => {
    setCurrentCar(getInitialCar());
    setIsEditing(false);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditCar = (car) => {
    setCurrentCar(car);
    setIsEditing(true);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`${BASE_URL}/vehicle/${carId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.info("Car deleted successfully");
      fetchCars(pagination.currentPage);
    } catch (error) {
      toast.error("Failed to delete car.");
      console.error("Error deleting car:", error);
    }
  };

  const handleSaveCar = async () => {
    const carDataToSend = isEditing
      ? (({ ID, createdAt, updatedAt, ...rest }) => rest)(currentCar)
      : currentCar;

    const { error } = vehicleSchema.validate(carDataToSend, {
      abortEarly: false,
    });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return;
    }

    const method = isEditing
      ? () =>
          axios.put(`${BASE_URL}/vehicle/${currentCar.ID}`, carDataToSend, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
      : () =>
          axios.post(`${BASE_URL}/vehicle`, carDataToSend, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

    setSaving(true);

    try {
      const response = await method();
      toast.success(`Car saved successfully: ${response.data.message.en}`);
      setIsModalOpen(false);
      fetchCars(pagination.currentPage);
    } catch (error) {
      toast.error("Failed to save car.");
      console.error("Error saving car:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentCar(getInitialCar());
  };

  const handleDateChange = (key) => (date) => {
    setCurrentCar({ ...currentCar, [key]: date });
  };

 

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <Header />

      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Suche nach TG, Marke..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearchSubmit}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Suche
          </button>
        </div>
        <button
          onClick={handleAddNewCar}
          disabled={saving}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
            saving ? "bg-gray-500 cursor-not-allowed" : ""
          }`}
        >
          Neues Fahrzeug hinzufügen
        </button>
      </div>
      {
        loading? (
         <div className="text-center text-white">Lade Fahrzeuge...</div>
 
        ):(
          <div>

      <div className="overflow-x-auto">
        <table className="min-w-full backdrop-blur-md bg-opacity-20 bg-gray-700 rounded-lg shadow-md">
          <thead className="bg-gray-800 bg-opacity-50">
            <tr>
              {[
                "TG",
                "Fahrzeugart",
                "Marke",
                "Modell",
                "PS/KW",
                "Aktionen",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
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
                  <button
                    onClick={() => handleDeleteCar(car.ID)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-white">
          Seite {pagination.currentPage} von {pagination.totalPages}
        </p>
        <div className="flex space-x-2">
        <select
        value={limit}
  className="bg-white text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
  onChange={(e) => setLimit(e.target.value)}
>
  <option className="bg-transparent" value="5">5 Fahrzeuge pro Seite</option>
  <option className="bg-transparent" value="10">10 Fahrzeuge pro Seite</option>
  <option className="bg-transparent" value="20">20 Fahrzeuge pro Seite</option>
  <option className="bg-transparent" value="50">50 Fahrzeuge pro Seite</option>
  <option className="bg-transparent" value="100">100 Fahrzeuge pro Seite</option>
  <option className="bg-transparent" value="200">200 Fahrzeuge pro Seite</option>
  <option className="bg-transparent" value="500">500 Fahrzeuge pro Seite</option>
</select>

          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className={`bg-gray-700 text-white px-2 py-1 rounded-lg hover:bg-gray-800 ${
              pagination.currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
          >
            Vorherige
          </button>
          {Array.from({ length: pagination.totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`${
                pagination.currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              } px-2 py-1 rounded-lg hover:bg-gray-800`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className={`bg-gray-700 text-white px-2 py-1 rounded-lg hover:bg-gray-800 ${
              pagination.currentPage === pagination.totalPages
                ? "cursor-not-allowed"
                : ""
            }`}
          >
            Nächste
          </button>
        </div>
      </div>
</div>
        )}
      

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-black">
              {isEditing ? "Fahrzeug bearbeiten" : "Neues Fahrzeug hinzufügen"}
            </h2>
            <form className="space-y-4">
              {Object.keys(currentCar)
                .filter(
                  (key) => !["createdAt", "updatedAt", "ID"].includes(key)
                )
                .map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-black">
                      {key}
                    </label>
                    {key.includes("datum") ||
                    key.includes("inverkehrsetzung") ||
                    key.includes("inverkehr_von") ||
                    key.includes("inverkehr_bis") ? (
                      <DatePicker
                        selected={currentCar[key]}
                        onChange={handleDateChange(key)}
                        dateFormat="dd/MM/yyyy"
                        className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        placeholderText="Datum auswählen"
                      />
                    ) : (
                      <input
                        type={
                          typeof currentCar[key] === "number"
                            ? "number"
                            : "text"
                        }
                        value={currentCar[key] || ""}
                        onChange={(e) =>
                          setCurrentCar({
                            ...currentCar,
                            [key]: e.target.value,
                          })
                        }
                        className={`w-full p-2 border border-gray-300 rounded-lg text-black ${
                          errors[key] ? "border-red-500" : ""
                        }`}
                        placeholder={key}
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
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className={`bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 ${
                  saving ? "cursor-not-allowed" : ""
                }`}
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveCar}
                disabled={saving}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
                  saving ? "bg-gray-500 cursor-not-allowed" : ""
                }`}
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
