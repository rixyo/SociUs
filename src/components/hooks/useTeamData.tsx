import { Team, TeamSnippet, teamState } from "@/atoms/teamAtom";
import { auth, fireStore } from "@/Firebase/clientapp";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";

const useTeamData= () => {
    //const router=useRouter()

    const [user]=useAuthState(auth)
    const router=useRouter()
    const setAuthModalState = useSetRecoilState(authModalState);

    const [teamStateValue,setTeamStateValue]=useRecoilState(teamState)
    const [loading,setLoading]=useState<boolean>(false)
    const [customError,setCustomError]=useState<string>('')
    const onJoinOrLeaveTeam=(teamData:Team,isJoined:boolean,creatorId:string)=>{
       
        if (!user) {
            setAuthModalState({ open: true, view: "login" });
            return;
          }
        if(isJoined&&creatorId!==user?.uid ){
            leaveTeam(teamData)
            return
          
        }
        else if(isJoined&&creatorId===user?.uid){
            setCustomError("Admin cannot leave the team")
            return
        }
       
     joinTeam(teamData)


    }
    
    const getMySnippet=async()=>{
        setLoading(true)
        try {
            const snippetDocs=getDocs(collection(fireStore,`users/${user?.uid}/teamSnippets`))
            const snippet= (await snippetDocs).docs.map(doc=>({
                ...doc.data()
            }))
            setTeamStateValue(prev=>({
                ...prev,mySnippets:snippet as TeamSnippet[],
                snippetsFeatchStatus:true
            }))
            
            
            
        } catch (error:any) {
            console.log("snipppet Erroe",error.message)
            setCustomError(error.message)
            
        }
        setLoading(false)
    }
    const getTeamData=async(teamId:string)=>{
        try {
            const teamDocRef=doc(fireStore,"teams",teamId)
            const teamDoc=await getDoc(teamDocRef)
            setTeamStateValue(prev=>({
                ...prev,currentTeam:{...teamDoc.data(),id:teamDoc.id} as Team
            }))
           

            
        } catch (error:any) {
            console.log("team data error",error.message)
            
        }

    }
    useEffect(()=>{
        if(!user){
            return
        }else{
            getMySnippet()
        }
      
     
    },[user?.uid])
    useEffect(()=>{
        const {teamId}=router.query
        if(teamId && !teamStateValue.currentTeam){
            getTeamData(teamId as string)
        }

    },[router.query,teamStateValue.currentTeam])
    const joinTeam=async(teamData:Team)=>{
       
        try {
           
                const betch=writeBatch(fireStore)
            const newSnippet:TeamSnippet={
                teamId: teamData.id,
                imageUrl: teamData.imageUrl || ""
            }
            betch.set(doc(fireStore,`users/${user?.uid}/teamSnippets`,teamData.id),newSnippet)
           
            betch.update(doc(fireStore,"teams",teamData.id),{
                
                members: arrayUnion(user?.uid),
                
            })
           await betch.commit()
           setTeamStateValue(prev=>({
            ...prev,mySnippets:[...prev.mySnippets,newSnippet]
           }))
        } catch (error:any) {
            console.log("Faild to join",error.message)
            setCustomError(error.message)
        }
        setLoading(false)
    }
    const leaveTeam=async(teamData:Team)=>{
    
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
                    members:arrayRemove(user?.uid)
                  });

            
      
                await batch.commit();

            setTeamStateValue((prev) => ({
              ...prev,
              mySnippets: prev.mySnippets.filter(
                (item) => item.teamId!== teamData.id
              ),
            }));
          

    } catch (error:any) {
        console.log("leaveCommunity error", error);
        setCustomError(error.message)
        
      }
        setLoading(false);
    }
    return{
        teamStateValue,
        onJoinOrLeaveTeam,
        loading,
        customError,
        setCustomError
    }
}

export default useTeamData