import axios from 'axios';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import ProductItem from './ProductItem';


function ProductTable({ productList }) {

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    const chunkedProductList = chunkArray(productList, 5);

    return (
        <Table borderless className='producttable-table'>
            <tbody className='producttable-tbody'>
                {chunkedProductList.map((chunk, chunkIndex) => (
                    <tr key={chunkIndex}>
                        {chunk.map((product) => (
                            <td key={product.productNumber}>
                                <ProductItem productNumber={product.productNumber} />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );

}

export default ProductTable;