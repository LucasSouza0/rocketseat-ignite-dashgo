import { useState } from "react";
import NextLink from "next/link";
import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { getUsers, useUsers } from './../../services/hooks/useUsers';
import { queryClient } from "../../services/queryClient";
import { server } from "../../services/api";
import { GetServerSideProps } from "next";

export default function UserList({ users }: any) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page, { initialData: users });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await server.get(`users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10,
    });
  }

  return (
    <Box>
      <Header />
      <Flex w='100%' mx='auto' my='6' px='6' maxWidth={1480}>
        <Sidebar />

        <Box flex='1' p='8' bg='gray.800' borderRadius={8}>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Usuários
              {(!isLoading && isFetching) && <Spinner size='sm' color='gray.500' ml='4' />}
            </Heading>

            <NextLink href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='small'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text> Flaha no carregamento dos dados </Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color='gray.300' w='8'>
                      <Checkbox colorScheme='pink' />
                    </Th>
                    <Th> Usuário </Th>
                    {isWideVersion && <Th> Data de cadastro </Th>}
                    <Th w='8'>  </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme='pink' />
                      </Td>
                      <Td>
                        <Box>
                          <Link color='purple.400' onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
                            <Text fontWeight='bold'> {user.name} </Text>
                          </Link>

                          <Text fontSize='small' color='gray-300'> {user.email} </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td> {user.createdAt} </Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data?.totalCount || 10}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1);
  
//   return {
//     props: {
//       users
//     },
//   }
// }