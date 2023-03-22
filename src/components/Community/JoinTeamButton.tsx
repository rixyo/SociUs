
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from '@/atoms/authModalAtom';
import { Button,Text } from "@chakra-ui/react";
import { joinModalState } from "@/atoms/joinModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fireStore } from "@/Firebase/clientapp";
import useTeamData from "../hooks/useTeamData";
import { Team, teamState } from "@/atoms/teamAtom";
import { writeBatch, getDocs, collection, doc, increment, arrayRemove } from "firebase/firestore";
import { useRouter } from "next/router";
import NextNProgress from 'nextjs-progressbar';

type AuthButtonsProps = {
  isJoined:boolean,
  joinedMember:string[],
  teamData:Team
};

const JoinTeamButton: React.FC<AuthButtonsProps> = ({isJoined,joinedMember,teamData}) => {
  const setTeamModalState = useSetRecoilState(joinModalState);
  const [creatorId,setCreatorId]=useState("")
  const[customError,setCustomError]=useState("")
  const [teamStateValue,setTeamStateValue]=useRecoilState(teamState)
  const [loading,setLoading]=useState(true)
 
  const [user]=useAuthState(auth)
  const router = useRouter()
  const leaveTeam=async()=>{
    try {
      const batch = writeBatch(fireStore);
      const snippetDocs=getDocs(collection(fireStore,"teams"))
      const snippet= (await snippetDocs).docs.map(doc=>({
          ...doc.data()
      }))
      snippet.map(e=>{
        setCreatorId(e.creatorId)
      })
   
    

      batch.delete(
        doc(fireStore, `users/${user?.uid}/teamSnippets/${teamData.id}`)
      );

      batch.update(doc(fireStore, "teams", teamData.id), {
        numberOfMembers: increment(-1),
        members:arrayRemove(user?.uid)
      });
      
      if(user?.uid===creatorId){
          setCustomError("Admin canot leave the team"); return;

      } 
   
          await batch.commit();

      

   

      setTeamStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item:any) => item.teamId!== teamData.id
        ),
      }));
    
   
 

} catch (error:any) {
  console.log("leaveCommunity error", error);
  setCustomError(error.message)
  
}
  setLoading(false);
  

  }
  const handleClick=async ()=>{
    if(joinedMember.length>0){
      joinedMember.map((item)=>{
        if(item===user?.uid){
          setTeamModalState(pre=>({
            ...pre,
            open:false
          }))
        }else{
         
              {
                  setTeamModalState ({ open: true, view:"join"})
              }

          
        
        }

      })
    }
    if(isJoined){
      leaveTeam()
      router.reload()
     router.push("/")

    }
    if(!isJoined){
      setTeamModalState ({ open: true, view:"join"});
    }

  }

  return (
    <>
      <Button
       variant={isJoined ? "outline" : "solid"}
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={handleClick}
      >
      {isJoined ? "Joined" : "Join"}
      </Button>
      {customError && <Text fontSize="10pt" color="red">
        {customError}
        </Text>}
      
    </>
  );
};
export default JoinTeamButton;


