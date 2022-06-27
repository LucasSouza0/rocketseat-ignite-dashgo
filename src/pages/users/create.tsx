import Link from "next/link";
import { useRouter } from 'next/router';
import { Box, Divider, Flex, Heading, HStack, SimpleGrid, VStack, Button } from "@chakra-ui/react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { Input } from "../../components/Form/Input";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { server } from '../../services/api';
import { queryClient } from "../../services/queryClient";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser igauais'),
});

export default function CreateUser() {
  const router = useRouter();
  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await server.post('/users', { user: { ...user, created_at: new Date() } });
    return response.data.data; 
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });

  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(createUserFormSchema) });
  const errors = formState.errors;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data);
    router.push('/users');
  };

  return (
    <Box>
      <Header />
      <Flex w='100%' mx='auto' my='6' px='6' maxWidth={1480}>
        <Sidebar />

        <Box 
          p={['6', '8']} 
          bg='gray.800' 
          as="form" 
          flex='1'       
          borderRadius={8}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size='lg' fontWeight='normal'> Criar usuário </Heading>
          <Divider my='6' borderColor='gray.700' />

          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input 
                label='Nome Completo' 
                error={errors.name}
                {...register('name')} 
              />
              <Input 
                label='E-mail' 
                type='email' 
                error={errors.email}
                {...register('email')} 
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input 
                label='Senha' 
                type='password'
                error={errors.password}
                {...register('password')} 
              />
              <Input 
                label='Confirme sua senha' 
                type='password' 
                error={errors.password_confirmation}
                {...register('password_confirmation')} 
              />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/users' passHref>
                <Button colorScheme='whiteAlpha'> Cancelar </Button>
              </Link>
              <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting}> Salvar </Button>
            </HStack>
          </Flex>

        </Box>
      </Flex>
    </Box>
  );
}
