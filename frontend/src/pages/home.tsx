import { useEffect, useState } from "react";
import { IHospital, hospitalsService } from "../services/hospitals-service";
import { CardUser } from "../components/card-user";
import { useAuth } from "../hooks/use-auth";
import { doctorsService, IDoctor } from "../services/doctors-service";

export const Home = () => {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const { user } = useAuth();
  const userType = user?.userType;

  useEffect(() => {
    const fetchUsers = async () => {
      if (userType == "DOCTOR") {
        const response = await hospitalsService.list();
        setHospitals(response.data);
      } else {
        const response = await doctorsService.list();
        setDoctors(response.data);
      }
    };

    fetchUsers();
  }, [userType]);

  return (
    <div className="flex flex-row h-screen bg-white p-4 gap-4">
      <div className="basis-2/3 flex flex-col bg-white shadow-2xl/30 shadow-primary rounded-2xl p-4">
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
          <div className="grid grid-cols-2 gap-4">
            {userType == "DOCTOR"
              ? hospitals.map(({ name, phone, address, hiring, userId }) => (
                  <CardUser
                    key={userId}
                    name={name}
                    phone={phone}
                    address={address}
                    available={hiring}
                  />
                ))
              : doctors.map(
                  ({ userId, available, crm, name, phone, specialty }) => (
                    <CardUser
                      key={userId}
                      name={name}
                      phone={phone}
                      crm={crm}
                      specialty={specialty}
                      available={available}
                    />
                  )
                )}
          </div>
        </div>
      </div>

      <div className="basis-1/3 bg-white shadow-2xl/30 shadow-primary rounded-2xl"></div>
    </div>
  );
};
