import {getGuitarra} from '~/models/guitarras.server'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { useState } from 'react'
import stylesGuitarras from '~/styles/guitarras.css'

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    }
  ]
}

export async function loader({params}){
  const {guitarraUrl} = params

  const guitarra= await getGuitarra(guitarraUrl)
  
  if(guitarra.data.length === 0){
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada'
    })

  }

  return guitarra
}

export function meta({data}){
  if(!data){
    return[
      {
        title: 'GuitarLA- Guitarra No encontrada',
        description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.name}`
      }
    ]
  }

  return[
    {
    title: `GuitarLA- ${data.data[0].attributes.name}`,
    description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.name}`
  }
]
}


export default function Guitarra() {

  const {agregarCarrito}= useOutletContext()
  const [cantidad, setCantidad]= useState(0)
  const guitarra= useLoaderData()
  const {name, description, price, image} = guitarra.data[0].attributes

  const handleSubmit= e => {
    e.preventDefault()
    if(cantidad< 1){
      alert('Cantidad no valida')
      return
    }

    //construir un objeto
    const guitarraSeleccionada= {
      id: guitarra.data[0].id,
      image: image.data.attributes.url,
      name,
      price,
      cantidad

    }
    agregarCarrito(guitarraSeleccionada)

  }
  return (
    
      <div className='guitarra'>
      <img className='imagen' src={image.data.attributes.url} alt={`imagen guitarra ${name}`} width={600} height={400} />

        <div className='contenido'>
          <h1>{name}</h1>
          <p className='texto'>{description}</p>
          <p className='precio'>{price}</p>

          <form 
            onSubmit={handleSubmit}
            className='formulario'>
            <label htmlFor="cantidad">Cantidad: </label>
            <select  
              id="cantidad"
              onChange={e => setCantidad(+e.target.value)}>
              <option value="0">-- Seleccione --</option>
              <option value="1">1 </option>
              <option value="2">2</option>
              <option value="3">3 </option>
              <option value="4">4 </option>
              <option value="5">5 </option>
            </select>
            <input type="submit" value="Agregar al carrito" />
          </form>
        </div>
    </div>

    
  )
}
