import axios from "axios";
import { API_URL } from "../config";

const adminShopRegisterAPI = async (shopInfo) => {
  // console.log(shopInfo);

  const response = await axios.post(
       `${API_URL}/api/adminShop`, 
        shopInfo
  );
  return response;

};


const getAdminShopAPI = async (_id) => {

  const response = await axios.get(
       `${API_URL}/api/shops/${_id}`
  );
  return response;

};


export default adminShopRegisterAPI;
export {getAdminShopAPI};