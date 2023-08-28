import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import MKBox from "../../@mui-components/box";
import MKButton from "../../@mui-components/button";
import {useCallback, useRef, useState} from "react";
import Webcam from "react-webcam";
import {Camera, Close, Redo, Save} from "@mui/icons-material";

const WebcamCamera = props => {
    const { open, onClose, onSave } = props;
    const [img, setImg] = useState(null);

    const webcamRef = useRef(null);

    const videoConstraints = {
        width: { min: 300 },
        height: { min: 300 },
        aspectRatio: 1,
        facingMode: "environment"
    };
    const webcamConfigProps = {
        width: 300,
        height: 300,
        screenShotFormat: 'image/png',
        audio: false,
        mirrored: true,
        videoConstraints,
        screenshotQuality: 1,
    }
    
    const handleOnSave = (e) => {
        onSave(img);
        onClose();
        handleOnRetake();
    }

    const handleOnCapture = useCallback( () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    }, [webcamRef]);

    const handleOnRetake = () => {
        setImg(null)
    }

    return (
        <>
            <Dialog open={open} maxWidth={'sm'} fullWidth>
                <DialogTitle>
                    <MKBox sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        Camera
                        <IconButton color={'primary'} onClick={onClose}>
                            <Close/>
                        </IconButton>
                    </MKBox>

                </DialogTitle>
                <DialogContent>
                    <MKBox sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MKBox sx={{
                            width: '300px',
                            height: '300px',
                            backgroundColor: 'primary.main',
                        }}>
                            { img === null ? (
                                <>
                                    <Webcam ref={webcamRef} {...webcamConfigProps} />
                                </>
                            ) : (
                                <img src={img} alt={'Photo'}/>
                            )}

                        </MKBox>
                        <MKBox sx={{ display: 'flex', alignItems: 'center', gap:1, mt:2}}>
                            {
                                img === null ? (
                                    <MKButton
                                        size={'small'}
                                        variant={'outlined'}
                                        color={'primary'}
                                        onClick={handleOnCapture}
                                        startIcon={<Camera/>}
                                    >
                                        Capture
                                    </MKButton>
                                ): (
                                    <MKButton
                                        size={'small'}
                                        variant={'outlined'}
                                        color={'primary'}
                                        onClick={handleOnRetake}
                                        startIcon={<Redo/>}
                                    >
                                        Retake
                                    </MKButton>
                                )
                            }
                            <MKButton size={'small'} variant={'contained'} color={'primary'} onClick={handleOnSave} disabled={img === null} startIcon={<Save/>}>Save</MKButton>
                            <MKButton size={'small'} variant={'outlined'} color={'primary'} onClick={onClose}>Cancel</MKButton>
                        </MKBox>
                    </MKBox>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default WebcamCamera;