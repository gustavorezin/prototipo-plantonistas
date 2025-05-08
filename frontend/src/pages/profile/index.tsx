import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@commons/components/ui/input";
import { Button } from "@commons/components/ui/button";
import { MultiSelect } from "@commons/components/ui/multi-select";
import { SectionCard } from "@commons/components/section-card";
import { useAuth } from "@commons/hooks/use-auth";
import { usersService } from "@services/users-service";
import { ISpecialty, specialtiesService } from "@services/specialties-service";
import { toast } from "sonner";
import { IHospital } from "@services/hospitals-service";
import { IDoctor } from "@services/doctors-service";

const profileSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  address: z.string().optional(),
  crm: z.string().optional(),
  specialties: z.array(z.string()).optional(),
});

const updatePasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmNewPassword: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmNewPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

export const Profile = () => {
  const { user } = useAuth();
  const isUserDoctor = user?.userType === "DOCTOR";
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      const [userRes, specialtiesRes] = await Promise.all([
        usersService.show(),
        specialtiesService.list(),
      ]);

      const userData = userRes.data;
      const doctorOrHospital = isUserDoctor
        ? userData.doctor
        : userData.hospital;

      setValue("name", doctorOrHospital!.name);
      setValue("email", userData.email);
      setValue("phone", doctorOrHospital?.phone);
      if (isUserDoctor) {
        setValue("crm", (doctorOrHospital as IDoctor).crm);
        /*setValue(
          "specialties",
          doctorOrHospital!.specialties!.map((s: any) => s.id)
        );*/
      } else {
        setValue("address", (doctorOrHospital as IHospital).address);
      }

      setSpecialties(specialtiesRes.data);
    };

    fetchData();
  }, [isUserDoctor, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    //await usersService.update(data);
    console.log(data);
    toast.success("Perfil atualizado com sucesso!");
  };

  const onSubmitPassword = async (data: UpdatePasswordFormData) => {
    console.log(data);
    toast.success("Senha atualizada com sucesso!");
  };

  return (
    <div className="flex h-screen bg-white p-4 gap-4">
      <SectionCard.Root className="basis-2/3 space-y-4">
        <SectionCard.Header>Perfil</SectionCard.Header>
        <SectionCard.Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Input
                {...register("name")}
                isError={!!errors.name}
                placeholder="Nome"
              />
              <Input
                {...register("email")}
                isError={!!errors.email}
                placeholder="E-mail"
              />
              <Input {...register("phone")} placeholder="Telefone" />

              {isUserDoctor ? (
                <>
                  <Input {...register("crm")} placeholder="CRM" />
                  <Controller
                    name="specialties"
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
                        placeholder="Especialidades"
                      />
                    )}
                  />
                </>
              ) : (
                <Input {...register("address")} placeholder="Endereço" />
              )}
            </div>
            <Button type="submit" title="Salvar alterações" />
          </form>
        </SectionCard.Content>
      </SectionCard.Root>
      <SectionCard.Root className="basis-1/3 space-y-4">
        <SectionCard.Header>Alterar senha</SectionCard.Header>
        <SectionCard.Content>
          <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
            <div className="mb-8 space-y-4">
              <Input
                {...registerPassword("newPassword")}
                isError={!!errorsPassword.newPassword}
                placeholder="Nova senha"
                type="password"
              />
              <Input
                {...registerPassword("confirmNewPassword")}
                isError={!!errorsPassword.confirmNewPassword}
                placeholder="Confirmar nova senha"
                type="password"
              />
            </div>
            <Button type="submit" title="Alterar" />
          </form>
        </SectionCard.Content>
      </SectionCard.Root>
    </div>
  );
};
