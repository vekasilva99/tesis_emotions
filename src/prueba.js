import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {storage} from './firebase';

const Prueba = (props) => {

    const [image, setImage] = useState({file: null, imgUrl: null})

    const handleChange = e => {
        if(e.target.files[0]){
            try{
                setImage({
                    file: e.target.files[0],
                    imgUrl: URL.createObjectURL(e.target.files[0])
                })
            } catch {
                setImage({file: null, imgUrl: null})
            }
        }
    }

    const handleUpload = () => {

        // axios.post('/companies/add', {..., img: ''})
        // .then( company => {
        //     storage.ref(`companies/${company._id}`).put(image.file)
        //     .then( () => {
        //         storage.ref('companies')
        //         .child(company._id)
        //         // .child('hola')
        //         .getDownloadURL()
        //         .then( url => {
        //             console.log(url);
        //             axios.post('/companies/add/img/:id')
        //         })
        //         .catch( err => {
        //             console.log('image posted but unable to get the url. Error: ', err);
        //         })
        //     })

        // })
        // .catch( err => {

        // })
        
        storage.ref(`prueba/${image.file.name}`).put(image.file)
        // storage.ref(`prueba/hola`).put(image)
        .then( () => {
            storage.ref('prueba')
            .child(image.file.name)
            // .child('hola')
            .getDownloadURL()
            .then( url => {
                console.log(url);
            })
            .catch( err => {
                console.log('image posted but unable to get the url. Error: ', err);
            })
        })
        .catch( err =>{
            console.log('Image did not post. Error: ', err);
        })
    }

    return (
        <div>
            hola
            <br/>
            <input type='file' onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            {
                Boolean(image.imgUrl)
                &&
                <img src={image.imgUrl}></img>
            }
        </div>
    )
}

Prueba.propTypes = {

}

export default Prueba

