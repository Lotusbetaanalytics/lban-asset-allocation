import {
  FaThLarge,
  FaChartBar,
  FaCogs,
  FaQuestionCircle,
  FaUsers,
  FaUserShield,
  FaVoteYea,
  FaSignOutAlt,
  FaBoxes,
  FaBorderAll,
  FaClipboard,
  FaEllipsisH,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowCircleRight,
  FaArrowAltCircleRight,
  FaUsersCog,
  FaLayerGroup,
  FaCog,
} from "react-icons/fa";


export const NavLinks: any = section => {

  const assetLink = {
    name: "Assets",
    Icon: FaLayerGroup,
    url: "/app/asset/manage",
    class: "asset",
  }
  const switchLink = {
    name: "Switch",
    Icon: FaUsersCog,
    url: "/app/employee/dashboard",
    class: "employee",
  }
  const settingLink = {
    name: "Settings",
    Icon: FaCog,
    url: `/app/${section ? section + "/" : ""}settings`,
    class: "settings",
  }
  const logoutLink = {
    name: "Logout",
    // Icon: FaArrowAltCircleRight,
    Icon: FaArrowCircleRight,
    url: "/",
    class: "logout",
  }

  const links = [
    {
      name: "Dashboard",
      Icon: FaThLarge,
      // Icon: FaBoxes,
      url: `/app/${section ? section + "/" : ""}dashboard`,
      class: "dashboard",
    },
    {
      name: "All Requests",
      Icon: FaClipboard,
      url: `/app/${section ? section + "/" : ""}request/manage`,
      class: "all",
    },
    {
      name: "Pending Requests",
      Icon: FaEllipsisH,
      url: `/app/${section ? section + "/" : ""}request/manage/pending`,
      class: "pending",
    },
    {
      name: "Approved Requests",
      Icon: FaCheckCircle,
      url: `/app/${section ? section + "/" : ""}request/manage/approved`,
      class: "approved",
    },
    {
      name: "Declined Requests",
      Icon: FaTimesCircle,
      url: `/app/${section ? section + "/" : ""}request/manage/declined`,
      class: "declined",
    },
    // {
    //   name: "Assets",
    //   Icon: FaLayerGroup,
    //   url: "/app/asset/manage",
    //   class: "asset",
    // },
    // {
    //   name: "Switch",
    //   Icon: FaUsersCog,
    //   url: "/app/employee/dashboard",
    //   class: "employee",
    // },
    // {
    //   name: "Logout",
    //   // Icon: FaArrowAltCircleRight,
    //   Icon: FaArrowCircleRight,
    //   url: "/app/logout",
    //   class: "logout",
    // },
  ]

  if (section == "") links.push(assetLink)
  if (section != "employee") links.push(switchLink)
  if (section != "employee") links.push(settingLink)
  links.push(logoutLink)

  return links
};
