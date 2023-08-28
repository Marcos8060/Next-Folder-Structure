import React,{useEffect} from "react";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { AuthGuard } from "../../../../hocs/auth-guard";
import { Container } from "@mui/system";
import { Typography, Button } from "@mui/material";
import BranchDataGrid from "../../../../components/dashboard/branches/branches-data-grid";

const Branches = () => {

  return (
    <Container>
      <Typography mt={4} variant="h6">
        All Branches
      </Typography>
      <BranchDataGrid />
    </Container>
  );
};

Branches.getLayout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default Branches;
