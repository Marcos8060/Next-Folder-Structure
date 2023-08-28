import React, { useEffect} from 'react'
import { useState } from 'react'
import { useAuth } from '../hooks/use-auth';
import { USER_DETAILS } from '../utils/constants'

const RoleBasedGuard = ({ children, role}) => {
    // const { user} = useAuth();


    // if(!user){
    //   return null;
    // }



    // if( user?.sponsorRole !== role && user?.sponsorRole !== 'principal' ){
    //   return null;
    // }

    return (
      <>{children}</>
    )
}

export default RoleBasedGuard