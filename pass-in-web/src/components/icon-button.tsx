import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<'button'> {
  transparent?: boolean;
}

export function IconButton({ transparent, ...rest }: Readonly<IconButtonProps>) {
  return (
    // Cinco formas de passar o children para o button:

    // <button>{children}</button> --> Sem o uso do spread, criando uma propriedade children do tipo React.ReactNode
    // <button {...rest}>{children}</button> --> Com o uso do spread e criando uma propriedade children  do tipo React.ReactNode separando dos demais atributos estendidos e repassados para o button através do spread
    // <button>{...rest.children}</button>
    // <button {...rest} children={algum valor}/>
    <button
      {...rest}
      // className={
      //   `border border-white/10 rounded-md px-1.5 p-1.5 
      //   ${transparent 
      //     ? "bg-black/20" 
      //     : "bg-white/20"
      //    }`
      // }
      className={twMerge(
        "border border-white/10 rounded-md px-1.5 p-1.5",
        transparent ? "bg-black/20" : "bg-white/20",
        rest.disabled ? 'opacity-50' : null
      )}
    />
  )
}