import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

function DiscordLogo() {
    return (
        <svg
            className="transition-colors duration-500 ease-in-out lg:mr-3"
            width={28}
            height={28}
            fill="white"
            viewBox="0 -28.5 256 256"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
        >
            <g>
                <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"></path>
            </g>
        </svg>
    );
}

export default function NavBar() {
    const { data } = useSession();
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();

    const navRef = useRef<HTMLDivElement>(null);

    function handleClickOutside(event: MouseEvent) {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setProfileOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="absolute flex items-center w-full h-16">
            <motion.div
                className="relative ml-6 mr-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <Link className="font-bold" href="/">
                    Tag Vault
                </Link>
            </motion.div>
            <div className="relative flex ml-auto mr-2">
                <Link href="/search">
                    <div className="px-4 py-1 mx-4 transition-colors duration-500 ease-in-out border-2 lg:px-6 lg:py-1 border-cyan-400 hover:bg-cyan-400 rounded-3xl">
                        Search
                    </div>
                </Link>
                {data ? (
                    <>
                        <div
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="hover:cursor-pointer group flex px-2 text-xl transition-colors duration-500 ease-in-out border-2 border-[#738ADB] lg:pl-2 lg:pr-4 lg:py-1 hover:bg-[#738ADB] rounded-3xl items-center text-white"
                            ref={navRef}
                        >
                            <img
                                src={
                                    data.user?.image
                                        ? data.user?.image
                                        : "https://cdn.discordapp.com/embed/avatars/0.png"
                                }
                                className="rounded-full md:mr-2 h-7 w-7"
                                alt="Profile Picture"
                            />{" "}
                            <span className="hidden md:block">
                                {data.user?.name}
                            </span>
                        </div>
                        <AnimatePresence>
                            {profileOpen && (
                                <motion.div
                                    className="absolute z-10 w-40 border-4 rounded-md right-1 top-12 bg-darkbg border-darkbg"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 text-center transition-colors duration-500 border-2 border-transparent rounded-md text-cyan-500 hover:border-cyan-500"
                                        onClick={() => {
                                            router.push("/dashboard");
                                            setProfileOpen(false);
                                        }}
                                    >
                                        Dashboard
                                    </Link>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-center text-red-500 transition-colors duration-500 border-2 border-transparent rounded-md hover:border-red-500 "
                                        onClick={() =>
                                            signOut({ callbackUrl: "/" })
                                        }
                                    >
                                        Sign out
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                    <div
                        onClick={() =>
                            signIn("discord", { callbackUrl: "/dashboard" })
                        }
                        className="hover:cursor-pointer group flex px-1 py-1 text-xl transition-colors duration-500 ease-in-out border-2 border-[#738ADB] lg:px-6 lg:py-1 hover:bg-[#738ADB] rounded-3xl items-center text-white"
                    >
                        <DiscordLogo />
                        <span className="hidden -mr-4 lg:mr-auto lg:block">
                            Login with Discord
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
