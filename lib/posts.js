
// const postsDirectory = path.join(process.cwd(), 'external-data');

export async function getSortedPostsData() {
    const postsRes = await fetch('http://localhost:8888/wordpress/wp-json/wp/v2/posts');

    const posts = JSON.stringify( postsRes );

    return posts;
}
