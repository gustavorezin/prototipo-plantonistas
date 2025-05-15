import { Button } from "@commons/components/ui/button";
import { Input } from "@commons/components/ui/input";
import { MultiSelect } from "@commons/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobsService } from "@services/jobs-service";
import { ISpecialty, specialtiesService } from "@services/specialties-service";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const newJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  slots: z.number().min(1),
  specialtyIds: z.array(z.string()),
});

type NewJobFormData = z.infer<typeof newJobSchema>;

interface NewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
}

export const NewJobModal = ({ isOpen, onClose, onSend }: NewJobModalProps) => {
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewJobFormData>({
    resolver: zodResolver(newJobSchema),
  });

  const onSubmit = async (data: NewJobFormData) => {
    console.log(data);
    /*  await jobsService.create({
      ...data,
    }); */
    toast.success("Perfil atualizado com sucesso!");
  };

  const fetchSpecialtyItems = useCallback(async () => {
    const response = await specialtiesService.list();
    setSpecialties(response.data);
  }, []);

  useEffect(() => {
    fetchSpecialtyItems();
  }, [fetchSpecialtyItems]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-primary">
          Cadastrar nova vaga
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <Input
              {...register("title")}
              isError={!!errors.title}
              placeholder="Título"
            />
            <Input
              {...register("description")}
              isError={!!errors.description}
              placeholder="Descrição"
            />
            <Input
              {...register("slots")}
              placeholder="Vagas disponíveis"
              type="number"
            />

            <Input
              {...register("startTime")}
              placeholder="Data/hora início"
              type="datetime-local"
            />
            <Input
              {...register("endTime")}
              placeholder="Data/hora fim"
              type="datetime-local"
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
                    field.onChange(selected.map((opt) => opt.value))
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
          <Button type="submit" title="Salvar alterações" />
        </form>

        {/* <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSend("");
              onClose();
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
          >
            Cadastrar
          </button>
        </div> */}
      </div>
    </div>
  );
};
