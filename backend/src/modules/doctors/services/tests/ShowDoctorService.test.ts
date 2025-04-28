import { FakeDoctorsRepository } from "@modules/doctors/domain/repositories/fakes/FakeDoctorsRepository";
import { ShowDoctorService } from "../ShowDoctorService";
import { AppError } from "@commons/error/AppError";

let repository: FakeDoctorsRepository;
let service: ShowDoctorService;

describe("ShowDoctor", () => {
  beforeAll(() => {
    repository = new FakeDoctorsRepository();
    service = new ShowDoctorService(repository);

    repository.addDoctor({
      userId: "1",
      name: "Doctor 1",
      crm: "123456",
      specialty: "specialty",
      available: true,
      phone: "phone",
    });
  });

  it("should be able to show a doctor", async () => {
    // act
    const doctor = await service.execute("1");
    // assert
    expect(doctor.userId).toBe("1");
  });

  it("should not be able to show a doctor with non-existing id", async () => {
    // act
    const doctorPromise = service.execute("non-existing-id");
    // assert
    await expect(doctorPromise).rejects.toBeInstanceOf(AppError);
  });
});
