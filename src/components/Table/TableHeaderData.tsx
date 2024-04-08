import { ComponentProps } from "react"
import {tv, type VariantProps} from "tailwind-variants"

const TableHeaderDataStyles = tv({
    base: "py-3 px-4 text-sm  font-semibold text-left"
})

type TableHeaderDataStylesProps = VariantProps<typeof TableHeaderDataStyles>

type AttendeeListTableHeaderProps = ComponentProps<"th"> & TableHeaderDataStylesProps

export function TableHeaderData({className,...rest}: AttendeeListTableHeaderProps){
    return (
        <th className={TableHeaderDataStyles({className})} {...rest}/>
    )
}