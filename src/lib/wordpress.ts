export async function getPodcasts() {
  // This fetches the posts from their existing WordPress site
  const res = await fetch('https://zomediaproductions.com/wp-json/wp/v2/posts?categories=PODCAST_ID');
  const posts = await res.json();
  return posts;
}
