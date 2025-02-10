import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import createToast from 'utils/toast';
import Copyright from 'components/Copyright/Copyright';

// Validation for login form
const validationSchema = yup.object({
  email: yup
    .string('Введіть свою електронну пошту')
    .email('Введіть правильну електронну пошту')
    .required("Електронна пошта є обов'язковою"),
  password: yup
    .string('Введіть свій пароль')
    .min(8, 'Пароль має бути не менше 8 символів')
    .required("Пароль є обов'язковим"),
});

const LoginForm = () => {
  // Create a Redux dispatcher
  const dispatch = useDispatch();
  // Initialization Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        const result = await dispatch(logIn(values)).unwrap(); //unwrap() will throw the rejected value
        createToast('success', `Welcome ${result.user.name}`);
      } catch (error) {
        createToast('error', error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизуватися
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            required
            fullWidth
            autoComplete="email"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            fullWidth
            autoComplete="new-password"
            id="password"
            name="password"
            label="Пароль"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Авторизуватися
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            component={Link}
            to="/registration"
          >
            Зареєструватися
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default LoginForm;
