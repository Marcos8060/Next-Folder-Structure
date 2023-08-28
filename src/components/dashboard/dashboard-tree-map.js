import React, { useState } from 'react';
import MKBox from "../@mui-components/box";
import DMTDropdown from "../@dmt-components/form/dropdown";
import MKTypography from "../@mui-components/typography";

import { ResponsiveContainer,Treemap,Tooltip } from 'recharts';
import {alpha, Breadcrumbs, CardContent, CardHeader, Paper, Select, Typography} from "@mui/material";
import {COLORS, GRADIENT_COLORS} from "../../utils/constants";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {useTheme} from "@mui/styles";
import * as PropTypes from "prop-types";
import Link from "next/link";

const Filter = props => {
  const { currentFilter, setCurrentFilter, classes, filters } = props;
  const handleChange = event => {
    setCurrentFilter(event.target.value);
  };

  return (
    <>
      <MKBox>
        <DMTDropdown
          label="Filter with"
          options={filters}
          value={currentFilter}
          onChange={handleChange}
        />
      </MKBox>
    </>
  );
};
const FilterHeader = ({ currentFilter, classes }) => {
  return (
    <MKBox display="flex" alignItems="center" mx={{ xs: -2, sm: -4 }}>
      <MKBox>
        {currentFilter}
      </MKBox>
    </MKBox>
  );
};
const DashboardTreeMap = props => {
  const { data, currentFilter, setCurrentFilter, filters, department, setDepartment, setOpenDialog } = props;
  const [breadcrumbsList, setBreadcrumbsList] = useState([{ name: currentFilter, action: '', level: 0 }]);
  const handleFilterChange = e => {
    setCurrentFilter(e.target.value);
    resetBreadcrumbs(e.target.value);
  };
  const handleOnMapClick = data => {
    if (department.id === '' && currentFilter === filters[0].label) {
      setDepartment({ id: data.id, name: data.name });
      if (breadcrumbsList.length < 2) {
        const list = [...breadcrumbsList];
        list.push({ name: data.name, level: breadcrumbsList.length + 1, action: '' });
        setBreadcrumbsList(list);
      }
    } else {
      setOpenDialog(true);
    }
  };
  const resetBreadcrumbs = name => {
    onClickBreadcrumbs(0, name);
  };
  const onClickBreadcrumbs = (index, name) => {
    const list = [...breadcrumbsList];
    list.splice(index + 1, list.length);
    list[0].name = name;
    setBreadcrumbsList(list);
    setDepartment({ id: '', name: '' });
  };
  const getBreadcrumbs = () => {
    return (
      <>
        <Breadcrumbs aria-label={'breadcrumb'} separator={'>'} className="bread-crumbs">
          {breadcrumbsList.map((item, index) =>
            breadcrumbsList.length - 1 === index ? (
              <MKTypography underline="hover" variant={'h6'} key={index}>
                {item.name}
              </MKTypography>
            ) : (
              <Link
                underline="hover"
                color="primary"
                variant={'h6'}
                href=""
                onClick={e => {
                  e.preventDefault();
                  onClickBreadcrumbs(index, currentFilter);
                }}
                key={index}>
                {item.name}
              </Link>
            ),
          )}
        </Breadcrumbs>
      </>
    );
  };
  const getFilters = () => {
    return (
      <>
        <MKBox component="span" mr={3} height={10} width={10} bgcolor={COLORS[4]} borderRadius="50%" />
        <Select
          value={currentFilter}
          onChange={handleFilterChange}>
          {filters.map((item, index) => (
            <MenuItem key={index} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };

  return (
    <Card>
      <CardHeader
          title={`Number of Beneficiaries by ${currentFilter}`}
          subheader={`Summary of beneficiaries from respective regions`}
          action={getFilters()}
      />
      <CardContent >
        {/*<MKBox mb={2}>{getBreadcrumbs()}</MKBox>*/}
        <Grid container>
          <Grid item xs={12} md={12}>
            <RisksTreeMapChat {...{ data, handleOnMapClick }} />
          </Grid>
          <Grid item xs={12} md={12} mt={2}>
            <MKTypography gutterBottom variant={'h6'}>
              KEY
            </MKTypography>
            <RisksTreeMapKey {...{ data, department, currentFilter }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
const RisksTreeMapKey = ({ data, department, currentFilter, ...rest }) => {
  return (
    <>
      <Grid container spacing={1}>
        {data !== undefined &&
          data.length !== 0 &&
          data.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <MKBox
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                // className={clsx(classes.countryCellItem, {
                //   active: department.name === item.name,
                // })}
                {...rest}>
                <MKBox component="span" ml={3} height={10} width={10} bgColor={item.color} borderRadius="50%" />
                <MKBox>
                  <MKBox className="text-hover" px={1}>
                    <b>{item.name}</b>
                  </MKBox>
                </MKBox>
                <MKBox px={1} display="flex" alignItems="center">
                  <MKBox mx={1}>{item.risks}</MKBox>
                </MKBox>
              </MKBox>
            </Grid>
          ))}
      </Grid>
      <Typography sx={{ mt:2 }}gutterBottom variant={'h6'}>
        {currentFilter}
      </Typography>
      <Grid container spacing={1}>
        {data !== undefined &&
          data.length !== 0 &&
          data[0].children.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <MKBox
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                // className={clsx(classes.countryCellItem, {
                //   active: department.name === item.name,
                // })}
                {...rest}>
                {/*<Box component="span" ml={3} height={10} width={10} bgcolor={COLORS[4]} borderRadius="50%" />*/}
                <MKBox>
                  <MKBox fontSize={14} className="text-hover" px={1}>
                    <b>{item?.slug}</b> - {item.name}
                  </MKBox>
                </MKBox>
                <MKBox px={1} display="flex" alignItems="center">
                  <MKBox mx={1}></MKBox>
                </MKBox>
              </MKBox>
            </Grid>
          ))}
      </Grid>
    </>
  );
};


ResponsiveContainer.propTypes = {
  width: PropTypes.string,
  height: PropTypes.number,
  children: PropTypes.node
};
const RisksTreeMapChat = props => {
  const theme = useTheme();
  const { data, color = COLORS[4], handleOnMapClick } = props;
  const onClickTreeMap = data => {
    handleOnMapClick(data);
  };

  const CustomizedContent = props => {
    const { root, depth, x, y, width, height, index, fill, color, risks, name, slug } = props;
    //colors[Math.floor((index / root.children.length) * 6)]
    return (
      <g>
        {depth === 1 && (
          <defs>
            <linearGradient id={`color${index}`} x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90)">
              <stop offset="20%" stopColor={color} stopOpacity={1} />
              {/*<stop offset="100%" stopColor={getGradientColor(color)} stopOpacity={1} />*/}
            </linearGradient>
          </defs>
        )}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth === 1 ? `url(#color${index})` : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
            cursor: 'pointer',
          }}
        />
        {depth === 2 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fontFamily={theme.typography.fontFamily}
            letterSpacing={2}
            fontWeight={theme.typography.fontWeightLight}
            fill={alpha(theme.palette.common.white, 0.74)}
            fontSize={14}>
            {slug}
          </text>
        ) : null}
        {depth === 2 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 27}
            fontFamily={theme.typography.fontFamily}
            letterSpacing={2}
            fontWeight={theme.typography.fontWeightLight}
            textAnchor="middle"
            fill={alpha(theme.palette.common.white, 0.74)}
            fontSize={12}>
            {risks}
          </text>
        ) : null}
        {/*{depth === 1 ? (*/}
        {/*  <text x={x + 4} y={y + 18} fill="#fff" fontSize={14} fillOpacity={0.9}>*/}
        {/*    {index + 1}*/}
        {/*  </text>*/}
        {/*) : null}*/}
      </g>
    );
  };
  const getGradientColor = color => {
    const gradientColor = GRADIENT_COLORS.find(element => element[0] === color);
    if (gradientColor !== undefined) {
      return gradientColor[1];
    }
    return null;
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <MKBox component={Paper} bgColor={'background.paper'} boxShadow={2} padding={2}>
          <MKTypography variant={'h6'} style={{ color: payload[0].payload?.root.color }}>
            {payload[0].payload.name}
          </MKTypography>
          <Typography variant={'caption'}>{`Beneficiaries : ${payload[0].value}`}</Typography>
        </MKBox>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={450}>
      <Treemap
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        data={data}
        dataKey="risks"
        ratio={4 / 3}
        stroke="#fff"
        //onClick={data => onClickTreeMap(data)}
        fill={`url(#color1)`}
        content={<CustomizedContent colors={COLORS} />}
        isAnimationActive={true}>
        <Tooltip content={CustomTooltip} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default DashboardTreeMap;
