"use client";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
	const links = [
		{ to: "/", label: "Home" },
		{ to: "/tools", label: "Tools" },
	] as const;

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-4 py-3">
				<div className="flex items-center gap-4">
					<Image
						src="https://7baa438694879d237e821a1485632167.cdn.bubble.io/cdn-cgi/image/w=256,h=144,f=auto,dpr=2.5,fit=contain/f1749121562939x516290099058743800/TGB_logo_Colored.png"
						alt="The Generative Beings"
						width={80}
						height={45}
						className="object-contain"
					/>
					<nav className="flex gap-4 text-lg">
						{links.map(({ to, label }) => {
							return (
								<Link key={to} href={to} className="hover:text-purple-600 transition-colors">
									{label}
								</Link>
							);
						})}
					</nav>
				</div>
				<div className="flex items-center gap-2">
					<ModeToggle />
				</div>
			</div>
			<hr />
		</div>
	);
}
