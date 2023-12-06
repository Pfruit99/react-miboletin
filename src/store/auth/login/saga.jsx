import { takeEvery, put, call, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { loginSuccess, logoutUserSuccess, apiError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postJwtLogin, {
      nombreUsuario: user.nombreUsuario,
      clave: user.clave,
    })
    localStorage.setItem("authUser", JSON.stringify(response))
    yield put(loginSuccess(response))
    if(response.data.roles.some(r => ["rector", "administrador"].includes(r)))
      return history.push("/administration/rector")
    if(response.data.roles.some(r => ["docente"].includes(r)))
      return history.push("/process/qualification")
    if(response.data.roles.some(r => ["estudiante"].includes(r)))
      return history.push("/report/reportCard")
    history.push("/dashboard")
  } catch (error) {
    let errorMsg = error?.response?.data?.message || "Hubo un error al iniciar sesion";
    if(Array.isArray(errorMsg)){
      if(errorMsg.length === 0) return
      errorMsg = errorMsg.join('\n')
    }
    console.log('error', error);
    yield put(apiError(errorMsg))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/login")
  } catch (error) {
    console.log(error)
    yield put(apiError(error))
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
      const response = yield call(postSocialLogin, data)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    history.push("/administration/rector")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
