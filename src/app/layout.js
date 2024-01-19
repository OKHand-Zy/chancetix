import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'

// Golbal Font: Noto Sans Traditional Chinese 
const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={NotoSansTC.className}>
        {children}
      </body>
    </html>
  )
}
