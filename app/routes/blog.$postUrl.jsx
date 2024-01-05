import { useLoaderData } from "@remix-run/react"
import { getPost } from "../models/posts.server"
import { formatearFecha } from "../utils/helpers"


export async function loader({params}){
  const {postUrl} = params

  const post= await getPost(postUrl)
  if(post.data.length === 0){
    throw new Response('', {
      status: 404,
      statusText: 'Post no encontrado'
    })
  }

  return post
}

export function meta({data}){
  if(!data){
    return[
      {
        title: 'GuitarLA- Post No encontrado',
        description: `Guitarras, venta de guitarras, post ${data.data[0].attributes.title}`
      }
    ]
  }

  return[
    {
    title: `GuitarLA- ${data.data[0].attributes.title}`,
    description: `Guitarras, venta de guitarras, post ${data.data[0].attributes.title}`
  }
]
}
const Post = () => {

  const post= useLoaderData()

  const {contentt, title, image, publishedAt}= post.data[0].attributes
  return (
    <article className="post mt-3">
      <img className='imagen' src={image?.data?.attributes?.formats.medium.url} alt={`imagen del blog ${title}`} />
      <div className='contenido'>
        <p>{title}</p>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className='texto'>{contentt}</p>
        
      </div>
    </article>
  )
}

export default Post
