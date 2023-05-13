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
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.forgetPassword, user.email);
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            "Se ha generado una nueva contraseña y se ha enviado a la dirección de correo electrónico suministrada, (Puede que llegue como correo no deseado)"
          )
        );
      }
    } else if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtForgetPwd, { email: user.email });
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            "Se ha generado una nueva contraseña y se ha enviado a la dirección de correo electrónico suministrada, (Puede que llegue como correo no deseado)"
          )
        );
      }
    } else {
      const response = yield call(postFakeForgetPwd, { email: user.email });
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            "Se ha generado una nueva contraseña y se ha enviado a la dirección de correo electrónico suministrada, (Puede que llegue como correo no deseado)"
          )
        );
      }
    }
  } catch (error) {
    yield put(userForgetPasswordError(error));
  }
}

function* forgetPasswordSaga() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
}

export default forgetPasswordSaga;
