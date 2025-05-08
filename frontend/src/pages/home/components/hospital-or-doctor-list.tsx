import { IDoctor } from "@services/doctors-service";
import { IHospital } from "@services/hospitals-service";
import { CardUser } from "./card-user";

interface HospitalOrDoctorListProps {
  userType: "HOSPITAL" | "DOCTOR" | undefined;
  items: IHospital[] | IDoctor[];
  onCardClick: (receiver: IHospital | IDoctor) => void;
}

export const HospitalOrDoctorList = ({
  userType,
  items,
  onCardClick,
}: HospitalOrDoctorListProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {userType == "DOCTOR"
        ? (items as IHospital[]).map((hospital) => (
            <CardUser
              key={hospital.userId}
              name={hospital.name}
              phone={hospital.phone}
              address={hospital.address}
              available={hospital.hiring}
              onClick={() => onCardClick(hospital)}
            />
          ))
        : (items as IDoctor[]).map((doctor) => (
            <CardUser
              key={doctor.userId}
              name={doctor.name}
              phone={doctor.phone}
              crm={doctor.crm}
              specialties={
                doctor.specialties.length > 0
                  ? doctor.specialties
                  : ["Sem especialidade"]
              }
              available={doctor.available}
              onClick={() => onCardClick(doctor)}
            />
          ))}
    </div>
  );
};
