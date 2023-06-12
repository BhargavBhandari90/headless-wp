const BASE_URL = process.env.WP_BASE_URL;
const JSON_URL = process.env.NEXT_PUBLIC_WP_JSON_URL;

export async function getBlogs() {

    const postsRes = await fetch(BASE_URL+'posts?_fields=id,title,slug,content,excerpt');

    const posts = await postsRes.json();

    return posts;
}

export async function getBlogData( slug ) {

    const postsRes = await fetch(BASE_URL+'posts/?slug=' + slug );

    const post = await postsRes.json();

    // Combine the data with the slug
    return {
        slug,
        ...post,
    };
}

export async function getAllBlogSlugs() {
    const postsRes = await getBlogs();

    // const posts = await postsRes.json();

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       slug: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       slug: 'pre-rendering'
    //     }
    //   }
    // ]

    return postsRes.map((post) => {
        return {
          params: {
            slug: post.slug,
          },
        };
    });
}

export async function getSiteInfo() {

    console.log(JSON_URL);

    const siteInfo = await fetch(JSON_URL+'/?_fields=name');

    const siteinfo = await siteInfo.json();

    console.log(siteInfo);

    return siteinfo;
}