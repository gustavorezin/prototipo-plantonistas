import { IDoctorsRepository } from "@modules/doctors/domain/repositories/IDoctorsRepository";
import { DoctorsRepository } from "@modules/doctors/infra/repositories/DoctorsRepository";
import { IHospitalsRepository } from "@modules/hospitals/domain/repositories/IHospitalsRepository";
import { HospitalsRepository } from "@modules/hospitals/infra/repositories/HospitalsRepository";
import { IJobsRepository } from "@modules/jobs/domain/repositories/IJobsRepository";
import { JobsRepository } from "@modules/jobs/infra/repositories/JobsRepository";
import { ISpecialtiesRepository } from "@modules/specialties/domain/repositories/ISpecialtiesRepository";
import { SpecialtiesRepository } from "@modules/specialties/infra/repositories/SpecialtiesRepository";
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

container.registerSingleton<ISpecialtiesRepository>(
  "SpecialtiesRepository",
  SpecialtiesRepository
);

container.registerSingleton<IJobsRepository>("JobsRepository", JobsRepository);
