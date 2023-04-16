

export const config = {
  apiUrl: process.env.REACT_APP_API_URL || "localhost:3000",
}

export const urlDocente = {
  getDocente: `${process.env.REACT_APP_API_URL}/docentes`
}
