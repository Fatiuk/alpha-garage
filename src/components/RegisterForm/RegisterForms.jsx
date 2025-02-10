import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register, googleSignIn } from 'redux/auth/operations';
import createToast from 'utils/toast';
import Copyright from 'components/Copyright/Copyright';

// Validation for registration form
const validationSchema = yup.object({
  name: yup
    .string("Введіть своє ім'я")
    .required("Потрібно вказати повне ім'я")
    .matches(/^[A-Za-z\s]+$/, "Ім'я може містити тільки літери латиницею"),
  email: yup
    .string('Введіть свою електронну пошту')
    .email('Введіть правильну електронну пошту')
    .required("Електронна пошта є обов'язковою"),
  password: yup
    .string('Введіть свій пароль')
    .min(8, 'Пароль має бути не менше 8 символів')
    .required("Пароль є обов'язковим"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        const result = await dispatch(register(values)).unwrap();
        createToast('success', `Ласкаво просимо ${result.user.name}`);
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
          Зареєструватися
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="name"
                name="name"
                label="Ім'я"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Я погоджуюсь на обробку моїх персональних даних."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1, mb: 2, width: '100%' }}
          >
            Зареєструватися
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          component={Link}
          to="/login"
        >
          Я вже маю профіль
        </Button>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default RegisterForm;
