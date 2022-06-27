import { HStack, Icon } from '@chakra-ui/react';
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

export function NotificationsNav() {
  return (
    <HStack
      mx={['6', '8']}
      pr={['6', '8']}
      py='1'
      color='gray.300'
      spacing={['6', '8']}
      borderColor='gray.700'
      borderRightWidth={1}
    >
      <Icon as={RiNotificationLine} fontSize='20' />
      <Icon as={RiUserAddLine} fontSize='20' />
    </HStack>
  );
}
