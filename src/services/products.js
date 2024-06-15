import axios from "axios";

const api1 = "https://fakestoreapi.com"
const api2 = "https://dummyjson.com"

let baseUrl = process.env.baseUrl || api2;

const getProducts = async () => {
  const response = await axios.get(baseUrl + "/products");
  return response.data;
};

const getProductsID = async (id) => {
  const response = await axios.get(baseUrl + `/products/${id}`);
  return response.data;
}; 

export { getProducts , getProductsID};
