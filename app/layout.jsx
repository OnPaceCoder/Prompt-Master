import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
export const metadata = {
  title: 'Prompt-Master',
  description: 'Discover and share AI prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-br from-stone-50 to-slate-300 h-[100vh]'>
        <Provider>

          <div className="main ">
            <div className="gradient ">
            </div>
          </div>
          <main className="app ">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
