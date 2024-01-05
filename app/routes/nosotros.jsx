import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'
import { useOutletContext } from '@remix-run/react'
export function meta(){
    return [
        {
            title: 'GuitarMX- sobre nosotros',
            description: 'Ventas de guitarras, blog de musica y mas'
        }
    ]
}
export function links(){
    return[
        {
            rel: 'stylesheet',
            href: styles
        },
        {
            rel: 'preload',
            href: imagen,
            as: 'image'
        }
    ]
}
function Nosotros() {
    const data= useOutletContext()
    console.log(data)
  return (
    <main className="contenedor nosotros" >
        <h2 className="heading">Nosotros</h2>
        <div className="contenido">
            <img src={imagen} alt='imagen sobre nsotros'/>
            <div>
                <p>
                Quam vulputate dignissim suspendisse in est ante in nibh mauris. Id ornare arcu odio ut sem nulla pharetra. Platea dictumst vestibulum rhoncus est pellentesque. Sed turpis tincidunt id aliquet risus feugiat in. Sapien faucibus et molestie ac feugiat sed lectus. Dictumst quisque sagittis purus sit amet volutpat.
                </p>
                <p>
                Quam vulputate dignissim suspendisse in est ante in nibh mauris. Id ornare arcu odio ut sem nulla pharetra. Platea dictumst vestibulum rhoncus est pellentesque. Sed turpis tincidunt id aliquet risus feugiat in. Sapien faucibus et molestie ac feugiat sed lectus. Dictumst quisque sagittis purus sit amet volutpat.
                </p>
            </div>
        </div>
    </main>
  )
}

export default Nosotros
