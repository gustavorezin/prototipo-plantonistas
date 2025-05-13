import { inject, injectable } from "tsyringe";
import type { IJobsRepository } from "../domain/repositories/IJobsRepository";
import type { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { AppError } from "@commons/error/AppError";
import { CreateJobSchema } from "../domain/models/schemas/CreateJobSchema";

@injectable()
export class CreateJobService {
  constructor(
    @inject("JobsRepository")
    private jobsRepository: IJobsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: CreateJobSchema & { hospitalId: string }) {
    const user = await this.usersRepository.findById(data.hospitalId);
    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    if (user.userType !== "HOSPITAL") {
      throw new AppError("Usuário não é um hospital");
    }

    const job = await this.jobsRepository.create(data);
    return job;
  }
}
