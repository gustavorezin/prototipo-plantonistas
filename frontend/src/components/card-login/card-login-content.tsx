import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Toggle } from "../ui/toggle";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const registerSchema = loginSchema.extend({
  userType: z.enum(["HOSPITAL", "DOCTOR"]),
  name: z.string().min(3, "Nome é obrigatório"),
  address: z.string().optional(),
  phone: z.string().optional(),
  crm: z.string().optional(),
  specialty: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface CardLoginContentProps {
  isRegister: boolean;
}

export const CardLoginContent = ({ isRegister }: CardLoginContentProps) => {
  const [userType, setUserType] = useState<"HOSPITAL" | "DOCTOR">("HOSPITAL");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData | LoginFormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    defaultValues: isRegister ? { userType } : {},
  });

  const onSubmit = (data: RegisterFormData | LoginFormData) => {
    console.log("Dados enviados:", data);
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
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
          <Input
            {...register("name")}
            isError={isRegister && !!(errors as FieldErrors)?.name}
            placeholder={
              userType === "HOSPITAL" ? "Nome do Hospital" : "Nome do Médico"
            }
          />
          {userType === "HOSPITAL" ? (
            <Input
              {...register("address")}
              type="text"
              placeholder="Endereço"
            />
          ) : (
            <>
              <Input
                {...register("crm")}
                isError={isRegister && !!(errors as FieldErrors)?.crm}
                placeholder="CRM"
              />
              <Input {...register("specialty")} placeholder="Especialidade" />
            </>
          )}
          <Input {...register("phone")} type="tel" placeholder="Telefone" />
        </>
      )}

      <Input
        {...register("email")}
        isError={!!errors.email}
        type="email"
        placeholder="E-mail"
      />

      <Input
        {...register("password")}
        isError={!!errors.password}
        type="password"
        placeholder="Senha"
      />

      <Button type="submit" title={isRegister ? "Cadastrar" : "Entrar"} />
    </form>
  );
};
