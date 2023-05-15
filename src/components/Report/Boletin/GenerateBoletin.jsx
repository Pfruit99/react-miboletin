import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
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
  headText: {
    color: "blue",
    fontWeight: 300,
    paddingBottom: 3,
    fontSize: 40
  },
  secondaryText: {
    opacity: 0.8,
    paddingBottom: 3
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
  }
});

// Create Document Component
function GeneratedBoletin({
  dataProp
}) {
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

          <Table
            th
            col={['20%', '60%', '20%']}
            childrentag={[
              ["Asignatura", "Valoración Definitiva", 'Observación'],
              ...[...dataProp?.notas?.map(nota => [
                nota.asignatura.nombre,
                nota.notaDefinitiva,
                nota.observaciones
              ])]
            ]}
          />
        </Page>
      </Document>
  );
}
GeneratedBoletin.propTypes = {
  dataProp: PropTypes.any
}
export default GeneratedBoletin;
