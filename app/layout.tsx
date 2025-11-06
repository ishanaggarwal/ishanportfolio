import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ishan Aggarwal - Software Engineer & Product Manager",
  description: "Portfolio of Ishan Aggarwal - Software Engineer specializing in AI/ML, Cloud Computing, and Full-Stack Development. MS in Computer Science at Northeastern University.",
  keywords: "Software Engineer, AI, Machine Learning, Cloud Computing, Full Stack Developer, Product Manager",
  authors: [{ name: "Ishan Aggarwal" }],
  creator: "Ishan Aggarwal",
  openGraph: {
    title: "Ishan Aggarwal - Software Engineer & Product Manager",
    description: "Portfolio showcasing innovative AI solutions and scalable systems",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
