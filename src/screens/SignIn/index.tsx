import Logo from "../../assets/logo.svg"
import GoogleLogo from "../../assets/google.svg"
import { Input } from "../../components/Input"
import z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/Button"
import { LinkButton } from "../../components/LinkButton"
import { useState } from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import { api } from "../../services/api"
import { AppError } from "../../_error/appError"
import { AlertToast } from "../../components/AlertToast"
import {  useNavigate } from "react-router-dom"

const SignInSchemaForm = z.object({
    email: z.string({required_error: "Email é obrigatório"}).email({message:"Email inválido"}),
    password: z.string({required_error: "Esqueceu de Digitar a senha"}).min(1, {message:"Esqueceu de Digitar a senha"}),

})

type SignInSchemaFormType = z.infer<typeof SignInSchemaForm>

export function SignIn() {
    const [passwordIsVisible, setPasswordIsVisible] = useState(true)
    const [alertToastIsVisible, setAlertToastIsVisible] = useState(false)
    const [messageAlertToast, setMessageAlertToast] = useState("")
    const navigation = useNavigate()
    function navigate(url: string) {
        window.location.href = url
    }

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInSchemaFormType>({
        resolver: zodResolver(SignInSchemaForm)
    })

    async function auth() {
        const response = await fetch("http://localhost:3333/auth/google/redirect-url", { method: "POST" })
        const data = await response.json()
        navigate(data.url)
    }

    async function SignInUser(data: SignInSchemaFormType) {
        try {
            await api.post("/auth/sign-in",{
                email: data.email,
                password: data.password
            })
            navigation("/dashboard")
            return

        } catch (error) {
            const isAppError = error instanceof AppError
            const message = isAppError ? error?.message : "Erro inesperado. Tente novamente mais tarde"
            setMessageAlertToast(message as string)
            openAlertTost()
            
        }
    }

    function openAlertTost(){
        setAlertToastIsVisible(true)
    }

    function handleChangePasswordVisibility() {
        setPasswordIsVisible(state => !state)
    }

    return (
        <div className="flex flex-1 justify-center items-center" >
            <form
                className="bg-zinc-900 rounded-lg px-6 py-8 min-w-[400px]"
                onSubmit={handleSubmit(SignInUser)}
            >
                <header className="flex items-center justify-center gap-2 ">
                    <img src={Logo} alt="imagem de um tag html" />
                    <h1 className="text-xl text-gray-200 font-medium">Pass in </h1>
                </header>

                <div className="mt-8 flex gap-4 flex-col">
                    <Input.Root>
                        <Input.Input
                            className="bg-transparent"
                            placeholder="seuemail@gmail.com"
                            {...register("email")}
                        />
                        {
                            errors.email && (
                                <Input.Error>{errors.email.message}</Input.Error>
                            )
                        }
                    </Input.Root>
                    <Input.Root>
                        <Input.Password
                            changePasswordVisibility={handleChangePasswordVisibility}
                            isVisible={passwordIsVisible}
                            className="bg-transparent"
                            placeholder="sua senha"

                            {...register("password")}
                        />
                        {
                            errors.password?.message && (
                                <Input.Error>{errors.password.message}</Input.Error>
                            )
                        }

                    </Input.Root>

                </div>

                <div className="mt-5 flex flex-col gap-1.5 ">
                    <Button 
                        type="submit" 
                        variant="primary"
                        disabled={isSubmitting} 
                        className="text-sm font-medium"
                    >
                        {
                            isSubmitting && (<span className="loader"></span>)
                        }
                        {
                            !isSubmitting && "ENTRAR"
                        }
                        
                    </Button>

                    <Button
                        variant="primary"
                        onClick={auth}
                        className="text-sm gap-2 font-medium mt-1"
                    >

                        <img
                            src={GoogleLogo}
                        />

                        <span >
                            ENTRAR COM O GOOGLE

                        </span>
                    </Button>
                    <span className="inline-block mx-auto text-sm font-medium text-zinc-200">
                        OU
                    </span>
                    <LinkButton
                        variant="secondary"
                        className="text-sm font-medium"
                        href="/sign-up"
                    >
                        CRIAR CONTA
                    </LinkButton>

                </div>
            </form>
            <AlertToast
                title="Algo de errado"
                duration={4000}
                description={messageAlertToast}
                setTostIsVisible={setAlertToastIsVisible}
                open={alertToastIsVisible}
            />
        </div>
    );
}