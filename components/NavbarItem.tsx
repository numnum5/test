import React from "react";
import { JSX } from "react";
import Link from "next/link";
interface NavbarItemProps {
    label : string
    link : string
}


const NavbarItem  = ({label, link} : NavbarItemProps) : JSX.Element => {
    // console.log(label);

    return (
        <Link href={link}>
                <div
            className="text-white cursor-pointer hover:text-gray-300 transition">
            
            {label}

            </div>
        </Link>
    );
}


export default NavbarItem;