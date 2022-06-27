import { Flex, Input, Icon } from '@chakra-ui/react';
import { useRef } from 'react';
import { RiSearch2Line } from 'react-icons/ri';

export function SearchBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as='label'
      flex='1'
      py='4'
      px='8'
      ml='6'
      bg='gray.800'
      alignSelf='center'
      color='gray.200'
      position='relative'
      borderRadius='full'
      maxWidth={400}
    >
      <Input
        px='4'
        mr='4'
        ref={searchInputRef}
        color='gray.50'
        variant='unstyled'
        placeholder='Buscar na plataforma'
        _placeholder={{ color: 'gray-400' }}
      />

      <Icon as={RiSearch2Line} fontSize='20' />
    </Flex>
  );
}
