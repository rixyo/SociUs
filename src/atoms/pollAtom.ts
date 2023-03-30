import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

 

export interface  Poll{
    id?:string,
    title:string,
    teamId:string,
    creatorDisplayName:string,
    options:[
      option1:{
        id:string,
          value:string,
          vote:string[],
        
        
        },
        option2:{
          id:string,
          value:string,
         
         
        },
        option3:{
          id:string,
          value:string,
      
         
        },
        option4:{
          id:string,
          value:string,
        
         
        },
        option5:{
          id:string,
          value:string,
        
        
        },
  ],
   
    createdBy:string,
    option1Votes?:string[],
    option2Votes?:string[],
    option3Votes?:string[],
    option4Votes?:string[],
    option5Votes?:string[],
    votedUser?:string[],
    createdAt:Timestamp,
    expirationDate:Timestamp,
}

interface PollState{
    selectedPoll: Poll|null,
    polls:Poll[]
}
const defaultPollState:PollState={
    selectedPoll:null,
    polls:[]

}
export const pollState=atom<PollState>({
    key:"Poll State",
    default: defaultPollState
})