import { Link } from "@remix-run/react"
export default function Guitarra({guitarra}) {
    const {name, image, price, url, description} = guitarra
    
  return (
    
    <div className="guitarra">
      <img src={image.data.attributes.formats.medium.url} alt={`Imagen guitarra ${name}`}/>
      <div className="contenido">
        <h3>{name}</h3>
        <p className="descripcion">{description}</p>
        <p className="precio">${price}</p>
      
        <Link className="enlace" to={`/guitarras/${url}`}>Ver Producto</Link> 
      </div>
    </div>
  
  )
  
}

