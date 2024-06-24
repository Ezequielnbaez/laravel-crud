import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, [])

  const onDelete = (u) => {
    if (!window.confirm("Are you sure?")) {
      return
    }

    axiosClient.delete(`/products/${u.id}`)
      .then(() => {
        getProducts()
      })
  }

  const getProducts = () => {
    setLoading(true);
    axiosClient.get('/products')
      .then(({ data }) => {
        setLoading(false);
        setProducts(data.data);
      }).catch(() => {
        setLoading(false);
      })
  }


//Fijarse que en el boton de delete, envío el producto cuando se acciona el evento

  return (
    <div>
      <div className="productsWrapper">
        <h2>Products</h2>
        <Link to="/products/new" className="btn-add">Add new</Link>
      </div>
      <div className="productTable">
        <table className="fl-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {products.map(u => (
              <tr>
                <td>{u.id}</td>
                <td>{u.title}</td>
                <td>{u.price}</td>
                <td>{u.stock}</td>
                <td>{u.created_at}</td>
                <td>
                  <div className="btnActions">
                    <Link className="btn-add" to={'/products/' + u.id}>Edit</Link>
                    <button onClick={ev=>onDelete(u)} className="btn-del">Del</button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}