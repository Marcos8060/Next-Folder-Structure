import React, {useEffect, useState} from "react";
import DataGrid, {
  Column,
  Pager,
  Paging,
  SearchPanel,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { useAuth } from "../../../hooks/use-auth";
import { useRouter } from "next/router";
import {getAllBeneficiaries, getAllFailedBeneficiaries, getFailedBeneficiaries} from "../../../slices/beneficiaries";
import {useDispatch, useSelector} from "../../../store";
import {AuthGuard} from "../../../hocs/auth-guard";
import {DashboardLayout} from "../../../components/layouts/dashboard";
import Head from "next/head";
import {appName} from "../../../utils/constants";
import MKBox from "../../../components/@mui-components/box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "../../../components/@mui-components/typography";
import Dashboard from "../../../components/dashboard";
import {Card, TextField} from "@mui/material";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import BeneficiaryDataGrid from "../../../components/dashboard/beneficiaries/beneficiary-data-grid";
import {getAllBranches, getAllCounties} from "../../../slices/branches";
import Autocomplete from "@mui/material/Autocomplete";
import MKButton from "../../../components/@mui-components/button";
import {Filter, FilterAlt} from "@mui/icons-material";


const Beneficiaries = () => {
  const router = useRouter();
  const authUser = useAuth();
  const { beneficiaries, failedBeneficiaries } = useSelector(({ beneficiaries }) => beneficiaries )
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const { counties, branches } = useSelector(({ branches }) => branches)

    console.log("COUNTIES ",branches)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchFailedBen = async () => {
        await dispatch(getAllFailedBeneficiaries(authUser, authUser?.user?.sponsorId ))
    }
    const fetchAllBen = async () => {
        await dispatch(getAllBeneficiaries(authUser,  authUser?.user?.sponsorId));
    }

  useEffect(() => {
      dispatch(getAllCounties(authUser))
      dispatch(getAllBranches(authUser))
  }, []);

  return (
     <>
       <Head>
         <title>Beneficiaries | {appName}</title>
       </Head>
       <MKBox
           component="main"
           sx={{
             flexGrow: 1,
             py: 2,
           }}
       >
         <Container maxWidth="xl">
           <MKBox sx={{ mb: 4 }}>
             <Grid container justifyContent="space-between" spacing={3}>
               <Grid item>
                 <MKTypography variant="h4">Beneficiaries</MKTypography>
               </Grid>
             </Grid>
           </MKBox>
             <Card sx={{ p:2, m:2}}>
                 <TabContext value={value}>
                     {/*<TabList onChange={handleChange} aria-label="lab API tabs example">*/}
                     {/*    <Tab label="Approved" value={0} />*/}
                     {/*    <Tab label="Failed" value={1} />*/}
                     {/*</TabList>*/}
                     <MKBox>
                         {value === 0 && (
                             <BeneficiaryDataGrid {...{ beneficiaries}}/>
                         )}
                         {value === 1 && (
                             <BeneficiaryDataGrid {...{ beneficiaries: failedBeneficiaries}}/>
                         )}
                     </MKBox>
                 </TabContext>

             </Card>
         </Container>
       </MKBox>

     </>
  );
};

Beneficiaries.getLayout = (page) => (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
)

export default Beneficiaries;
