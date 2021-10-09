/** @format */

import { useAuth0 } from '@auth0/auth0-react';

export default function AuthComponent(): JSX.Element {
	const { loginWithRedirect } = useAuth0();

	return <button onClick={() => loginWithRedirect()}>Log In</button>;
}
