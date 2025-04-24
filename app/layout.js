import "./globals.css";

export const metadata = {
    title: "Rick and Morty App",
    icons: {
        icon: "/icon-rick.png", 
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">
            <head>
                <link rel="icon" href="/icon-rick.png" type="image/png" />
            </head>
            <body>{children}</body>
        </html>
    );
}