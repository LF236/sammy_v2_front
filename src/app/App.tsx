import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import "../styles/index.css"
import { ThemeProvider } from './shared/context/ThemeContext'
import { AuthProvider } from './features/auth/context/AuthContext'

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
