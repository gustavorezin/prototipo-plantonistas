import { IApplicationsRepository } from "@modules/applications/domain/repositories/IApplicationsRepository";
import { ApplicationsRepository } from "@modules/applications/infra/repositories/ApplicationsRepository";
import { ListByJobApplicationService } from "@modules/applications/services/ListByJobApplicationService";
import { UpdateStatusApplicationService } from "@modules/applications/services/UpdateStatusApplicationService";
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
import { SendMailToUserService } from "@modules/users/services/SendMailToUserService";
import { MailProvider } from "./infra/providers/MailProvider";
import { JwtTokenProvider } from "./infra/providers/JwtTokenProvider";

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

container.registerSingleton<IApplicationsRepository>(
  "ApplicationsRepository",
  ApplicationsRepository
);

// Services
container.registerSingleton(
  "ListByJobApplicationService",
  ListByJobApplicationService
);
container.registerSingleton(
  "UpdateStatusApplicationService",
  UpdateStatusApplicationService
);
container.registerSingleton("SendMailToUserService", SendMailToUserService);

// Providers
container.registerSingleton("MailProvider", MailProvider);
container.registerSingleton("TokenProvider", JwtTokenProvider);
