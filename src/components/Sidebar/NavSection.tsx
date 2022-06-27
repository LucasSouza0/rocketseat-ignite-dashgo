import { ReactNode } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: Props) {
  return (
    <Box>
      <Text color='gray.400' fontWeight='bold' fontSize='small'> { title } </Text>
      <Stack spacing='4' mt='8' align='stretch'>
        { children }
      </Stack>
    </Box>
  );
}
