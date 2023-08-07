import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDropdown() {

    const session = useSession();

    // console.log('drop', session);

    const [ userInfo, setuserInfo ] = useState({
		data: {
			name: 'Loading...'
		}
	});

	useEffect(() => {

        if ( session?.data?.user?.accessToken ) {

            const auth_token = session?.data?.user?.accessToken;

            let root_url = process.env.NEXT_PUBLIC_BASE_URL + 'users/me';

            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth_token,
                }
            }

            axios
                .get(root_url, config)
                .then((response) => {
                    setuserInfo(response);
                });

        }
    },[]);


    console.log('userInfo',userInfo);

    return(
        <div className="p-10">
            <div className="dropdown inline-block relative">
                <button className="font-semibold py-2 px-4 rounded inline-flex items-center">
                    <div className="flex items-center gap-x-2">
                    { userInfo?.data?.avatar_urls &&
                        <img className="object-cover w-8 h-8 rounded-lg" src={userInfo.data.avatar_urls['24']} alt="" />
                    }
                        <div>
                            <h1 className="text-base font-semibold text-gray-700 capitalize dark:text-white">{userInfo.data.name}</h1>
                        </div>
                    </div>
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                    <li className="">
                        <Link href="#" className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" fill="currentColor"></path>
                                <path d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z" fill="currentColor"></path>
                            </svg>

                            <span className="mx-1">
                                view profile
                            </span>
                        </Link>
                    </li>
                    <li className="">
                        <Link onClick={() => signOut({
								callbackUrl: '/login'
							})} href="#" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z" fill="currentColor"></path>
                            </svg>

                            <span className="mx-1">
                                Sign Out
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}