import axios from "axios";

const instance = axios.create({
  timeout: 10000,
  
});
export async function get_user_information(id) {
  return (await instance.get("/api/user/"+id+"/info")).data.data;
}