'use client';
import {RootState} from '@/redux/store';
import {FormControl, FormControlLabel, FormLabel, Switch} from '@mui/material';
import {useTranslations} from 'next-intl';
import {connect, ConnectedProps} from 'react-redux';
import {toast} from 'sonner';

const mapState = (state: RootState) => ({
  boolean: state.boolean
});

const mapDispatch = {
  toggleOn: () => ({type: 'boolean/toggle'})
};

const connector = connect(mapState, mapDispatch);

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  backgroundColor?: string;
};

const Boolean = (props: Props) => {
  const isOn = props.boolean?.value;
  const t = useTranslations('ReduxPage');

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{t('boolean.label')}</FormLabel>
      <FormControlLabel
        control={
          <Switch
            checked={props.boolean?.value}
            onChange={() => {
              props.toggleOn();
              if (!isOn) {
                toast.success(t('boolean.on'), {
                  closeButton: true
                });
              } else {
                toast.info(t('boolean.off'), {
                  closeButton: true
                });
              }
            }}
            name="gilad"
          />
        }
        label={t('boolean.name')}
      />
    </FormControl>
  );
};

export default connector(Boolean);
