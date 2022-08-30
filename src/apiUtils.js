import axios from "axios";

const apiUtils =  {
    join(dto) {
        return axios
            .post("http://localhost:8080/account/join", dto)
            .then(res => res.data)
            .catch(err => console.log(err));
    },
    login(dto) {
        return axios
            .post("http://localhost:8080/login", dto)
            .catch(err => console.log(err));
    },
    logout() {
        axios
            .post("http://localhost:8080/logout")
            .then(res => res.data)
            .catch(err => console.log(err));
    },
    userInfo() {
        return axios
            .get("http://localhost:8080/account/info/")
    },
}

export default apiUtils;
