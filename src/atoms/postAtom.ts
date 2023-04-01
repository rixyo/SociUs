import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
export interface Post{
    id?:string,
    teamId:string,
    creatorId:string,
    creatorDisplayName:string,
    title:string,
    body:string,
    imageUrl?:string,
    numberOfComments:number,
    voteStatus:number,
   teamImageUrl?:string,
    createdAt: Timestamp,
    linkUrl?:string,
  

}

export type postVote={
    id:string,
    postId:string,
    voteValue:number,
    teamId:string
}
interface PostState{
    selectedPost: Post|null,
    posts:Post[],
    postVotes:postVote[]
}
const defaultPostState:PostState={
    selectedPost:null,
    posts:[],
    postVotes:[]

}
export const postState=atom<PostState>({
    key:"Post State",
    default: defaultPostState
})