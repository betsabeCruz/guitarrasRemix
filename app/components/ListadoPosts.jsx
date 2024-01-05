
import Post from "./post"

function ListadoPosts({posts}) {
  return (
    <>
       <h2 className='heading'>Blog</h2>
      <div className='blog'>
          {posts.map(post => (
            <Post
            key={post.id}
            post= {post}
            />
          ))}
    </div>

    </>
  )
}

export default ListadoPosts
