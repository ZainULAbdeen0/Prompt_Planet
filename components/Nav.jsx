"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toogleDropdown, setToogleDropdown] = useState(false);
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="PromptPlanet Logo"
          className="object-cover"
        />
        <p className="logo_text">PromptPlanet</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className=" flex gap-3 md:gap5">
            <Link href="create-prompt" className="black_btn">
              Create prompt
            </Link>
            <button onClick={()=>{
              signOut();
            }} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile" className="">
              <Image
                src={session?.user.image}
                width={30}
                height={30}
                className="rounded-full"
                alt="profile picture"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (<button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>)
              )}
          </>
        )}
        {/* mobile navigation */}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="">
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              className="rounded-full"
              onClick={()=>{
                setToogleDropdown((prev) => !prev)
              }}
              alt="profile picture"
            />
            {toogleDropdown && 
             <div className="dropdown">
             <Link
             href = '/profile'
             className="dropdown_link"
             onClick={()=>{
              setToogleDropdown(false)
             }}
             >Profile
             </Link>

             <Link
             href = '/create-prompt'
             className="dropdown_link"
             onClick={()=>{
              setToogleDropdown(false)
             }}
             >Create Prompt
             </Link>
             <button onClick={()=>{
              setToogleDropdown(false);
              signOut();
             }} className="black_btn mt-5 w-full">Sign Out</button>
           </div>
           
           }
           
          </div>
        ) : (
          <>
          {providers &&
            Object.values(providers).map((provider) =>  ( <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              Sign In
            </button>)
            )}
        </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
