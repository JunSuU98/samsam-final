import React, { useState, useEffect} from "react";
import axios from "axios";



const InfoList = () =>{
	
	const [infoList,setInfoList] = useState([]);
	
	
	useEffect(() => {
		
		fatchInfoList();
		
	},[]);

//리스트를 불러올 함수를 만든다 , async로 바동기 처리의 함수를 알리고 await 를 이용해서 데이터를 기다렸다가 가져온다.	
const fatchInfoList =  async  () => {
	
	const response = await axios.get('/test-get-list');
    //	const data = response.data; 는 api 의 응답에 대한 데이터를 자바 스크립트 객체로 변환시켜준다 .
	const data = response.data;
	
	//그 변환된 자바 스크립트 객체를 내가 만든 상태에 넣는다 .
	setInfoList(data);
	console.log(data);
		
	
}

 return (
        <div className="container">
            <h1 className="text-center mt-4">
                공지사항 목록
            </h1>

            {/* 공지사항 목록 테이블 */}
            <table className="table table-bordered table-hover mt-4">
                <thead>
                    <tr className="text-center">
                       
                        <th>공지 제목</th>
                        <th>공지 내용</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {infoList.length > 0 ? (
                        infoList.map(info => (
                            <tr key={info.infoNumber} className="text-center">
                                <td>{info.infoTitle}</td>
                                <td>{info.infoContent}</td>
                                <td>{info.infoDate ? info.infoDate.substring(0, 10) : '날짜 정보 없음'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">등록된 공지사항이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};



export default InfoList;	