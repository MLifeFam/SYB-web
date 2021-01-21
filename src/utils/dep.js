import axios from "axios";
import { request } from "./axios";

export function dep(num) {
    return axios
    .get("https://sjswbot.site/dep")
    .then((res) => {
        console.log(res.data.result[num-1].department);

    })
    .catch((error) => {

    });
}
  

