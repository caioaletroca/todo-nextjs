import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Formik } from 'formik';
import { Paper, TextField, PasswordField, Typography, Button } from 'components';
import { object, user } from 'schemas';
import styles from './index.module.scss';
import { useSession, signIn, signOut } from "next-auth/react"

const initialValues = {
  email: '',
  password: ''
}

const schema = object({
  // email: user.email.required(),
  password: user.password.required()
})

const Login: NextPage = () => {
  const handleSubmit = (values : typeof initialValues) => {
    signIn("keycloak", {
      username: values.email,
      password: values.password
    });
  }

  return (
    <div className='app'>
      <Head>
        <title>ToDos App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}>
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <Paper className={styles.paper} elevation={5}>
              <Typography align='center' variant='h3' gutterBottom>Sign In</Typography>
              <TextField
                name='email'
                label='E-mail'
                values={values}
                errors={errors}
                touched={touched}
                onChange={handleChange}
                onBlur={handleBlur}
                variant='outlined'
                margin='normal'
                required
              />
              <PasswordField
                name='password'
                label='Password'
                values={values}
                errors={errors}
                touched={touched}
                onChange={handleChange}
                onBlur={handleBlur}
                variant='outlined'
                margin='normal'
                required
              />
              <Button
                variant='contained'
                onClick={handleSubmit}>
                Login
              </Button>
            </Paper>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
