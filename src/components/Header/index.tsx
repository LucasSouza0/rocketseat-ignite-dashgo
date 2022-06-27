import { Flex, IconButton, useBreakpointValue, Icon } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../hooks/SidebarDrawerContext';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {
  const { onOpen } = useSidebarDrawer();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Flex
      as='header'
      w='100%'
      h='20'
      mx='auto'
      mt='4'
      px='6'
      align='center'
      maxWidth={1480}
    >
      {!isWideVersion && (
        <IconButton
          aria-label='Open navigation'
          icon={<Icon as={RiMenuLine} />}
          fontSize='24'
          variant='unstyled'
          onClick={onOpen}
          mr='2'
          mt='2'
        ></IconButton>
      )}
      
      <Logo />
      
      { isWideVersion && <SearchBox /> }

      <Flex
        ml='auto'
        align='center'
      >
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
