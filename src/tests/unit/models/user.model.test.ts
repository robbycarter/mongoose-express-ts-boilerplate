import UserModal from "../../../app/models/User";
import { dropCollections, dropDatabase, setUp } from "../../setup/db"

beforeAll(async () => {
  await setUp();
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDatabase();
});

describe("Test User Modal", () => {

  it("should create a user document", async () => {

    const validUser = { email: "abc@gmail.com", password: "qwerty" }

    const savedUser = await new UserModal(validUser).save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(validUser.email);
    expect(savedUser.password).toBe(validUser.password);
    expect(savedUser.date).toBeDefined();

  })

  it("should be able to encrypt the user password", async () => {

    const validUser = { email: "abc@gmail.com", password: "qwerty" }

    const savedUser = new UserModal(validUser);
    savedUser.password = savedUser.hashPassword(savedUser.password)
    await savedUser.save()

    expect(savedUser.password).toBeDefined();
    expect(savedUser.comparePassword(validUser.password, savedUser.password)).toBeTruthy()

  })


  it("should throw a validation error", () => {


    const action = async () => {
      const validUser = { email: "abc@gmail.com" }
      const savedUser = await new UserModal(validUser).save()
      console.log(savedUser.validateSync())
    };

    expect(action()).rejects.toThrowError()

  })

  it("should find the user", async () => {


    const validUser = { email: "abc@gmail.com", password: "qwerty" }
    const savedUser = await new UserModal(validUser).save();

    const userDoc = await UserModal.findOne({ email: validUser.email })

    expect(userDoc).toBeDefined()
    expect(userDoc.email).toBe(validUser.email)

  })

})