import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/RentalsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory,
    );
  });
  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "Test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayAdd24hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24hours,
      user_id: "12345",
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24hours,
      }),
    ).rejects.toEqual(
      new AppError("There is a rental in progress for a user!"),
    );
  });
  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    const car = await carsRepositoryInMemory.create({
      id: "test",
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "Test1234",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      expected_return_date: dayAdd24hours,
      car_id: car.id,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        expected_return_date: dayAdd24hours,
        car_id: car.id,
      }),
    ).rejects.toEqual(new AppError("This car is unavailable!"));
  });
  it("Should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
