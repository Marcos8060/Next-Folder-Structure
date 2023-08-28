import dynamic from "next/dynamic";
import { Column, SearchPanel, Toolbar, Item } from "devextreme-react/data-grid";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, TextField } from "@mui/material";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAllSponsors } from "../../../slices/sponsors";
import { useAuth } from "../../../hooks/use-auth";
import MKButton from "../../@mui-components/button";
import { toast } from "devextreme-react";
import { getAllFailedUploads } from "../../../slices/upload";
import useDownloader from "react-use-downloader";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const FailedUploadsDatagrid = () => {
  const { sponsors } = useSelector(({ sponsors }) => sponsors);
  const { failedUploads } = useSelector(({ uploads }) => uploads);
  const dispatch = useDispatch();
  const authUser = useAuth();
  const { download } = useDownloader();

  const fetchSponsor = async () => {
    await dispatch(getAllSponsors(authUser));
  };

  useEffect(() => {
    fetchSponsor();
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
    onSubmit: async (values,helpers) => {
      try {
        await dispatch(getAllFailedUploads(authUser, values));
        helpers.resetForm();
        toast.success("Data retrieved successfully");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
  });

  const action = ({ displayValue}) =>{
    const handleExportExcel = async () => {
        try{
          await download(displayValue, 'file_uploads.xlsx')
        }
        catch (e) {
            console.log(e.message);
          }
        };
    return (
        <>
        <MKButton color="primary" variant="outlined" onClick={handleExportExcel}>Download</MKButton>
        </>
    )
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} display={'flex'} alignItems={'center'}>
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
        dataSource={failedUploads}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        showColumnLines={true}
        showRowLines={true}
      >
        <Column dataField="uploadedBy" caption="Uploaded By" />
        <Column dataField="uploadCount" caption="Upload Count" />
        <Column dataField="dateUploaded" caption="Uploaded Date" />
        <Column dataField="baseFile" caption="Download" cellRender={action} />
      </DataGrid>
    </>
  );
};

export default FailedUploadsDatagrid;
