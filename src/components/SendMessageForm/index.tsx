import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../context/auth';
import { api } from '../../services/api';
import { VscSignOut, VscGithubInverted } from 'react-icons/vsc';
import styles from './styles.module.scss';

export function SendMessageForm() {
    const { user, signOut } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    async function handleSendMessge(event: FormEvent) {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        await api.post('messages', {message});

        setMessage('');
    }

    return (
        <div className={styles.sendMessageForMWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size="32"></VscSignOut>
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>

                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16"></VscGithubInverted>
                    {user?.login}
                </span>
            </header>

            <form onSubmit={handleSendMessge} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea onChange={event => setMessage(event.target.value)} value={message} name="message" id="message" placeholder="Qual sua expectativa para o evento?" />

                <button type="submit">Enviar mensagem</button>
            </form>
        </div>
    )
}