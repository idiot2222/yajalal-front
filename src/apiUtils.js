import axios from "axios";
import store from './store';

const server = `http://localhost:8080`;
const jwt = () => localStorage.getItem("auth");

function jwtCheck(err) {
    if (err.response.data === "token expired") {
        store.commit('logout');
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
            .then(res => {
                return apiUtils.getPlayerId(res.data.id)
                    .then(res => {
                        store.commit('setPlayerId', res.data);

                        return res;
                    })
                    .catch(err => console.log(err));
            })
            .then(res => {
                return apiUtils.getTeamId(res.data)
                    .then(res => {
                        store.commit('setTeamId', res.data);

                        return "ok";
                    })
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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
            });
    },
    getTeamId(playerId) {
        return axios
            .get(`${server}/player/teamId/${playerId}`, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .catch(err => {
                jwtCheck(err);
                console.log(err);
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
                console.log(err);
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
                console.log(err);
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
                console.log(err);
            });
    },
    getMyTeamPlayers(teamId) {
        return axios
            .get(`${server}/player/playerList/${teamId}`, {
                headers: {
                    'Authorization': jwt()
                }
            })
            .catch(err => {
                jwtCheck(err);
                console.log(err);
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
                console.log(err);
            });
    },
    getLeagueBattingTopPlayersByPlayerId(currentPlayerId) {
        return axios
            .post(`${server}/player/ranking/batting/${currentPlayerId}`,
                {
                    count: 5,
                    stats: ['H', 'RBI', 'R', 'HR']
                },
                {
                    headers: {
                        'Authorization': jwt()
                    }
                })
            .catch(err => {
                jwtCheck(err);
                console.log(err);
            });
    },
    getLeaguePitchingTopPlayersByPlayerId(currentPlayerId) {
        return axios
            .post(`${server}/player/ranking/pitching/${currentPlayerId}`,
                {
                    count: 5,
                    stats: ['W', 'H', 'SV', 'K']
                },
                {
                    headers: {
                        'Authorization': jwt()
                    }
                })
            .catch(err => {
                jwtCheck(err);
                console.log(err);
            });
    },

    // match
    createNewMatch(leagueId, batters, pitchers) {
        return axios
            .post(`${server}/match/create/${leagueId}`,
                {
                    batters,
                    pitchers,
                },
                {
                    headers: {
                        'Authorization': jwt()
                    }
                })
            .catch(err => {
                jwtCheck(err);
                console.log(err);
            });
    }
}

export default apiUtils;

