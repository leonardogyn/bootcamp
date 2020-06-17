import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, dispatch }) {
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Produto</th>
            <th>Qtde</th>
            <th>Subtotal</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#134401" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#134401" />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$258,80</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'REMOVE_FROM_CART', id: product.id })
                  }
                >
                  <MdDelete size={20} color="#134401" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>Total</span>
          <strong>R$1982,32</strong>
        </Total>
      </footer>
    </Container>
  );
}

Cart.propTypes = {
  cart: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
