import { ComponentProps } from "react"
import {tv, type VariantProps} from "tailwind-variants"

const NavLinkStyles = tv({
    base: "text-sm   font-medium text-zinc-300"
})

type NavLinkStylesProps = VariantProps<typeof NavLinkStyles>

type NavLinkProps = ComponentProps<"a"> & NavLinkStylesProps

export function NavLink({className,...rest}: NavLinkProps){
    return (
        <a 
            className={NavLinkStyles({className})} 
            {...rest}
        />
    )
}