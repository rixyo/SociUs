import PageContent from '@/components/Layout/PageContent'
import CreatePostLink from '@/components/teams/CreatePostLink'
import type { NextPage } from 'next'
import CreateProfilePostLink from './post/createProfilePostLink'
const Home: NextPage = () => {
  return(
   <PageContent>
    <>
    <CreateProfilePostLink />
    </>
    <>LHS</>
   </PageContent>
  )

}
export default Home