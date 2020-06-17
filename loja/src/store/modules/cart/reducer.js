import produce from 'immer';

export default function cart(state = [], action) {
  /* Ao executar um dispatch na aplicação, todos os reducer serão executados  */
  /* Dai, sempre verificar o type do action */
  /* Para executar esta função apenas quando for chamado para este type  */
  switch (action.type) {
    case 'ADD_TO_CART':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.product.id);

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });
    case 'REMOVE_FROM_CART':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    default:
      return state;
  }
}
