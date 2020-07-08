import React, {Component} from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

class User extends Component {
  constructor() {
    super();

    this.state = {
      stars: [],
    };
  }

  async componentDidMount() {
    const {route} = this.props;

    const {user} = route.params;

    const response = await api.get(`/users/${user.login}/starred?page=3`);

    this.setState({stars: response.data});
  }

  render() {
    const {navigation, route} = this.props;

    navigation.setOptions({
      title: route.params.user.name,
      headerBackTitleVisible: false,
    });

    const {stars} = this.state;

    const {user} = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={(star) => String(star.id)}
          initialNumToRender={5}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

export default User;
