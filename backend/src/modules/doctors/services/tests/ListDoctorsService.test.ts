import { IDoctor } from "@modules/doctors/domain/models/IDoctor";
import { FakeDoctorsRepository } from "@modules/doctors/domain/repositories/fakes/FakeDoctorsRepository";

const repository = new FakeDoctorsRepository();

describe("ListDoctors", () => {
  it("should be able to list all doctors", async () => {
    const fakeDoctors: IDoctor[] = [
      {
        userId: "1",
        name: "Doctor 1",
        crm: "123456",
        specialties: ["Cardiology"],
        phone: "1234567890",
      },
      {
        userId: "2",
        name: "Doctor 2",
        crm: "654321",
        specialties: ["Neurology"],
        phone: "1234567890",
      },
    ];

    fakeDoctors.forEach((doctor) => {
      repository.addDoctor(doctor);
    });

    const doctors = await repository.findAll();
    expect(doctors).toEqual(fakeDoctors);
    expect(doctors.length).toBe(2);
  });
});
