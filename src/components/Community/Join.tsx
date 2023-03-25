import React, { useState } from "react";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { SiFauna } from "react-icons/si";
import { Team, TeamSnippet, teamState } from "@/atoms/teamAtom";
import { auth, fireStore } from "@/Firebase/clientapp";
import { writeBatch, doc, increment, arrayUnion } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRecoilState } from "recoil";



type JoinTeamProps = {
  teamData:Team,
  joinKey:string
  
};
const Join: React.FC<JoinTeamProps> = ({teamData,joinKey}) => {
const [teamStateValue,setTeamStateValue]=useRecoilState(teamState)


  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [customError,setCustomError]=useState<string>("")
  const [user]=useAuthState(auth)
  
  const onSubmit = async() => {
    if(joinKey===password){
      setSuccess(true)
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
      } catch (error:any) {
        console.log("Faild to join",error.message)
        setCustomError(error.message)
      }
      setSuccess(false)

    }
    

  }

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Icon as={SiFauna} color="#8B3A3A" fontSize={40} mb={2} />
      <Text fontWeight={700} mb={2}>
       Enter joining key
      </Text>
     
        <>
          
          <form onSubmit={onSubmit}  style={{ width: "100%" }}>
            <Input
            onChange={(e)=> setPassword(e.target.value)}
              required
              name="joinKey"
              placeholder="key"
              type="password"
              mb={2}
            
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
            {customError&& 
            <Text textAlign="center" fontSize="10pt" color="red">
           {customError}
            </Text>
            }
            
            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              isLoading={success}
             
            >
             Join
            </Button>
          </form>
        </>
      
      
     
    </Flex>
  );
};
export default Join;
