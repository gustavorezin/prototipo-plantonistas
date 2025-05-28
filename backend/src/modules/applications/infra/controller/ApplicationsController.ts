import { CreateApplicationService } from "@modules/applications/services/CreateApplicationService";
import { ListByJobApplicationService } from "@modules/applications/services/ListByJobApplicationService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ApplicationController {
  async create(req: Request, res: Response) {
    const { jobId } = req.body;
    const doctorId = req.user.id;

    const createApplication = container.resolve(CreateApplicationService);
    const application = await createApplication.execute({
      jobId,
      doctorId,
    });

    res.status(201).json(application);
  }

  async listByJob(req: Request, res: Response) {
    const { jobId } = req.params;

    const listByJobApplicationService = container.resolve(
      ListByJobApplicationService
    );
    const applications = await listByJobApplicationService.execute(jobId);

    res.status(200).json(applications);
  }
}
