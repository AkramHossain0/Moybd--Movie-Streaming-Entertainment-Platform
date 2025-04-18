'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter(); 

    const handleLogout = () => {
        sessionStorage.clear();

        document.cookie.split(';').forEach((cookie) => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        });

        router.push('/');
    };

    return (
        <div className='fixed flex h-screen mr-1'>
            <div
                className={`text-white bg-black shadow-lg ${isCollapsed ? 'w-16' : 'w-64'
                    } transition-all duration-300`}
            >
                <div className='flex items-center justify-between p-4'>
                    <div className='flex items-center'>
                        <i className='text-2xl fas fa-circle-notch'></i>
                        {!isCollapsed && (
                            <span className='ml-2 text-xl font-semibold'>MOYBD</span>
                        )}
                    </div>
                    <button onClick={() => setIsCollapsed(!isCollapsed)}>
                        <i className='fas fa-ellipsis-v'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='#fff' className='w-4 h-4' viewBox='0 0 55.752 55.752'>
                                <path d='M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z' data-original='#000000' />
                            </svg>
                        </i>
                    </button>
                </div>
                <nav className='mt-4'>
                    <div className='px-4'>
                        <ul className='mt-3 text-white'>
                            <li className='flex items-center py-3 hover:text-slate-300 '>
                                <Link href='/admin'>
                                    <svg xmlns='http://www.w3.org/2000/svg'
                                        fill='currentColor'
                                        className='w-[24px] h-[24px]'
                                        viewBox='0 0 512 512'>

                                        <path d='M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0' data-original='#000000' />
                                    </svg>
                                </Link>
                                <Link href='/admin'>
                                    {!isCollapsed && <span className='ml-4'>Dashboard</span>}
                                </Link>
                            </li>
                            <li className='flex items-center py-3 hover:text-slate-300'>
                                <Link href='/admin/addmovie'>
                                    <i>
                                        <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='w-[24px] h-[24px]' viewBox='0 0 24 24'>
                                            <path d='M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z' data-original='#000000' />
                                            <path d='M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z' data-original='#000000' />
                                            <path d='M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z' data-original='#000000' />
                                        </svg>
                                    </i>
                                </Link>
                                <Link href='/admin/addmovie'>
                                    {!isCollapsed && <span className='ml-4'>Add </span>}
                                </Link>
                            </li>
                            <li className='flex items-center py-3 hover:text-slate-300'>
                                <Link href='/admin/movie'>
                                    <i>
                                        <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='w-[24px] h-[24px]' viewBox='0 0 24 24'>
                                            <path d='M18 11c0-.959-.68-1.761-1.581-1.954C16.779 8.445 17 7.75 17 7c0-2.206-1.794-4-4-4-1.517 0-2.821.857-3.5 2.104C8.821 3.857 7.517 3 6 3 3.794 3 2 4.794 2 7c0 .902.312 1.727.817 2.396A1.994 1.994 0 0 0 2 11v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-2.638l4 2v-7l-4 2V11zm-5-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM6 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM4 19v-8h12l.002 8H4z'></path>
                                        </svg>
                                    </i>
                                </Link>
                                <Link href='/admin/movie'>
                                    {!isCollapsed && <span className='ml-4'>Movies</span>}
                                </Link>
                            </li>
                            <li className='flex items-center py-3 hover:text-slate-300'>
                                <Link href='/admin/draft'>
                                    <i>
                                        <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='w-[24px] h-[24px]' viewBox='0 0 24 24'>
                                            <path d='M18 11c0-.959-.68-1.761-1.581-1.954C16.779 8.445 17 7.75 17 7c0-2.206-1.794-4-4-4-1.517 0-2.821.857-3.5 2.104C8.821 3.857 7.517 3 6 3 3.794 3 2 4.794 2 7c0 .902.312 1.727.817 2.396A1.994 1.994 0 0 0 2 11v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-2.638l4 2v-7l-4 2V11zm-5-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM6 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM4 19v-8h12l.002 8H4z'></path>
                                        </svg>
                                    </i>
                                </Link>
                                <Link href='/admin/draft'>
                                    {!isCollapsed && <span className='ml-4'>Draft Movies</span>}
                                </Link>
                            </li>
                            <li className='flex items-center py-3 hover:text-slate-300'>
                                <Link href='/admin/Comments'>
                                    <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='currentColor' className='w-[24px] h-[24px]' ><path d="M7 7h10v2H7zm0 4h7v2H7z"></path><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path></svg>
                                    </i>
                                </Link>
                                <Link href='/admin/Comments'>
                                    {!isCollapsed && <span className='ml-4'> Comments</span>}
                                </Link>
                            </li>
                            <li className='flex items-center py-3 hover:text-slate-300'>
                                <Link href='/admin/users'>
                                    <i>
                                        <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='w-[24px] h-[24px] ' viewBox='0 0 512 512'>
                                            <path d='M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0' data-original='#000000' />
                                        </svg>
                                    </i>
                                </Link>
                                <Link href='/admin/users'>
                                    {!isCollapsed && <span className='ml-4'>Users</span>}
                                </Link>
                            </li>
                            <li onClick={handleLogout} className='flex items-center py-3 hover:text-slate-300'>
                                <a>
                                    <i>

                                        <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='w-[24px] h-[24px] ' viewBox='0 0 6.35 6.35'>
                                            <path d='M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z' data-original='#000000' />
                                        </svg>
                                    </i>
                                </a>
                                <a>
                                    {!isCollapsed && <span className='ml-4'>Log out</span>}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
