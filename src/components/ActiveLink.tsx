import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinksProps extends LinkProps {
  children: ReactElement;
  shouldMatchHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchHref = true,
  ...rest
}: ActiveLinksProps): JSX.Element {
  const { asPath } = useRouter();

  let isActive = false;

  if (
    shouldMatchHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50",
      })}
    </Link>
  );
}
