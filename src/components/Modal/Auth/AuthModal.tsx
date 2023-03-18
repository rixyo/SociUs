

import {   Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Flex} from "@chakra-ui/react";
import React,{useEffect} from "react";
import {useRecoilState as state} from "recoil"
import { authModalState } from '@/atoms/authModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthInput from "./AuthInput";
import OAuth from "./OAuthButton";
import { auth } from "@/Firebase/clientapp";
import ResetPassword from "./ResetPassword";


const AuthModal:React.FC = () => {
  const [modalState,setModalState]=state(authModalState)
  const [user, loading, error] = useAuthState(auth);
  const handleClose=()=>{
    setModalState(prev=>({
      ...prev,
      open:false
    }))
  }
useEffect(()=>{
  if(user) handleClose()

},[user])



  return (
    <>
     

      <Modal isOpen={modalState.open} onClose={handleClose}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            {modalState.view==="login" && "Login"}
            {modalState.view==='signup' && "Sign Up"}
            {modalState.view==="resetPassword" && "Rest Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center" pb={6}>
            <Flex direction="column" align="center" justify="center" width="70%"
            >
              
             
              {modalState.view === "login" || modalState.view === "signup" ? (
            <>
              <OAuth />
              <Text color="gray.500" fontWeight={700}>
                OR
              </Text>
              <AuthInput  />
            </>
          ) : (
            <ResetPassword />
          )}
              

              
            </Flex>
          </ModalBody>

          
        </ModalContent>
        </Modal>
 </>
  )
}
export default AuthModal;


