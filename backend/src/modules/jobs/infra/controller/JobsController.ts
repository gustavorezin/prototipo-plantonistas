import { CreateJobSchema } from "@modules/jobs/domain/models/schemas/CreateJobSchema";
import { CreateJobService } from "@modules/jobs/services/CreateJobService";
import { ListJobsByHospitalService } from "@modules/jobs/services/ListJobsByHospitalService";
import { Request, Response } from "express";
import { TypedRequestBody } from "src/@types/express/typed-request-body";
import { container } from "tsyringe";

export class JobsController {
  async create(req: TypedRequestBody<CreateJobSchema>, res: Response) {
    const { title, description, startTime, endTime, slots, specialtyIds } =
      req.body;
    const hospitalId = req.user.id;

    const createJob = container.resolve(CreateJobService);
    const job = await createJob.execute({
      title,
      description,
      startTime,
      endTime,
      slots,
      specialtyIds,
      hospitalId,
    });

    res.status(201).json(job);
  }

  async listByHospital(req: Request, res: Response) {
    const hospitalId = req.user.id;

    const listJobsByHospital = container.resolve(ListJobsByHospitalService);
    const jobs = await listJobsByHospital.execute(hospitalId);

    res.status(200).json(jobs);
  }
}
