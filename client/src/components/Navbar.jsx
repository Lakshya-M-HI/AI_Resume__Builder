import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User as UserIcon } from 'lucide-react'

const Navbar = () => {

    const user = { name: "Rudransh" }
    const navigate = useNavigate()

    const logoutUser = () => navigate('/')

    return (
        <header className="sticky top-0 z-40">
            <nav className="
        backdrop-blur-xl bg-white/10 border-b border-white/20
        shadow-[0_8px_20px_rgba(0,0,0,0.25)]
      ">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center gap-4">

                        {/* User Avatar + Name */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 shadow-inner max-sm:hidden">
                            <UserIcon className="size-4 text-white/80" />
                            <p className="text-sm font-medium text-white/80">Namaste, {user?.name}</p>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logoutUser}
                            className="
                px-5 py-2 rounded-full text-sm font-semibold
                bg-gradient-to-r from-purple-600 to-indigo-600 
                hover:from-purple-700 hover:to-indigo-700 
                transition-all active:scale-95
                text-white shadow-lg flex items-center gap-2
              "
                        >
                            <LogOut className="size-4" />
                            Logout
                        </button>

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
