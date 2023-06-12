import styles from './layout.module.css';
import Header from './header';

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

	console.log(siteInfo);

    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    );
}