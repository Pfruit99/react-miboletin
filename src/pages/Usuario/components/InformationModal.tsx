import React, {useCallback, useEffect, useState} from 'react'
import Modal from 'react-modal';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import '../../../assets/styles/usuarios/modalform.scss';
import { UsuariosInterface } from '../../../interfaces';
import { Http } from '../../../services/httphandlers';
// import { urlUsuarios } from '../../../config/index';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
interface Prop {
  subtitleText?: String;
  isOpen: boolean;
  closeModal: ()=> void;
  isNew?: boolean;
  loadData: () => void;
  id: number | null;
}
const UsuariosSchema = Yup.object().shape({
  id_Usuario: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  usuario: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  sexo: Yup.string().required('Required'),
  clave: Yup.string().required("clave requerido!!").max(25, 'el valor maximo es 25'),
  fecha_actualizacion: Yup.date().required("fecha requerida requerida"),
});
const http = new Http();
const InformationModal: React.FC<Prop> = ({
  subtitleText = "SubTitle",
  isOpen,
  closeModal,
  isNew=true,
  loadData,
  id,
}) => {
  const [usuarios, setUsuarios] = useState<UsuariosInterface | null >();
  const [loading, setLoading] = useState(true);
  const cargarUsuarios = useCallback(async()=>{
    try {
      setLoading(true);
      const usuarios = await http.get<UsuariosInterface>(`${"https://localhost:44382/api/Usuarios/GetUsuarios"}/${id}`);
      setUsuarios(usuarios);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  },[id])
  const initialValues: Partial<UsuariosInterface> = {
    id_Usuario: usuarios?.id_Usuario || '',
    sexo: usuarios?.sexo|| '',
    clave: usuarios?.clave || '',
    fecha_Actualizacion : usuarios?.fecha_Actualizacion || '',
  };
  useEffect(()=>{
    if(!isNew){
      cargarUsuarios()
    } else {
      setUsuarios(null)
    }
  },[cargarUsuarios, isNew])
  const handleSubmit = async(values:Partial<UsuariosInterface>) => {
    console.log({ values });
    try {
      //sendloading page
      if(isNew){
        await http.post(`${"https://localhost:44382/api/Usuarios/PostUsuarios?"}`,values);
        alert("Usuarios creado correctamente");
      } else{
        await http.put(`${"https://localhost:44382/api/Usuarios/PutUsuarios?Id=6&Id_Usuario=Docente&Sexo=masculino&usuario"}/`,values);
      }
      closeModal();
      loadData();
    } catch (error) {
      console.log('error', error);
      alert("Hubo un error al procesar los datos")
    } finally {
      //send off loading
    }
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>{subtitleText}</h2>
        <br /><br />
        {
          loading ? <div>loading</div> :
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={UsuariosSchema}
          >
            {({errors, touched})=> (
              <Form className='form'>
                <div className="">
                  <label className='label' htmlFor='id_Usuario'>Id_Usuario</label>
                  <Field id="id_Usuario" name="id_Usuario" placeholder="Id_Usuario" />
                  <ErrorMessage component="div" name="id_Usuario" className='validation-error-message '/>
                </div>
                  <div className="">
                  <label className='label' htmlFor='usuario'>usuario</label>
                  <Field id="usuario" name="usuario" placeholder="usuario" />
                  <ErrorMessage component="div" name="usuario" className='validation-error-message '/>
                </div>
                <div className="">
                  <label className='label' htmlFor='sexo'>Sexo</label>
                  <Field id="sexo" name="sexo" placeholder="sexo" />
                  <ErrorMessage component="div" name="sexo" className='validation-error-message '/>
                </div>
                <div className="">
                  <label className='label' htmlFor='clave'>Clave</label>
                  <Field id="clave" name="clave" placeholder="Clave"  />
                  <ErrorMessage component="div" name="clave" className='validation-error-message '/>
                </div>
                <div className="">
                  <label className='label' htmlFor='fecha_actualizacion'>Fecha Actualizacion</label>
                  <Field id="fecha_actualizacion" name="fecha_actualizacion" placeholder="Fecha Actualizacion" />
                  <ErrorMessage component="div" name="fecha_actualizacion" className='validation-error-message '/>
                </div>


                <button className='submit' type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        }
      </Modal>
    </div>
  );
}

export default InformationModal
