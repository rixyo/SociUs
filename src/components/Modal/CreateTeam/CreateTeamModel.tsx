import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Divider,Text, Input, Stack, Checkbox, Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
type CreateCommunityModelProps = {
    open:boolean;
    handleClose:()=>void
};

const CreateTeamModel:React.FC<CreateCommunityModelProps> = ({open,handleClose}) => {
    const [teamName,setTeamName]=useState('')
    const [characterRemaning,setCharacterRemaing]=useState(21)
    const [teamType,setTeamType]=useState("private")
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.value.length > 21) return ;
        setTeamName(e.target.value)
        setCharacterRemaing(21 - e.target.value.length)
    }
    const onTeamChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTeamType(e.target.name)

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
                       {teamType==="private" &&
                       <Text fontSize="10pt" color="gray.500" pt={1}>Only approval team member will be able to post,comment & view in this team activity </Text>
                       } 
                      </Flex>
                      </Checkbox>
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
          //onClick={handleCreateTeam}
          //isLoading={loading}
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