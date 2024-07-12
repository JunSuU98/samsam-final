import InfoDetail from "../../info/InfoDetail"
import MemberHeader from "../../member/page/MemberHeader";

function InfoSelectDetail({handleStorageChange, memberId}){

    return(
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <InfoDetail />
        </div>
    )

}

export default InfoSelectDetail;