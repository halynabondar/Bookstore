export default function GoogleSignIn() {
  const handleGoogleSignIn = () => {
    window.location.href = '/api/auth/google'
  }
  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
    >
      <img src="/google-icon.svg" alt="Google icon" className="size-5" />
      <span aria-label="Sign in with Google">Sign in with Google</span>
    </button>
  )
}
