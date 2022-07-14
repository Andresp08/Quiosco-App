import Head from 'next/head';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client'

export default function Home({ categorias }) {
  console.log(categorias)
  return (
    <h1 className='text-3xl font-bold underline text-red-700'>Hello world!</h1>
  );
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();

  const categorias = await prisma.categoria.findMany();

  return {
    props: {
      categorias,
    },
  };
};
