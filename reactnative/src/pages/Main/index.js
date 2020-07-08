import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Name,
  Bio,
  Avatar,
  ProfileButton,
  ProfileButtonText,
  Actions,
  Message,
} from './styles';

// Icon.loadFont();

class Main extends Component {
  constructor() {
    super();

    this.state = {
      newUser: '',
      users: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  componentDidUpdate(_, prevState) {
    const {users} = this.state;

    if (prevState !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const {users, newUser} = this.state;

    this.setState({loading: true});
    if (newUser) {
      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
      });

      Keyboard.dismiss();
    } else {
      showMessage({
        message: 'Favor preencher o campo corretamente!',
        type: 'warning',
        position: 'top',
      });
      this.setState({loading: false});
    }
  };

  handleNavigate = (user) => {
    const {navigation} = this.props;

    navigation.navigate('User', {user});
  };

  handleRemoveUser = (user) => {
    const {users} = this.state;
    const userIndex = users.findIndex((u) => u.login === user.login);

    users.splice(userIndex, 1);

    this.setState({
      users,
    });
  };

  render() {
    const {navigation} = this.props;
    navigation.setOptions({
      title: 'Usuários',
      headerBackTitleVisible: false,
    });

    const {users, newUser, loading} = this.state;

    return (
      <Container>
        <Message>
          <FlashMessage position="top" />
        </Message>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuários"
            value={newUser}
            onChangeText={(text) => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={(user) => user.login}
          renderItem={({item}) => (
            <User key={item.login}>
              <Avatar source={{uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <Actions>
                <ProfileButton
                  onPress={() => {
                    this.handleNavigate(item);
                  }}>
                  <ProfileButtonText>Ver Perfil</ProfileButtonText>
                </ProfileButton>

                <ProfileButton
                  onPress={() => {
                    this.handleRemoveUser(item);
                  }}>
                  <ProfileButtonText>Remover Perfil</ProfileButtonText>
                </ProfileButton>
              </Actions>
            </User>
          )}
        />
      </Container>
    );
  }
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
  }).isRequired,
};

export default Main;
