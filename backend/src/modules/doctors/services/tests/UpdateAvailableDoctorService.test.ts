import { FakeDoctorsRepository } from "@modules/doctors/domain/repositories/fakes/FakeDoctorsRepository";
import { UpdateAvailableDoctorService } from "../UpdateAvailableDoctorService";
import { AppError } from "@commons/error/AppError";

let repository: FakeDoctorsRepository;
let service: UpdateAvailableDoctorService;

describe("UpdateAvailableDoctor", () => {
  beforeEach(() => {
    repository = new FakeDoctorsRepository();
    service = new UpdateAvailableDoctorService(repository);
  });

  it("should be able to update the available status of a doctor", async () => {
    // arrange
    repository.addDoctor({
      userId: "1",
      crm: "crm",
      name: "name",
      available: false,
      phone: "phone",
      specialty: "specialty",
    });
    // act
    await service.execute("1", true);
    // assert
    const updatedDoctor = await repository.findById("1");
    expect(updatedDoctor?.available).toBe(true);
  });

  it("should not be able to update the available status of a doctor with non-existing id", async () => {
    // act
    const doctorPromise = service.execute("non-existing-id", true);
    // assert
    await expect(doctorPromise).rejects.toBeInstanceOf(AppError);
    await expect(doctorPromise).rejects.toHaveProperty(
      "message",
      "Doctor not found"
    );
  });
});
