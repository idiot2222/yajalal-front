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

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        {path: "/", component: HomePage},
        {path: "/login", component: LoginPage},
        {path: "/join", component: JoinPage},
        {path: "/my-page", component: UserInfoPage},
        {path: "/player-info", component: PlayerInfoPage},
        {path: "/team", component: TeamPage},
        {path: "/league", component: LeaguePage},
        {path: "/config", component: ConfigPage},
    ],
});

