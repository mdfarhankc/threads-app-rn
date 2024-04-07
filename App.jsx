import StackNavigator from './StackNavigator';
import { UserContext } from './utils/UserContext';

export default function App() {
    return (
        <UserContext>
            <StackNavigator />
        </UserContext>
    );
}

