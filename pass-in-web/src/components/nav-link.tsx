import { ComponentProps, ReactNode } from "react";

// interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>{
interface NavLinkProps extends ComponentProps<'a'> {
  children: ReactNode;
  opacity?: boolean
}

export function NavLink({ children, opacity, ...rest }: Readonly<NavLinkProps>) {
  return (
    <a {...rest} className={
      `font-medium text-sm
      ${opacity ? 'text-zinc-300' : 'text-white'}`
    }>
      {children}
    </a>
  )
}