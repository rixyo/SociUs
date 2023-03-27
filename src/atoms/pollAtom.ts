import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface  Poll{
    id:string,
    teamId:string,
    creatorDisplayName:string,
    options:string[],
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