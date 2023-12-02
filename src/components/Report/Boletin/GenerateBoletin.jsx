import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Svg,
  Line,
} from "@react-pdf/renderer";
import React from "react";
import PropTypes from 'prop-types';
import Table from "../../Common/PDF/Table";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontSize: 12
  },
  section: {
    paddingBottom: 20
  },
  sectionQA: {
    paddingBottom: 3
  },
  headText: {
    color: "blue",
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
  }
});

// Create Document Component
function GeneratedBoletin({
  dataProp
}) {
  const generateData = (nota)=>{
    const observacionNota = JSON.parse(nota.observacionNota)
    return [
      observacionNota[0].definitiva,
      observacionNota[1].definitiva,
      observacionNota[2].definitiva,
      observacionNota[3].definitiva,
      nota.notaDefinitiva
    ]
  }
  return (
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.headText}>
              Informe Academico
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.secondaryText}>
              Nombre Estudiante: {dataProp?.estudiante ? `${dataProp.estudiante.usuario.nombre} ${dataProp.estudiante.usuario.apellido}`: ''}
            </Text>
            <Text style={styles.secondaryText}>
              Curso: {dataProp?.curso ? dataProp.curso.grado : ''}
            </Text>
            <Text style={styles.secondaryText}>
              Nombre Institucion: { dataProp?.institucion ? dataProp.institucion.nombre : '' }
            </Text>
            <Text style={styles.secondaryText}>
              Direccion Institucion: { dataProp?.institucion ? dataProp.institucion.direccion : '' }
            </Text>
          </View>

          {dataProp?.notas?.map((nota, ind) => (
            <>
              <View style={styles.sectionQA}>
                <Text style={styles.primaryText}>
                  Asignatura: {nota.asignatura.nombre}
                </Text>
                <Text style={styles.secondaryText}>
                  Profesor: {`${nota.asignatura.docente.usuario.nombre} ${nota.asignatura.docente.usuario.apellido}`}
                </Text>
              </View>

              <Table
                th
                col={['20%', '20%', '20%', '20%', '20%']}
                childrentag={[
                  ["P1", "P2", "P3", "P4", "Total"],
                  ...[generateData(nota)]
                ]}
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
          ))}


        </Page>
      </Document>
  );
}
GeneratedBoletin.propTypes = {
  dataProp: PropTypes.any
}
export default GeneratedBoletin;
