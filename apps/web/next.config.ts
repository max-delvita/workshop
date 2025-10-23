import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.lumacdn.com",
			},
			{
				protocol: "https",
				hostname: "7baa438694879d237e821a1485632167.cdn.bubble.io",
			},
		],
	},
};

export default nextConfig;
