import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ShowCollection from './ShowCollection';
import Header from '../components/Header'
import SharerPageScreen from './SharerPageScreen';

const SharerDetail = () => {
    const { id } = useParams();
    const [sharer, setSharer] = useState(null);

    //Gawan nalng ng action and views and url siguro

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/sharers/${id}/`)
            .then(response => response.json())
            .then(data => setSharer(data))
            .catch(error => console.log(error));
    }, [id]);

    return (
        <div>
            <Header/>
            {sharer ? (
                <div className='text-center py-3' style={{textAlign:'center'}}>
                    {sharer.cover_photo && <img src={sharer.cover_photo} alt="Cover-Photo" style={{ position: 'relative', width: '100%', height: '50vh' }} />}
                    {sharer.profile_pic && <img src={sharer.profile_pic} alt="Profile" style={{ width: '10rem', height: '10rem', borderRadius: '50%', padding: '0.2rem', position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white'}} />}
                    <h2 >{sharer.name}</h2>
                    <p>{sharer.description}</p>
                    <p>Category: {sharer.category}</p>


                <div><SharerPageScreen/></div>
                <Link to={"/homepage"}>
                    <Button variant="primary">Go Back</Button>
                </Link>



                <ShowCollection />

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SharerDetail;