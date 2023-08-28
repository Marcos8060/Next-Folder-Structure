import Dashboard from "../../components/dashboard";
import {appName} from "../../utils/constants";
import MKTypography from "../../components/@mui-components/typography";
import Head from "next/head";
import Container from "@mui/material/Container";
import MKBox from "../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import {AuthGuard} from "../../hocs/auth-guard";
import {DashboardLayout} from "../../components/layouts/dashboard";
import {useMounted} from "../../hooks/use-mounted";
import {useCallback, useEffect} from "react";
import {useDispatch,useSelector} from "../../store";
import {useAuth} from "../../hooks/use-auth";
import {getDashboardData} from "../../slices/dashboard";

const DashboardPage = () => {
    const isMounted = useMounted();
    const dispatch = useDispatch();
    const authUser = useAuth();
    const { data } = useSelector(({ dashboard}) => dashboard);

    const fetchDashboardData = async () => {
        try {
            await dispatch(getDashboardData(authUser))
        }
        catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        fetchDashboardData();
    }, []);

    return(
        <>
            <Head>
                <title>Dashboard | {appName}</title>
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
                                <MKTypography variant="h4">Dashboard</MKTypography>
                            </Grid>
                        </Grid>
                    </MKBox>
                    <Grid container spacing={4}>
                       <Grid item md={12} xs={12}>
                           <Dashboard data={data}/>
                       </Grid>
                    </Grid>
                </Container>
            </MKBox>
        </>
    )
}

DashboardPage.getLayout = (page) => (
        <DashboardLayout>{page}</DashboardLayout>
);

export default DashboardPage;