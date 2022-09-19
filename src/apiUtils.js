import axios from "axios";

const server = `http://localhost:8080`;
const jwt = localStorage.getItem("auth");

const apiUtils =  {
    join(dto) {
        return axios
            .post(`${server}/account/join`, dto)
            .catch(err => console.log(err));
    },
    login(dto) {
        return axios
            .post(`${server}/account/login`, dto)
            .catch(err => err);
    },
    logout() {
        axios
            .post(`${server}/account/logout`)
            .then(res => res.data)
            .catch(err => console.log(err));
    },
    getUserInfo(id) {
        return axios
            .get(`${server}/account/info/${id}`, {
                headers: {
                    'Authorization': jwt
                }
            })
            .then(res => res.data)
            .catch(err => err);
    },
    updateUserInfo(id, dto) {
        console.log(dto)
        return axios
            .post(`${server}/account/update/${id}`, dto, {
                headers: {
                    'Authorization': jwt
                }
            })
            .catch(err => console.log(err));
    }
}

export default apiUtils;

