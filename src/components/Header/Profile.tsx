import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean | undefined;
}

export function Profile({ showProfileData = true }: ProfileProps): JSX.Element {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Frederico Parreira</Text>
          <Text color="gray.300" fontSize="small">
            souofred.developer@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Frederico Parreira"
        src="https://github.com/fredowisk.png"
      />
    </Flex>
  );
}
