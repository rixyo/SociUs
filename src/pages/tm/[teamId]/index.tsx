import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import {auth, fireStore } from '@/Firebase/clientapp';
import {  GetServerSidePropsContext,NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Team, teamState } from '@/atoms/teamAtom';
import safeJsonStringify from "safe-json-stringify"
import TeamNotFound from '@/components/teams/notFound';
import Header from '@/components/teams/header';
import PageComponent from '@/components/Layout/PageContent';
import CreatePostLink from '@/components/teams/CreatePostLink';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Posts from '@/components/Posts/Posts';
import Polls from '@/components/Poll/Polls';
import { Stack } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import About from '@/components/teams/About';
import PageContent from '@/components/Layout/PageContent';


type teamProps = {
    teamData:Team
};

const TeamPage:NextPage<teamProps> = ({teamData}) => {
    const router = useRouter();
      const {teamId}=router.query
      const [joinedMember, setJoinedMember] = useState<string[]>([]);
      const[privacyType,setPrivacyType]=useState("")
      const [user]=useAuthState(auth)
    const setTeamStateValue=useSetRecoilState(teamState)

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
      <>
      <PageContent maxWidth= "900px"
    justify= "center"
    padding= "16px"
    width= "95%" >
      <>
      <CreatePostLink/>
     
      <Stack gap={2}>
        <Polls/>

      <Posts teamData={teamData} />

      </Stack>
   
    
      </>
      <About teamData={teamData} />
     
      <>
     
   
     
      </>
      
  </PageContent>
          </>
    }
    {privacyType==="public" &&
        <>
        <PageContent
        maxWidth= "900px"
        justify= "center"
        padding= "16px"
        width= "95%"
         >
        <>
        <CreatePostLink/>
       
        <Stack gap={2}>
          <Polls/>
  
        <Posts teamData={teamData} />
  
        </Stack>
     
      
        </>
        <About teamData={teamData} />
       
        <>
       
     
       
        </>
        
    </PageContent>
            </>
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


