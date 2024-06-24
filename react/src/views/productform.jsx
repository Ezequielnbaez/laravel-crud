import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [product, setProduct] = useState({
        id: null,
        title: '',
        description: '',
        price: null,
        stock: null,
    })

    if (id) {
        useEffect(() => {

            setLoading(true);
            axiosClient.get(`/products/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setProduct(data);
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }


    //Envía el producto a cargar y redirige
    const onSubmit = (ev) => {
        ev.preventDefault();
        if (product.id) {
            axiosClient.put(`/products/${product.id}`, product)
                .then(() => {
                    navigate('/products');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });


        } else {
            axiosClient.post('/products', product)
                .then(() => {
                    navigate('/products')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    }


    return (
        <div>
            {loading && (
                <div>Loading...</div>
            )}
            {errors && <div className="alert">
                {Object.keys(errors).map(key =>
                    <p key={key}>{errors[key][0]}{errors[key][1]}</p>)}
            </div>
            }
            {!loading &&
                <form onSubmit={onSubmit} className="productForm" >
                    {product.id &&
                        <h2>Edit Product: {product.title}
                        </h2>}
                    {!product.id &&
                        <h2>New product
                        </h2>}
                    <label htmlFor="title">Title:</label>
                    <input onChange={ev => setProduct({ ...product, title: ev.target.value })} value={product.title} type="text" placeholder="title" />

                    <label htmlFor="price">Price:</label>
                    <input onChange={ev => setProduct({ ...product, price: ev.target.value })} value={product.price} type="number" placeholder="price" />

                    <label htmlFor="stock">Stock:</label>
                    <input onChange={ev => setProduct({ ...product, stock: ev.target.value })} value={product.stock} type="number" placeholder="stock" />

                    <label htmlFor="description">Description:</label>
                    <textarea onChange={ev => setProduct({ ...product, description: ev.target.value })} value={product.description} placeholder="description" />

                    <button type="submit">Sign Up</button>
                </form>
            }

        </div>
    )
}