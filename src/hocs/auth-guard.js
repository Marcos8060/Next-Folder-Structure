import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/router";
import {SplashScreen} from "../components/splash-screen";
import { useCallback } from "react";

export const AuthGuard = (props) => {
    const { children } = props;
    const auth = useAuth();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    const initiliaze = useCallback(() => {
        if (!router.isReady) {
            return(  <SplashScreen/>);
        }

        if (!auth.isAuthenticated) {
            router
                .push({
                    pathname: "/dashboard",
                    // query: { returnUrl: router.asPath },
                })
                .catch(console.error);
                 
        } else {
            setChecked(true);
        }
    },[router.isReady])

    useEffect(
        () => {
          initiliaze()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.isReady]
    );

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.

    return <>{children}</>;
};

AuthGuard.propTypes = {
    children: PropTypes.node,
};
