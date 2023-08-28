import React, { useCallback, useEffect } from "react";
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
import {
  IconButton,
  Tooltip,
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import { ALLOWED_PAGE_SIZES } from "../../../utils/constants";
import MKBox from "../../@mui-components/box";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, userLogin } from "../../../slices/auth";
import { useAuth } from "../../../hooks/use-auth";
import { getAllFailedBeneficiaries } from "../../../slices/beneficiaries";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MKButton from "../../@mui-components/button";
import { getAllSponsors } from "../../../slices/sponsors";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAutoCompleteValue } from "../../../utils/fileHelper";


const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const InactiveBeneficiaryDataGrid = (props) => {
  const { failedBeneficiaries } = useSelector(({ beneficiaries }) => beneficiaries);
  const { sponsors } = useSelector(({ sponsors }) => sponsors);
  const dispatch = useDispatch();
  const authUser = useAuth();

  const fetchSponsors = async () => {
    await dispatch(getAllSponsors(authUser));
  };

  useEffect(() => {
    fetchSponsors();
  }, []);


  const handleOnSponsorId = (event, value) => {
    if (value !== null) {
      formik.setFieldValue("sponsorId", value.id);
    } else {
      formik.setFieldValue("sponsorId", null);
    }
  };

  const validationSchema = yup.object({
    sponsorId: yup
      .number("Enter sponsor")
      .nullable()
      .required("Sponsor is required"),
  });

  const formik = useFormik({
    initialValues: {
      sponsorId: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await dispatch(getAllFailedBeneficiaries(authUser, values));
        helpers.resetForm();
        toast.success("Data retrieved successfully");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
  });

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
    <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} display={"flex"} alignItems={"center"}>
          <Grid item md={10} xs={12}>
            <Autocomplete
              fullWidth
              options={sponsors}
              width={"400px"}
              value={getAutoCompleteValue(sponsors, formik.values.sponsorId)}
              getOptionLabel={(option) => option.name}
              onChange={handleOnSponsorId}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  {...params}
                  label="Select Sponsor"
                />
              )}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <MKButton type="submit" color="primary" variant="contained">
              Send
            </MKButton>
          </Grid>
        </Grid>
      </form>
      <DataGrid
        dataSource={failedBeneficiaries}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        showColumnLines={true}
        showRowLines={true}
        height={"65vh"}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="idnumber" caption="ID No" />
        <Column dataField="name" caption="Beneficiary Name" />
        <Column dataField="phone" caption="Phone No" cssClass="bullet" />
        <Column
          dataField="uploadFailedReason"
          caption="Failed Reason"
          cssClass="bullet"
        />
        <Column dataField="uploadStage" caption="Upload Stage" cssClass="bullet" />
        <Toolbar>
          <Item location="after">
            <MKButton color="primary" variant="outlined">
              <FileDownloadIcon />
              Export
            </MKButton>
            {/* <AddBranch /> */}
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default InactiveBeneficiaryDataGrid;
