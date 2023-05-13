import { takeEvery, fork, put, call, all } from "redux-saga/effects";

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes";
import { profileSuccess, profileError } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeProfile,
  postJwtProfile,
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

function* editProfile({ payload: { user } }) {
  try {
    yield call(postJwtProfile, user, user.id);
    yield put(profileSuccess("Perfil actualizado correctamente"));
  } catch (error) {
    let errorMsg = error.response?.data?.message || "Hubo un error al procesar esta peticion";
    if(Array.isArray(errorMsg)){
      errorMsg = errorMsg.join(';');
    }
    console.log('error', error.response)
    yield put(profileError(errorMsg));
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}

export default ProfileSaga;
