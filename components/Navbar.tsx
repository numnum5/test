'use client'
import NavbarItem from "./NavbarItem";
import { BsChevronDown } from "react-icons/bs";
import { useCallback, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdOutlineLightMode } from "react-icons/md";
import { LogOut, User, Settings, HelpCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUserAlt } from 'react-icons/fa';
import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
const TOP_OFFSET = 66;

const Navbar = () => {
    const { data: session } = useSession();
    const { setTheme } = useTheme()
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    // console.log(session);


    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET){
                setShowBackground(true);
            }else {
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((prev) => !prev);
    }, []);


    const handleLogout = async () => {
        
        console.log("ADAD");
        // await fetch("https://your-backend.com/api/logout", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${session?.tokens?.access}`,
        //   },
        //   body: JSON.stringify({ refreshToken: session?.tokens?.refresh }),
        // });
      
        await signOut({ callbackUrl: "/" }); // Clear session and redirect
      };

    return(
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-40 backdrop-blur-l ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}`}>
                {/* <Image className="h-4 lg:h-7" src="" alt="Logo"/> */}
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" link="/"/>
                    <NavbarItem label="Reviews" link="/review"/>
                    <NavbarItem label="Search" link="/search"/>
                    <NavbarItem label="AI Help" link="/AI"/>
                    
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    {/* Profile Menu Container */}
                    <div className="relative group">
                        {/* Profile Icon */}
                        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer transition-transform group-hover:ring-2 group-hover:ring-white">
                            <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>
                            <FaUserAlt/>
                            </AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                            {/* Menu Container */}
                            <div className="bg-zinc-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-zinc-800 overflow-hidden">
                                {/* User Info Section */}
                                <div className="px-4 py-3 border-b border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/.png" />
                                                <AvatarFallback>
                                                    <FaUserAlt/>
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div>
                                            {session == null ?  
                                            <div className="itmes-center justify-center">
                                                <div className="text-white font-medium">Login</div>
                                            </div>:
                                            <>
                                            <div className="text-white font-medium">{session.user.username}</div>
                                            <div className="text-zinc-400 text-sm">{session.user.email}</div> 
                                            </>
                                            }
                                           
                                            {/* <div className="text-white font-medium">Username</div>
                                            <div className="text-zinc-400 text-sm">user@email.com</div> */}
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                
                               <div className="py-2">
                                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-white hover:bg-purple-500/10 transition-colors">
                                        <User className="w-4 h-4" />
                                        <span>Profile</span>
                                    </Link>
                                    <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-white hover:bg-purple-500/10 transition-colors">
                                        <Settings className="w-4 h-4" />
                                        <span>Settings</span>
                                    </Link>
                                    <Link href="/help" className="flex items-center gap-3 px-4 py-2 text-white hover:bg-purple-500/10 transition-colors">
                                        <HelpCircle className="w-4 h-4" />
                                        <span>Help</span>
                                    </Link>

                                    {/* Separator */}
                                    <div className="my-2 border-t border-zinc-800"></div>

                                    {/* Logout Button */}
                                    {session != null ? 
                                    
                                    <button 
                                        onClick={()=> handleLogout()} 
                                        className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                                        >
                                        <LogOut className="w-4 h-4" />
                                        <span>Log out</span>
                                     </button>
                                    : 
                                    <Link 
                                        href="/login"
                                        className="w-full flex items-center gap-3 px-4 py-2 text-green-400 hover:bg-red-500/10 transition-colors"
                                        >
                                        <LogIn className="w-4 h-4" />
                                        <span>Log in</span>
                                     </Link>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                    <MdOutlineLightMode 
                        onClick={() => setTheme("dark")} 
                        className="cursor-pointer hover:text-purple-400 transition w-6 h-6"
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;