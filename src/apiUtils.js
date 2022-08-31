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
            .post("http://localhost:8080/account/login", dto)
            .catch(err => console.log(err));
    },
    logout() {
        axios
            .post("http://localhost:8080/account/logout")
            .then(res => res.data)
            .catch(err => console.log(err));
    },
    userInfo(id) {
        const jwt = localStorage.getItem("auth");

        return axios
            .get(`http://localhost:8080/account/info/${id}`, {
                headers: {
                    'Authorization': jwt
                }
            })
            .then(res => res.data)
            .catch(err => console.log(err));
    },
}

export default apiUtils;

