const Notifmessage = ({ error }: { error: string }): JSX.Element => {
    return <p style={{ color: 'red' }}> {error}</p>;
};

export default Notifmessage;
