
import { auth, fireStore } from '@/Firebase/clientapp';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Divider,Text, Input, Stack, Checkbox, Flex, Icon } from '@chakra-ui/react';
import { doc,runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi"

type CreateCommunityModelProps = {
    open:boolean;
    handleClose:()=>void
};

const CreateTeamModel:React.FC<CreateCommunityModelProps> = ({open,handleClose}) => {
  const router = useRouter()
  const [user]=useAuthState(auth)
 
    const [teamName,setTeamName]=useState<string>('')
    const [characterRemaning,setCharacterRemaing]=useState(21)
    const [teamType,setTeamType]=useState<string>("private")
    const [nameError,setNameError]=useState<string>("")
    const [loading,setLoading]=useState<boolean>(false)
    const [joinPassword,setJoinPassword]=useState<string>("")
 
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value.length > 22) return ;
        setTeamName(e.target.value)
        setCharacterRemaing(22 - e.target.value.length)
    }
    const onTeamChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTeamType(e.target.name)

    }
    const handlePassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setJoinPassword(e.target.value)
      
    }
    const createTeam=async()=>{
      if(nameError) setNameError('')
      const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/
     
    
      if(format.test(teamName)|| teamName.length<3 ){
        setNameError(
          "Team name must be between 3–22 characters, and can only contain letters, numbers, or underscores."
        );return
      
      }
      setLoading(true)
      try {
        const teamDocRef=doc(fireStore,"teams",teamName)
        await runTransaction(fireStore, async(transaction)=>{
          const teamDoc=await transaction.get(teamDocRef)
          if(teamDoc.exists()){
            throw new Error(`Sorry, /tm ${teamName} is taken. Try another.`); 
          }
          const password=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
          if(teamType==="private"){
            if(!password.test(joinPassword)){
              throw new Error("The password must be at least 6 characters long,c at least one lowercase letter,least one uppercase letter,atleast one digit,at least one special character (such as @, $, !, %, *, ?, or &)");
      
              }

          }
         
         transaction.set(teamDocRef,{
            Name:teamName,
            creatorId:user?.uid,
            createdAt:serverTimestamp(),
            privacyType:teamType,
            members:[user?.uid],
            joinKey:joinPassword
    
          })
          transaction.set(doc(fireStore,`users/${user?.uid}/teamSnippets`,teamName),{
            teamId:teamName,
            isModerator:true,

          })
        })
      
          
          
          await   router.push(`/tm/${teamName}`)
          router.reload()
  
        
        
      } catch (error:any) {
        console.log(`handle create Team error ${error}`)
        setNameError(error.message)
        
      }
      
      setLoading(false)
      
    


    }
    return (
        <>
        
    
          <Modal isOpen={open} onClose={handleClose} size="xl" >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader display="flex" flexDirection="column" fontSize={15} padding={3}>Create A Team</ModalHeader>
              <Box paddingX={3}>
                <Divider/>
                <ModalCloseButton />
              <ModalBody display="flex" flexDirection="column" padding="10px 0" >
                <Text fontWeight={600} fontSize={15}>Name</Text>
                <Text fontSize={11} color="gray.500">Team name including capitalization cannot be changed</Text>
                <Text position="relative" top="30px" left="10px"  color="gray.400">tm/</Text>
                <Input value={teamName} position="relative" size="sm" pl="35px" onChange={handleChange} />
                <Text color={characterRemaning===0?"red":"gray.500"} fontSize="9pt">{characterRemaning} character remaning</Text>
                {nameError && <Text fontSize="9pt" color="red" pt={1}>{nameError}
                  </Text>}
                <Box>
                    <Text fontWeight={600} fontSize={15} marginY={4}>Team Type</Text>
                    <Stack spacing={2}>
                      <Checkbox name="public" isChecked={teamType==="public"} onChange={onTeamChange}>
                        <Flex align="center">
                        <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                        <Text fontSize="10pt" mr={1}>Public</Text>
                        {teamType==="public" &&
                       <Text fontSize="10pt" color="gray.500" pt={1}>Anyone will be able to post , comment & view this team activity  </Text>
                       }
                      </Flex>
                      </Checkbox>
                      <Checkbox name="private" isChecked={teamType==="private"} onChange={onTeamChange}>
                      <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                        <Text fontSize="10pt" mr={1}>Private</Text>
                  
                      </Flex>
                      </Checkbox>
                      {teamType==="private" &&
                       <>
                        <Text fontSize="10pt" color="gray.500" pt={1}>Only approval team member will be able to post,comment & view in this team activity </Text>
                        <Input
           required
           type='password'
           placeholder='password'
          value={joinPassword}
           mb={2}
           fontSize="10pt"
           _placeholder={{color:'gray.500'}}
           _hover={{
            bg:'white',
            border:'1px solid',
            borderColor:"blue.500"
           }}
           _focus={{
            outline:"none",
            bg:'white',
            border:'1px solid',
            borderColor:"blue.500"

           }}
           bgColor='gray.50'
           onChange={handlePassword}
           />
            
                       </>
                      
                       
                       } 
                      <Checkbox name="restricted"isChecked={teamType==="restricted"} onChange={onTeamChange}>
                      <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                        <Text fontSize="10pt" mr={1}>Restricted</Text>
                        {teamType==="restricted" &&
                       <Text fontSize="10pt" color="gray.500" pt={1}>Anyone will be able to view the team activity but approval memeber post comment in this team </Text>
                       }
                      </Flex>
                      </Checkbox>
                    </Stack>
                </Box>

               </ModalBody>
              </Box>
              
             
    
              <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
        <Button variant="outline" height="30px" mr={2} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="solid"
          height="30px"
        onClick={createTeam}
          isLoading={loading}
        >
          Create Team
        </Button>
      </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}
export default CreateTeamModel;