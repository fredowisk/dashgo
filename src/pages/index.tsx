import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input as FormInput } from "../components/Form/Input";

type FormValues = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail is required").email("Invalid e-mail"),
  password: yup.string().required("Password is required"),
});

export default function SignIn(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<FormValues> = async ({ email, password }) => {};

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <FormInput
            label="E-mail"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <FormInput
            label="Password"
            type="password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>
        <Button
          isLoading={isSubmitting}
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
