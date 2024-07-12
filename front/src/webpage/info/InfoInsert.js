import InsertInfoForm from "../../info/InsertInfoForm";
import MemberHeader from "../../member/page/MemberHeader";

function InfoInsert({handleStorageChange, memberId}) {

    return(
        <div>
            {/* 헤더 부분 */}
            <MemberHeader handleStorageChange={handleStorageChange} memberId={memberId}/>

            <InsertInfoForm />
        </div>
    )

}

export default InfoInsert;