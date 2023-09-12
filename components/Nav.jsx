import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';
import Image from 'next/image';
import Link from 'next/link';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return null;
    
    return (
        <nav className="">
            <div className='flex justify-between pt-6 md:mb-[5px] sm:mb-[10px] md:mx-[40px] sm:mx-[20px] text-black'>
              <div>
    <Link legacyBehavior href='/'>
                <a>                
      <Image
        src="/images/logo.png"
        alt="Image compressor logo"
        width="50"
        height="56"
        className='nav-logo'
        priority
        style={{
          width: "70%",
          height: "auto",      
        }} 
        />              
                </a>
                </Link>
              </div>
              <div>
                <div className='flex justify-center md:space-x-16 sm:space-x-4 text-[16px] cursor-pointer'>
                  <Link legacyBehavior href='/'>
                  <a                   
                    className="text-black hover:border-[#3AA7E3] px-3 py-2  text-md font-medium"
                  >
                      Home
                  </a>
              </Link>
              <Link legacyBehavior href='/about'>
                  <a                   
                    className="text-black hover:border-[#3AA7E3] px-3 py-2  text-md font-medium"
                  >
                    About
                  </a>
              </Link>
              <Link legacyBehavior href='/account/register'>
                  <a  onClick={logout}                 
                    className="text-black hover:border-[#3AA7E3] px-3 py-2  text-md font-medium"
                  >
                    Logout
                  </a>
              </Link>              
            {/* <NavLink legacyBehavior href="/users" className="nav-item nav-link">Users</NavLink> */}
        </div>
              </div>
                </div>
                
        
            
                
                
            
        </nav>
    );
}