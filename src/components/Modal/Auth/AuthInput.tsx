import { Flex } from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue} from "recoil"
import { authModalState } from '@/atoms/authModalAtom';
import Login from "./Login"
import Signup from './Signup';
type AuthInputProps = {
    
};

const AuthInput:React.FC<AuthInputProps> = () => {
    const modalState=useRecoilValue(authModalState)
    
    return (
        <Flex direction="column" align="center" width="100%" mt={4}>
            
          {modalState.view==="login" && <Login/>}
            
            {modalState.view==='signup' && <Signup/>}
    
            
        </Flex>
    )
}
export default AuthInput;