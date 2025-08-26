import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../utils/constants';
import ConnectionCard from './ConnectionCard';
import Loader from '../Loader/Loader';

const Connections = () => {
    const [connections, setConnections] = useState([]);
    async function fetchConnectins() {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
            setConnections(res?.data?.data);
        } catch (error) {
            console.error('Connections: ', error);
        }
    }

    useEffect(() => {
        fetchConnectins();
    }, []);
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            {connections.length ? connections.map((data) => <ConnectionCard key={data._id} userData={data} />) : <Loader className={['self-center']}/>}
        </ul>
    )
}

export default Connections;
