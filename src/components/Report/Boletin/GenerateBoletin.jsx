import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Svg,
  Line,
  Image,
} from "@react-pdf/renderer";
import React from "react";
import PropTypes from 'prop-types';
import Table from "../../Common/PDF/Table";
import logo from '../../../assets/images/logo/helena1.jpeg'
import { rgbToHex } from "@mui/material";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontSize: 12
  },
  rowContainer: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  section: {
    paddingBottom: 20
  },
  sectionQA: {
    paddingBottom: 3
  },
  headText: {
    color: rgbToHex('rgb(46,135,58)'),
    fontWeight: 300,
    paddingBottom: 3,
    fontSize: 40
  },
  primaryText: {
    fontWeight: 300,
    fontSize: 20
  },
  secondaryText: {
    opacity: 0.8,
    paddingBottom: 3
  },
  thirdText: {
    opacity: 0.6,
    paddingBottom: 3,
    fontSize: 12
  },
  table: {
    width: '100%',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 12
  },
  tableRow:{
    display: 'flex',
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  svg: {
    width: '100%',
    height: 5,
    marginBottom: 30
  },
  logoImage: {
    width: 75,
    height: 75
  }
});

// Create Document Component
function GeneratedBoletin({
  dataProp
}) {
  const generateData = (nota)=>{
    const observacionNota = JSON.parse(nota.observacionNota)
    return [
      nota.asignatura.nombre.nombre,
      observacionNota[0].definitiva,
      observacionNota[1].definitiva,
      observacionNota[2].definitiva,
      observacionNota[3].definitiva,
      nota.notaDefinitiva,
    ]
  }
  console.log('dataProp', dataProp)
  return (
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page} wrap={true}>
          <View style={styles.rowContainer}>
            <Image style={styles.logoImage} src={logo} />
            <Text style={styles.headText}>
              Informe Academico
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.secondaryText}>
              Nombre Estudiante: {dataProp?.estudiante ? `${dataProp.estudiante.usuario.nombre} ${dataProp.estudiante.usuario.apellido}`: ''}
            </Text>
            <Text style={styles.secondaryText}>
              Curso: {dataProp?.curso ? `${dataProp.curso.grado} ${dataProp.curso.nombre || ''}` : ''}
            </Text>
            <Text style={styles.secondaryText}>
              Nombre Institucion: { dataProp?.institucion ? dataProp.institucion.nombre : '' }
            </Text>
            <Text style={styles.secondaryText}>
              Direccion Institucion: { dataProp?.institucion ? dataProp.institucion.direccion : '' }
            </Text>
          </View>
          <Table
            th
            col={['15%', '17%', '17%', '17%', '17%', '17%']}
            childrentag={[
              ['Asignatura', 'Periodo 1', 'Periodo 2', 'Periodo 3', 'Periodo 4', 'Valoración final'],
              ...[...dataProp?.notas?.map((nota, ind) => [
                ...generateData(nota)
              ])]
            ]}
          />
          {
            dataProp.notas?.length === 0 && (
              <View style={styles.section}>
                <Text style={styles.secondaryText}>
                  No se encontraron notas
                </Text>
              </View>
            )
          }
          {/* <View style={styles.sectionQA}>
            <Text style={styles.thirdText}>
              Observaciones: {nota.observaciones}
            </Text>
          </View> */}

          {/* {dataProp?.notas?.map((nota, ind) => (
            <>
              <View style={styles.sectionQA}>
                <Text style={styles.primaryText}>
                  Asignatura: {nota.asignatura.nombre.nombre}
                </Text>
                <Text style={styles.secondaryText}>
                  Profesor: {`${nota.asignatura.docente.usuario.nombre} ${nota.asignatura.docente.usuario.apellido}`}
                </Text>
              </View>

              <Table
                th
                col={['50%', '50%']}
                childrentag={generateData(nota)}
              />
              <View style={styles.sectionQA}>
                <Text style={styles.thirdText}>
                  Observaciones: {nota.observaciones}
                </Text>
              </View>
              {
                dataProp?.notas?.length - 1 === ind ? null :
                  <View style={styles.svg}>
                    <Svg height="5" width="100%" >
                      <Line x1="0" y1="5" x2="720" y2="5" strokeWidth={2} stroke="rgb(0,0,0)" />
                    </Svg>
                  </View>
              }
            </>
          ))} */}


        </Page>
      </Document>
  );
}
GeneratedBoletin.propTypes = {
  dataProp: PropTypes.any
}
export default GeneratedBoletin;
