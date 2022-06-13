const variants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
}

const transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: .3
};

const motionConfig = { variants, transition };

export default motionConfig;