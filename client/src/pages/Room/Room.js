import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Channels from '../Channels/Channels';

function Room({checkAuthenticated}) {

    const history = useHistory();
    useEffect(() => {
        let didCancel = false;
        const fetchCheckAuthenticatedAPI = async () => {
            const response = await checkAuthenticated();
            if(!didCancel) {
                if(response.data !== 'Ok') history.push('/');
            }
        }

        fetchCheckAuthenticatedAPI();
        return () => { didCancel = true }
    }, [])

    return (
        <React.Fragment>
            <Channels />
            <div>
                
            </div>
        </React.Fragment>
    )
}

export default Room
