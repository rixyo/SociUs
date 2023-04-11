import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
export interface ProfilePost{
    id?:string,
    creatorId:string,
    creatorDisplayName:string,
    title:string,
    body:string,
    imageUrl?:string,
    numberOfComments:number,
    voteStatus?:number,
    createdAt: Timestamp,
    linkUrl?:string,
  

}

export type postVote={
    id:string,
    postId:string,
    voteValue:number,

}
interface ProfilePostState{
    selectedPost: ProfilePost|null,
    posts:ProfilePost[],
    postVotes:postVote[]
}
const defaultPostState:ProfilePostState={
    selectedPost:null,
    posts:[],
    postVotes:[]

}
export const profilePostState=atom<ProfilePostState>({
    key:"Profile Post State",
    default: defaultPostState
})