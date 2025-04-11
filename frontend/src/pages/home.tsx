import { useEffect, useState } from "react";
import { IHospital, hospitalsService } from "../services/hospitals-service";
import { CardUser } from "../components/card-user";

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
      <div className="basis-2/3 flex flex-col bg-white shadow-2xl/30 shadow-primary rounded-2xl p-4">
        <h1 className="text-2xl font-bold mb-4">Hospitais</h1>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
          <div className="grid grid-cols-2 gap-4">
            {hospitals.map(({ name, phone, address, hiring, userId }) => (
              <CardUser
                key={userId}
                name={name}
                phone={phone}
                address={address}
                available={hiring}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="basis-1/3 bg-white shadow-2xl/30 shadow-primary rounded-2xl"></div>
    </div>
  );
};
