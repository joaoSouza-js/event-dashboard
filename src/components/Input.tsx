import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, ReactElement, forwardRef } from "react";
import { tv, type VariantProps } from 'tailwind-variants';


const inputRootStyles = tv({
    base: "flex flex-col gap-2  ",
})

type inputRootProps = ComponentProps<"div"> & InputStylesProps & {
}

function InputRoot({ className, ...rest }: inputRootProps) {
    return (
        <div
            className={inputRootStyles({ className })}
            {...rest}
        />

    )
}

const InputErrorStyles = tv({
    base: "text-xs text-red-500 inline-block"
})

type InputErrorProps = ComponentProps<"span"> & InputStylesProps

function InputError({ className, children, ...rest }: InputErrorProps) {
    return (
        <span
            className={InputErrorStyles({ className })}
            {...rest}
        >
            {children}
        </span>
    )
}

const inputStyles = tv({
    base: "flex items-center px-3 border border-zinc-500 bg-gray-950  py-2 px-3 rounded-lg    focus-within:border-zinc-200 focus-within:border-[2px] ",
})
type InputStylesProps = VariantProps<typeof inputStyles>;

type InputProps = ComponentProps<"input"> & InputStylesProps & {
    LeftIcon?: ReactElement
    RightIcon?: ReactElement
}
const InputInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
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
                className="flex-1 px-3 bg-transparent h-auto border-0 outline-none p-0 border-white/10 text-base placeholder:text-zinc-400 focus:outline-none focus:shadow-none focus-within:ring-0 "
                {...rest}
            />
            <div>


                {RightIcon}
            </div>
        </div>
    )
})

type InputPasswordProps = ComponentProps<"input"> & InputStylesProps & {
    isVisible: boolean,
    changePasswordVisibility: () => void
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>((props, ref) => {
    const { isVisible, className, changePasswordVisibility, ...rest } = props
    return (
        <InputInput
            ref={ref}
            className="bg-transparent"
            placeholder="sua senha"
            RightIcon={
                isVisible
                    ? (
                        <Eye className="size-4"
                            onClick={changePasswordVisibility} />
                    )
                    : (
                        <EyeOff
                            className="size-4"
                            onClick={changePasswordVisibility}
                        />
                    )

            }
            {...rest}
        />

    )

})

export const Input = {
    Root: InputRoot,
    Input: InputInput,
    Password: InputPassword,
    Error: InputError
}
