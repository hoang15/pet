import axiosClient from "./axiosClient";

class UserRoleApi {
  getAll = (params) => {
    const url = "/userRoles";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/userRoles/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  post = (params) => {
    const url = "/userRoles";
    return axiosClient.post(url, params);
  };
  delete = (id) => {
    const url = `/userRoles/${id}`;
    return axiosClient.delete(url);
  };
  edit = (params) => {
    const url = `/userRoles/${params.id}`;
    return axiosClient.patch(url, params);
  };
}
const userRoleApi = new UserRoleApi();
export default userRoleApi;
