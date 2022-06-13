import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().password().required('Required'),
});

export default LoginSchema;