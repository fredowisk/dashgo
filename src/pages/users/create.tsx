import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { Header } from "@/src/components/Header";
import { Sidebar } from "@/src/components/Sidebar";
import { Input } from "@/src/components/Form/Input";

import { api } from "@/src/services/api";
import { queryClient } from "@/src/services/queryClient";

type FormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("E-mail is required").email("Invalid e-mail"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Min of 6 characters"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must be the same"),
});

export default function CreateUser(): JSX.Element {
  const router = useRouter();

  const createUser = useMutation(
    async (user: FormValues) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleCreateUser: SubmitHandler<FormValues> = async (values) => {
    await createUser.mutateAsync(values);

    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex={1}
          borderRadius={8}
          bg="gray.800"
          p="8"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Create user
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <Stack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth={240} gap={["6", "8"]} w="100%">
              <Input
                label="Full name"
                error={errors.name}
                {...register("name")}
              />
              <Input
                type="email"
                label="E-mail"
                error={errors.email}
                {...register("email")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth={240} gap={["6", "8"]} w="100%">
              <Input
                type="password"
                label="Password"
                error={errors.password}
                {...register("password")}
              />
              <Input
                type="password"
                label="Password confirmation"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </Stack>
          <Flex mt={["6", "8"]} justify="flex-end">
            <HStack spacing="4">
              <Link href="/users">
                <Button colorScheme="whiteAlpha">Cancel</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
