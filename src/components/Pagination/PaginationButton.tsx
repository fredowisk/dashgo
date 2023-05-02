import { Button } from "@chakra-ui/react";

interface PaginationButtonProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationButton({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationButtonProps): JSX.Element {
  return isCurrent ? (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="pink"
      disabled
      _disabled={{
        bg: "pink.500",
        cursor: "default",
      }}
      _focus={{
        boxShadow:
          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
      }}
    >
      {number}
    </Button>
  ) : (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
      _active={{
        bg: "gray.600",
      }}
      _focus={{
        boxShadow:
          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
