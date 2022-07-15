import Image from 'next/image';

import Logotipo from '/public/assets/img/logo.svg';
import useQuiosco from '../hooks/useQuiosco';
import Categoria from './Categoria';

const Sidebar = () => {

  const { categorias } = useQuiosco();

  return (
    <>
      <Image 
        width={300} 
        height={100} 
        src={Logotipo} 
        alt='logotipo quioscoApp' 
      />

      <nav className='mt-10'>
        {categorias.map(categoria => (
          <Categoria key={categoria.id} categoria={categoria}/>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
