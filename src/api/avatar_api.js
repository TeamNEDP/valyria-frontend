import axios from "axios";

const instance = axios.create({
  headers:{'Content-Type':'multipart/form-data'},
  timeout: 10000,
});

export async function post_user_avatar(avatar) {
  return await instance.post("/api/user/avatar",{
    avatar:avatar,
  }
  );
}
