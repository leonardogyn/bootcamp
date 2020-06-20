import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdShoppingCart } from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList } from './styles';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const response = await api.get('products');

    /* Este data foi criado para diminuir o processamento da formatação do valor do produto */
    /* Caso estivesse colocado a formatação no render, dentro da listagem, seria processado a cada produto */
    /* Feito esse data, faço o processamento uma única vez */
    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = (id) => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />

            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <MdShoppingCart size={16} color="#FFF" />{' '}
                {amount[product.id] || 0}
              </div>
              <span>Adicionar no Carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

Home.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
  amount: PropTypes.objectOf(PropTypes.number).isRequired,
};

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

/* Converte Actions do Redux em propriedades do componente */
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
