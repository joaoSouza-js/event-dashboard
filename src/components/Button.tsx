import { ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from 'tailwind-variants';

const ButtonStyles = tv({
    base: " p-2 flex justify-center items-center rounded-md focus:outline-white focus:outline-2 border disabled:opacity-50 disabled:cursor-not-allowed ",
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

type ButtonVariants = VariantProps<typeof ButtonStyles>;
type ButtonProps = ComponentProps<"button"> & ButtonVariants 


export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {variant="primary", disabled , className,...rest} = props
    return (
        <button
            ref={ref}
            className={ButtonStyles({ variant, className, })}
            disabled={disabled}
            {...rest}
        />
    )
})

