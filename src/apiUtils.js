import axios from "axios";
import store from './store';

const server = `http://localhost:8080`;
const jwt = () => localStorage.getItem("auth");

function jwtCheck(err) {
    if (err.response.data === "token expired") {
        store.commit('logout');

        location.reload();
    }
}

const apiUtils = {

    // user -----------
    join(dto) {
        return axios
            .post(`${server}/account/join`, dto)
            .catch(err => console.log(err));
    },
    login(dto) {
        return axios
            .post(`${server}/account/login`, dto)
            .then(res => {
                localStorage.setItem('auth', res.headers.authorization);

                store.commit('loginSuccessHandler', {
                    currentUser: res.data,
                });

                return res;
            })
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
                    'Authorization': jwt()
                }
            })
            .then(res => res.data)
            .catch(err => {
                jwtCheck(err);
                console.log(err)
            });
    },
    updateUserInfo(id, dto) {
        return axios
            .post(`${server}/account/update/${id}`, dto, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .catch(err => {
                jwtCheck(err);
                console.log(err)
            });
    },

    // player -----------
    createPlayer(userId, dto) {
        return axios
            .post(`${server}/player/create/${userId}`, dto, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .then(res => res)
            .catch(err => {
                jwtCheck(err);
                console.log(err)
            });
    },
    getPlayerId(userId) {
        return axios
            .get(`${server}/player/playerId/${userId}`, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .catch(err => {
                jwtCheck(err);
                return err;
            });
    },
    getPlayerInfo(userId) {
        return axios
            .get(`${server}/player/info/${userId}`, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .then(res => res)
            .catch(err => {
                jwtCheck(err);
                return err;
            });
    },
    getPlayerAllInfo(userId) {
        return axios
            .get(`${server}/player/allInfo/${userId}`, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .then(res => res)
            .catch(err => {
                jwtCheck(err);
                return err.response;
            });
    },
    updatePlayerInfo(userId, dto) {
        return axios
            .post(`${server}/player/update/${userId}`, dto, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .then(res => res)
            .catch(err => {
                jwtCheck(err);
                return err.response
            });
    },

    // team
    getTeamDashBoardBattingByPlayerId(playerId) {
        return axios
            .get(`${server}/team/dashboard/batting/${playerId}`, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .then(res => res.data.content)
            .catch(err => {
                jwtCheck(err);
                return err.response
            });
    },
    getTeamDashBoardPitchingByPlayerId(playerId) {
        return axios
            .get(`${server}/team/dashboard/pitching/${playerId}`, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .then(res => res.data.content)
            .catch(err => {
                jwtCheck(err);
                return err.response
            });
    },
    getTeamNameById(playerId) {
        return axios
            .get(`${server}/team/teamName/${playerId}`, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .then(res => res.data)
            .catch(err => {
                jwtCheck(err);
                return err.response
            });
    },

    // league
    getLeagueInfo(currentPlayerId) {
        return axios
            .get(`${server}/league/dashboard/${currentPlayerId}`, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .catch(err => {
                jwtCheck(err);
                return err.response
            });
    }
}

export default apiUtils;

