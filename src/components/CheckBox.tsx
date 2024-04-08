import { ComponentProps } from "react"
import {tv, type VariantProps} from "tailwind-variants"

const checkboxStyles = tv({
    base: "form-checkbox border size-4 border-white/10 bg-black/20 rounded"
})

type checkboxStylesProps = VariantProps<typeof checkboxStyles>

type checkboxProps = ComponentProps<"input"> & checkboxStylesProps

export function CheckBox( {className, type="checkbox", ...rest}: checkboxProps): JSX.Element {
    return (
        <input
            className={checkboxStyles({className})}
            type={type}
            {...rest}
        />
    )
}