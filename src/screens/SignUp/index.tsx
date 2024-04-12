import { Eye } from "lucide-react";
import Logo from "../../assets/logo.svg";
import GoogleLogo from "../../assets/google.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { LinkButton } from "../../components/LinkButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertToast } from "../../components/AlertToast";
import { AppError } from "../../_error/appError";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

const SignUpSchemaForm = z.object({
    name: z.string({ required_error: "Nome é obrigatório" }),
    email: z
        .string({ required_error: "Email é obrigatório" })
        .email({ message: "Email inválido" }),
    password: z
        .string({ required_error: "Esqueceu de Digitar a senha" })
        .min(1, { message: "Esqueceu de Digitar a senha" }),
    confirm_password: z
        .string({ required_error: "Repita a sua senha" })
        .min(1, {
            message: "Repita a sua senha",
        }),
});

type SignUpSchemaFormType = z.infer<typeof SignUpSchemaForm>;

export function SignUp() {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [alertToastIsVisible, setAlertToastIsVisible] = useState(false);
    const [messageAlertToast, setMessageAlertToast] = useState("");
    const navigation = useNavigate();

    function handleChangePasswordVisibility() {
        setPasswordIsVisible((state) => !state);
    }

    function navigate(url: string) {
        window.location.href = url;
    }

    async function auth() {
        const response = await fetch(
            "http://localhost:3333/auth/google/redirect-url",
            { method: "POST" }
        );
        const data = await response.json();
        navigate(data.url);
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpSchemaFormType>({
        resolver: zodResolver(SignUpSchemaForm),
    });

    function openAlertToast() {
        setAlertToastIsVisible(true)
    }

    async function registerNewUser(formData: SignUpSchemaFormType) {

        if (formData.confirm_password !== formData.password) {
            setMessageAlertToast("As senhas devem ser iguais")
            openAlertToast()
            return
        }
        try {
            await api.post('/auth/sign-up',{
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            await api.post("/auth/sign-in", {
                email: formData.email,
                password: formData.password,
            })
            navigation("/dashboard")

        } catch (error) {
            const isAppError = error instanceof AppError
            const errorMessage = isAppError 
                ? error.message 
                : "Erro inesperado. Tente novamente mais tarde"
            setMessageAlertToast(errorMessage as string)
            openAlertToast()
        }
    }



    return (
        <div className="flex flex-1 justify-center items-center">
            <form
                onSubmit={handleSubmit(registerNewUser)}
                className="bg-zinc-900 rounded-lg px-6 py-8 min-w-[400px]"
            >
                <header className="flex items-center justify-center gap-2 ">
                    <img src={Logo} alt="imagem de um tag html" />
                    <h1 className="text-xl text-gray-200 font-medium">
                        Pass in{" "}
                    </h1>
                </header>

                <div className="mt-8 flex gap-4 flex-col">
                    <Input.Root>
                        <Input.Input
                            className="bg-transparent"
                            placeholder="digite o seu nome"
                            {...register("name")}
                        />
                        {errors.name?.message && (
                            <Input.Error>{errors.name.message}</Input.Error>
                        )}
                    </Input.Root>

                    <Input.Root>
                        <Input.Input
                            className="bg-transparent"
                            placeholder="seuemail@gmail.com"
                            {...register("email")}
                        />
                        {errors.email?.message && (
                            <Input.Error>{errors.email.message}</Input.Error>
                        )}
                    </Input.Root>
                    <Input.Root>
                        <Input.Password
                            className="bg-transparent"
                            placeholder="sua senha"
                            changePasswordVisibility={
                                handleChangePasswordVisibility
                            }
                            isVisible={passwordIsVisible}
                            {...register("password")}
                        />
                        {errors.password?.message && (
                            <Input.Error>{errors.password.message}</Input.Error>
                        )}
                    </Input.Root>
                    <Input.Root>
                        <Input.Password
                            className="bg-transparent"
                            placeholder="confirme sua senha"
                            changePasswordVisibility={
                                handleChangePasswordVisibility
                            }
                            isVisible={passwordIsVisible}
                            {...register("confirm_password")}
                        />
                        {errors.confirm_password?.message && (
                            <Input.Error>
                                {errors.confirm_password.message}
                            </Input.Error>
                        )}
                    </Input.Root>
                </div>

                <div className="mt-5 flex flex-col gap-1.5 ">
                    <Button
                        variant="primary"
                        type="submit"
                        className="text-sm font-medium"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <span className="loader"></span>}
                        {!isSubmitting && " CRIAR CONTA"}
                    </Button>

                    <span className="inline-block mx-auto text-sm font-medium text-zinc-200">
                        OU
                    </span>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={auth}
                        className="text-sm gap-2 font-medium mt-1"
                    >
                        <img src={GoogleLogo} />

                        <span>ENTRAR COM O GOOGLE</span>
                    </Button>
                    
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
