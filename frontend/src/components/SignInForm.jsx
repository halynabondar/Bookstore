import {useState} from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from "@mui/icons-material/Lock";
import GoogleSignIn from "./GoogleSignIn.jsx";

export default function SignInForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
            })

            const data = await response.json()

            if (response.ok) {
                setMessage("✅ Sign in successful!")
                /* TO DO
                // e.g. redirect to dashboard
                window.location.href = "/dashboard";
                 */
            } else {
                setMessage(`❌ ${data.message || "Invalid credentials"}`)
            }
        } catch (error) {
            console.error("Error:", error)
            setMessage("⚠️ Something went wrong. Please try again.")
        }
    }

    return (
        <section className="flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:p-10">
            <div
                className='flex flex-col bg-dark-100 shadow-xl min-w-full sm:min-w-[430px] p-6 rounded-2xl items-center justify-center gap-4'>
                <img src="/icon4.png" alt="books" className='w-12'/>
                <h2 className='text-3xl font-semibold text-dark-700'> Welcome to BookStore</h2>
                <p>Please sign in using the form below</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>

                    {/* Email field */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email' className="text-sm font-medium">E-mail</label>
                        <div className='relative'>
                            <AccountCircleIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'/>
                            <input type="email" id='email' aria-label='Enter your email'  autoComplete='email' value={email}
                                   onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..."
                                   className='w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light'/>
                        </div>
                    </div>

                    {/* Password field */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='password' className="text-sm font-medium">Password</label>
                        <div className='relative'>
                            <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'/>
                            <input type="password" id='password' aria-label='Enter your password'  autoComplete="current-password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   placeholder="Enter your password..."
                                   className='w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-primary-light'/>
                            <VisibilityOffIcon
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"/>
                            <VisibilityIcon
                                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"/>
                        </div>
                        <p className="text-sm text-right">
                            Forgot your password?{" "}
                            <a role="link" aria-label='Reset password' href="/reset-password" className="text-primary-light underline">
                                Reset it
                            </a>
                        </p>
                    </div>
                    <button type='submit' aria-label='Sign in'
                            className='w-full bg-primary-dark text-dark-100 rounded-md py-2 hover:bg-primary-light transition duration-300'>Sign
                        In
                    </button>
                    <div className="flex items-center w-full my-2">
                        <hr className="flex-grow border-gray-300"/>
                        <span className="px-3 text-sm text-gray-500">OR</span>
                        <hr className="flex-grow border-gray-300"/>
                    </div>
                    <GoogleSignIn role='Google SignIn' aria-label='Google SignIn' />
                </form>
                <p className='text-sm'>Don't have an account? <a role="link" aria-label='Sign up' className="text-primary-light underline"
                                                                 href='/signup'>Sign up</a></p>
                {message && <p className="mt-4 text-center text-sm">{message}</p>}
            </div>
        </section>
    )
}