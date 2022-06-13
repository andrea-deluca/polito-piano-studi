import * as Yup from 'yup';

const VerificationCodeSchema = Yup.object().shape({
    verificationCode: Yup.string().required('Required'),
});

export default VerificationCodeSchema;