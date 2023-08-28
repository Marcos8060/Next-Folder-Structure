import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormControl, IconButton } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import MKButton from "../../../components/@mui-components/button";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import { useSelector, useDispatch } from "react-redux";
import { createSponsorUser } from "../../../slices/sponsors";
import { useAuth } from "../../../hooks/use-auth";

export default function CreateSponsorUser() {
  const [open, setOpen] = React.useState(false);
  const { sponsors } = useSelector(({ sponsors }) => sponsors);
  const dispatch = useDispatch();
  const authUser = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    name: yup.string("Enter sponsor name").required("Sponsor name is required"),
    userName: yup.string("Enter username").required("userName is required"),
    sponsorRole: yup
      .string("Enter sponsor role")
      .required("Sponsor role is required"),
    description: yup
      .string("Enter description")
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      sponsorId: null,
      name: "",
      userName: "",
      sponsorRole: "",
      isGroup: false,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(createSponsorUser(authUser, values));
    },
  });

  const handleOnSponsorId = (event, value) => {
    console.log(value);
    if (value !== null) {
      formik.setFieldValue("sponsorId", value.id);
    } else {
      formik.setFieldValue("sponsorId", null);
    }
  };

  const handleOnIsGroup = (event, value) => {
    console.log(value);
    if (value !== null) {
      formik.setFieldValue("isGroup", value.value);
    } else {
      formik.setFieldValue("isGroup", null);
    }
  };

  const handleOnUserRole = (event, value) => {
    console.log(value);
    if (value !== null) {
      formik.setFieldValue("sponsorRole", value.value);
    } else {
      formik.setFieldValue("sponsorRole", null);
    }
  };

  console.log(formik.values);

  const hasGroup = [
    { id: 1, name: "True", value: true },
    { id: 2, name: "False", value: false },
  ];

  const sponsorUserRoles = [
    { id: 1, name: "principal", value: 'principal' },
    { id: 2, name: "admin", value: 'admin' },
    { id: 2, name: "basic", value: 'basic' },
  ];



  return (
    <div>
      <MKButton size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
        Add User
        <AddCircleIcon color="primary" />
      </MKButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create Sponsor User"}
        </DialogTitle>
        <DialogContent>
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
                  sx={{ marginTop: 2 }}
                  {...params}
                  label="Branch"
                />
              )}
            />
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
              label="userame"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />
            <Autocomplete
              fullWidth
              options={sponsorUserRoles}
              value={getAutoCompleteValue(sponsorUserRoles, formik.values.sponsorRole, 'value')}
              getOptionLabel={(option) => option.name}
              onChange={handleOnUserRole}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  sx={{ marginTop: 2 }}
                  {...params}
                  label="Sponsor Role"
                />
              )}
            />
            <Autocomplete
              fullWidth
              options={hasGroup}
              value={getAutoCompleteValue(hasGroup, formik.values.isGroup, 'value')}
              getOptionLabel={(option) => option.name}
              onChange={handleOnIsGroup}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  sx={{ marginTop: 2 }}
                  {...params}
                  label="IsGroup"
                />
              )}
            />
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="description"
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
}
