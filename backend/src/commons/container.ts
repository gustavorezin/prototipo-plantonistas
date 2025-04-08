import { IDoctorsRepository } from "@modules/doctors/domain/repositories/IDoctorsRepository";
import { DoctorsRepository } from "@modules/doctors/infra/repositories/DoctorsRepository";
import { IHospitalsRepository } from "@modules/hospitals/domain/repositories/IHospitalsRepository";
import { HospitalsRepository } from "@modules/hospitals/infra/repositories/HospitalsRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/repositories/UsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IDoctorsRepository>(
  "DoctorsRepository",
  DoctorsRepository
);

container.registerSingleton<IHospitalsRepository>(
  "HospitalsRepository",
  HospitalsRepository
);
