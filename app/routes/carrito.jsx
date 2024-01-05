import { useEffect, useState } from "react"
import styles from '~/styles/carrito.css'
import { useOutletContext } from "@remix-run/react"
import {ClientOnly} from 'remix-utils' 
export function links(){
    return[
      {
        rel: 'stylesheet',
        href: styles
      }
    ]
    }
export function meta(){
    return [
        {
        
        title: 'GuitarLA- Carrito de Compras',
        description: 'Venta de guitarras, musica, blog, carrito de compras tienda y mas...'
        }
    ]
}

function Carrito() {
    const {carrito, actualizarCantidad, eliminarProducto}= useOutletContext()
    const [total, setTotal]= useState(0)

    useEffect(() =>{
        const calculoTotal= carrito.reduce((total, producto) => total+ (producto.cantidad *producto.price), 0)
        setTotal(calculoTotal)
    }, [carrito])

  return (
    <ClientOnly fallback= {'cargando...'}>
        {() => (

                <main className="contenedor">
                    <h1 className="heading">Carrito</h1>

                    <div className='contenido'>
                        <div className='carrito'>
                            <h2>Articulos</h2>

                            {carrito?.length === 0 ? 'Carrito vacio ' : (
                                carrito?.map(producto => (
                                    <div key={producto.id} className='producto'>
                                        <div>
                                            <img width={250} height={480} src={producto.image} alt={producto.name}/>
                                        </div>
                                        <div>
                                            <p className='nombre'> {producto.name}</p>
                                            <div className='cantidad'>
                                                <p>Cantidad: {producto.cantidad}</p>

                                                <select className='select'
                                                    onChange= {e => actualizarCantidad({
                                                        id: producto.id,
                                                        cantidad: +e.target.value
                                                    })}
                                                    value={producto.cantidad}
                                                    >
                                                    <option value="1">1 </option>
                                                    <option value="2">2</option>
                                                    <option value="3">3 </option>
                                                    <option value="4">4 </option>
                                                    <option value="5">5 </option>
                                                    </select>

                                                    <p className='precio'>$ <span>{producto.price}</span></p>
                                                    <p className='subtotal'>Subtotal: $ <span>{producto.cantidad * producto.price}</span></p>
                                            </div>

                                            <button
                                                type="button"
                                                className="eliminar"
                                                onClick={() => eliminarProducto(producto.id)}
                                            >X</button>

                                            
                                        </div>

                                    </div>
                                ))
                            )}
                        </div>
                        <aside className='resumen'>
                            <h3>Resumen del pedido</h3>
                            <p>
                                Total a pagar: ${total}
                            </p>
                        </aside>
                    </div>
                </main>
            )}
          
    </ClientOnly>
  )
}


export default Carrito
