import axios from "axios";

const apiUtils =  {
    join(dto) {
        return axios
            .post("http://localhost:8080/api/user/join", dto)
            .then(res => res.data)
            .catch(err => console.log(err));
    },
}

export default apiUtils;

