import { UpdateStatusApplicationSchema } from "@modules/applications/domain/models/schemas/UpdateStatusApplicationSchema";
import { CreateApplicationService } from "@modules/applications/services/CreateApplicationService";
import { ListByUserApplicationService } from "@modules/applications/services/ListByDoctorApplicationService";
import { ListByJobApplicationService } from "@modules/applications/services/ListByJobApplicationService";
import { UpdateStatusApplicationService } from "@modules/applications/services/UpdateStatusApplicationService";
import { Request, Response } from "express";
import { TypedRequestBody } from "src/@types/express/typed-request-body";
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

  async updateStatus(
    req: TypedRequestBody<UpdateStatusApplicationSchema>,
    res: Response
  ) {
    const { applicationId, status } = req.body;

    const updateStatusApplicationService = container.resolve(
      UpdateStatusApplicationService
    );
    const application = await updateStatusApplicationService.execute({
      applicationId,
      status,
    });

    res.status(200).json(application);
  }

  async listByJob(req: Request, res: Response) {
    const { jobId } = req.params;

    const listByJobApplicationService = container.resolve(
      ListByJobApplicationService
    );
    const applications = await listByJobApplicationService.execute(jobId);

    res.status(200).json(applications);
  }

  async listByUser(req: Request, res: Response) {
    const id = req.user.id;
    const { userType } = req.params as { userType: "HOSPITAL" | "DOCTOR" };

    const listByUserApplicationService = container.resolve(
      ListByUserApplicationService
    );
    const applications = await listByUserApplicationService.execute(
      id,
      userType
    );

    res.status(200).json(applications);
  }
}
