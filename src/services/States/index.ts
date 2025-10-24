import axios from "axios";
import { states } from "./type";


export function getStates() {
  return axios
    .get<states[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.data);
}