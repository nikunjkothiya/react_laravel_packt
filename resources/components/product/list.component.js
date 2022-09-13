import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';

export default function List() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        await axios.get(`http://127.0.0.1:8000/api/books`).then(({ data }) => {
            const setGetProducts = data.map(object => {
                return {
                    ...object, action: <div><Link to={`/book/edit/${object.id}`} className='btn btn-success me-2' >
                        Edit
                    </Link > <Button variant="danger" onClick={() => deleteProduct(object.id)}>
                            Delete
                        </Button></div>
                }
            });
            setProducts(setGetProducts);
        })
    }

    const data = () => {
        return {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    width: 30
                },
                {
                    label: 'Title',
                    field: 'title',
                    width: 150
                },
                {
                    label: 'Author',
                    field: 'author',
                    width: 80,
                },
                {
                    label: 'ISBN',
                    field: 'isbn',
                    width: 80,
                },
                {
                    label: 'Genre',
                    field: 'genre',
                    width: 70,
                },
                {
                    label: 'Published',
                    field: 'published',
                    width: 70,
                },
                {
                    label: 'Publisher',
                    field: 'publisher',
                    width: 80,
                },
                {
                    label: 'Action',
                    field: 'action',
                    sort: 'disabled',
                    width: 100,
                },
            ],
            rows: products
        };
    };

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://127.0.0.1:8000/api/books/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            fetchProducts()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className='col-12'>
                    <Link className='btn btn-primary mb-2 float-end' to={"/book/create"}>
                        Create Book
                    </Link>
                </div>

                <CDBContainer>
                    <CDBCard>
                        <CDBCardBody>
                            <CDBDataTable
                                striped
                                bordered
                                hover
                                entriesOptions={[10, 20, 25, 50]}
                                entries={10}
                                pagesAmount={10}
                                data={data()}
                                materialSearch={true}
                            />
                        </CDBCardBody>
                    </CDBCard>
                </CDBContainer>

            </div>
        </div>
    )
}