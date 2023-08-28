import {Box, Card, Container, Divider, Grid, IconButton, Typography} from "@mui/material";
import React, { useEffect } from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { AuthGuard } from "../../../hocs/auth-guard";

import DataGrid, {
  Column,
  Pager,
  Paging,
  SearchPanel,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { sponsors } from "../../../api-requests/dummy-data";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch,useSelector } from "react-redux";
import {getActiveBeneficiaries, getAllSponsorUsers, getRejectedBeneficiaries} from "../../../slices/sponsors";
import { useAuth } from "../../../hooks/use-auth";
import { useRouter } from "next/router";
import SponsorBeneficiariesDatagrid from "../../../components/dashboard/sponsors/sponsor-beneficiaries-datagrid";
import MKTypography from "../../../components/@mui-components/typography";
import Avatar from "@mui/material/Avatar";
import {getInitials} from "../../../utils/helper-functions";

const ViewDetails = (props) => {
  const router = useRouter();
  const sponsorId = router.query?.sponsorId;
  const { data } = props;
  const [value, setValue] = React.useState(0);
  const authUser = useAuth();
  const dispatch = useDispatch();
  const {  activeBeneficiaries, rejectedBeneficiaries } = useSelector(({ sponsors}) => sponsors )

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const getSponsorUsers = async(authUser,sponsorId) =>{
  //   await dispatch(getAllSponsorUsers(authUser,sponsorId))
  // }

  const getApprovedBen = async () => {
    await dispatch(getActiveBeneficiaries(authUser, { sponsorId}))
  }

  const getRejectedBen = async () => {
    await dispatch(getRejectedBeneficiaries(authUser, { sponsorId}))
  }


  useEffect(() => {
    if (sponsorId) {
      //dispatch(getAllSponsorUsers(authUser, {sponsorId}));
      getApprovedBen();
      getRejectedBen();
    }
  }, []);

  return (
    <Container>

      <Grid my={2} mx={3} container>
        <Grid display={"flex"} alignItems={"center"} gap={2} md={6} xs={12}>
          <Box>
            <Avatar variant={'circular'}>
              {getInitials(router.query?.name)}
            </Avatar>
            {/*<img width={100} src="/profile.png" alt="" />*/}
          </Box>
          <Box>
            <Typography variant="h6">{router.query?.name}</Typography>
            {/*<Typography>marcos@gmail.com</Typography>*/}
            {/*<Typography>Nairobi Branch</Typography>*/}
          </Box>
        </Grid>
      </Grid>
      <Card sx={{ p:2 }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} mx={4}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Approved Beneficiaries" value={0} />
                <Tab label="Rejected Beneficiaries" value={1} />
              </TabList>
            </Box>
            <TabPanel value={0}>
              <SponsorBeneficiariesDatagrid data={activeBeneficiaries}/>
            </TabPanel>
            <TabPanel value={1}>
              <SponsorBeneficiariesDatagrid data={rejectedBeneficiaries}/>
            </TabPanel>
          </TabContext>
        </Box>
      </Card>

    </Container>
  );
};

ViewDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ViewDetails;
