import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";

const VehicleTypeSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    navigate(`/vehicles/${type}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Wähle einen Fahrzeugtyp</h1>
      <Space direction="vertical" size="large">
        <Button type="primary" onClick={() => handleSelection("personenwagen")}>
          Personenwagen
        </Button>
        <Button type="primary" onClick={() => handleSelection("wohnmobile")}>
          Wohnmobile
        </Button>
        <Button type="primary" onClick={() => handleSelection("nutzfahrzeuge")}>
          Nutzfahrzeuge
        </Button>
        <Button type="primary" onClick={() => handleSelection("lastwagen")}>
          Lastwagen
        </Button>
        <Button type="primary" onClick={() => handleSelection("anhaenger")}>
          Anhänger
        </Button>
        <Button type="primary" onClick={() => handleSelection("motorrad")}>
          Motorrad
        </Button>
      </Space>
    </div>
  );
};

export default VehicleTypeSelection;
