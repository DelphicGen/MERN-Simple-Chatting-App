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
        <div className="flex">
            <Channels />
            <div className="ml-20 w-full h-screen overflow-auto">
                
            </div>
        </div>
    )
}

export default Room
