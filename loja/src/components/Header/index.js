import React from 'react';
import { Link } from 'react-router-dom';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="CineToys" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>3 itens</span>
        </div>
        <MdShoppingBasket color="#FFF" size={36} />
      </Cart>
    </Container>
  );
}

export default Header;
