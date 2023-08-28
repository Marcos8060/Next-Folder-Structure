import React, { useEffect, useState } from 'react';

import ComplianceListItem from './ComplianceListItem';
import ComplianceChart from './ComplianceChart';
import Card from "@mui/material/Card";
import {CardContent, CardHeader, List} from "@mui/material";
import Grid from "@mui/material/Grid";
import MKBox from "../../@mui-components/box";
import {complianceMonthlyData} from "../../../utils/constants";


const MonthlyComplianceReport = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [complianceData, setComplianceData] = useState({});
  useEffect(() => {
    setMonthlyData(complianceMonthlyData);
    setComplianceData(complianceMonthlyData[0]);
  }, []);

  const handleOnItemChange = item => {
    setComplianceData(item);
  };
  return (
    <Card >
      <CardHeader title={"Application's Monthly Report"} subheader={''} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {/*<MKBox variant={'h6'} mb={2}>*/}
            {/*  Applications*/}
            {/*</MKBox>*/}
            <List>
              {monthlyData?.map((item, index) => (
                <ComplianceListItem
                key={index}
                compliance={item}
                onClick={() => handleOnItemChange(item)}
                complianceName={complianceData.name}
                />
                ))}
            </List>
          </Grid>
          <Grid item xs={12} md={8}>
            <ComplianceChart
              data={complianceData.data}
              color={complianceData.badgeColor}
              chartGradientColor={complianceData.chartGradientColor}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyComplianceReport;
