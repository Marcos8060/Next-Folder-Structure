import React, { useEffect } from "react";
import { AuthGuard } from "../../../../hocs/auth-guard";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Button } from "@mui/material";
import DepartmentGrid from "../../../../components/dashboard/departments/department-data-grid";

const Departments = () => {
  return (
    <Container>
      <Typography mt={4} variant="h6">
        Departments
      </Typography>
      <DepartmentGrid />
    </Container>
  );
};

Departments.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Departments;
