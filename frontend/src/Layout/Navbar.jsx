import React from 'react'
import data from './data.json'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className='shadow-lg mx-auto px-4'>
        <div className='flex justify-between container mx-auto items-center min-h-[70px]'>
            <Link to={"/"}><h1 className='font-bold text-xl'>Smart To-Do App</h1></Link>
            {data.length > 0 && 
                <ul className='flex gap-4'>
                    {data.map(item => (
                        <li key={ item.title }><Link to={ item.link }><span className='font-bold'>{ item.title }</span></Link></li>
                    ))}
                </ul>
            }
        </div>
    </nav>
  )
}

export default Navbar