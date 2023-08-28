import React from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Button } from "@mui/material";
import DataGrid, {
  Column,
  Pager,
  Paging,
  SearchPanel,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import MKButton from "../../../components/@mui-components/button";
import { users } from "../../../api-requests/dummy-data";
import AddUser from "./addUser";
import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const Users = () => {
  return (
    <Container>
      <Typography mt={4} variant="h6">
        All Users
      </Typography>
      <UsersDataGrid />
    </Container>
  );
};

Users.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Users;
