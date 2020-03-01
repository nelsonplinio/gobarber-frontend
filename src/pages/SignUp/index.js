import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import Input from '~/components/Input';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-email é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('Senha obrigatória'),
});

export default function SignUp() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit(data) {
    formRef.current.setErrors({});
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, password } = data;

      dispatch(signUpRequest(name, email, password));

      // formRef.current.reset();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = error.inner.reduce(
          (errMsg, err) => ({
            ...errMsg,
            [err.path]: err.message,
          }),
          {}
        );

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu E-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <button type="submit">
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
