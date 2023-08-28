import React,{useEffect} from "react";
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
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector,useDispatch } from "react-redux";
import { getAllCounties } from "../../../../slices/branches";
import { useAuth } from "../../../../hooks/use-auth";


const AddBranch = () => {
  const [open, setOpen] = React.useState(false);
  const { counties } = useSelector(({ branches }) => branches);
  console.log("COUNTY ",counties)
  const dispatch = useDispatch();
  const authUser = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCounties = async() =>{
    await dispatch(getAllCounties(authUser))
  }

  useEffect(() =>{
    fetchCounties();
  },[])

  const validationSchema = yup.object({
    name: yup.string("Enter branch name").required("Branch name is required"),
    county: yup.string("Enter county name").required("County name is required"),
    phone: yup
      .string("Enter phone number")
      .required("Phone number is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      county: "",
      phone: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Branch Details"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Branch Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              options={counties}
              name="county"
              value={formik.values.county}
              onChange={formik.handleChange}
              renderInput={(params) => (
                <TextField
                  error={formik.touched.county && Boolean(formik.errors.county)}
                  helperText={formik.touched.county && formik.errors.county}
                  fullWidth
                  {...params}
                  label="Counties"
                />
              )}
            />
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <MKButton type="submit" color="primary" autoFocus>
              Save
            </MKButton>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBranch;
