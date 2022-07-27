import Image from 'next/image';

import Logotipo from '/public/assets/img/logo.svg';
import useQuiosco from '../hooks/useQuiosco';
import Categoria from './Categoria';
import { useRouter } from 'next/router'

const Sidebar = () => {
  const { categorias } = useQuiosco();
  const router = useRouter();

  return (
    <>
      {/* <Link to={'/'}> */}
        <Image
          width={300}
          height={100}
          src={Logotipo}
          alt='logotipo quioscoApp'
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
      {/* </Link> */}

      <nav className='mt-10'>
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
