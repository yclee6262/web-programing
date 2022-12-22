import { useChat } from './hooks/useChat'
import AppTitle from '../components/Title'
import LogIn from '../components/LogIn'

export default function SignIn() {
    const { me, setMe, setSignedIn, displayStatus } = useChat()

    const handleLogin = (name) => {
        if (!name) {
            displayStatus({
                type: 'error',
                msg: 'Missing user name'
            })
        } else {
            setSignedIn(true)
        }
    }

    return (
        <div>
            <AppTitle />
            <LogIn name={me} setName={setMe} onLogin={handleLogin} />
        </div>
    )
}
