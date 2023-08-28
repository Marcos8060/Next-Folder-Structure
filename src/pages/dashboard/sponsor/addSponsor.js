import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { branches, departments } from "../../../api-requests/dummy-data";
import Autocomplete from "@mui/material/Autocomplete";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import MKButton from "../../../components/@mui-components/button";
import * as yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createSponsor } from "../../../slices/sponsors";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { getAllBranches, getAllCounties } from "../../../slices/branches";
import { getAllSponsors } from "../../../slices/sponsors";
import { toast } from "react-hot-toast";

const AddSponsor = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const authUser = useAuth();
  const { branches, counties } = useSelector(({ branches }) => branches);
  console.log("COUNTIES ", counties);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchBranches = async () => {
    await dispatch(getAllBranches(authUser));
    await dispatch(getAllCounties(authUser));
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const validationSchema = yup.object({
    name: yup.string("Enter sponsor name").required("Sponsor name is required"),
    description: yup.string("Enter description"),
    branchId: yup
      .number("Enter branch")
      .nullable()
      .required("Branch is required"),
    countyId: yup
      .number("Enter county")
      .nullable()
      .required("County is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      branchId: null,
      countyId: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(createSponsor(authUser, values));
        await dispatch(getAllSponsors(authUser))
        toast.success('Sponsor created successfully')
        handleClose();
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const handleOnBranchId = (event, value) => {
    if (value !== null) {
      formik.setFieldValue("branchId", value.id);
    } else {
      formik.setFieldValue("branchId", null);
    }
  };

  const handleOnCountyId = (event, value) => {
    if (value !== null) {
      formik.setFieldValue("countyId", value.id);
    } else {
      formik.setFieldValue("countyId", null);
    }
  };

  useEffect(() => {
    dispatch(getAllBranches(authUser));
  }, []);

  return (
    <div>
      <MKButton
        onClick={() => handleClickOpen()}
        color={"primary"}
        variant={"contained"}
        startIcon={<AddIcon />}
      >
        Add Sponsor
      </MKButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Sponsor"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <Autocomplete
              fullWidth
              options={branches}
              value={getAutoCompleteValue(branches, formik.values.branchId)}
              getOptionLabel={(option) => option.name}
              onChange={handleOnBranchId}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  sx={{ marginTop: 2 }}
                  {...params}
                  label="Branch"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={counties}
              value={getAutoCompleteValue(counties, formik.values.countyId)}
              getOptionLabel={(option) => option.name}
              onChange={handleOnCountyId}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  sx={{ marginTop: 2 }}
                  {...params}
                  label="County"
                />
              )}
            />
            <Box my={2} display="flex" justifyContent="flex-end">
              <MKButton size="small" type="submit" color="primary">
                Save
              </MKButton>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSponsor;
