import { MdOutlineDashboard } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { CgPlayButtonO } from "react-icons/cg";
import { FaHandshakeAngle } from "react-icons/fa6";
import { MdLeaderboard } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";

// export const NAVIGATION= [
//     {
//       img: "nav/home.svg",
//       img_light: "nav/home_light.svg",
//       title: "nav.home",
//       route: "/",
//     },
//     {
//       img: "nav/smile.svg",
//       img_light: "nav/smile_light.svg",
//       title: "nav.first",
//       route: "/first_upload",
//     },
//     {
//       img: "nav/fire.svg",
//       img_light: "nav/fire_light.svg",
//       title: "nav.trending",
//       route: "/trends",
//     },
//     {
//       img: "nav/play.svg",
//       img_light: "nav/play_light.svg",
//       title: "nav.new",
//       route: "/new",
//     },

//     {
//       img: "nav/communities.svg",
//       img_light: "nav/communities_light.svg",
//       title: "nav.communities",
//       route: "communities",
//     },
//     {
//       img: "nav/leaderboard.svg",
//       img_light: "nav/leaderboard_light.svg",
//       title: "nav.leaderboard",
//       route: "/leaderboard",
//     },
//     {
//       img: "nav/download.svg",
//       img_light: "nav/download_light.svg",
//       title: "download_apps",
//     },
//     {
//       img: "nav/spk_network.png",
//       img_light: "nav/home_light.svg",
//       title: "about_3speak",
//     },
//   ];

const ICONS = {
  MdDashboard: MdOutlineDashboard,
  FaRegSmile: FaRegSmile,
  FaFire: FaFire,
  CgPlayButtonO: CgPlayButtonO,
  FaHandshakeAngle: FaHandshakeAngle,
  MdLeaderboard: MdLeaderboard,
  FaDownload: FaDownload
}

export const NAVIGATION= [
    {
      icon: ICONS.MdDashboard,
      title: "Home",
      route: "/",
    },
    {
      icon: ICONS.FaRegSmile,
      title: "First",
      route: "/first_upload",
    },
    {
      icon: ICONS.FaFire,
      title: "Trending",
      route: "/trends",
    },
    {
      icon: ICONS.CgPlayButtonO,
      title: "New",
      route: "/new",
    },

    {
      icon: ICONS.FaHandshakeAngle,
      title: "Communities",
      route: "/communities",
    },
    {
      icon: ICONS.MdLeaderboard,
      title: "Leaderboard",
      route: "/leaderboard",
    },
    {
      icon: ICONS.FaDownload,
      title: "Download Apps",
      route: "/"
    },
    {
      icon: ICONS.FaRegSmile,
      title: "About 3Speak",
      route: "/"
    },
  ];


  //data items for the mini sidebar
  export const MiniNavigationData = [
    {
      img: "nav/home.svg",
      img_light: "nav/home_light.svg",
      title: "nav.home",
      route: "/",
    },
    {
      img: "nav/smile.svg",
      img_light: "nav/smile_light.svg",
      title: "nav.first",
      route: "/first_upload",
    },
    {
      img: "nav/fire.svg",
      img_light: "nav/fire_light.svg",
      title: "nav.trending",
      route: "/trends",
    },
    {
      img: "nav/play.svg",
      img_light: "nav/play_light.svg",
      title: "nav.new",
      route: "/new",
    },
    {
      img: "nav/communities.svg",
      img_light: "nav/communities_light.svg",
      title: "nav.communities",
      route: "communities",
    },
    {
      img: "nav/leaderboard.svg",
      img_light: "nav/leaderboard_light.svg",
      title: "nav.leaderboard",
      route: "/leaderboard",
    },
    {
      img: "nav/download.svg",
      img_light: "nav/download_light.svg",
      title: "download_apps",
    },
    {
      img: "nav/spk_network.png",
      img_light: "nav/spk_network.png",
      title: "about_3speak",
    },
  ]