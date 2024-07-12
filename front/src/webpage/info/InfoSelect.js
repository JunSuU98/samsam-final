import InfoList from "../../info/InfoList";
import MemberHeader from "../../member/page/MemberHeader";

function InfoSelect({handleStorageChange, memberId}) {

    return (
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <InfoList />
        </div>
    )

}

export default InfoSelect;