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

  const specialties = [
    "Alergologia",
    "Anestesiologia",
    "Angiologia",
    "Cancerologia (Oncologia)",
    "Cardiologia",
    "Cirurgia Geral",
    "Cirurgia Plástica",
    "Clínica Médica",
    "Dermatologia",
    "Endocrinologia",
    "Gastroenterologia",
    "Geriatria",
    "Ginecologia e Obstetrícia",
    "Hematologia",
    "Infectologia",
    "Mastologia",
    "Nefrologia",
    "Neurocirurgia",
    "Neurologia",
    "Oftalmologia",
    "Ortopedia e Traumatologia",
    "Otorrinolaringologia",
    "Pediatria",
    "Psiquiatria",
    "Reumatologia",
    "Urologia",
  ];

  for (const name of specialties) {
    await prisma.specialty.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

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
