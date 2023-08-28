import React from 'react'
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import MKBox from "../../@mui-components/box";
import {Check, Info} from "@mui/icons-material";
import MKTypography from "../../@mui-components/typography";
import {LoadingButton} from "@mui/lab";
import MKButton from "../../@mui-components/button";

const ConfirmDialog = props => {
    const { open , onClose, onOk, isLoading } = props;

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
                <DialogContent>
                    <MKBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap:2}}>
                        <Info fontSize={"large"} color={'info'}/>
                        <MKTypography variant={'h5'}>
                            Confirmation
                        </MKTypography>
                        <MKTypography variant={'subtitle1'}>
                            Are you sure you want to proceed?
                        </MKTypography>
                        <MKBox sx={{ display: 'flex', gap: 2 }}>
                            <LoadingButton
                                loading={isLoading}
                                variant={'contained'}
                                color={'primary'}
                                onClick={onOk}
                            >
                                Yes, Proceed
                            </LoadingButton>
                            <MKButton disabled={isLoading} onClick={onClose} variant={'outlined'} color={'primary'}>
                                Dismiss
                            </MKButton>
                        </MKBox>

                    </MKBox>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ConfirmDialog;