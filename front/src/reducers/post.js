import produce from 'immer';

export const initialState = {
  postLoading: false,
  postDone: false,
  postData: null,
  postError: null,
  commentLoading: false,
  commentDone: false,
  commentData: null,
  commentError: null,
};

export const POST_REQUEST = 'POST_REQUEST';
export const POST_GET_SUCCESS = 'POST_GET_SUCCESS';
export const COMMENT_GET_SUCCESS = 'COMMENT_GET_SUCCESS';
export const POST_DONE = 'POST_DONE';
export const POST_GET_FAIL = 'POST_GET_FAIL';
export const COMMENT_GET_FAIL = 'COMMENT_GET_FAIL';
export const POST_ERROR_RESOLVED = 'POST_ERROR_RESOLVED';

const reducer = (state = initialState, action) => {
  produce(state, (draft) => {
    switch (action.type) {
      case POST_REQUEST:
        draft.postLoading = true;
        draft.commentLoading = true;
        draft.postData = null;
        draft.postError = null;
        draft.commentData = null;
        draft.commentError = null;
        break;
      case POST_GET_SUCCESS:
        draft.postLoading = false;
        draft.postDone = true;
        draft.postData = action.data;
        break;
      case COMMENT_GET_SUCCESS:
        draft.commentLoading = false;
        draft.commentDone = true;
        draft.commentData = action.data;
        break;
      case POST_DONE:
        draft.postDone = false;
        draft.postData = null;
        draft.commentDone = false;
        draft.commentData = null;
      case POST_GET_FAIL:
        draft.postLoading = false;
        draft.postError = action.error;
        break;
      case COMMENT_GET_FAIL:
        draft.commentLoading = false;
        draft.commentError = action.error;
      case POST_ERROR_RESOLVED:
        draft.postError = null;
        draft.commentError = null;
    }
  });
};
export default reducer;
