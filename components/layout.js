import Header from './header';
import styles from './layout.module.css';
import Header from './header';
import Footer from './footer';
import { useEffect, useState } from "react";
import axios from "axios";


export default function Layout({ children }) {

	const [ siteInfo, setSiteInfo ] = useState({
		data: {
			name: 'Loading...'
		}
	});

	useEffect(() => {

		let root_url = process.env.NEXT_PUBLIC_WP_JSON_URL + '/?_fields=name';

		axios
			.get(root_url)
			.then((response) => {
				setSiteInfo(response);
			});
	},[]);

    return (
        <>
            <Header sitedata={siteInfo} />
            <div>{children}</div>
			<Footer sitedata={siteInfo} />
        </>
    );
}