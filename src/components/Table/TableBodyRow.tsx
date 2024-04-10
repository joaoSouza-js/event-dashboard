import { ComponentProps } from "react";

type TableBodyRowProps = ComponentProps<"tr">

export function TableBodyRow(props: TableBodyRowProps) {
    return (
        <tr
            className="border-b border-b-white/10 transition hover:bg-white/5"
            {...props}
        />
            
       
    )
}