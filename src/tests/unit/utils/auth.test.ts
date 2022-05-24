
import { generateAuthToken, validateAuthToken } from "../../../app/utils/auth"


describe("testing auth functions", () => {

  it("should generate a token", async () => {

    const token = await generateAuthToken({
      userId: "123456"
    });

    expect(token).toBeDefined()
    expect(typeof token.token).toBe("string")
  });

  it("should validate a token", async () => {

    const token = await generateAuthToken({
      userId: "123456"
    });

    const token_validate = await validateAuthToken(token.token)

    expect(token_validate).toBeDefined()
    expect(token_validate.userId).toBeDefined()
    expect(typeof token_validate.userId).toBe("string")
  })

})