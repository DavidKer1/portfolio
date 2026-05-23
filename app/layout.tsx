import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Victor Sanchez - Portfolio",
	description:
		"Hello! I'm Victor, a passionate software developer with a strong foundation in full-stack development.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={inter.className}>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	)
}
