
import { generateAuthToken } from "../../../app/utils/auth"


describe("testing auth functions", () => {

  it("should generate a token", async () => {

    const token = await generateAuthToken({
      userId: "123456"
    });

    expect(token).toBeDefined()
  });


})