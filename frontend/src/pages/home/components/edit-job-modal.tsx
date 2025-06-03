import { Button } from "@commons/components/ui/button";
import { Input } from "@commons/components/ui/input";
import { MultiSelect } from "@commons/components/ui/multi-select";
import { dateUtil } from "@commons/utils/date-util";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationService,
  ApplicationStatus,
  IApplicationWithDoctorInfo,
} from "@services/applications-service";
import { IJob, jobsService, JobStatus } from "@services/jobs-service";
import { ISpecialty, specialtiesService } from "@services/specialties-service";
import { Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { UserModal } from "./user-modal";

const applicationStatusOptions = [
  {
    value: "PENDING",
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "ACCEPTED",
    label: "Aceito",
    color: "bg-green-100 text-green-800",
  },
  { value: "REJECTED", label: "Rejeitado", color: "bg-red-100 text-red-800" },
] satisfies { value: ApplicationStatus; label: string; color: string }[];

const jobStatusOptions = [
  { value: "OPEN", label: "Aberta" },
  { value: "CLOSED", label: "Fechada" },
  { value: "CANCELLED", label: "Cancelada" },
  { value: "COMPLETED", label: "Concluída" },
] satisfies { value: JobStatus; label: string }[];

const editJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  startTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data/hora de início inválida",
    })
    .transform((val) => new Date(val).toISOString()),
  endTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data/hora de fim inválida",
    })
    .transform((val) => new Date(val).toISOString()),
  slots: z.number().positive(),
  specialtyIds: z.array(z.string()).optional(),
  status: z.enum(["OPEN", "CLOSED", "CANCELLED", "COMPLETED"]),
});

type EditJobFormData = z.infer<typeof editJobSchema>;

interface EditJobModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EditJobModal = ({ id, isOpen, onClose }: EditJobModalProps) => {
  const [job, setJob] = useState<IJob | null>(null);
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [applications, setApplications] = useState<
    IApplicationWithDoctorInfo[]
  >([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setUserId(id);
    setIsModalOpen(true);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditJobFormData>({
    resolver: zodResolver(editJobSchema),
    defaultValues: {
      specialtyIds: [],
    },
  });

  const onSubmit = async (data: EditJobFormData) => {
    await jobsService.update({
      ...data,
      id: job!.id,
      specialtyIds: data.specialtyIds || [],
    });
    toast.success("Vaga atualizada com sucesso!");
    handleClose();
    reset();
  };

  const fetchSpecialtyItems = useCallback(async () => {
    const response = await specialtiesService.list();
    setSpecialties(response.data);
  }, []);

  const fetchApplications = useCallback(async () => {
    const response = await applicationService.listByJobId(job!.id);
    const applicationsData = response.data;
    setApplications(applicationsData);
    setIsEditable(applicationsData.length === 0);
  }, [job]);

  const fetchJob = useCallback(async () => {
    const response = await jobsService.show(id);
    const jobData = response.data;
    setJob(jobData);

    await fetchSpecialtyItems();

    setValue("title", jobData.title);
    setValue("description", jobData.description || "");
    setValue("slots", jobData.slots);
    setValue("startTime", dateUtil.formatToDatetimeLocal(jobData.startTime));
    setValue("endTime", dateUtil.formatToDatetimeLocal(jobData.endTime));
    setValue("specialtyIds", jobData.specialties?.map((s) => s.id) || []);
    setValue("status", jobData.status);
  }, [id, fetchSpecialtyItems, setValue]);

  const handleOnDelete = async () => {
    await jobsService.remove(job!.id);
    toast.success("Vaga excluída com sucesso!");
    handleClose();
  };

  const handleStatusJobChange = async (newStatus: JobStatus) => {
    await jobsService.updateStatus(job!.id, newStatus);
    toast.success("Status da vaga atualizado!");
    fetchJob();
  };

  const handleStatusApplicationChange = async (
    applicationId: string,
    newStatus: ApplicationStatus
  ) => {
    await applicationService.updateStatus(applicationId, newStatus);
    toast.success("Status da candidatura atualizado!");
    fetchApplications();
  };

  const handleClose = () => {
    onClose();
    reset();
    setJob(null);
    setApplications([]);
    setIsEditable(false);
  };

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  useEffect(() => {
    if (job) {
      fetchApplications();
    }
  }, [job, fetchApplications]);

  if (!isOpen || !job) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-4xl shadow-xl flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Formulário de edição */}
        <div className="flex-1 pr-6">
          <h2 className="text-lg font-bold mb-4 text-primary">Editar vaga</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 mb-8">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={jobStatusOptions}
                    onChange={(selected) => {
                      const status = selected?.value as JobStatus;
                      field.onChange(status);
                      handleStatusJobChange(status);
                    }}
                    value={
                      field.value
                        ? {
                            value: field.value,
                            label:
                              field.value === "OPEN"
                                ? "Aberta"
                                : field.value === "CLOSED"
                                ? "Fechada"
                                : field.value === "CANCELLED"
                                ? "Cancelada"
                                : "Concluída",
                          }
                        : null
                    }
                    placeholder="Status da vaga"
                  />
                )}
              />
              <Input
                {...register("title")}
                isError={!!errors.title}
                placeholder="Título"
                disabled={!isEditable}
              />
              <Input
                {...register("description")}
                isError={!!errors.description}
                placeholder="Descrição"
                disabled={!isEditable}
              />
              <Input
                {...register("slots", { valueAsNumber: true })}
                isError={!!errors.slots}
                placeholder="Vagas disponíveis"
                type="number"
                disabled={!isEditable}
              />

              <Input
                {...register("startTime")}
                isError={!!errors.startTime}
                placeholder="Data/hora início"
                type="datetime-local"
                disabled={!isEditable}
              />
              <Input
                {...register("endTime")}
                isError={!!errors.endTime}
                placeholder="Data/hora fim"
                type="datetime-local"
                disabled={!isEditable}
              />
              <Controller
                name="specialtyIds"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    isMulti
                    options={specialties.map((s) => ({
                      value: s.id,
                      label: s.name,
                    }))}
                    onChange={(selected) =>
                      field.onChange(
                        selected ? selected.map((opt) => opt.value) : []
                      )
                    }
                    value={specialties
                      .filter((spec) => field.value?.includes(spec.id))
                      .map((spec) => ({
                        value: spec.id,
                        label: spec.name,
                      }))}
                    placeholder="Especialidades desejadas"
                    isDisabled={!isEditable}
                  />
                )}
              />
            </div>

            {isEditable && (
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  className="flex-1 bg-red-800 hover:!bg-red-500"
                  children={<Trash />}
                  onClick={handleOnDelete}
                />
                <Button type="submit" title="Salvar alterações" />
              </div>
            )}
          </form>
        </div>

        <div className="w-72 border-l border-gray-300 pl-6 flex flex-col">
          <h3 className="font-semibold text-sm mb-3">
            Candidaturas ({applications.length})
          </h3>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2 max-h-[calc(100vh-200px)] cursor-pointer">
            <ul className="space-y-3">
              {applications.map((a) => (
                <li
                  key={a.id}
                  className="text-sm p-2 rounded-lg bg-gray-50"
                  onClick={() => handleCardClick(a.doctorId)}
                >
                  <div className="font-medium">{a.doctor.name}</div>
                  <div className="text-muted-foreground text-xs">
                    CRM {a.doctor.crm}
                  </div>

                  <div className="flex gap-1 flex-wrap mt-2">
                    {applicationStatusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleStatusApplicationChange(a.id, option.value)
                        }
                        className={`text-xs px-2 py-1 rounded-full cursor-pointer hover:opacity-80 ${
                          a.status === option.value
                            ? option.color
                            : "bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {userId && (
            <UserModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              userId={userId}
              onSend={(message) => console.log(message)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
