import * as actionTypes from '../constants/tags';



export const actions = {
  get_all_tags:function () {
    return{
      type:actionTypes.GET_ALL_TAGS
    }
  },
  delete_tag:function (name) {
    return{
      type:actionTypes.DELETE_TAG,
      name
    }
  },
  add_tag:function (name) {
    return{
      type:actionTypes.ADD_TAG,
      name
    }
  }
};
