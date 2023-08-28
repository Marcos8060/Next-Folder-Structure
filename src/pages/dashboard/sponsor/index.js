import React,{useEffect} from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import {Typography, Button, IconButton, Card} from "@mui/material";
import DataGrid, {
  Column,
  Pager,
  Paging,
  SearchPanel,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { sponsors } from "../../../api-requests/dummy-data";
import AddSponsor from "./addSponsor";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ViewDetails from "./[sponsorId]";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Visibility } from "@mui/icons-material";
import AlertDialog from "./createSponsorUser";
import Link from "next/link";
import { useSelector,useDispatch } from "react-redux";
import { getAllSponsors } from "../../../slices/sponsors";
import { useAuth } from "../../../hooks/use-auth";
import SponsorsDataGrid from "../../../components/dashboard/sponsors/sponsors-data-grid";
import Head from "next/head";
import {appName} from "../../../utils/constants";
import Grid from "@mui/material/Grid";
import MKTypography from "../../../components/@mui-components/typography";
import MKBox from "../../../components/@mui-components/box";

const Sponsor = () => {
  const [anchorEl, setAnchorEl] = React.useState();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedSponsor, setSelectedSponsor] = React.useState(null);
  const dispatch = useDispatch();
  const authUser = useAuth();
  const { sponsors } = useSelector(({ sponsors}) => sponsors )

  const handleOnOpen = () => {
    setDrawerOpen(true);
  };
  const handleOnClose = () => {
    setDrawerOpen(false);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchSponsors = async () =>{
    await dispatch(getAllSponsors(authUser));
  }

  useEffect(() =>{
    fetchSponsors();
  },[])




  return (
    <>
      <Head>
        <title>All Sponsors | {appName}</title>
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
                <MKTypography variant="h4">{'All Sponsors'}</MKTypography>
              </Grid>
            </Grid>
          </MKBox>
          <Card sx={{ p: 2, mt: 2 }}>
            <SponsorsDataGrid />
          </Card>
        </Container>
      </MKBox>
    </>
  );
};

Sponsor.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Sponsor;
