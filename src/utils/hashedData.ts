import bcrypt from "bcrypt";

export const hashData = async (data: string, saltRound = 10) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const hashedData = await bcrypt.hash(data, saltRound);

    return hashedData;
  } catch (error) {
    throw error;
  }
};

export const verifyHashedData = async (unHashed: string, hashed: string) => {
  try {
    const match = await bcrypt.compare(unHashed, hashed);
    return match;
  } catch (error) {
    throw error;
  }
};
