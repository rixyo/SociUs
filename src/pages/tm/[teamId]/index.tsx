import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import {auth, fireStore } from '@/Firebase/clientapp';
import {  GetServerSidePropsContext,NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Team } from '@/atoms/teamAtom';
import safeJsonStringify from "safe-json-stringify"
import TeamNotFound from '@/components/Community/notFound';
import Header from '@/components/Community/header';
import PageComponent from '@/components/Layout/PageComponent';
import CreatePostLink from '@/components/Community/CreatePostLink';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';





type teamProps = {
    teamData:Team
};

const TeamPage:NextPage<teamProps> = ({teamData}) => {
    const router = useRouter();
      const {teamId}=router.query
      const [joinedMember, setJoinedMember] = useState<string[]>([]);
      const[privacyType,setPrivacyType]=useState("")
      const [user]=useAuthState(auth)
    

      if(teamId){
        useEffect(()=>{
            async function getTeamInfo(){
               
            
             const q=query(collection(fireStore,"teams"),where("Name","==",`${router.query.teamId}`))
             const querySnapshot = await getDocs(q);
             querySnapshot.forEach((doc) => {
                 
                  const teamSnippets=doc.data()
                  setPrivacyType(teamSnippets.privacyType)
                 setJoinedMember(teamSnippets.members)
                 
                
               
               });   
            }
           
            getTeamInfo()
         
         },[Header])

      }
     
      const isJoined = !!joinedMember.find(
        (item) => item ===user?.uid
      );
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
      <PageComponent>
      <>
      <CreatePostLink/>
      </>
      <>
      <div>Hello</div>
      </>
  </PageComponent>
          </>
    }
    {privacyType==="public" &&
        <>
        <PageComponent>
        <>
        <CreatePostLink/>
        </>
        <>
        <div>Hello</div>
        </>
    </PageComponent>
            </>
    }
    

</>
       

    )     
}


export async function getServerSideProps(context:GetServerSidePropsContext){
   
    try {
    
        
        const teamDocRef=doc(fireStore,"teams",context.query.teamId as string)
        
        const teamDoc=await getDoc(teamDocRef)
        console.log(teamDoc.data)
        return{
           props:{
            teamData: teamDoc.exists() ? JSON.parse(safeJsonStringify({
                id: teamDoc.id, ...teamDoc.data,
            }))
            : ""
           }
        }
        
    } catch (error) {
        console.log("ServerSideProps error",error)
        
    }


   

}
export default TeamPage;


