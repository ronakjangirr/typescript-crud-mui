import axios from "axios";
import { AddUserInterface } from "../models/types";
export class CrudService {
  private static baseUrl: string =
    "https://63441d6a2dadea1175b568d5.mockapi.io/crud-youtube";

  public static readUserData() {
    let userUrl = `${this.baseUrl}`;
    return axios.get(userUrl);
  }

  public static createUser(data: AddUserInterface) {
    return axios.post(this.baseUrl, data);
  }

  public static readUserById(id: string) {
    return axios.get(`${this.baseUrl}/${id}`);
  }

  public static updateUser(id: string, data: AddUserInterface) {
    return axios.put(`${this.baseUrl}/${id}`, data);
  }

  public static deleteUser(id: string) {
    return axios.delete(`${this.baseUrl}/${id}`);
  }
}
