import produce from 'immer';

export const initialState = {
  companyAddLoading: false,
  companyAddDone: false,
  companyAddUserData: null,
  companyAddCompanyData: null,
  companyAddError: null,
};

export const COMPANY_ADD_REQUEST = 'COMPANY_ADD_REQUEST';
export const COMPANY_ADD_SUCCESS = 'COMPANY_ADD_SUCCESS';
export const COMPANY_ADD_DONE = 'COMPANY_ADD_DONE';
export const COMPANY_ADD_FAIL = 'COMPANY_ADD_FAIL';
export const COMPANY_ERROR_RESOLVED = 'COMPANY_ERROR_RESOLVED';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case COMPANY_ADD_REQUEST:
        draft.companyAddLoading = true;
        draft.companyAddDone = false;
        draft.companyAddData = null;
        draft.companyAddError = null;
        break;
      case COMPANY_ADD_SUCCESS:
        draft.companyAddLoading = false;
        draft.companyAddDone = true;
        draft.companyAddUserData = action.userData;
        draft.companyAddCompanyData = action.companyData;
        break;
      case COMPANY_ADD_DONE:
        draft.companyAddDone = false;
        draft.companyAddData = null;
        break;
      case COMPANY_ADD_FAIL:
        draft.companyAddLoading = false;
        draft.companyAddError = action.error;
        break;
      case COMPANY_ERROR_RESOLVED:
        draft.companyAddError = null;
        break;
      default:
        break;
    }
  });
export default reducer;
