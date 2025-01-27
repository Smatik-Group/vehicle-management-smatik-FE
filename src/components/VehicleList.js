import React, { useState, useEffect } from "react";
import axios from "axios";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const BASE_URL = "http://localhost:8080/api/personenwagen";

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL);
      setVehicles(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
    setLoading(false);
  };

  const searchVehicles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: { tg: searchTerm },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error("Fehler bei der Suche:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Personenwagen Liste</h1>

      <input
        type="text"
        placeholder="Typengenehmigung suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          fontSize: "16px",
        }}
      />
      <button
        onClick={searchVehicles}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          fontSize: "16px",
          cursor: "pointer",

        }}
        >
          Suchen
        </button>
  
        {/* Ladeanzeige */}
        {loading && <p>Daten werden geladen...</p>}
  
        {/* Fahrzeugliste */}
        {!loading && vehicles.length > 0 && (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Typengenehmigung
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Fahrzeugart
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Marke</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Modell</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Verbrauch (l/100km)
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {vehicle.tg}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {vehicle.fahrzeugart}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {vehicle.marke}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {vehicle.modell}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {vehicle.verbrauch || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
  
        {/* Kein Ergebnis */}
        {!loading && vehicles.length === 0 && <p>Keine Fahrzeuge gefunden.</p>}
      </div>
    );
  };
  
  export default VehicleList;
  
       
