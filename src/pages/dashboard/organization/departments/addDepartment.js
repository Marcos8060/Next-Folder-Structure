import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MKButton from "../../../../components/@mui-components/button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createDepartment } from "../../../../slices/departments";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../hooks/use-auth";
import { getAutoCompleteValue } from "../../../../utils/fileHelper";
import {toast} from "react-hot-toast";
// import * as Yup from "yup";
import * as yup from "yup";
import { useFormik } from "formik";

const AddDepartment = () => {
  const [open, setOpen] = React.useState(false);
  const authUser = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [age, setAge] = React.useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    name: yup.string("Enter branch name").required("Branch name is required"),
    description: yup.string("Enter description")
      .required("Description is required"),
    coordinates: yup.string("Enter coordinates")
      .required("Coordinates are required"),
    isActive: yup.string("Select whether active")
      .required("Selection is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      coordinates: "",
      isActive: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        try {
            await dispatch(createDepartment(authUser,values));
            toast.success('Department created successfully')
            handleClose();
            
        } catch (error) {
            console.log(error.message);
        }
    },
  });

  const handleOnIsActive = (event, value) => {
    console.log(value);
    if (value !== null) {
      formik.setFieldValue("isActive", value.value);
    } else {
      formik.setFieldValue("isActive", null);
    }
  };

  const isActive = [
    { id: 1, name: "True", value: true },
    { id: 2, name: "False", value: false },
  ];

  return (
    <div>
      <MKButton size="small" color="primary" variant="contained" onClick={handleClickOpen}>
        <AddIcon style={{fontSize: '30px'}} /> Add
      </MKButton>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Department Details"}
        </DialogTitle>
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
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Coordinates"
              name="coordinates"
              value={formik.values.coordinates}
              onChange={formik.handleChange}
              error={
                formik.touched.coordinates && Boolean(formik.errors.coordinates)
              }
              helperText={
                formik.touched.coordinates && formik.errors.coordinates
              }
            />
            <Autocomplete
              fullWidth
              options={isActive}
              value={getAutoCompleteValue(isActive, formik.values.isActive, 'value')}
              getOptionLabel={(option) => option.name}
              onChange={handleOnIsActive}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  sx={{ marginTop: 2 }}
                  {...params}
                  label="Is Active"
                />
              )}
            />
            <MKButton sx={{marginTop: '4px'}} type="submit" color="primary" autoFocus>
              Save
            </MKButton>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDepartment;
