import { useState, useEffect } from "react";
import { Meta, Links, Outlet, Scripts, LiveReload, useRouteError, Link, isRouteErrorResponse } from "@remix-run/react"
import styles from'~/styles/index.css'
import Header from "~/components/header"
import Footer from "~/components/footer"

export function meta(){
    return[
        {charset: 'utf-8' },
        {title: 'GuitarMX - Remix'},
        {viewport: 'width=device-width,initial-scale=1'}
    ];
}


export function links(){
    return[
        {
            rel:'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: "true"
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        },

    ]
}
export default function App(){

    const carritoLS =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) ?? []
      : [];
    const [carrito, setCarrito] = useState(carritoLS)

    useEffect(() =>{
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    const agregarCarrito= guitarra =>{
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            console.log('ese elemento ya fue agregado al carrito')
            //item sobre el arreglo e identificar el elemento duplicado
            const carritoActualizado= carrito.map(guitarraState => {
                if(guitarraState.id === guitarra.id){
                    //reescribir la cantidad
                    guitarraState.cantidad+= guitarra.cantidad
                }
                return guitarraState
            })

            //anadir al carrito
            setCarrito(carritoActualizado)
        } else{
            //registro nuevo
            setCarrito([...carrito, guitarra])
        }
    }

    const eliminarProducto = id => {
        const carritoActualizado = carrito.filter( producto => producto.id != id)
        setCarrito(carritoActualizado)
        window.localStorage.setItem('carrito', JSON.stringify( carrito ));
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map( guitarraState => {
          if(guitarraState.id === guitarra.id ) {
            guitarraState.cantidad = parseInt( guitarra.cantidad )
          } 
          return guitarraState
        })
        setCarrito(carritoActualizado)
        window.localStorage.setItem('carrito', JSON.stringify( carrito ));
      }

    return(
        <Document>
            <Outlet
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarProducto
                }}

            />
        </Document>
    )
}

function Document({children}){
    return(
        <html lang="es">
            <head>
                <Meta/>
                <Links/>
            </head>
            <body>
                <Header/>
                {children}
                <Footer/>
                <Scripts/>
                <LiveReload/>
            </body>
        </html>
    )
}

/** Manejo de error */



export function ErrorBoundary(){
    const error= useRouteError()

    if(isRouteErrorResponse(error)){
        return(
            <Document>
                <p className="error">{error.status} {error.statusText}</p>
                <Link className="error-enlace" to="/">Volver a la pagina principal</Link>
            </Document>
        )
    }
    
}