import React, { useEffect } from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Card, Container, Grid } from "@mui/material";
import { FileDropzone } from "../../../components/file-dropzone";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MKButton from "../../../components/@mui-components/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {reset, saveUploadFile, uploadFiles} from "../../../slices/upload";
import { useAuth } from "../../../hooks/use-auth";
import MKTypography from "../../../components/@mui-components/typography";
import useDownloader from "react-use-downloader";
import ConfirmDialog from "../../../components/dashboard/uploads/confirm-dialog";
import { Download } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import UploadsDatagrid from "../../../components/dashboard/uploads/uploads-datagrid";
import { getAllSponsors } from "../../../slices/sponsors";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import {convertToBase64, getAutoCompleteValue, getFileExtension} from "../../../utils/fileHelper";
import * as yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import {LoadingButton} from "@mui/lab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Uploads = () => {
  const [value, setValue] = React.useState(0);
  const { download } = useDownloader();
  const [activeStep, setActiveStep] = React.useState(1);
  // const [file, setFile] = useState([]);
  const dispatch = useDispatch();
  const authUser = useAuth();
  const { uploads } = useSelector(({ uploads }) => uploads);
  const { sponsors } = useSelector(({ sponsors }) => sponsors);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOnCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOnOK = async () => {
    setIsLoading(true)
    try {
      const formData = {
        sponsorId : formik.values.sponsorId,
        id: uploads?.uploadSummary.id,
      }
      await dispatch(saveUploadFile(authUser, formData))
      formik.resetForm();
      toast.success('Upload Confirmed Successfully!');
      handleOnCloseDialog();
      handlePrev();
    }
    catch (e) {
      toast.error(e.message);
    }
    setIsLoading(false);
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnDrop = async (files) => {
    formik.setFieldValue('file', files)
  };
  const ACCEPTED_FILES = {
    xlsx: [".xlsx"],
  };


  const handleExportExcel = async () => {
  try{
    await download(uploads?.uploadSummary?.path, 'FailedTransactions.xlsx')
  }
  catch (e) {
      console.log(e.message);
    }
  };

  const fetchSponsors = async () => {
    await dispatch(getAllSponsors(authUser));
  };



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
    file: yup.array().required(" Please upload a file").nullable(),
  });

  const handleOnSubmit = async (values, helpers) => {
    setIsLoading(true);
    try {
      setIsLoading(true)
      const filename = values.file[0].name;
      const  base64 =  await convertToBase64(values.file[0]);
      const extension = '.'+getFileExtension(filename);

      const formData = {
        name: filename,
        extension: extension,
        data: base64,
        sponsorId: values.sponsorId,
        branchId: authUser.user.branchId,
      }
      await dispatch(uploadFiles(authUser,  formData ))
      toast.success("File Uploaded Successfully!")
      // helpers.resetForm();
      handleNext();
    }
    catch (e) {
      toast.error(e.message);
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      sponsorId: null,
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: handleOnSubmit,
  });

  useEffect(() => {
    fetchSponsors();
  }, []);
  return (
    <Container maxWidth="xl">
      <Card sx={{ px: 2, mt: 2 }}>
        {activeStep === 1 && (
          <>
            <Typography my={2} variant="h6">
              Upload Excel files
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Autocomplete
                fullWidth
                options={sponsors}
                value={getAutoCompleteValue(sponsors, formik.values.sponsorId)}
                getOptionLabel={(option) => option.name}
                onChange={handleOnSponsorId}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    sx={{ marginTop: 2, marginBottom: 2 }}
                    {...params}
                    label="Select Sponsor"
                    error = {Boolean( formik.touched.sponsorId && formik.errors.sponsorId)}
                    helperText={formik.touched.sponsorId && formik.errors.sponsorId}
                    onBlur={formik.handleBlur}
                  />
                )}
              />
              <FileDropzone
                // accept={ACCEPTED_FILES}
                  multiple={false}
                files={formik.values.file}
                onDrop={handleOnDrop}
                onRemove={() => formik.setFieldValue('file', null)}
              />
              {Boolean( formik.errors.file) && (
                  <MKTypography variant={'caption'} color={'error'}>
                    { formik.errors.file}
                  </MKTypography>
              )}
              <Box my={2} display="flex" justifyContent="flex-end">
                <LoadingButton variant={'contained'} loading={isLoading} type="submit" color="primary" >
                  Submit
                </LoadingButton>
              </Box>
            </form>

            {/*<Box my={2} display="flex" justifyContent="flex-end">*/}
            {/*  <MKButton*/}
            {/*    color="primary"*/}
            {/*    disabled={isLoading || uploads === null}*/}
            {/*    onClick={() => handleNext()}*/}
            {/*  >*/}
            {/*    Next*/}
            {/*  </MKButton>*/}
            {/*</Box>*/}
          </>
        )}
        {activeStep === 2 && (
          <>
            <Box mt={2}>
              <Box sx={{  borderBottom: 1, borderColor: "divider" }}>
                <Grid container spacing={4} alignItems={"center"}>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ display: "flex" }}>
                      <MKTypography variant={"subtitle2"}>Total :</MKTypography>{" "}
                      <MKTypography variant={"subtitle2"}>
                        {" "}
                        {uploads?.uploadSummary?.totalUploads}
                      </MKTypography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ display: "flex" }}>
                      <MKTypography variant={"subtitle2"}>
                        Successful :
                      </MKTypography>{" "}
                      <MKTypography variant={"subtitle2"}>
                        {" "}
                        {uploads?.uploadSummary?.successCount}
                      </MKTypography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ display: "flex" }}>
                      <MKTypography variant={"subtitle2"}>
                        Failed :{" "}
                      </MKTypography>{" "}
                      <MKTypography variant={"subtitle2"}>
                        {" "}
                        {uploads?.uploadSummary?.failedCount}
                      </MKTypography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {
                      value === 1 && (
                            <MKButton
                                size={"small"}
                                color={"success"}
                                variant={"outlined"}
                                startIcon={<Download />}
                                onClick={handleExportExcel}
                            >
                              Export Excel
                            </MKButton>
                        )
                    }

                  </Grid>
                </Grid>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Approved" {...a11yProps(0)} />
                  <Tab label="Rejected" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <UploadsDatagrid data={uploads?.successbeneficiaryUploads} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <UploadsDatagrid
                    data={uploads?.failedbeneficiaryUploads}
                    isFailed={true}
                />
              </TabPanel>
            </Box>
            <Box my={2} display="flex" justifyContent="space-between">
              <MKButton color={"primary"} onClick={handlePrev}>
                Prev
              </MKButton>
              <MKButton color="success" onClick={handleOnOpenDialog}>
                Confirm
              </MKButton>
            </Box>
          </>
        )}
      </Card>
      <ConfirmDialog open={openDialog} onOk={handleOnOK} onClose={handleOnCloseDialog} isLoading={isLoading} />
    </Container>
  );
};

Uploads.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Uploads;
