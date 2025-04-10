import { useEffect, useState } from "react";
import { IHospital, hospitalsService } from "../services/hospitals-service";

export const Home = () => {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);

  const fetchHospitals = async () => {
    const response = await hospitalsService.list();
    setHospitals(response.data);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <div className="flex flex-row h-screen bg-white p-4 gap-4">
      <div className="basis-2/3 bg-white shadow-2xl/30 shadow-primary rounded-2xl">
        {hospitals.map((hospital) => (
          <h1>{hospital.name}</h1>
        ))}
      </div>
      <div className="basis-1/3 bg-white shadow-2xl/30 shadow-primary rounded-2xl"></div>
    </div>
  );
};
