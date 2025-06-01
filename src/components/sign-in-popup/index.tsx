'use client';
import {RootState} from '@/redux/store';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  Slide,
  TextField,
  Typography
} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import {useTranslations} from 'next-intl';
import {forwardRef, useState} from 'react';
import {connect, ConnectedProps, useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import NavigationLink from '../NavigationLink';
import {toggle} from '@/redux/store/signInModel';
import {signIn} from 'next-auth/react';

const modalState = (state: RootState) => ({
  signInModel: state.signInModel
});

const modalDispatch = {
  toggle: () => ({type: 'signInModel/toggle'})
};

const connector = connect(modalState, modalDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  locale: string;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignInPopup = (props: Props) => {
  const signInModal = props.signInModel.value;
  const t = useTranslations('signInModel');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    await signIn('credentials', {
      username: data.email,
      password: data.password,
      redirect: true,
      redirectTo: `/${props?.locale || 'en'}/dashboard`
    });
    setLoading(false);
    dispatch(toggle());
    reset();
  };

  return (
    <Dialog
      open={signInModal}
      onClose={props.toggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition
      }}
      sx={{
        backdropFilter: 'blur(5px)',
        '& .MuiDialog-paper': {
          maxWidth: 500,
          width: '100%',
          mx: 'auto',
          py: 2
        }
      }}
    >
      <DialogContent>
        <Typography variant="h2" sx={{mb: 2}}>
          {t('title')}
        </Typography>
        <DialogContentText id="alert-dialog-description">
          {t('description')}
        </DialogContentText>
        <Box component={'form'} sx={{mt: 2}} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{mb: 2}}>
            <Typography variant="body1">{t('forms.username')}</Typography>
            <TextField
              fullWidth
              placeholder={t('forms.username_placeholder')}
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required'
                }
              })}
              id="email"
              size="small"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </FormControl>
          <FormControl fullWidth sx={{mb: 1}}>
            <Typography variant="body1">{t('forms.password')}</Typography>
            <TextField
              placeholder={t('forms.password_placeholder')}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required'
                }
              })}
              size="small"
              id="password"
              fullWidth
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </FormControl>

          {/* Forgot Password */}
          <Box sx={{mb: 2, display: 'flex', justifyContent: 'flex-end'}}>
            {/* @ts-expect-error: Next.js */}
            <NavigationLink href={t('forms.forgot_password.href')}>
              {t('forms.forgot_password.title')}
            </NavigationLink>
          </Box>

          <Box sx={{mb: 1, display: 'block'}}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              loading={loading}
              disabled={!isValid}
              fullWidth
            >
              {t('forms.submit')}
            </Button>
          </Box>

          {/* Register */}
          <Box sx={{mb: 2, display: 'flex', justifyContent: 'center'}}>
            {/* @ts-expect-error: Next.js */}
            <NavigationLink href={t('forms.register.href')}>
              {t('forms.register.title')}
            </NavigationLink>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default connector(SignInPopup);
