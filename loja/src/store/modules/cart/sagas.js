import { call, put, select, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { formatPrice } from '../../../util/format';

import { addToCartSucsess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  /* Verificar o estoque do produto fazendo uma chamada a API */
  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  /* Se o produto existir, pega a quantidade dele senão inicia com 0 */
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque!');
    return;
  }

  /* Se o produto já existir no carrinho, atualizar apenas a quantidade */
  if (productExists) {
    /* faz a chamadad da Action @cart/UPDATE_AMOUNT_SUCCESS */
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    /* Faz a chamada da Action @cart/ADD_SUCCESS */
    yield put(addToCartSucsess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  /* Verificar o estoque do produto fazendo uma chamada a API */
  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque!');
    return;
  }

  /* faz a chamadad da Action @cart/UPDATE_AMOUNT_SUCCESS */
  yield put(updateAmountSuccess(id, amount));
}

/* Quando a ação @cart/..._REQUEST for chamada, executar a function relacionada */
/* TakeLastest é usado para executar apenas a última ação do botão */
/* caso ele for clicado várias vezes ao mesmo tempo */
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
