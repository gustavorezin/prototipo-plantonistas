import { Button } from "@commons/components/ui/button";
import { Input } from "@commons/components/ui/input";
import { MultiSelect } from "@commons/components/ui/multi-select";
import { Toggle } from "@commons/components/ui/toggle";
import { useAuth } from "@commons/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISpecialty, specialtiesService } from "@services/specialties-service";
import { usersService } from "@services/users-service";
import { useEffect, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const registerSchema = loginSchema.extend({
  userType: z.enum(["HOSPITAL", "DOCTOR"]),
  name: z.string().min(3, "Nome é obrigatório"),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    .transform((val) => val.replace(/\D/g, "")),
  crm: z.string().optional(),
  specialties: z.array(z.string()).optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface CardLoginContentProps {
  isRegister: boolean;
}

export const CardLoginContent = ({ isRegister }: CardLoginContentProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"HOSPITAL" | "DOCTOR">("HOSPITAL");
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormData | LoginFormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    defaultValues: isRegister ? { userType } : {},
  });

  const handleOnSubmit = async (data: RegisterFormData | LoginFormData) => {
    if (!isRegister) {
      await login({ email: data.email, password: data.password });
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } else {
      await usersService.create({
        ...(data as RegisterFormData),
        userType,
      });

      await login({ email: data.email, password: data.password });

      toast.success("Usuário cadastrado com sucesso!");
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchSpecialties = async () => {
      const response = await specialtiesService.list();
      setSpecialties(response.data);
    };

    fetchSpecialties();
  }, []);

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit(handleOnSubmit)}>
      {isRegister && (
        <>
          <Toggle
            options={[
              { label: "Hospital", value: "HOSPITAL" },
              { label: "Médico", value: "DOCTOR" },
            ]}
            selected={userType}
            onChange={(value) => setUserType(value as "HOSPITAL" | "DOCTOR")}
          />
          <input type="hidden" value={userType} {...register("userType")} />
          <Input
            id="name"
            label="Nome"
            {...register("name")}
            isError={isRegister && !!(errors as FieldErrors)?.name}
            placeholder={
              userType === "HOSPITAL" ? "Nome do Hospital" : "Nome do Médico"
            }
          />
          {userType === "HOSPITAL" ? (
            <Input
              id="address"
              label="Endereço"
              {...register("address")}
              type="text"
              placeholder="Endereço"
            />
          ) : (
            <>
              <Input
                id="crm"
                label="CRM"
                {...register("crm")}
                isError={isRegister && !!(errors as FieldErrors)?.crm}
                placeholder="CRM"
              />
              <Controller
                name="specialties"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    label="Especialidades"
                    id="specialties"
                    {...register("specialties")}
                    isMulti
                    options={specialties.map((spec) => ({
                      value: spec.id,
                      label: spec.name,
                    }))}
                    placeholder="Selecione uma ou mais especialidades"
                    onChange={(selectedOptions) =>
                      field.onChange(selectedOptions.map((opt) => opt.value))
                    }
                    value={specialties
                      .filter((spec) => field.value?.includes(spec.id))
                      .map((spec) => ({
                        value: spec.id,
                        label: spec.name,
                      }))}
                  />
                )}
              />
            </>
          )}
          <Input
            id="phone"
            label="Telefone"
            {...register("phone")}
            isError={isRegister && !!(errors as FieldErrors)?.phone}
            type="tel"
            placeholder="Telefone"
            mask="(__) _____-____"
            replacement={{ _: /\d/ }}
          />
        </>
      )}

      <Input
        id="email"
        label="E-mail"
        {...register("email")}
        isError={!!errors.email}
        type="email"
        placeholder="E-mail"
      />

      <Input
        id="password"
        label="Senha"
        {...register("password")}
        isError={!!errors.password}
        type="password"
        placeholder="Senha"
      />

      <Button type="submit" title={isRegister ? "Cadastrar" : "Entrar"} />
    </form>
  );
};
