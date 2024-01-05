import ListadoPosts from "../components/ListadoPosts"
import { getPosts } from "../models/posts.server"
import { useLoaderData } from "react-router"

export function meta(){
  return [
    {
      title: 'GuitarLA- Nuestro BLog',
      description: 'GuitarLA, Blog de musica y venta de guitarras'
    }
  ]
}

export async function loader(){
  const posts= await getPosts()
  
  return posts.data
}

function Blog() {
  const posts= useLoaderData()

  return (
      <ListadoPosts
        posts={posts}/>
   
  )
}

export default Blog
