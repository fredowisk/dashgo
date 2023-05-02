import { Icon, Link, Text, LinkProps } from "@chakra-ui/react";

import { ActiveLink } from "../ActiveLink";

import { IconType } from "react-icons";

interface NavLinkProps extends LinkProps {
  icon: IconType;
  href: string;
  children: string;
}

export function NavLink({ icon, href, children }: NavLinkProps): JSX.Element {
  return (
    <ActiveLink href={href}>
      <Link as="div" display="flex" alignItems="center">
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Link>
    </ActiveLink>
  );
}
