import { getAllBlogSlugs, getBlogData } from '../../lib/wordpress';

export async function getStaticPaths() {
    const paths = await getAllBlogSlugs();
    return {
      paths,
      fallback: false,
    };
}

export async function getStaticProps({ params }) {
  const postData = await getBlogData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({postData}) {
  return (
    <div>
      <h1>{postData.title.rendered}</h1>
      {/* <div>{postData.content.rendered}</div> */}
      <div dangerouslySetInnerHTML={{ __html: postData.content.rendered }} />
    </div>
  );
}
