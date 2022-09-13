import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBCardFooter
} from 'mdb-react-ui-kit';

export default function productPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
        const proData = await response.json();
        setProduct(proData);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            {product && (
                <MDBCard style={{ maxWidth: '1200px' }}>
                    <MDBRow className='g-0'>
                        <MDBCol md='4'>
                            <MDBCardImage src={product.image} alt={product.title} fluid />
                        </MDBCol>
                        <MDBCol md='8'>
                            <MDBCardBody>
                                <MDBCardTitle md='4'>{product.title}</MDBCardTitle>
                                <MDBCardText md='4'>
                                    <small>Author : <b>{product.author}</b></small>
                                </MDBCardText>
                                <MDBCardText md='4'>
                                    {product.description}
                                </MDBCardText>

                                <MDBCardText md='4'>
                                    <small className='text-muted'>Genre : <b>{product.genre}</b></small>
                                </MDBCardText>
                                <MDBCardText md='4'>
                                    <small className='text-muted'>Published On : <b>{product.published}</b></small>
                                </MDBCardText>
                                <MDBCardText md='4'>
                                    <small className='text-muted'>ISBN : <b>{product.isbn}</b></small>
                                </MDBCardText>
                                <MDBCardText md='4'>
                                    <small className='text-muted'>Published By : <b>{product.publisher}</b></small>
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                <small className='text-muted'>{new Date(product.created_at).toDateString()}</small>
                            </MDBCardFooter>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            )}

        </div>
    );
}