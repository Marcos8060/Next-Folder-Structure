// import {useMounted} from "../../../hooks/use-mounted";
// import {useRouter} from "next/router";
// import {useFormik} from "formik";
// import {useAuth} from "../../../hooks/use-auth";
// import {useState} from "react";
// import {Alert, Box, Button, IconButton, InputAdornment} from "@mui/material";
// import DMTTextInput from "../../@dmt-components/form/text-input";
// import {Visibility, VisibilityOff} from "@mui/icons-material";
// import * as Yup from "yup";
// import MKButton from "../../@mui-components/button";

// export const LoginForm = (props) => {
//     const isMounted = useMounted();
//     const router = useRouter();
//     const { login } = useAuth();
//     const formik = useFormik({
//         initialValues: {
//             userName: '',
//             password: '',
//             submit: null,
//         },
//         validationSchema: Yup.object({
//             userName: Yup.string().required("Username is required"),
//             password: Yup.string().max(255).required("Password is required"),
//         }),
//         onSubmit: async (values, helpers) => {
//             try {
//                await login(values);
//                 if (isMounted()) {
//                     const returnUrl = router.query.returnUrl || "/dashboard";
//                     router.push(returnUrl).catch(console.error);
//                 }
//             } catch (err) {
//                 if (isMounted()) {
//                     console.log(err.message)
//                     helpers.setStatus({ success: false });
//                     helpers.setErrors({ submit: err.message });
//                     helpers.setSubmitting(false);
//                 }
//             }
//         },
//     });

//     const [showPassword, toggleShowPassword] = useState(false)

//     const handleShowPassword = () => {
//         toggleShowPassword(!showPassword)
//     }

//     return (
//         <form noValidate onSubmit={formik.handleSubmit} {...props}>
//             <Box sx={{ mt: 2, mb:2 }}>
//                 {formik.errors.submit && (
//                     <Alert severity="error">
//                         <div>
//                             {formik.errors.submit}
//                         </div>
//                     </Alert>
//                 )}
//             </Box>
//             <DMTTextInput
//                 error={Boolean(formik.touched.userName && formik.errors.userName)}
//                 fullWidth
//                 helperText={formik.touched.userName && formik.errors.userName}
//                 label="userName"
//                 margin="normal"
//                 name="userName"
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 value={formik.values.userName}
//                 InputProps={{
//                     form: {
//                         autocomplete: "off",
//                     },
//                 }}
//             />
//             <DMTTextInput
//                 error={Boolean(formik.touched.password && formik.errors.password)}
//                 fullWidth
//                 helperText={formik.touched.password && formik.errors.password}
//                 label="Password"
//                 margin="normal"
//                 name="password"
//                 inputProps={{
//                     form: {
//                         autocomplete: "password",
//                     },
//                 }}
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 type={showPassword ? 'text' : 'password'}
//                 value={formik.values.password}
//                 InputProps={{
//                     endAdornment:
//                         <InputAdornment position="start">
//                         <IconButton onClick={handleShowPassword}>
//                             {showPassword ? <VisibilityOff/> : <Visibility/>}
//                         </IconButton>
//                     </InputAdornment>,
//                 }}
//             />
//             <Box sx={{ mt: 2 }}>
//                 <MKButton
//                     disabled={formik.isSubmitting}
//                     fullWidth
//                     size="large"
//                     color={'primary'}
//                     type="submit"
//                     variant="contained"
//                 >
//                     Log In
//                 </MKButton>
//             </Box>
//         </form>
//     );
// };