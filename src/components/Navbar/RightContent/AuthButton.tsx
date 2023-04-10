

import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from '@/atoms/authModalAtom';




const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
    <Flex    onClick={() => setAuthModalState({ open: true, view: "login" })}>

      <Button
        
        border= "1px solid"
        borderColor= "teal.500"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
     
      >
        Log In
      </Button>
    </Flex>
    <Flex    onClick={() => setAuthModalState({ open: true, view: "signup" })}>

      <Button
     color= "white"
     bg= "teal.500"
     _hover= {{bg: "teal.400"}}
      
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
     
      >
        Sign Up
      </Button>
    </Flex>
    </>
  );
};
export default AuthButtons;