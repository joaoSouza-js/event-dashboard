import { ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from 'tailwind-variants';

const LinkButtonStyles = tv({
    base: " p-2  min-h-9 flex justify-center items-center rounded-md focus:outline-white focus:outline-2 border disabled:opacity-50 disabled:cursor-not-allowed ",
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

type LinkButtonVariants = VariantProps<typeof LinkButtonStyles>;
type LinkButtonProps = ComponentProps<"a"> & LinkButtonVariants


export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
    const { variant = "primary", className, ...rest } = props
    return (
        <a
            ref={ref}
            className={LinkButtonStyles({ variant, className, })}

            {...rest}
        />
    )
})

