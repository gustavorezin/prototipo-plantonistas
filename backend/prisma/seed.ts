import { UserType, RequestStatus } from "@prisma/client";
import { prisma } from "../src/commons/infra/prisma/prismaClient";
import { HashProvider } from "../src/commons/providers/HashProvider";

const hashProvider = new HashProvider();

async function main() {
  const hospitalPassword = await hashProvider.generateHash("123456");
  const doctorPassword = await hashProvider.generateHash("123456");

  const hospitalUser = await prisma.user.create({
    data: {
      email: "hospital@email.com",
      password: hospitalPassword,
      userType: UserType.HOSPITAL,
      hospital: {
        create: {
          name: "Hospital Central",
          address: "Rua das Clínicas, 123",
          phone: "(11) 99999-9999",
        },
      },
    },
  });

  const doctorUser = await prisma.user.create({
    data: {
      email: "medico@email.com",
      password: doctorPassword,
      userType: UserType.DOCTOR,
      doctor: {
        create: {
          name: "Dr. João da Silva",
          crm: "123456-SP",
          specialty: "Cardiologia",
          phone: "(11) 98888-8888",
        },
      },
    },
  });

  await prisma.request.create({
    data: {
      hospitalId: hospitalUser.id,
      doctorId: doctorUser.id,
      status: RequestStatus.PENDING,
      message: "Plantão no sábado das 08h às 20h.",
    },
  });

  console.log("🌱 Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
