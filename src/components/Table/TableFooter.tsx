import { ComponentProps } from "react"
import {tv, type VariantProps} from "tailwind-variants"
import { IconButton } from "../IconButton"
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRightIcon } from "lucide-react"

const TableFooterStyles = tv({
    base: ""
})

type TableFooterStylesProps = VariantProps<typeof TableFooterStyles>

type TableFooterProps = ComponentProps<"tfoot"> & TableFooterStylesProps

export function TableFooter({className,...rest}: TableFooterProps){
    return (
        <tfoot className={TableFooterStyles({className})} {...rest}>
            <tr >
                    <td
                        colSpan={3}
                        className=" text-sm text-zinc-300 py-4 px-4"
                    >
                        mostrando 10 de 282 itens
                    </td>
                    <td colSpan={3} className="py-3">
                        <div className="flex gap-6 items-center  justify-end px-4">
                            <span className="text-sm text-gray-200">Página de 11</span>
                            <div className="flex gap-1.5">
                                <IconButton variant="secondary">
                                    <ChevronsLeft className="size-4" />
                                </IconButton>
                                <IconButton variant="secondary">
                                    <ChevronLeft className="size-4" />

                                </IconButton>
                                <IconButton variant="secondary">
                                    <ChevronRight className="size-4" />
                                </IconButton>
                                <IconButton variant="secondary">
                                    <ChevronsRightIcon className="size-4" />
                                </IconButton>
                            </div>

                        </div>
                    </td>

                </tr>
        </tfoot>
    )
}