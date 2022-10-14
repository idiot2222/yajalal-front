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
import MyTeamHomePage from "@/pages/MyTeamHomePage";
import MyTeamInfoPage from "@/pages/MyTeamInfoPage";

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        {path: "/", component: HomePage},
        {path: "/login", component: LoginPage},
        {path: "/join", component: JoinPage},

        {path: "/my-page", component: UserInfoPage},
        {path: "/player-info", component: PlayerInfoPage},
        {path: "/player-create", component: PlayerCreatePage},
        {path: "/player-modify", component: PlayerModifyPage},

        {path: "/team", component: TeamPage},
        {path: "/myteam-home", component: MyTeamHomePage},
        {path: "/myteam-info", component: MyTeamInfoPage},

        {path: "/league", component: LeaguePage},
        {path: "/config", component: ConfigPage},
    ],
});

