import { SignInButton } from '../auth/SignInButton'
import { useAuthStore } from '@/stores/authStore'

export const Header = () => {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="w-full py-4 px-6 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dad&apos;s First Step</h1>
        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.displayName}</span>
              <button
                onClick={() => auth.signOut()}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <SignInButton />
          )}
        </nav>
      </div>
    </header>
  )
}
