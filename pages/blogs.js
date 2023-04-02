import { getBlogs } from '../lib/wordpress';
import Link from 'next/link';

export async function getStaticProps() {

    const allPostsData = await getBlogs();

    return {
      props: {
        allPostsData,
      },
    };
}

export default function Blogs({allPostsData}) {
    console.log(allPostsData);
    return (
        <div>
            <h1>Blogs</h1>
            <ul>
            { allPostsData.map( ( post ) =>  (
                <li key={post.id}>{post.title.rendered}</li>
            ) ) }
            </ul>
            <Link href="/">Go to Home!</Link>
        </div>
    );
}