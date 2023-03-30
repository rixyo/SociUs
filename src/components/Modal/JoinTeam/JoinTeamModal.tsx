

import { authModalState } from '@/atoms/authModalAtom';
import { joinModalState } from '@/atoms/joinModalAtom';
import { Team, TeamSnippet, teamState } from '@/atoms/teamAtom';

import { auth, fireStore } from '@/Firebase/clientapp';
import { Button, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,Text } from '@chakra-ui/react';

import { arrayUnion, collection, doc, getDocs, increment, writeBatch,Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, {  useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SiFauna } from 'react-icons/si';
import { useRecoilState, useSetRecoilState } from 'recoil';

type JoinTeamModalProps = {
   privacy:string,
   teamData:Team,
   joinKey:string,
   joinedMember: string[],
 

};

const JoinTeamModal:React.FC<JoinTeamModalProps> = ({joinedMember,teamData,joinKey}) => {
  const [modalState,setModalState]=useRecoilState (joinModalState)
  const [teamStateValue,setTeamStateValue]=useRecoilState(teamState)
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter()
  const [password,setPassword]=useState<string>("")
    const [loading,setLoading]=useState<boolean>(true)
    const [user]=useAuthState(auth)
    const joinTeam=async()=>{
    
      if(joinKey===password){
      
        try {
         
          const betch=writeBatch(fireStore)
      const newSnippet:TeamSnippet={
          teamId: teamData.id,
          imageUrl: teamData.imageUrl || ""
      }
      betch.set(doc(fireStore,`users/${user?.uid}/teamSnippets`,teamData.id),newSnippet)
      betch.update(doc(fireStore,"teams",teamData.id),{
          numberOfMembers: increment(1),
          members: arrayUnion(user?.uid)
      })
     await betch.commit()
     setTeamStateValue(prev=>({
      ...prev,mySnippets:[...prev.mySnippets,newSnippet]
     }))
     router.reload()
      setLoading(false)
  } catch (error:any) {
      console.log("Faild to join",error.message)
      //setCustomError(error.message)
  }
  
 

      }
      
   
      
  }
    const handleClose=async()=>{
     const isJoined= joinedMember.find(index=>{
        index===user?.uid
      })
      if(isJoined){
        setModalState(prev=>({
          ...prev,
          open:false
        }))

      }else{
        setModalState({open:true,view:"join"})

      }

  
      }

    return (
   
        <Modal isOpen={modalState.open} onClose={handleClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Team</ModalHeader>
          
          <ModalCloseButton />
          <ModalBody>
          <Flex direction="column" alignItems="center" width="100%">
      <Icon as={SiFauna} color="#8B3A3A" fontSize={40} mb={2} />
      <Text fontWeight={700} mb={2}>
       Enter joining key
      </Text>
     
        <>
        <form onSubmit={joinTeam} style={{ width: "100%" }}>
          
            <Input
           
              required
              name="joinKey"
              placeholder="key"
              type="password"
              mb={2}
            onChange={(e)=>setPassword(e.target.value)}
              fontSize="10pt"
              _placeholder={{ color: "gray.500" }}
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              _focus={{
                outline: "none",
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              bg="gray.50"
            />
           
            
            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              onClick={joinTeam}
          
        
           
             
            >
             Join
            </Button>
            </form>
       
        </>
        
      
      
     
    </Flex>
            
         
          </ModalBody>
          <Text color="gray.500" fontWeight={700} margin="0 auto">
                OR
              </Text>

          <ModalFooter>
            <Button colorScheme='blue' margin="0 auto" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}
export default JoinTeamModal;