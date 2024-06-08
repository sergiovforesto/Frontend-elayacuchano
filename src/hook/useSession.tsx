// 'use client'
import { useContext } from 'react';

import AuthenticationContext from "@/context/Authentication";

const useSessionContext = () => {
    return useContext(AuthenticationContext);
};


export default useSessionContext