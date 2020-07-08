import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background: #fff;
`;

export const Message = styled.View`
  padding: 30px;
  z-index: 999;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #e2e2e2;
  font-size: 18px;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #203f1f;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 32px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 16px;
  color: #203f1f;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 15px;
  line-height: 18px;
  color: #9c9c9c;
  margin-top: 5px;
  text-align: center;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 20px 30px;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  margin-left: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #203f1f;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 0 15px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
