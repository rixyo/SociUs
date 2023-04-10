import PageContent from '@/components/Layout/PageContent'

import type { NextPage } from 'next'
import CreatePostLink from './Profile/ProfilePost/CreatePostLink'

const Home: NextPage = () => {
  const buildUserFeed=async()=>{
  }
  const buildNoUserFeed=async()=>{

  }
  const getUserVote=async()=>{}
  return(
   <PageContent>
    <>
    <CreatePostLink/>
   
    </>
    <>LHS</>
   </PageContent>
  )

}
export default Home