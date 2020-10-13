import React from 'react'
import products from "../products.js"
const HomeScreen = () => {
    return (
        <>

            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => {
                    <Col>
                        {product.name}
                    </Col>

                })}
            </Row>
            
            
        </>
    )
}
import Products from "../products.js"
export default HomeScreen
