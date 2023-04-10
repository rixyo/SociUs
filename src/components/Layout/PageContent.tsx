
import {Box, Flex} from "@chakra-ui/react"
type FlexProps = {
  justify: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | "initial" | "inherit" | "left" | "right";
  padding: string;
  width: string;
  maxWidth: string;
}
export default function PageContent<FlexProps>({
    children  }: {
    children: React.ReactNode
    maxWidth: "900px"
    justify: "center"
    padding: "16px"
    width: "95%"

  }) {
    
    return (
        <Flex justify="center" padding="16px"  >
        <Flex width="95%" justify="center" maxWidth={"900px"}
        >
          <Flex
            direction="column"
            width={{ base: "100%", md: "65%" }}
            mr={{ base: 0, md: 6 }}
          >
            {children && children[0 as keyof typeof children]}
          </Flex>
          
          <Box
         
         display={{ base: "none", md: "flex" }}
         flexDirection="column"
         flexGrow={1}
    
         
       >
         {children && children[1 as keyof typeof children]}
       </Box>
      
        </Flex>
        
      </Flex>
     
      
    )
  }