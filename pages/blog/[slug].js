import Layout from "../../components/layout";
import { getAllBlogSlugs, getBlogData } from "../../lib/wordpress";


// Set the path
export async function getStaticPaths() {

    const paths = await getAllBlogSlugs();

    return {
      paths,
      fallback: false,
    };
}



// Fetch result by slug
export async function getStaticProps({ params }) {
    const postData = await getBlogData( params.slug );
    return {
      props: {
        postData,
      },
    };
}


export default function Post({postData}) {

    const post = postData[0];

    return (
        <Layout>
            <h1>{post.title.rendered}</h1>
            {/* <div>{post.content.rendered}</div> */}
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </Layout>
    );
}