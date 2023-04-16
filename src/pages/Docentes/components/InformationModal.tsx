import React, {useCallback, useEffect, useState} from 'react'
import Modal from 'react-modal';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import '../../../assets/styles/docente/modalform.scss';
import { DocenteInterface } from '../../../interfaces';
import { Http } from '../../../services/httphandlers';
import { urlDocente } from '../../../config/index';

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
const DocenteSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  apellido: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  correo: Yup.string().email('Invalid email').required('Required'),
  telefono: Yup.string().required("telefono requerido!!").max(25, 'el valor maximo es 25'),
  direccion: Yup.string().required("Direccion requerida"),
  identificacion: Yup.string().required("identificacion requerida"),
  tipoIdentificacion: Yup.string().required('tipoIdentificacion requerida'),
  colegio: Yup.number().required('tipoIdentificacion requerida'),
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
  const [docente, setDocente] = useState<DocenteInterface | null >();
  const [loading, setLoading] = useState(true);
  const cargarDocente = useCallback(async()=>{
    try {
      setLoading(true);
      const docente = await http.get<DocenteInterface>(`${urlDocente.getDocente}/${id}`);
      setDocente(docente);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  },[id])
  const initialValues: Partial<DocenteInterface> = {
    nombre: docente?.nombre || '',
    apellido: docente?.apellido|| '',
    correo: docente?.correo || '',
    telefono: docente?.telefono || '',
    direccion: docente?.direccion || '',
    identificacion: docente?.identificacion || '',
    tipoIdentificacion: docente?.tipoIdentificacion || '',
  };
  useEffect(()=>{
    if(!isNew){
      cargarDocente()
    } else {
      setDocente(null)
    }
  },[cargarDocente, isNew])
  const handleSubmit = async(values:Partial<DocenteInterface>) => {
    console.log({ values });
    try {
      //sendloading page
      if(isNew){
        await http.post(urlDocente.getDocente,values);
        alert("Docente creado correctamente");
      } else{
        await http.put(`${urlDocente.getDocente}/${id}`,values);
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
            validationSchema={DocenteSchema}
          >
            {({errors, touched})=> (
              <Form className='form'>
                <div className="">
                  <label className='label' htmlFor='nombre'>Nombre</label>
                  <Field id="nombre" name="nombre" placeholder="Nombre" />
                  <ErrorMessage component="div" name="nombre" className='validation-error-message '/>
                </div>
                <div className="">
                  <label className='label' htmlFor='apellido'>Apellido</label>
                  <Field id="apellido" name="apellido" placeholder="Apellido" />
                  <ErrorMessage component="div" name="apellido" className='validation-error-message '/>
                </div>
                <div className="">
                  <label className='label' htmlFor='tipoIdentificacion'>Tipo Identificacion</label>
                  <Field id="tipoIdentificacion" name="tipoIdentificacion" placeholder="CC"  />
                  <ErrorMessage component="div" name="tipoIdentificacion" className='validation-error-message '/>
                </div>
                <div className="">
                  <label className='label' htmlFor='identificacion'>Identificacion</label>
                  <Field id="identificacion" name="identificacion" placeholder="Identificacion" />
                  <ErrorMessage component="div" name="identificacion" className='validation-error-message '/>
                </div>
                <div className="">
                  <label className='label' htmlFor='correo'>Correo</label>
                  <Field id="correo" name="correo" placeholder="Correo"  />
                  <ErrorMessage component="div" name="correo" className='validation-error-message '/>
                </div>
                <div className="">
                  <label className='label' htmlFor='direccion'>Direccion</label>
                  <Field id="direccion" name="direccion" placeholder="direccion"  />
                  <ErrorMessage component="div" name="direccion" className='validation-error-message '/>
                </div>
                <div className="">
                  <label className='label' htmlFor='telefono'>Telefono</label>
                  <Field id="telefono" name="telefono" placeholder="telefono"  />
                  <ErrorMessage component="div" name="telefono" className='validation-error-message '/>
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
