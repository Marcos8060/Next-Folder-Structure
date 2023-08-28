import MKBox from "../@mui-components/box";
import DashboardCards from "./dashboard-cards";
import {Alert} from "@mui/material";
import Grid from "@mui/material/Grid";
import DashboardTreeMap from "./dashboard-tree-map";
import {useEffect, useState} from "react";
import {assessedTreeDataCat, assessedTreeDataDepartments, riskTreeDataSections} from "../../utils/constants";
import MonthlyComplianceReport from "./monthly-report";

const filterOptions = [
    { id: 1, label: 'Regions' },
    //{ id: 2, label: 'Control Categories' },
];
const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState(filterOptions);
    const [department, setDepartment] = useState({ id: '', name: '' });
    const [currentFilter, setCurrentFilter] = useState(filters[0].label);

    const fetchData = () => {
        if (currentFilter === filters[0].label) {
            //Set data by departments
            if (department.id !== '' && department.name !== '') {
                setData(riskTreeDataSections);
            } else {
                setData(assessedTreeDataDepartments);
            }
        } else if (currentFilter === filters[1].label) {
            //Set data by control Categories
            setData(assessedTreeDataCat);
        }
    };


    useEffect(() => {
        fetchData();
    }, [currentFilter, department]);
    return(
        <>
            <MKBox>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <DashboardCards/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <DashboardTreeMap  {...{ data, filters, currentFilter, setCurrentFilter, department, setDepartment }}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <MonthlyComplianceReport/>
                    </Grid>
                </Grid>
            </MKBox>
        </>
    )
}

export default Dashboard;