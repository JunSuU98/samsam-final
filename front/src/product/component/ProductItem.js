import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ProductItem({productNumber}) {

    const [productData, setProductData] = useState({});
    const [imgData, setImgData] = useState([]);

    useEffect(() => {
        loadProduct();
    }, []);

    // 일부 조회 axios 요청
    const loadProduct = async () => {
        // 상품 정보를 가져온다
        const response = await axios.get(`/api/products/${productNumber}`);
        setProductData(response.data);

        // 상품 번호와 일치하는 이미지들을 가져온다
        const imgResponse = await axios.get(`/api/img/select?product_number=${productNumber}`);
        setImgData(imgResponse.data);
    }


    return (
            <Card style={{ width: '12rem' }} className='productitem-card'>
                <Link style={{textDecoration: 'none', color:'black'}} to={`/products/${productNumber}`} >
                    <Card.Img variant="top" src={`/img/${imgData[0]?.imgUrl}` || 'placeholder.jpg'} 
                        style={{
                            width: '12rem',
                            height: '12rem',
                            objectFit: 'contain'
                        }}
                    />
                    <Card.Body>
                        <Card.Subtitle>
                            {productData.productTitle}
                        </Card.Subtitle>
                        <Card.Title>
                            {productData.productPrice} 원
                        </Card.Title>
                    </Card.Body>
                </Link>
            </Card>

    );
}

export default ProductItem;