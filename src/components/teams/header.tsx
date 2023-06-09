import { Team } from '@/atoms/teamAtom';
import { fireStore } from '@/Firebase/clientapp';
import { Box, Button, Flex, Icon,Image,List,Text} from '@chakra-ui/react';
import { collection, getDocs, query, where } from "firebase/firestore";

import  { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {GiDove} from "react-icons/gi"
import useTeamData from '../hooks/useTeamData';
import JoinTeamModal from '../Modal/JoinTeam/JoinTeamModal';
import JoinTeamButton from './JoinTeamButton';
type headerProps = {
    teamData: Team
};



const Header:React.FC<headerProps> = ({teamData}) => {


   //const [user]=useAuthState(auth)
   const [privacy,setPrivacy]=useState<string>("")
   const [joinKey,setJoinKey]=useState<string>("")
   const [joinedMember, setJoinedMember] = useState<string[]>([]);
   const [creatorId,setCreatorId]=useState<string>('')


    const {teamStateValue,
        onJoinOrLeaveTeam,
        loading,
        customError}=useTeamData()
    const isJoined = !!teamStateValue.mySnippets.find(
        (item) => item.teamId === teamData.id
      );
      const router = useRouter();
      const {teamId}=router.query

      if(teamId){
        useEffect(()=>{
            async function getTeamInfo(){
               
            
             const q=query(collection(fireStore,"teams"),where("Name","==",`${router.query.teamId}`))
             const querySnapshot = await getDocs(q);
             querySnapshot.forEach((doc) => {
            
                  const teamSnippets=doc.data()
                 setJoinKey(teamSnippets.joinKey)
                 setPrivacy(teamSnippets.privacyType)
                 setCreatorId(teamSnippets.creatorId)
                 setJoinedMember(teamSnippets.members)
               
               });   
            }
           
            getTeamInfo()
         
         },[`${router.query.teamId}`])

      }
 
    return (
        <>
       
  
        <Flex direction="column" width="100%" height="146px" mt={5}>
          <Box height="50%" bg="teal.400" />
            <Flex justify="center" bg="white" flex={1}>
                <Flex width="95%" maxWidth="860px">
                {teamStateValue.currentTeam?.imageUrl? (
                    <Image src={teamStateValue.currentTeam.imageUrl} 
                    borderRadius="full"
              boxSize="66px"
                    position="relative"
                    top={-3}
                    color="blue.500"
                    border="4px solid white" alt='team image'/>

                ):(
                    <Icon as={GiDove} fontSize={60} position="relative" top={-1/2} color="teal.500" border="8px solid white" borderRadius="50%"  />
                )}  
                <Flex padding="10px 16px">
                    <Flex direction="column" mr={6}>
                        <Text fontWeight={800} fontSize="16pt">
                            {teamData.id}
                            </Text>
                            <Text fontWeight={600} fontSize="10pt" color="gray.400">
                            tm/{teamData.id}
                            </Text>

                    </Flex>
                   
                  {privacy==="public" && 
                    <Button
                    variant={isJoined ? "outline" : "solid"}
                    height="30px"
                    pr={6}
                    pl={6}
                    onClick={() => onJoinOrLeaveTeam(teamData, isJoined,creatorId)}
                    isLoading={loading}
                  >
                    {isJoined ? "Joined" : "Join"}
                  </Button >
                  }
                   {customError &&<Text fontSize="9pt" mt={2} ml={2} fontWeight={600} color="red">
                    {customError}
                    </Text>}

                    <JoinTeamModal privacy={privacy} joinedMember={joinedMember}   teamData={teamData} joinKey={joinKey}   />
                   
                    {privacy==="private"
                     &&(
                        <>
                        <JoinTeamButton isJoined={isJoined} joinedMember={joinedMember} teamData={teamData} creatorId={creatorId} />
                        </>

                     )
                    
                    }
                    
                    
                    </Flex> 
                  <>
                
                    
                  </>

                    

                </Flex>

            </Flex>
            
          
            
        </Flex>
        </>
    )
}

export default Header;