import { Timestamp } from "firebase/firestore"
import {atom} from "recoil"

export interface Team{
    id:string,
    Name?:string,
    creatorDisplayName:string,
    creatorId:string,
    privacyType: "public" | "private" | "restricted",
    createdAt?:Timestamp,
    imageUrl?:string,
    members:string[],
    joinKey?:string,
    githubRepo?:string[],
    communicationChannel?:string[],

}
export interface TeamSnippet{
    teamId:string,
    isModerator?:boolean,
    imageUrl?:string
}
interface TeamState{
    mySnippets: TeamSnippet[],
    currentTeam?:Team
    snippetsFeatchStatus:boolean


}
const defaultTeamState:TeamState={
    mySnippets:[],
    snippetsFeatchStatus:false
}
export const teamState=atom<TeamState>({
    key:"teamsStates",
    default: defaultTeamState
})