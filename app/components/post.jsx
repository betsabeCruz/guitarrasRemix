import { Link } from "@remix-run/react"
import { formatearFecha } from "../utils/helpers"

function Post({post}) {
    
    const {contentt, image, title, url, publishedAt}= post.attributes

  return (
    <article className="post">
        <img className="imagen" src={image.data.attributes.formats.small.url} alt= {`imagen blog ${title}`} />
        <div className="contenido">
            <h3> {title}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="resumen">{contentt}</p>
            <Link className="enlace" to={`/blog/${url}`}>
                Leer Post
            </Link>
        </div>
    </article>

  )
}

export default Post
