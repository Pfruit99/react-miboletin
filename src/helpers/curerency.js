const CURRENCY_TYPE = ['COP', 'USA']
export const getCopCurrencyFormat = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP'})
export const getUsaCurrencyFormat = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'})
export const useDeleteZeros = (value) => {
  return value.substring(0,value.length-3)
}
export const useCurrencyFormat = (val, type) => {
  switch (type) {
    case CURRENCY_TYPE[0]:
      return useDeleteZeros(getCopCurrencyFormat.format(val));
    case CURRENCY_TYPE[1]:
      return useDeleteZeros(getUsaCurrencyFormat.format(val));
    default:
      return useDeleteZeros(getCopCurrencyFormat.format(val));
  }
}
