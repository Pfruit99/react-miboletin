import { takeEvery, put, call } from "redux-saga/effects";

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes";
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeForgetPwd,
  postJwtForgetPwd,
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    const response = yield call(postJwtForgetPwd, { correo: user.correo });
    console.log('response',response)
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Se ha generado una nueva contraseña y se ha enviado a la dirección de correo electrónico suministrada, (Puede que llegue como correo no deseado)"
        )
      );
    }
  } catch (error) {
    if(error.response.status === 404) return yield put(userForgetPasswordError('Hubo un error al procesar esta petición (404)'))
    let errorMsg = error?.response?.data?.message || "Hubo un error al iniciar sesion";
    if(Array.isArray(errorMsg)){
      if(errorMsg.length === 0) return
      errorMsg = errorMsg.join('\n')
    }
    yield put(userForgetPasswordError(errorMsg));
  }
}

function* forgetPasswordSaga() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
}

export default forgetPasswordSaga;
