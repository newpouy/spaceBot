console.log("hihi");

exports.handler = function(event, context) {
    var req = event.content;
    var res = "default";
    var imgPath = "";
    if(isReserveDateFormat(req)){
        var year = req.substring(0,4);
        var month = req.substring(4,6);
        var day = req.substring(6);
        res = year+"년 "+ month+"월 "+day+"일에 예약하시게요?";
    } else {
        if (req=="안내") {
            res = "공간예약을 안내해 드릴게요. \n안내 없이 바로 진행하시려면 '예약'이라고 입력해주세요.\n";
            res += "►목록: 어떤 공간이 있는지 가격과 함께 보여드려요.\n";
            res += "►룸1: 룸1의 예약을 진행해 드릴게요.\n";
            res += "►룸2: 룸2의 예약을 진행해 드릴게요.\n";
            res += "►160506: 2016년 5월 6일 예약하시게요? \n";
            res += "►1605061000 2.5 10: 2016년 5월 6일 10시부터 12시30분까지 2.5시간동안 10명이 쓰실 공간을 찾으세요?.\n";
            res += "►\n";
        } else if (req=="목록") {
            res = "공간목록이에요.\n";
            res += "►룸1\n";
            res += "►룸2\n";
        } else if (req=="룸1") {
            //룸A 예약상황 DB조회
            //룸A 공간 이미지 첨부
            res = "룸1";
            imgPath = "https://www.toz.co.kr/images/main/family/title1_pic1_r.jpg";
        } else if (req=="룸2") {
            //룸A 예약상황 DB조회
            //룸A 공간 이미지 첨부
            res = "룸2";
            imgPath = "http://image.inews24.com/image_gisa/201207/1342744956519_2_094858.jpg";
        } else if (req=="아몰랑") {
            res = "114";
        } else if (req=="예약"){
            res = "예약을 진행할게요.\n";
            res += "다음 형식으로 입력하면 가장 빨리 예약할 수 있어요.\n";
            res += "  일자  시작시간 인원 공간번호\n";
            res += "160506 1000 2.5 10 1  \n";
            // 공간예약상황조회 //구글스프레드시트 트랜잭션 체크
            // 리턴값으로 예약가부 메시지 분기
        }
    }
    var result = {};
    if (imgPath!="") {
        result = {
            "message": {
                "text": res,
                "photo": {
                    "url": imgPath,
                    "width": 641,
                    "height": 480
                }
            }
        }
    } else {
        result = {
            "message": {
                "text": res
            }
        }
    }
    context.done(null, result);
};

function isReserveDateFormat(data) {
    var regExp1 =/^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/; //20160404
    var regExp2 =/^(0[0-9]|1[0-9])(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/; //160404
    //var regExp3 =/^(0[0-9]|1[0-9])(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/; //160404
    var result1 = regExp1.test(data);
    var result2 = regExp1.test(data);
    if(result1){
      console.log('1');
    } else if(result2) {
      console.log('2');
    } else {
      console.log('there is no type to be applied');
    }
}
//isReserveDateFormat('030404');
function readGoogleSheet(){

}
