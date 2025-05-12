import { CreateJobService } from "@modules/jobs/services/CreateJobService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class JobsController {
  async create(req: Request, res: Response) {
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      slots,
      specialtyIds,
    } = req.body;
    const hospitalId = req.user.id;

    const createJob = container.resolve(CreateJobService);
    const job = await createJob.execute({
      title,
      description,
      date,
      startTime,
      endTime,
      slots,
      specialtyIds,
      hospitalId,
    });

    res.status(201).json(job);
  }
}
