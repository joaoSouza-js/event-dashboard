import { ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from 'tailwind-variants';

const iconButtonStyles = tv({
    base: "min-w-7 min-h-7 p-2 justify-center items-center rounded-md focus:outline-white focus:outline-2 border disabled:opacity-50 disabled:cursor-not-allowed ",
    variants: {
        variant: {
            primary: "bg-black/20 border-white/10",
            secondary: "bg-white/10 border-white/10",
        },

    },
    defaultVariants: {
        variant: "primary",
    }
})

type iconButtonVariants = VariantProps<typeof iconButtonStyles>;

type iconButtonProps = ComponentProps<"button"> & iconButtonVariants


export const IconButton = forwardRef<HTMLButtonElement, iconButtonProps>((props, ref) => {
    const {variant="primary", disabled , className,...rest} = props
    return (
        <button
            ref={ref}
            className={iconButtonStyles({ variant, className, })}
            disabled={disabled}
            {...rest}
        />
    )
})

