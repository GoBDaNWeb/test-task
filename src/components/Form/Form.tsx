import React, { useState} from 'react'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { IMaskInput } from 'react-imask';
import axios from 'axios'
import {useUsers} from '../../app/hooks/useUsers'

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="(#00) 000-0000"
          definitions={{
            '#': /[1-9]/,
          }}
          onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
          overwrite
        />
      );
    },
);

type KeyNames = 'name' | 'username' | 'email' | 'phone' | 'website'

type State = {
    [key in KeyNames]: string
}
  

const Form: React.FC = () => {
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [values, setValues] = useState<State>({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
        if  (event.target.name === 'email') {
            let valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( valid.test(values.email) ) {
                setErrorEmail(false)
            }
            else {
                setErrorEmail(true)
            }
        }
    };

    const createUser = async (): Promise<void> => {
        const newUser = {
            name: values.name,
            username: values.username,
            email: values.email,
            phone: values.phone,
            website: values.website
        }
        axios.post('http://localhost:1881/users', newUser)
        setValues({
            name: '',
            username: '',
            email: '',
            phone: '',
            website: ''
        })
    }


    return (
        <Paper data-testid='form' sx={{ padding: '1rem' }}>
            <form className='flex flex-col gap-10'>
                <div className='flex justify-center gap-4'>
                <FormControl variant="standard">
                        <InputLabel htmlFor="formatted-text-mask-input">name</InputLabel>
                        <Input
                            value={values.name}
                            onChange={handleChange}
                            name="name"
                            id="formatted-text-mask-input"
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="formatted-text-mask-input">username</InputLabel>
                        <Input
                            value={values.username}
                            onChange={handleChange}
                            name="username"
                            id="formatted-text-mask-input"
                        />
                    </FormControl>
                </div>
                <div className='flex justify-center gap-4'>
                    <FormControl error={errorEmail} variant="standard">
                        <InputLabel htmlFor="formatted-text-mask-input">email</InputLabel>
                        <Input
                            value={values.email}
                            onChange={handleChange}
                            name="email"
                            
                            id="formatted-text-mask-input"
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="formatted-text-mask-input">phone</InputLabel>
                        <Input
                            value={values.phone}
                            onChange={handleChange}
                            name="phone"
                            id="formatted-text-mask-input"
                            inputComponent={TextMaskCustom as any}
                        />
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="formatted-text-mask-input">website</InputLabel>
                        <Input
                            value={values.website}
                            onChange={handleChange}
                            name="website"
                            id="formatted-text-mask-input"
                        />
                    </FormControl>
                </div>
                <Button 
                    onClick={() => createUser()}
                    disabled={
                        !values.name || 
                        !values.username || 
                        !values.email || 
                        !values.phone || 
                        values.phone.length < 14 || 
                        !values.website || 
                        errorEmail
                    }
                    variant="contained"
                >
                    Добавить
                </Button>
            </form>
        </Paper>
    )
}

export default Form