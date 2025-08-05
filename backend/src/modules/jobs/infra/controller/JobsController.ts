import { CreateJobSchema } from "@modules/jobs/domain/models/schemas/CreateJobSchema";
import { UpdateJobSchema } from "@modules/jobs/domain/models/schemas/UpdateJobSchema";
import { CreateJobService } from "@modules/jobs/services/CreateJobService";
import { DeleteJobService } from "@modules/jobs/services/DeleteJobService";
import { ListJobsService } from "@modules/jobs/services/ListJobsService";
import { ListJobsByHospitalService } from "@modules/jobs/services/ListJobsByHospitalService";
import { UpdateJobService } from "@modules/jobs/services/UpdateJobService";
import { Request, Response } from "express";
import { TypedRequestBody } from "src/@types/express/typed-request-body";
import { container } from "tsyringe";
import { ShowJobService } from "@modules/jobs/services/ShowJobService";
import { UpdateStatusJobSchema } from "@modules/jobs/domain/models/schemas/UpdateStatusJobSchema";
import { UpdateStatusJobService } from "@modules/jobs/services/UpdateStatusJobService";
import { ListJobsByDoctorService } from "@modules/jobs/services/ListJobsByDoctorService";

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

  async update(req: TypedRequestBody<UpdateJobSchema>, res: Response) {
    const id = req.params.id;
    const {
      title,
      description,
      startTime,
      endTime,
      slots,
      specialtyIds,
      status,
    } = req.body;

    const updateJob = container.resolve(UpdateJobService);
    const job = await updateJob.execute({
      id,
      title,
      description,
      startTime,
      endTime,
      slots,
      specialtyIds,
      status,
    });

    res.status(200).json(job);
  }

  async updateStatus(
    req: TypedRequestBody<UpdateStatusJobSchema>,
    res: Response
  ) {
    const { jobId, status } = req.body;

    const updateStatusJob = container.resolve(UpdateStatusJobService);
    const job = await updateStatusJob.execute({ jobId, status });

    res.status(200).json(job);
  }

  async show(req: Request, res: Response) {
    const id = req.params.id;
    const showJob = container.resolve(ShowJobService);
    const job = await showJob.execute(id);
    res.status(200).json(job);
  }

  async listByHospital(req: Request, res: Response) {
    const hospitalId = req.user.id;

    const listJobsByHospital = container.resolve(ListJobsByHospitalService);
    const jobs = await listJobsByHospital.execute(hospitalId);

    res.status(200).json(jobs);
  }

  async listByDoctor(req: Request, res: Response) {
    const doctorId = req.user.id;

    const listJobsByDoctor = container.resolve(ListJobsByDoctorService);
    const jobs = await listJobsByDoctor.execute(doctorId);

    res.status(200).json(jobs);
  }

  async list(_req: Request, res: Response) {
    const listJobs = container.resolve(ListJobsService);
    const jobs = await listJobs.execute();

    res.status(200).json(jobs);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const deleteJob = container.resolve(DeleteJobService);
    await deleteJob.execute(id);

    res.status(204).send();
  }
}
