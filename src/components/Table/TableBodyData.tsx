import { ComponentProps } from "react"
import {tv, type VariantProps} from "tailwind-variants"

const TableBodyDataStyles = tv({
    base: "py-3 px-4 text-sm text-zinc-300"
})

type TableBodyDataStylesProps = VariantProps<typeof TableBodyDataStyles>

type TableBodyDataProps = ComponentProps<"td"> & TableBodyDataStylesProps

export function TableBodyData({className,...rest}: TableBodyDataProps){
    return (
        <td className={TableBodyDataStyles({className})} {...rest}/>
    )
}
