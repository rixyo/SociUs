import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import {auth, fireStore } from '@/Firebase/clientapp';
import {  GetServerSidePropsContext,NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Team, teamState } from '@/atoms/teamAtom';
import safeJsonStringify from "safe-json-stringify"
import TeamNotFound from '@/components/teams/notFound';
import Header from '@/components/teams/header';
import CreatePostLink from '@/components/teams/CreatePostLink';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Posts from '@/components/Posts/Posts';
import Polls from '@/components/Poll/Polls';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import About from '@/components/teams/About';



type teamProps = {
    teamData:Team
};

const TeamPage:NextPage<teamProps> = ({teamData}) => {
    const router = useRouter();
      const {teamId}=router.query
      const [joinedMember, setJoinedMember] = useState<string[]>([]);
      const[privacyType,setPrivacyType]=useState<string>("")
      const [user]=useAuthState(auth)
    const setTeamStateValue=useSetRecoilState(teamState)
    const maxWidth = '800px'

      if(teamId){
        useEffect(()=>{
            async function getTeamInfo(){
             const q=query(collection(fireStore,"teams"),where("Name","==",teamData.id))
             const querySnapshot = await getDocs(q);
             querySnapshot.forEach((doc) => {
                  const teamSnippets=doc.data()
                  setPrivacyType(teamSnippets.privacyType)
                  
                 setJoinedMember(teamSnippets.members)
                 
               
               });   
            }
           
            getTeamInfo()
         
         },[teamData])

      }
     
      const isJoined = !!joinedMember.find(
        (item) => item ===user?.uid
      );
      useEffect(() => {
        setTeamStateValue((prev) => ({
          ...prev,
          currentTeam: teamData,
        }));
      }, [teamData]);
      if(!teamData){
       return(
           <>
           <TeamNotFound/>
           </>
           
       )
      }

    return(
       <>
        <Header teamData={teamData}/>
        
     
      
    {isJoined && privacyType==="private" &&
      <Flex justify="center" padding="16px">
      <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}  >
      <Flex
       direction="column"
       width={{ base: "100%", md: "65%" }}
       mr={{ base: 0, md: 6 }}
       >
      <CreatePostLink/>
     
      <Stack gap={2}>
        <Polls/>

      <Posts teamData={teamData} />

      </Stack>
   
    
      </Flex>
      <Box   display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}>

      <About teamData={teamData} />
      </Box>
     

      
  </Flex>
          </Flex>
    }
    {privacyType==="public" &&
        <Flex justify="center" padding="16px">
        <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"} >
        <Flex
       direction="column"
       width={{ base: "100%", md: "65%" }}
       mr={{ base: 0, md: 6 }}>
        <CreatePostLink/>
       
        <Stack gap={2}>
          <Polls/>
  
        <Posts teamData={teamData} />
  
        </Stack>
     
      
        </Flex>
        <Box   display={{ base: "none", md: "flex" }}
            flexDirection="column"
            flexGrow={1}>
        <About teamData={teamData} />
       </Box>
        <>
       
     
       
        </>
        
    </Flex>
            </Flex>
    }
    

</>
       

    )     
}


export async function getServerSideProps(context:GetServerSidePropsContext){
   
    try {

        const teamDocRef=doc(fireStore,"teams",context.query.teamId as string)
      
        
        const teamDoc=await getDoc(teamDocRef)
    
        return{
           props:{
            teamData: teamDoc.exists() ? JSON.parse(safeJsonStringify({
                id: teamDoc.id, ...teamDoc.data(),
            }))
            : ""
           }
        }
        
    } catch (error) {
        console.log("ServerSideProps error",error)
        
    }


   

}
export default TeamPage;


