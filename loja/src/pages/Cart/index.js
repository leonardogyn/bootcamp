import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

function Cart() {
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
          <tr>
            <td>
              <img
                src="https://www.cinetoys.com.br/wp-content/uploads/2019/12/FYF60-Batman%E2%80%93Batmobile-3-324x243.jpg"
                alt="Batman Batmobile"
              />
            </td>
            <td>
              <strong>Batman Batmobile</strong>
              <span>R$129,90</span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#134401" />
                </button>
                <input type="number" readOnly value="2" />
                <button type="button">
                  <MdAddCircleOutline size={20} color="#134401" />
                </button>
              </div>
            </td>
            <td>
              <strong>R$258,80</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={20} color="#134401" />
              </button>
            </td>
          </tr>
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

export default Cart;
