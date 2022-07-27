import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { SettingsOverscanOutlined } from '@mui/icons-material';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState('');
  const [total, setTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const obtenerCategorias = async () => {
      const { data } = await axios('/api/categorias');
      setCategorias(data);
    };

    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((catg) => catg.id == id);
    setCategoriaActual(categoria[0]);
    router.push('/');
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    //ya existe?
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      //actualizar cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success('Guardado correctamente');
    } else {
      setPedido([...pedido, producto]);
      toast.success('Agreado al Pedido');
    }

    setModal(false);
  };

  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);
    setModal(!modal);
  };

  const handleEliminarProducto = (id) => {
    const productoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(productoActualizado);
    toast.error('Pedido Eliminado');
  };

  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/ordenes', {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      //Reset app
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre('');
      setTotal(0);

      toast.success('Pedido realizado con exito');

      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
