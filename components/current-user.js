export async function getCurrentUser( props ) {

    console.log('props1',props);

    if (props?.session?.data?.user?.accessToken) {

        const auth_token = props?.session?.data?.user?.accessToken;

        const root_url = process.env.NEXT_PUBLIC_BASE_URL + 'users/me';

        const config = {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth_token,
            }
        }

        const userInfo = await fetch(root_url, config)
            .then((response) => response.json())
            .then(data => {
                // console.log('data',data);
                return data;
            });

        return userInfo;

    }

}