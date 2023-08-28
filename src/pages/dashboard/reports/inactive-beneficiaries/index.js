import React from "react";
import { AuthGuard } from "../../../../hocs/auth-guard";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Button } from "@mui/material";
import MKButton from "../../../../components/@mui-components/button";
import MKTypography from "../../../../components/@mui-components/typography";
import MKBox from "../../../../components/@mui-components/box";
import Head from "next/head";
import { appName } from "../../../../utils/constants";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import InactiveBeneficiaryDataGrid from "../../../../components/dashboard/beneficiaries/inactive-beneficiary-data-grid";


const Uploads = () => {
  return (
    <>
      <Head>
        <title> File Uploads | {appName}</title>
      </Head>
      <MKBox
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <MKBox sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <MKTypography variant="h4">{" Inactive Beneficiaries"}</MKTypography>
              </Grid>
            </Grid>
          </MKBox>
          <Card sx={{ p: 2, mt: 2 }}>
            <InactiveBeneficiaryDataGrid />
          </Card>
        </Container>
      </MKBox>
    </>
  );
};


Uploads.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Uploads;
