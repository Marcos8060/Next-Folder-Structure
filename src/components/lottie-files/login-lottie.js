import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../public/lottie/login-lottie-2.json"

const LoginLottie = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isClickToPauseDisabled={true}
    />;
}

export default LoginLottie;