import { motion } from 'framer-motion';

import { motionConfig } from '../../configs';

const ViewTransition = ({ children }) => {
    return (
        <motion.div
            initial='initial'
            animate='in'
            exit='out'
            variants={motionConfig.variants}
            transition={motionConfig.transition}
            className='flex-fill'
        >
            {children}
        </motion.div>
    );
}

export default ViewTransition;