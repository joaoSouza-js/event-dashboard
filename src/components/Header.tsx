import LogoSvg from "../assets/logo.svg"
import { NavLink } from "./NavLink"

export function Header() {
    return (
        <header>
            <nav className="flex gap-5 items-center pt-2">
                <a href="/" title="voltar para dashboard">
                    <img src={LogoSvg} alt="logo" />

                </a>
                <NavLink href="/eventos" className="text-sm   font-medium text-zinc-300">Eventos </NavLink>
                <NavLink href="participantes" className="text-sm   font-medium">Participantes</NavLink>
            </nav>
        </header>
    )
}