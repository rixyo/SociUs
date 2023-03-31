

import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import {BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {

  IoNotificationsOutline,

} from "react-icons/io5";


type ActionIconsProps = {};

const ActionIcons: React.FC<ActionIconsProps> = () => {

  return (
    <Flex alignItems="center" flexGrow={1}>
   
      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsChatDots} fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex>
     
      </>
    </Flex>
  );
};
export default ActionIcons;