import { IDoctor } from "@services/doctors-service";
import { IHospital } from "@services/hospitals-service";
import { CardUser } from "./card-user";

interface HospitalOrDoctorListProps {
  isUserDoctor: boolean;
  items: IHospital[] | IDoctor[];
  onCardClick: (id: string) => void;
}

export const HospitalOrDoctorList = ({
  isUserDoctor,
  items,
  onCardClick,
}: HospitalOrDoctorListProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {isUserDoctor
        ? (items as IHospital[]).map((hospital) => (
            <CardUser
              key={hospital.userId}
              name={hospital.name}
              phone={hospital.phone}
              address={hospital.address}
              onClick={() => onCardClick(hospital.userId)}
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
              onClick={() => onCardClick(doctor.userId)}
            />
          ))}
    </div>
  );
};
