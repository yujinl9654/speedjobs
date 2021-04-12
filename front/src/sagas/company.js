import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { COMPANY_ADD_FAIL, COMPANY_ADD_REQUEST } from '../reducers/company';
import { SIGN_UP_REQUEST } from '../reducers/user';

function* addCompany(action) {
  try {
    console.log('action.userData= ', action.userData);
    console.log('action.companyData= ', action.companyData);

    yield put({
      type: SIGN_UP_REQUEST,
      data: action.userData,
    });
  } catch (error) {
    yield put({
      type: COMPANY_ADD_FAIL,
      data: error.response.data,
    });
  }
}

function* watchCompanyAdd() {
  yield takeLatest(COMPANY_ADD_REQUEST, addCompany);
}

export default function* companySaga() {
  yield all([fork(watchCompanyAdd)]);
}
