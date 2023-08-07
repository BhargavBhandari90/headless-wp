import Link from "next/link"
import { useSession, signOut } from "next-auth/react";
import UserDropdown from "./user-dropdown";

export default function Header( props ) {

	const userdata = useSession();

	console.log( 'UserData', userdata );

	return(
		<header className="text-gray-400 bg-gray-900 body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
				<span className="ml-3 text-xl">{props.sitedata.data.name}</span>
				</Link>
				<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
				<Link href="/" className="mr-5 hover:text-white">Home</Link>
				<Link href="/blogs" className="mr-5 hover:text-white">Blogs</Link>
				{ userdata?.data && userdata?.status === 'authenticated'

					? (
						<UserDropdown />
					) : (
						<Link href="/login" className="mr-5 hover:text-white">Login</Link>
					)

				}
				</nav>
			</div>
		</header>
	)
}