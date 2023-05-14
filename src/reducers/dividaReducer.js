import { addDivida, deleteDivida, getDividasByUser } from "../api/api";

export const CREATE_DIVIDA = "CREATE_DIVIDA";
export const DELETE_DIVIDA = "DELETE_DIVIDA";

export const dividaReducer = (state, action) => {
  switch (action.type) {
    case CREATE_DIVIDA:
      const newDivida = action.payload.newDivida;
      const userId = action.payload.userId;
      addDivida(userId, newDivida).then(() => {
        getDividasByUser().then((data) => {
          state.setDividas(data);
        });
      });
      return state;

    case DELETE_DIVIDA:
      const dividaId = action.payload.dividaId;
      deleteDivida(state.user?.uid, dividaId).then(() => {
        getDividas().then((data) => {
          state.setDividas(data);
        });
      });
      console.log("dividaId", dividaId);
      return state;

    default:
      return state;
  }
};
