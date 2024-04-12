import { Eye } from "lucide-react"
import Logo from "../../assets/logo.svg"
import GoogleLogo from "../../assets/google.svg"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { LinkButton } from "../../components/LinkButton"

export function SignIn() {

    function navigate(url: string) {
        window.location.href = url
    }

    async function auth() {
        const response = await fetch("http://localhost:3333/auth/google/redirect-url", { method: "POST" })
        const data = await response.json()
        navigate(data.url)
    }

    return (
        <div className="flex flex-1 justify-center items-center" >
            <form action="#" className="bg-zinc-900 rounded-lg px-4 py-8 min-w-[400px]">
                <header className="flex items-center justify-center gap-2 ">
                    <img src={Logo} alt="imagem de um tag html" />
                    <h1 className="text-xl text-gray-200 font-medium">Pass in </h1>
                </header>

                <div className="mt-8 flex gap-4 flex-col">
                    <Input
                        className="bg-transparent"
                        
                        placeholder="seuemail@gmail.com"
                    />
                    <Input
                        className="bg-transparent"
                        placeholder="sua senha"
                        RightIcon={<Eye />}
                    />

                </div>

                <div className="mt-5 flex flex-col gap-1.5 ">
                    <Button variant="primary" className="text-sm font-medium">
                        ENTRAR
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
                    <span  className="inline-block mx-auto text-sm font-medium text-zinc-200">
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
        </div>
    );
}