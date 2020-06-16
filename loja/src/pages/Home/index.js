import React, { Component } from 'react';
import { MdShoppingCart } from 'react-icons/md';

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
      priceFormated: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />

            <strong>{product.title}</strong>
            <span>{product.priceFormated}</span>

            <button type="button">
              <div>
                <MdShoppingCart size={16} color="#FFF" /> 3
              </div>
              <span>Adicionar no Carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

export default Home;
