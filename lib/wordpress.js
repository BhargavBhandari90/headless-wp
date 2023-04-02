export async function getBlogs() {

    const postsRes = await fetch('http://localhost:8888/wordpress/wp-json/wp/v2/posts?_fields=id,title');

    const posts = await postsRes.json();

    return posts;
}