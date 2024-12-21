import { Link } from "@chakra-ui/react";

const NavLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link
      fontFamily="mono"
      textDecorationLine={"underline"}
      textUnderlineOffset={"0.2em"}
      fontSize={{ base: "14px", lg: "12px" }}
      href={href}
    >
      {text}
    </Link>
  );
};

export default NavLink;
