'use client'

import * as React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { OrganizationSwitcher } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
    return(
        <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <div>
            <h1 className="font-semibold text-xl">Blog Application</h1>
        </div>
        <div className="flex items-center space-x-4">
           <OrganizationSwitcher afterSelectOrganizationUrl="/org/:slug" />
          <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                  userButtonAvatar: "h-8 w-8 rounded-full",
                },
              }}
            />
        </div>
        </nav>
    )
}

export default Navbar;