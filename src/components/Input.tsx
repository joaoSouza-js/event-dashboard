import { ComponentProps, ReactElement, forwardRef } from "react";
import { tv, type VariantProps } from 'tailwind-variants';

const inputStyles = tv({
    base: "flex items-center px-3 border border-zinc-500 bg-gray-950  py-2 px-3 rounded-lg    focus-within:border-zinc-200 focus-within:border-[2px] ",
})


type InputStylesProps = VariantProps<typeof inputStyles>;

type InputProps = ComponentProps<"input"> & InputStylesProps & {
    LeftIcon?: ReactElement
    RightIcon?: ReactElement
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { LeftIcon, RightIcon, className, ...rest } = props
    return (
        <div className={inputStyles({
            className,
        
        })}  >
            <div>
                {LeftIcon}

            </div>
            <input 
                ref={ref} 
                className="flex-1 px-3 bg-transparent h-auto border-0 outline-none p-0 border-white/10 text-sm placeholder:text-zinc-400 focus:outline-none focus:shadow-none focus-within:ring-0 " 
                { ...rest}
            />
            <div>


                {RightIcon}
            </div>
        </div>
    )
})