import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
type option= {
    value:string,
    votes:[]

}
 

export interface  Poll{
    id:string,
    title:string,
    teamId:string,
    creatorDisplayName:string,
    options:[
        option1:{
            value:string,
            vote:[]
          
          },
          option2:{
            value:string,
            vote:[]
           
          },
          option3:{
            value:string,
            vote:[]
           
          },
          option4:{
            value:string,
            vote:[]
           
          },
          option5:{
            value:string,
            vote:[]
          
          },
    ],
    createdBy:string,
    totalVotes?:[string],
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