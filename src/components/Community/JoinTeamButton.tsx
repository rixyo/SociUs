
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button,Text } from "@chakra-ui/react";
import { joinModalState } from "@/atoms/joinModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fireStore } from "@/Firebase/clientapp";
import useTeamData from "../hooks/useTeamData";
import { Team, teamState } from "@/atoms/teamAtom";
import { writeBatch, getDocs, collection, doc, increment, arrayRemove } from "firebase/firestore";
import { useRouter } from "next/router";


type AuthButtonsProps = {
  isJoined:boolean,
  joinedMember:string[],
  teamData:Team,
  creatorId:string
};

const JoinTeamButton: React.FC<AuthButtonsProps> = ({isJoined,joinedMember,teamData,creatorId}) => {
  const setTeamModalState = useSetRecoilState(joinModalState);
 
  const [teamStateValue,setTeamStateValue]=useRecoilState(teamState)
  const [loading,setLoading]=useState(false)
 const {onJoinOrLeaveTeam,customError,setCustomError} =useTeamData()
 
  const [user]=useAuthState(auth)
  const router = useRouter()
 
  const handleClick=async ()=>{
    if(isJoined){
      setTeamModalState(pre=>({
        ...pre,
        open:false
      }))

    }else{
      setTeamModalState ({ open: true, view:"join"})

    }
    
    if(isJoined&&creatorId===user?.uid){
      setCustomError("Admin Cannot leave the team")
      
    }else{
      if(isJoined){
        try {
          const batch = writeBatch(fireStore);
          const snippetDocs=getDocs(collection(fireStore,"teams"))
          const snippet= (await snippetDocs).docs.map(doc=>({
              ...doc.data()
          }))
         
          batch.delete(
            doc(fireStore, `users/${user?.uid}/teamSnippets/${teamData.id}`)
          );
          
              batch.update(doc(fireStore, "teams", teamData.id), {
                  numberOfMembers: increment(-1),
                  members:arrayRemove(user?.uid)
                });
  
          
    
              await batch.commit();
  
          setTeamStateValue((prev) => ({
            ...prev,
            mySnippets: prev.mySnippets.filter(
              (item) => item.teamId!== teamData.id
            ),
          }));
          router.push("/")
  
  } catch (error:any) {
      console.log("leaveCommunity error", error);
      setCustomError(error.message)
      
    }

      }
     
    setLoading(false);
     
     
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
        isLoading={loading}
      >
      {isJoined ? "Joined" : "Join"}
      </Button>
      {customError  && <Text fontSize="10pt" color="red">
        {customError}
        </Text>}
      
    </>
  );
};
export default JoinTeamButton;


