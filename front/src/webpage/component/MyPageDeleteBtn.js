import Button from 'react-bootstrap/Button';
import axios from 'axios';

function MyPageDeleteBtn({type, text, number, memberId, updateList}) {

    const deleteAxios = async (number, memberId) => {

        console.log("number: ", number);
        console.log("memberId: ", memberId);


        if (type === "product") { // 상품 삭제 
            await axios.delete(`/api/products/${number}`);
        } else if (type === "wishlist") { // 찜 목록 삭제 
            await axios.delete(`/api/wishlist/${number}/${memberId}`);
            console.log("mypage wishlist delete");
        } else if (type === "cs") { // 고객문의 삭제 
            await axios.delete(`/api/cs/delete/${number}`);
        }

        updateList();
    }


    return (
        <>
            <Button variant="outline-danger" onClick={() => {deleteAxios(number, memberId)}}>{text}</Button>{' '}
        </>
    )

}

export default MyPageDeleteBtn;