import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import {fireStore } from '@/Firebase/clientapp';
import {  GetServerSidePropsContext,NextPage } from 'next';
import React, { useEffect } from 'react';
import { Team } from '@/atoms/teamAtom';
import safeJsonStringify from "safe-json-stringify"
import TeamNotFound from '@/components/Community/notFound';
import Header from '@/components/Community/header';
import PageComponent from '@/components/Layout/PageComponent';
import CreatePostLink from '@/components/Community/CreatePostLink';





type teamProps = {
    teamData:Team
};

const TeamPage:NextPage<teamProps> = ({teamData}) => {
  
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
        <PageComponent>
            <>
            <CreatePostLink/>
            </>
        </PageComponent>
       
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