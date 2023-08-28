import React, {useCallback, useEffect, useState} from "react";
import {
  Column,
  Export,
  HeaderFilter,
  Toolbar,
  Item,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import dynamic from "next/dynamic";
import {IconButton, TextField, Tooltip} from "@mui/material";
import { ALLOWED_PAGE_SIZES } from "../../../utils/constants";
import MKBox from "../../@mui-components/box";
import {Delete, Edit, FilterAlt, Visibility} from "@mui/icons-material";
import Link from "next/link";
import { useSelector,useDispatch } from "react-redux";
import { setAuthUser, userLogin } from "../../../slices/auth";
import { useAuth } from "../../../hooks/use-auth";
import { getAllActiveBeneficiaries } from "../../../slices/beneficiaries";
import Autocomplete from "@mui/material/Autocomplete";
import MKButton from "../../@mui-components/button";
import {getAutoCompleteValue} from "../../../utils/helper-functions";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const applyFilter = (data, filters) => data.filter( opt => {
  if (filters){
    if (filters?.county){
      if(filters.county === opt.countyId){
        return true;
      }
      return false;
    }
    if (filters.branch){
      if (filters.branch === opt.branchName){
        return true;
      }
      return false;
    }
  }
  return true;
})

const BeneficiaryDataGrid = (props) => {
  const { beneficiaries } = useSelector(({ beneficiaries }) => beneficiaries);
  const { counties, branches } = useSelector(({ branches }) => branches);
  const [filters, setFilters] = useState({
    branch: null,
    county: null
  })
  console.log("BENEFICIARIES ",beneficiaries)
  const dispatch = useDispatch();
  const authUser = useAuth();

  const handleOnBranchChange = (e, value) => {
    setFilters({
      ...filters,
      branch: value?.name ?? null,
    })
  }
  const handleOnCountyChange = (e, value) => {
    setFilters({
      ...filters,
      county: value?.id ?? null,
    })
  }

  const handleOnClearFilter = () => {
    setFilters({
      branch: null,
      county: null
    })
  }

  const fetchBeneficiaries= async() =>{
    await dispatch(getAllActiveBeneficiaries(authUser,authUser.user.userid))
  }


  const newBen = applyFilter(beneficiaries, filters);

  useEffect(() =>{
    fetchBeneficiaries();
  },[])

  const actionsOptions = ({ data }) => {
    return (
      <MKBox>
        <Tooltip title="Download">
          <Link href={"./pensioners/" + data.pensionerCode + "/update"}>
            <IconButton size={"small"} color={"info"}>
              <Edit />
            </IconButton>
          </Link>
        </Tooltip>
        <IconButton size={"small"} color={"info"}>
          <Delete />
        </IconButton>
      </MKBox>
    );
  };

  return (
    <>
      <DataGrid
        dataSource={newBen}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        showColumnLines={true}
        showRowLines={true}
        height={'65vh'}
      >
        <Export enabled={true}/>
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="idnumber" caption="ID No" />
        <Column dataField="name" caption="Beneficiary Name" />
        <Column dataField="phone" caption="Phone No" cssClass="bullet" />
        <Column dataField="sponsorName" caption="Sponsor Name" cssClass="bullet" />
        <Column dataField="county" caption="County" cssClass="bullet" />
        <Column dataField="branchName" caption="Branch Name" cssClass="bullet" />
        <Column dataField="ward" caption="Ward" cssClass="bullet" />
        <Toolbar>
          <Item location="before">
            <MKBox sx={{ display: 'flex', gap:2}}>
              <Autocomplete
                  sx={{ mb: 2, width:300}}
                  disablePortal
                  fullWidth
                  id="combo-box-demo"
                  options={counties}
                  getOptionLabel={ option => option.name}
                  name="county"
                  value={getAutoCompleteValue(counties, filters.county, 'id')}
                  onChange={handleOnCountyChange}
                  renderInput={(params) => (
                      <TextField
                          // error={formik.touched.county && Boolean(formik.errors.county)}
                          // helperText={formik.touched.county && formik.errors.county}
                          {...params}
                          fullWidth
                          label="Counties"
                      />
                  )}
              />
              <Autocomplete
                  sx={{ mb: 2, width:300}}
                  disablePortal
                  fullWidth
                  id="combo-box-demo"
                  options={branches}
                  getOptionLabel={ option => option.name}
                  name="branches"
                  value={getAutoCompleteValue(branches, filters.branch, 'name')}
                  onChange={handleOnBranchChange}
                  renderInput={(params) => (
                      <TextField
                          // error={formik.touched.county && Boolean(formik.errors.county)}
                          // helperText={formik.touched.county && formik.errors.county}
                          fullWidth
                          {...params}
                          label="Branches"
                          size={'large'}
                      />
                  )}
              />
              <MKBox>
                <MKButton startIcon={<FilterAlt/>} onClick={handleOnClearFilter} variant={'outlined'} color={'primary'}>
                  Clear Filters
                </MKButton>
              </MKBox>

            </MKBox>
          </Item>

          <Item location="after" name="searchPanel" />
          <Item location="after" name="export" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default BeneficiaryDataGrid;
