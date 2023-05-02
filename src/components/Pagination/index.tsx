import { Box, HStack, Stack, Text } from "@chakra-ui/react";

import { PaginationButton } from "./PaginationButton";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const SIBLINGS_COUNT = 1;

function generateArrayOfPages(from: number, to: number): [] {
  return [...new Array(to - from)].reduce((acc, _, index) => {
    const page = from + index + 1;

    if (page > 0) {
      acc.push(page);
    }

    return acc;
  }, []);
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  registersPerPage = 10,
  onPageChange = () => {},
}: PaginationProps): JSX.Element {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generateArrayOfPages(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generateArrayOfPages(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        {currentPage > 1 + SIBLINGS_COUNT && (
          <>
            <PaginationButton onPageChange={onPageChange} number={1} />
            {currentPage > 2 + SIBLINGS_COUNT && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationButton
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        <PaginationButton
          onPageChange={onPageChange}
          isCurrent
          number={currentPage}
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationButton
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        {currentPage + SIBLINGS_COUNT < lastPage && (
          <>
            {currentPage + 1 + SIBLINGS_COUNT < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationButton onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </HStack>
    </Stack>
  );
}
