import { UserType, RequestStatus } from "@prisma/client";
import { prisma } from "../src/commons/infra/prisma/prismaClient";
import { HashProvider } from "../src/commons/providers/HashProvider";

const hashProvider = new HashProvider();

async function main() {
  const hashedPassword = await hashProvider.generateHash("123456");

  const hospitalUser = await prisma.user.create({
    data: {
      email: "hospital@email.com",
      password: hashedPassword,
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
      password: hashedPassword,
      userType: UserType.DOCTOR,
      doctor: {
        create: {
          name: "João da Silva",
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

  // Outros so pra ter mais dados
  await prisma.user.create({
    data: {
      email: "hospital2@email.com",
      password: hashedPassword,
      userType: UserType.HOSPITAL,
      hospital: {
        create: {
          name: "Hospital Santa Otilia",
          address: "Orleans",
          phone: "(11) 99999-9999",
        },
      },
    },
  });
  await prisma.user.create({
    data: {
      email: "hospital3@email.com",
      password: hashedPassword,
      userType: UserType.HOSPITAL,
      hospital: {
        create: {
          name: "Hospital São Jorge",
          address: "Cricíuma",
          phone: "(11) 99999-9999",
        },
      },
    },
  });
  await prisma.user.create({
    data: {
      email: "hospital4@email.com",
      password: hashedPassword,
      userType: UserType.HOSPITAL,
      hospital: {
        create: {
          name: "Hospital São José",
          address: "Cricíuma",
          phone: "(11) 99999-9999",
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: "arrasca@email.com",
      password: hashedPassword,
      userType: UserType.DOCTOR,
      doctor: {
        create: {
          name: "Arrasca",
          crm: "101010-RJ",
          specialty: "Meio campo",
          phone: "(11) 98888-8888",
        },
      },
    },
  });
  await prisma.user.create({
    data: {
      email: "pedro@email.com",
      password: hashedPassword,
      userType: UserType.DOCTOR,
      doctor: {
        create: {
          name: "Pedro",
          crm: "999999-RJ",
          specialty: "Atacante",
          phone: "(11) 98888-8888",
        },
      },
    },
  });
  await prisma.user.create({
    data: {
      email: "bh@email.com",
      password: hashedPassword,
      userType: UserType.DOCTOR,
      doctor: {
        create: {
          name: "Bruno Henrique",
          crm: "272727-RJ",
          specialty: "Ponta",
          phone: "(11) 98888-8888",
        },
      },
    },
  });
  await prisma.user.create({
    data: {
      email: "rossi@email.com",
      password: hashedPassword,
      userType: UserType.DOCTOR,
      doctor: {
        create: {
          name: "Rossi",
          crm: "111111-RJ",
          specialty: "Goleiro",
          phone: "(11) 98888-8888",
        },
      },
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
