import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';
import Input from '~/components/Input';

import { Container } from './styles';

export default function Profile() {
  const formRef = useRef(null);

  const dispatch = useDispatch();
  const profile = useSelector(state => ({
    ...state.user.profile,
    oldPassword: '',
    password: '',
    confirmPassword: '',
  }));

  function handleSubmit(data) {
    dispatch(
      updateProfileRequest({
        ...data,
        avatar_id: data.avatar,
      })
    );
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} ref={formRef} onSubmit={handleSubmit}>
        <AvatarInput name="avatar" />

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço E-mail" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de sua senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
