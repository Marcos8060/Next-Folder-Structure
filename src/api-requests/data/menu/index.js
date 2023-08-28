import { FoodBank, Home, People, Settings } from "@mui/icons-material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from '@mui/icons-material/Upload';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Diagram } from "devextreme-react";
import { USER_ROLES } from "../../../utils/constants";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

export const getMenuItems = (t) => [
  {
    items: [
      {
        title: t("Dashboard"),
        path: "/dashboard",
        icon: <Home fontSize="small" />,
      },
      {
        title: t("Uploads"),
        path: "/dashboard/uploads",
        icon: <UploadIcon fontSize="small" />,
      },
      {
        title: t("Users"),
        path: "/dashboard/users",
        icon: <People fontSize="small" />,
      },
      {
        title: t("Sponsor"),
        path: "/dashboard/sponsor",
        icon: <People fontSize="small" />,
      },

      {
        title: t("Roles"),
        path: "/dashboard/roles",
        icon: <Settings fontSize="small" />,
      },
      {
        title: t("Beneficiaries"),
        path: "/dashboard/beneficiaries",
        icon: <Diversity3Icon fontSize="small" />,
      },
      {
        title: t("Organization"),
        path: "/dashboard/organization",
        icon: <CorporateFareIcon fontSize="small" />,
        children: [
          {
            title: t("Branches"),
            path: "/dashboard/organization/branches",
            icon: <VisibilityIcon fontSize="small" />,
          },
          {
            title: t("Departments"),
            path: "/dashboard/organization/departments",
            icon: <VisibilityIcon fontSize="small" />,
          },
          {
            title: t("Sections"),
            path: "/dashboard/organization/sections",
            icon: <VisibilityIcon fontSize="small" />,
          },
        ],
      },
      {
        title: t("Reports"),
        path: "/dashboard/branches",
        icon: <CorporateFareIcon fontSize="small" />,
        children: [
          {
            title: t("Active Beneficiries"),
            path: "/dashboard/branches",
            icon: <VisibilityIcon fontSize="small" />,
            children:[
              {
                title: 'Uploaded',
                path: "/dashboard/reports/uploaded",
                icon: <CorporateFareIcon fontSize="small" />,
              },
              {
                title: 'Processed',
                path: "/dashboard/reports/processed",
                icon: <CorporateFareIcon fontSize="small" />,
              }
            ]
          },
          {
            title: t("Sponsors"),
            path: "/dashboard/branches",
            icon: <VisibilityIcon fontSize="small" />,
            children:[
              {
                title: 'Individual Sponsors',
                path: "/dashboard/reports/uploaded",
                icon: <CorporateFareIcon fontSize="small" />,
              },
              {
                title: 'Get by branch',
                path: "/dashboard/reports/uploaded",
                icon: <CorporateFareIcon fontSize="small" />,
              },
              {
                title: 'Get by county',
                path: "/dashboard/reports/uploaded",
                icon: <CorporateFareIcon fontSize="small" />,
              },
            ]
          },
          {
            title: t("Sections"),
            path: "/dashboard/branches",
            icon: <VisibilityIcon fontSize="small" />,
          },
        ],
      },
    ],
  },
];
