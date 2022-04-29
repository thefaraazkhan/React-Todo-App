import axios from "axios";
import { API_URL } from "../config";

const signup = async (adminRegistrationInfo) => {
  const response = await axios.post(
    `${API_URL}/api/adminRegister`,
    adminRegistrationInfo
  );
  return response;
};

const signin = async (adminLoginInfo) => {
  const response = await axios.post(
    `${API_URL}/api/adminLogin`,
    adminLoginInfo
  );
  return response;
};

export default signup;
export { signin };
