import { auth } from "@/Firebase/clientapp";
import {Flex,Image} from "@chakra-ui/react"
import { Router } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { useRouter } from "next/router";

const Navbar:React.FC= () => {
    const [user, loading, error] = useAuthState(auth);
    const router=useRouter()
    const handleClick=()=>{
        router.push("/")
    }
    
    return(
    <Flex bg="white" height="44px" padding="6px 12px" marginTop="20px" justifyContent={{md:"space-between"}}  >
        <Flex width={{base:"40px",md:"auto"}} mr={{base:0,md:2}}  >
           <Image src="/LOGO.png" height="35px" width="100px"  display={{ base: "none", md: "unset" }} onClick={handleClick} cursor="pointer" />
        </Flex>
        
        <Flex >
          
            <SearchInput User={user}  />
            

        </Flex>
        <Flex>
        <RightContent User={user}/>
        </Flex>
     
</Flex>
    )
}
export default Navbar;