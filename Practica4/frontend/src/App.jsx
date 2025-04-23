import { useCallback, useEffect, useState } from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table,Button,ButtonGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [totalPages, setTotalPages] =  useState(0);
  //Modal crear
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Modal editar
  const [mostrar, setmostrar] = useState(false);
  const CerrarModal = () => setmostrar(false);
  const abrirmodal = () => setmostrar(true);



  const [videojuego,setVideojuego] =  useState([]);
  const [formularioAgregar,SetAgregarVideojuego] =  useState({
    nombre:'',
    tipo:'',
    aniopubli:0
  });

  const [formularioEditar,SetEditarVideojuego] =  useState({
    nombre:'',
    tipo:'',
    aniopubli:0
  });


  const fetchvideojuego = useCallback(async()=>{
    try{
      const respuesta = await fetch('http://localhost:3001/api/videoj');
      const data = await respuesta.json();
      setTotalPages(data.total);
      setVideojuego(data.data);
    }catch(error){
      alert('ERROR'+ error);
    }
  },[])


  useEffect(()=>{
    fetchvideojuego();
  },[fetchvideojuego]);

  const Agregar = async(e)=>{
    e.preventDefault();
    if(!formularioAgregar.nombre.trim()){
      alert('Debe ingresar nombre');
      return;
    }
    if(!formularioAgregar.tipo.trim()){
      alert('Debe ingresar el tipo');
      return;
    }
    if(!String(formularioAgregar.aniopubli).trim()){
      alert('Debe ingresar el anio de publicacion');
      return;
    }
    try{
      const respuesta = await fetch('http://localhost:3001/api/videoj',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          ...formularioAgregar
        })
      })
      if(!respuesta.ok){
        let errorMensaje = 'Error al cargar';
        try{
          const error = await respuesta.json();
          errorMensaje = error.message || errorMensaje
        }catch(error){
          console.error(errorMensaje);
        }
      }
      handleClose();
      fetchvideojuego();
      swal.fire({
        title: "!Se agrego correctamente el videojuego",
        icon: "succes",
        draggable: true,
        timer:2000
      });
      fetchvideojuego();
    }catch(error){
      console.error(error);
      swal.fire({
        title: "!No se pudo agregar correctamente el videojuego",
        icon: "error",
        draggable: true,
        timer:2000
      });
    }
  }

  const cambiosFormularioAgregar = async(e)=>{
    SetAgregarVideojuego({
      ...formularioAgregar,
      [e.target.name]:e.target.value,
    })
  }

  const EditarVideo = (videojuego)=>{
    SetEditarVideojuego({
      nombre:videojuego.nombre,
      tipo: videojuego.tipo,
      aniopubli:videojuego.aniopubli
    })
    setIdEditar(videojuego.id)
    abrirmodal();
  }

  const cambiosFormularioEditar = (e)=>{
    SetEditarVideojuego({
      ...formularioEditar,
      [e.target.name]: e.target.value
    })
  }

  const [idEditar, setIdEditar] = useState(null);

  const EditarVideojuego= async(e)=>{
    e.preventDefault();
    if(!formularioEditar.nombre.trim()){
      alert('Debe ingresar nombre');
      return;
    }
    if(!formularioEditar.tipo.trim()){
      alert('Debe ingresar el tipo');
      return;
    }
    if(!formularioEditar.aniopubli.trim()){
      alert('Debe ingresar el anio de publicacion');
      return;
    }
    try{
      const respuesta = await fetch(`http://localhost:3001/api/videoj/${idEditar}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          ...formularioEditar
        })
      })
      if(!respuesta.ok){
        let errorMensaje = 'Error al cargar';
        try{
          const error = await respuesta.json();
          errorMensaje = error.message || errorMensaje
        }catch(error){
          console.error(errorMensaje);
        }
      }
      CerrarModal();
      fetchvideojuego();
      swal.fire({
        title: "!Se actualizo correctamente el videojuego",
        icon: "succes",
        draggable: true,
        timer:2000
      });
      fetchvideojuego();
    }catch(error){
      console.error(error);
      swal.fire({
        title: "!No se pudo actualizar correctamente el videojuego",
        icon: "error",
        draggable: true,
        timer:2000
      });
    }
  }

  const EliminarVideojuego = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este videojuego?");
    if (!confirmacion) return; // Si el usuario no confirma, no hace nada
  
    try {
      const respuesta = await fetch(`http://localhost:3001/api/videoj/${id}`, {
        method: 'DELETE',
      });
  
      if (!respuesta.ok) {
        const error = await respuesta.json();
        alert('Error al eliminar: ' + error.message);
        return;
      }
  
      // Recargar los videojuegos después de eliminar
      fetchvideojuego();
      alert('¡Videojuego eliminado correctamente!');
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar el videojuego');
    }
  };

  return (
    <div className='absolute'>
      <div className='container'>
        <div className='tabla'>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Anio de Publicion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {videojuego.map(videojuego=>(
              <tr key={videojuego.id}>
                <td>{videojuego.id}</td>
                <td>{videojuego.nombre}</td>
                <td>{videojuego.tipo}</td>
                <td>{videojuego.aniopubli}</td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-success" onClick={()=>{EditarVideo(videojuego)}}><FaRegEdit /></Button>
                    <Button variant="outline-danger" onClick={() => EliminarVideojuego(videojuego.id)}><MdDeleteOutline /></Button>
                  </ButtonGroup>
                </td>
            </tr>
            ))}
          </tbody>
          </Table>
          <Button variant="success" onClick={handleShow}>
            Crear nuevo Videojuego
          </Button>

          <Modal className="Modal-Crear" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Inserta los datos para un nuevo Videojuego</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del juego"
                    name="nombre"
                    onChange={cambiosFormularioAgregar}
                    value={formularioAgregar.nombre}
                  />
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el tipo del juego"
                    name="tipo"
                    onChange={cambiosFormularioAgregar}
                    value={formularioAgregar.tipo}
                  />
                  <Form.Label>Anio de Publicacion</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el anio de publicacion del juego"
                    name="aniopubli"
                    onChange={cambiosFormularioAgregar}
                    value={formularioAgregar.aniopubli}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={Agregar}>
                Crear
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Modal para actulizar */}
          <Modal show={mostrar} onHide={CerrarModal} className='Modal-Cambiar'>
            <Modal.Header closeButton>
              <Modal.Title>Inserta los datos para Actualizar el Videojuego</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del juego"
                    name="nombre"
                    onChange={cambiosFormularioEditar}
                    value={formularioEditar.nombre}
                  />
                  <Form.Label>Tipo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el tipo del juego"
                    name="tipo"
                    onChange={cambiosFormularioEditar}
                    value={formularioEditar.tipo}
                  />
                  <Form.Label>Anio de Publicacion</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el anio de publicacion del juego"
                    name="aniopubli"
                    onChange={cambiosFormularioEditar}
                    value={formularioEditar.aniopubli}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={CerrarModal}>
                Cerrar
              </Button>
              <Button variant="primary"  onClick={EditarVideojuego}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default App
