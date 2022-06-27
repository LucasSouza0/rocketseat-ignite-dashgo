import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
      w='64'
      fontWeight='bold'
      letterSpacing='tight'
      fontSize={['2xl', '3xl']}
    >
      dashgo
      <Text as='span' ml='1' color='pink.500'>.</Text>
    </Text>
  );
}