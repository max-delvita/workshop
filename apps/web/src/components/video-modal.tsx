"use client";

import * as React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface VideoModalProps {
	children: React.ReactNode;
	embedUrl: string;
}

export function VideoModal({ children, embedUrl }: VideoModalProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-[90vw] lg:max-w-6xl p-0 overflow-hidden">
				<DialogTitle className="sr-only">Workshop Setup Video</DialogTitle>
				<div className="relative w-full" style={{ paddingBottom: "56.2%" }}>
					<iframe
						allow="encrypted-media; picture-in-picture"
						allowFullScreen
						frameBorder="0"
						src={embedUrl}
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							top: 0,
							left: 0,
							borderRadius: "0.5rem",
						}}
						title="Workshop Setup Video"
						className="rounded-lg"
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
