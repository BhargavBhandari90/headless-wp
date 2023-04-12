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
            <section className="text-gray-400 bg-gray-900 body-font">
              <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <img
                  className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                  alt="hero"
                  src="https://dummyimage.com/720x600"
                />
                <div className="text-center lg:w-2/3 w-full">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  {post.title.rendered}
                  </h1>
                  <p className="leading-relaxed mb-8">
                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                  </p>
                </div>
              </div>
            </section>


        </Layout>
    );
}