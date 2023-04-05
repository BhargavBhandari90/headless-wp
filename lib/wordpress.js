export async function getBlogs() {

    const postsRes = await fetch('http://localhost:8888/wordpress/wp-json/wp/v2/posts?_fields=id,title,slug');

    const posts = await postsRes.json();

    return posts;
}

export async function getBlogData( slug ) {

    const postsRes = await fetch('http://localhost:8888/wordpress/wp-json/wp/v2/posts/?slug=' + slug );

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
