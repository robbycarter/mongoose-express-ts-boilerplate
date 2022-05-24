import { UserSignupValidator } from "../../../app/validators/userValidator"


describe("Test user validator", () => {

  it("should test if user object passes joi validation", async () => {

    const validUser = { email: "test@email.com", password: "qwerty" }
    const validationResult = await UserSignupValidator(validUser)
    expect(validationResult).toBeTruthy()

  })

  it("should test if user object fails joi validation password", async () => {

    const action = async () => {
      const invalidUser = { email: "test@email.com" }
      await UserSignupValidator(invalidUser)
    };

    expect(action()).rejects.toThrowError()

  })

  it("should test if user object fails joi validation email", async () => {

    const action = async () => {
      const invalidUser = { password: "qwerty" }
      await UserSignupValidator(invalidUser)
    };

    expect(action()).rejects.toThrowError()

  })

})