import { tv, type VariantProps } from "tailwind-variants"
import { ComponentProps } from "react"

const tableStyles = tv({
    base: "w-full"
})

type tableStylesProps = VariantProps<typeof tableStyles>

type tableProps = ComponentProps<"table"> & tableStylesProps

export function Table({ className, ...rest }: tableProps) {
    return (
        <div className="border border-white/10 rounded-lg mt-4">
            <table className={tableStyles({ className })} {...rest}/>

        </div>

    )
}