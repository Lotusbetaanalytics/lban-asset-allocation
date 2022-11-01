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
  FaEllipsisH,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowCircleRight,
  FaArrowAltCircleRight,
} from "react-icons/fa";


export const NavLinks: any = section => [
  {
    name: "Dashboard",
    Icon: FaThLarge,
    // Icon: FaBoxes,
    url: "/app/dashboard",
    class: "dashboard",
  },
  {
    name: "Pending Requests",
    Icon: FaEllipsisH,
    url: `/app/${section ? section + "/" : ""}requests`,
    class: "pending",
  },
  {
    name: "Approved Requests",
    Icon: FaCheckCircle,
    url: `/app/${section ? section + "/" : ""}approved`,
    class: "approved",
  },
  {
    name: "Declined Requests",
    Icon: FaTimesCircle,
    url: `/app/${section ? section + "/" : ""}declined`,
    class: "declined",
  },
  {
    name: "Assets",
    Icon: FaCheckCircle,
    url: "/app/assets",
    class: "asset",
  },
  {
    name: "Declined Requests",
    Icon: FaArrowAltCircleRight,
    url: "/app/logout",
    class: "logout",
  },

  // {
  //   name: "Candidate Management",
  //   Icon: FaUsers,
  //   class: "candidate",
  //   items: [
  //     {
  //       name: "Create Candidate",
  //       url: "/app/candidate",
  //     },
  //     {
  //       name: "Bulk Upload",
  //       url: "/app/candidate/bulk",
  //     },
  //     {
  //       name: "Manage Candidates",
  //       url: "/app/candidate/view",
  //     },
  //   ],
  // },
  // {
  //   name: "Exam Management",
  //   Icon: FaVoteYea,
  //   class: "exam",
  //   items: [
  //     {
  //       name: "Create Exam Template",
  //       url: "/app/exam",
  //     },
  //     {
  //       name: "View Exam Templates",
  //       url: "/app/exam/view",
  //     },
  //     {
  //       name: "Schedule New Exam",
  //       url: "/app/exam/schedule",
  //     },
  //     {
  //       name: "View Schedule Exams",
  //       url: "/app/exam/schedule/view",
  //     },
  //     {
  //       name: "Manage Exam Sections",
  //       url: "/app/exam/section/view",
  //     },
  //     {
  //       name: "Manage Exam Questions",
  //       url: "/app/exam/question/view",
  //     },
  //   ],
  // },
  // {
  //   name: "Question Management",
  //   Icon: FaQuestionCircle,
  //   class: "question",
  //   items: [
  //     {
  //       name: "Create Question",
  //       url: "/app/question",
  //     },
  //     {
  //       name: "Bulk Question Upload",
  //       url: "/app/question/bulk",
  //     },
  //     {
  //       name: "View Questions",
  //       url: "/app/question/view",
  //     },
  //     {
  //       name: "Create Question Category",
  //       url: "/app/question/category",
  //     },
  //     {
  //       name: "View Question Categories",
  //       url: "/app/question/category/view",
  //     },
  //   ],
  // },
  // {
  //   name: "Reports",
  //   Icon: FaChartBar,
  //   class: "reports",
  //   items: [
  //     {
  //       name: "Shortlisted Candidates",
  //       url: "/app/reports/shortlisted",
  //     },
  //     {
  //       name: "Exam Schedules",
  //       url: "/app/reports/schedules",
  //     },
  //     {
  //       name: "Performance Analysis",
  //       url: "/app/reports/peformance",
  //     },
  //   ],
  // },
  // {
  //   name: "System Administration",
  //   Icon: FaUserShield,
  //   class: "system",
  //   items: [
  //     {
  //       name: "Manage Division",
  //       url: "/app/admin/division",
  //     },
  //     {
  //       name: "Manage Job Roles",
  //       url: "/app/admin/roles",
  //     },
  //     {
  //       name: "Manage Venues",
  //       url: "/app/admin/venues",
  //     },
  //     {
  //       name: "Manage Batches",
  //       url: "/app/admin/batches",
  //     },
  //     {
  //       name: "Manage Admin",
  //       url: "/app/admin",
  //     },
  //     {
  //       name: "Audit Trail",
  //       url: "/app/admin/audit",
  //     },
  //   ],
  // },

  // {
  //   name: "General Settings",
  //   Icon: FaCogs,
  //   class: "settings",
  //   items: [
  //     {
  //       name: "Email Template",
  //       url: "/app/settings/email",
  //     },
  //     {
  //       name: "SMS Template",
  //       url: "/app/settings/sms",
  //     },
  //   ],
  // },
  // {
  //   name: "Logout",
  //   Icon: FaSignOutAlt,
  //   class: "logout",
  //   url: "/",
  // },
];
// export default NavLinks
