import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input, Table, Button } from "antd";

const VehicleSearch = () => {
  const { type } = useParams(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const fetchVehicles = async () => {
        try {
          const response = await axios.get(`/api/${type}?search=${searchTerm}`);
          setVehicles(response.data);
        } catch (error) {
          console.error("Fehler beim Abrufen der Daten:", error);
        }
      };
      fetchVehicles();
    } else {
      setVehicles([]);
    }
  }, [searchTerm, type]);

  const columns = [
    { title: "Typengenehmigung (TG)", dataIndex: "TG", key: "TG" },
    { title: "Marke", dataIndex: "Marke", key: "Marke" },
    { title: "Modell", dataIndex: "Modell", key: "Modell" },
    {
      title: "Aktionen",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => console.log(`Bearbeiten: ${record.TG}`)}>
          Bearbeiten
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Fahrzeugliste: {type}</h1>
      <Input
        placeholder="Typengenehmigung eingeben..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", maxWidth: "300px" }}
      />
      <Table
        dataSource={vehicles}
        columns={columns}
        rowKey="TG"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default VehicleSearch;
