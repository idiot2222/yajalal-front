import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/pages/HomePage";
import TeamPage from "@/pages/TeamPage";
import LeaguePage from "@/pages/LeaguePage";
import LoginPage from "@/pages/LoginPage";
import JoinPage from "@/pages/JoinPage";
import ConfigPage from "@/pages/ConfigPage";
import UserInfoPage from "@/pages/UserInfoPage";
import PlayerInfoPage from "@/pages/PlayerInfoPage";
import PlayerCreatePage from "@/pages/PlayerCreatePage";
import PlayerModifyPage from "@/pages/PlayerModifyPage";
import MyTeamDashboardPage from "@/pages/MyTeamDashboardPage";
import MyTeamPage from "@/pages/MyTeamPage";
import MyLeaguePage from "@/pages/MyLeaguePage";
import MatchAddPage from "@/pages/MatchAddPage";
import PlayerStatPage from "@/pages/PlayerStatPage";

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        {path: "/", component: HomePage},
        {path: "/login", component: LoginPage},
        {path: "/join", component: JoinPage},

        {path: "/my-page", component: UserInfoPage},
        {path: "/player-info", component: PlayerInfoPage},
        {path: "/player-stat", component: PlayerStatPage},
        {path: "/player-create", component: PlayerCreatePage},
        {path: "/player-modify", component: PlayerModifyPage},

        {path: "/team", component: TeamPage},
        {path: "/myteam-dashboard", component: MyTeamDashboardPage},
        {path: "/myteam-home", component: MyTeamPage},

        {path: "/league", component: LeaguePage},
        {path: "/my-league", component: MyLeaguePage},

        {path: "/match-add", component: MatchAddPage},

        {path: "/config", component: ConfigPage},

    ],
});

