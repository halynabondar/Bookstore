export default function GoogleSignIn() {
    const handleGoogleSignIn = () => {
        window.location.href = '/api/auth/google'
    }
    return (
        <button type="button" onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition text-gray-700 font-medium">
            <img src="/google-icon.svg" alt="Google icon" className="w-5 h-5"/>
            <span aria-label='Sign in with Google'>Sign in with Google</span>
        </button>
    )
}