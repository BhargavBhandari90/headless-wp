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
    return (
        <div>
            <h1>Blogs</h1>
            <ul>
            { allPostsData.map( ( post ) =>  (
                <li key={post.id}>
                    <Link href={'/blog/'+post.slug}>
                        {post.title.rendered}
                    </Link>
                </li>
            ) ) }
            </ul>
            <Link href="/">Go to Home!</Link>
        </div>
    );
}