import axios from "axios";

const server = `http://localhost:8080`;
const jwt = localStorage.getItem("auth");

const apiUtils =  {

    // user -----------
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
            .catch(err => console.log(err));
    },
    updateUserInfo(id, dto) {
        return axios
            .post(`${server}/account/update/${id}`, dto, {
                headers: {
                    'Authorization': jwt
                }
            })
            .catch(err => console.log(err));
    },

    // player -----------
    createPlayer(userId, dto) {
        return axios
            .post(`${server}/player/create/${userId}`, dto, {
                headers: {
                    'Authorization': jwt
                }
            })
            .then(res => res)
            .catch(err => console.log(err));
    },
    getPlayerInfo(userId) {
        return axios
            .get(`${server}/player/info/${userId}`, {
                headers: {
                    'Authorization': jwt
                }
            })
            .then(res => res)
            .catch(err => err);
    },
    getPlayerAllInfo(userId) {
        return axios
            .get(`${server}/player/allInfo/${userId}`, {
                headers: {
                    'Authorization': jwt
                }
            })
            .then(res => res)
            .catch(err => err.response);
    },
    updatePlayerInfo(userId, dto) {
        console.log(dto)
        return axios
            .post(`${server}/player/update/${userId}`, dto, {
                headers: {
                    'Authorization': jwt
                }
            })
            .then(res => res)
            .catch(err => err.response);
    },
}

export default apiUtils;

