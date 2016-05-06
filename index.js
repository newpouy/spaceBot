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
            res = "공간예약을 안내해 드릴게요. 이미 익숙하셔서 바로 예약을 진행하시려면 '99'라고 입력해주세요.\n";
            res += "1: 어떤 공간이 있는지 가격과 함께 보여드릴게요.\n";
            res += "룸A: 룸A의 예약을 진행해 드릴게요.\n";
            res += "룸B: 룸B의 예약을 진행해 드릴게요.\n";
            res += "160506: 2016년 5월 6일 예약하시게요? \n";
            res += "1605061000 2.5 10: 2016년 5월 6일 10시부터 12시30분까지 2.5시간동안 10명이 쓰실 공간을 찾으세요?.\n";
            res += "아몰랑: 번호 알려드릴게요. 전화하세요^^. 아름다운 음성을 들려드릴게요. \n";
        } else if (req=="1") {
            res = "공간목록이에요.";
            res += "룸A";
            res += "룸B";
        } else if (req=="룸A") {
            //룸A 예약상황 DB조회
            //룸A 공간 이미지 첨부
            res = "룸A";
            imgPath = "https://www.toz.co.kr/images/main/family/title1_pic1_r.jpg";
        } else if (req=="룸B") {
            //룸A 예약상황 DB조회
            //룸A 공간 이미지 첨부
            res = "룸B";
            imgPath = "http://image.inews24.com/image_gisa/201207/1342744956519_2_094858.jpg";
        } else if (req=="아몰랑") {
            res = "114";
        } else {
            res = "'안내'라고 입력해주세요.";
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
    var regExp =/^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
    var result = regExp.test(data);
    console.log(result);
    return result;

}
