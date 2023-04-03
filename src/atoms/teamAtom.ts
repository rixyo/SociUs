import { Timestamp } from "firebase/firestore"
import {atom} from "recoil"

export interface Team{
    id:string,
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


}
const defaultTeamState:TeamState={
    mySnippets:[]
}
export const teamState=atom<TeamState>({
    key:"teamsStates",
    default: defaultTeamState
})