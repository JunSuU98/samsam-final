import EditInfo from "../../info/EditInfo";
import MemberHeader from "../../member/page/MemberHeader";

function InfoUpdate({handleStorageChange, memberId}){

    return (
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <EditInfo />
        </div>
    )

}

export default InfoUpdate;