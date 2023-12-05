import React from "react"
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from "@react-pdf/renderer";
const styles = StyleSheet.create({
em:{
  fontStyle: 'bold',
  fontSize: 10,
},
normal:{
  fontSize: 10,
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
  })

 const Table = ({childrentag, col, th}) => (
      <View style={styles.table}>
          {childrentag.map((row, ind) =>
              <View key={ind} style={[styles.tableRow, th && ind === 0 ? styles.em: styles.normal]}>
                  {row.map((cell, j) =>
                      <View key={j} style={[styles.cell, {width:col[j], height: 40}]}>
                          {
                              typeof(cell) === 'string' || typeof(cell) === 'number' ?
                              <Text>{cell}</Text> : cell
                          }
                      </View>
                  )}
              </View>
          )}
      </View>
  )

Table.propTypes = {
  childrentag: PropTypes.any,
  col: PropTypes.any,
  th: PropTypes.any,
}

export default Table;
