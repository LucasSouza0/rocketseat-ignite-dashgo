import { cloneElement, ReactElement } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExatHref?: boolean;
}

export function ActiveLink({ children, shouldMatchExatHref = false, ...props }: ActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (shouldMatchExatHref && (asPath == props.href || asPath == props.as)) {
    isActive = true;
  }

  if (!shouldMatchExatHref && (asPath.startsWith(String(props.href)) || asPath.startsWith(String(props.as)))) {
    isActive = true;
  }

  return (
    <Link {...props}>
      {cloneElement(children, { 
        color: isActive ? 'pink.400' : 'gray-50',
      })}
    </Link>
  );
}
