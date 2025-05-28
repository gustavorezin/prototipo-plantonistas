import { Button } from "@commons/components/ui/button";
import { Input } from "@commons/components/ui/input";
import { MultiSelect } from "@commons/components/ui/multi-select";
import { dateUtil } from "@commons/utils/date-util";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationService,
  IApplicationWithDoctorInfo,
} from "@services/applications-service";
import { IJob, jobsService } from "@services/jobs-service";
import { ISpecialty, specialtiesService } from "@services/specialties-service";
import { Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
});

type EditJobFormData = z.infer<typeof editJobSchema>;

interface EditJobModalProps {
  job: IJob | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditJobModal = ({ job, isOpen, onClose }: EditJobModalProps) => {
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [applications, setApplications] = useState<
    IApplicationWithDoctorInfo[]
  >([]);
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

  const isEditable = applications.length === 0;

  const onSubmit = async (data: EditJobFormData) => {
    await jobsService.update({
      ...data,
      id: job!.id,
      status: job!.status,
      specialtyIds: data.specialtyIds || [],
    });
    toast.success("Vaga atualizada com sucesso!");
    onClose();
    reset();
  };

  const fetchSpecialtyItems = useCallback(async () => {
    const response = await specialtiesService.list();
    setSpecialties(response.data);
  }, []);

  const fetchApplications = useCallback(async () => {
    const response = await applicationService.listByJobId(job!.id);
    setApplications(response.data);
  }, [job]);

  const handleOnDelete = async () => {
    await jobsService.remove(job!.id);
    toast.success("Vaga excluída com sucesso!");
    onClose();
  };

  useEffect(() => {
    if (!job) return;
    fetchSpecialtyItems();
    fetchApplications();
    setValue("title", job.title);
    setValue("description", job.description || "");
    setValue("slots", job.slots);
    setValue("startTime", dateUtil.formatToDatetimeLocal(job.startTime));
    setValue("endTime", dateUtil.formatToDatetimeLocal(job.endTime));
    setValue(
      "specialtyIds",
      job.specialties.map((s) => s.id)
    );
  }, [fetchSpecialtyItems, fetchApplications, job, setValue]);

  if (!isOpen || !job) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-primary">Editar vaga</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 mb-8">
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
              disabled={!isEditable}
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
                />
              )}
            />
          </div>

          {applications.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-sm mb-1">
                Candidaturas recebidas:
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {applications.map((a) => (
                  <li key={a.id}>
                    {a.doctor.name} — CRM {a.doctor.crm}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="flex-1 bg-red-800 hover:!bg-red-500"
              children={<Trash />}
              onClick={handleOnDelete}
            />
            <Button type="submit" title="Salvar alterações" />
          </div>
        </form>
      </div>
    </div>
  );
};
