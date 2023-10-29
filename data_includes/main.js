// 실험을 위한 메인 코드

PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff(); // 디버그용 창 제거
// 실험 코드가 완성되었을 때 위의 주석을 제거할 것
// Uncomment this line only when you are 100% done designing your experiment

var showProgressBar = true; // false
// 실험 진행도를 보여주는 바
// true면 생성, false면 없앰


// Sequence : 실험의 진행 순서를 정하는 블럭
// 순서 : 참여동의, 언어능력 확인, 실험 설명, 연습 실험, 본실험, cloze test. 
Sequence(
        "consent", // 참여동의
        "instruction", // 참여자 정보수집 
        "practice1", // 실험 설명
        rshuffle("practice2"), // 연습문제 
        "start_experiment",
        rshuffle("filler-garden", "filler-garden-comprehension", "filler", "filler-comprehension", "Target-sentence"),
        //"start_test",
        //"cloze test",
        SendResults(),
        "end"
        );

// This is run at the beginning of each trial
// 실험 시작과 함께 기록이 시작되는 변수를 설정해준다. (결과 엑셀시트에서 확인가능)
Header(
    // Declare a global Var element "ID" in which we will store the participant's ID
    newVar("ID").global(),
    newVar("Age").global(),
    newVar("Gender").global(),
    newVar("TOEIC").global(),
    newVar("Lexical").global(),
    newVar("Grammar").global(),
    newVar("Comprehension").global(),
    newVar("Writing").global(),
    newVar("Speaking").global(),
    newVar("Hearing").global()
)
.log( "id" , getVar("ID") ) // Add the ID to all trials' results lines
.log( "age" , getVar("Age") )
.log( "gender" , getVar("Gender") )
.log( "toeic" , getVar("TOEIC") )
.log( "lexical level" , getVar("Lexical") )
.log( "grammar level" , getVar("Grammar") )
.log( "comprehension level" , getVar("Comprehension") )
.log( "writing level" , getVar("Writing") )
.log( "speaking level" , getVar("Speaking") )
.log( "hearing level" , getVar("Hearing") );


newTrial("consent",
    newHtml("consent", "consent.html")
        .cssContainer({"margin":"1em"})
        .checkboxWarning("실험 진행을 위해서는 반드시 동의가 필요합니다.")
        .print()
    ,
    newButton("동의")
        .center()
        .print()
        .wait(getHtml("consent").test.complete()
                  .failure(getHtml("consent").warn())
                )
);


newTrial("instruction",
    defaultText.css({"font-size": "1.2em", "margin": "0.5em", 'margin-right': "0.5em", 'margin-left': "0.5em"}).print()
    ,
    newText("<p> 안녕하세요! 참여해주셔서 감사합니다.<br>이 실험에서는 주어진 문장을 읽고 문장의 참/거짓을 맞추는 과제를 수행할 예정입니다.</p>")
    ,
    newText("<p>아래의 공란을 채운 뒤 <b>다음</b> 버튼을 누르면 실험 설명이 나옵니다.</p>")
    ,
    newText("")
    ,
    newText("ID(학번)를 입력해주세요.")
        .print()
    ,
    newTextInput("inputID", "")
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
    ,
        newText("(만)나이를 입력해주세요.")
        .print()
    ,
    newTextInput("inputAge", "")
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
        ,
    newText("성별을 입력해주세요. (예, <b>male</b> or <b>female</b>)")
        .print()
    ,
    newTextInput("inputGender", "")
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
    ,
    newText("최근 2년 내에 본 TOEIC 점수를 입력해주세요.")
        .print()
    ,
    newTextInput("inputTOEIC", "")
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
    ,
    newText("<p><br><br><b>영어 영역별 수준 자가 체크</b></p>")
        .center()
        .print()
    ,
    newText("자신의 영어 수준은 어느 정도라고 생각하십니까? (1:낮음 ~ 5:높음)")
        .print()
    ,
    newScale("lexical", 5)
        .center()
        .checkbox()
        .before( newText("score label 1", "1) 어휘 수준: ") )
        .print()
    ,
    newScale("grammar", 5)
        .center()
        .checkbox()
        .before( newText("score label 2", "2) 문법 수준: ") )
        .print()
    ,
    newScale("comprehension", 5)
        .center()
        .checkbox()
        .before( newText("score label 3", "3) 이해 수준: ") )
        .print()
    ,
    newScale("writing", 5)
        .center()
        .checkbox()
        .before( newText("score label 4", "4) 쓰기 수준: ") )
        .print()
    ,
    newScale("speaking", 5)
        .center()
        .checkbox()
        .before( newText("score label 5", "5) 말하기 수준: ") )
        .print()
    ,
    newScale("hearing", 5)
        .center()
        .checkbox()
        .before( newText("score label 6", "6) 듣기 수준: ") )
        .print()
        .wait()
    ,
    newText("빈공간", "")
        .print()
    ,
    newButton("다음")
        .center()
        .print()
        // Only validate a click on Start when inputID has been filled
        .wait( getTextInput("inputID").testNot.text("") )
    ,
    // Store the text from inputID into the Var element
    getVar("ID").set( getTextInput("inputID") )
    ,
    getVar("Age").set( getTextInput("inputAge") )
    ,
    getVar("Gender").set( getTextInput("inputGender") )
    ,
    getVar("TOEIC").set( getTextInput("inputTOEIC") )
    ,    
    getVar("Lexical").set( getScale("lexical") )
    ,
    getVar("Grammar").set( getScale("grammar") )
    ,
    getVar("Comprehension").set( getScale("comprehension") )
    ,
    getVar("Writing").set( getScale("writing") )
    ,
    getVar("Speaking").set( getScale("speaking") )
    ,
    getVar("Hearing").set( getScale("hearing") )
);


newTrial("start_experiment",
    defaultText.css({"font-size": "1.2em", "margin": "0.5em"}).print()
    ,
    newText("<p> 연습시행이 끝났습니다. <br> 같은 방식으로 스페이스바를 누르면서 가능한 빠르고 정확하게 이해하면서 읽어주세요. <br>중간중간 이해했는지 여부를 체크하는 질문이 나옵니다. <br>질문에도 빠르고 정확하게 답해주세요. </p>")
        .center()
        .print()
    ,
    newText("준비되셨으면 시작 버튼을 눌러 시작해주세요.")
    .print()
    ,
    newButton("시작")
        .center()
        .print()
        .wait()
    );

newTrial("start_test",
    defaultText.css({"font-size": "1.2em", "margin": "0.5em"}).print()
    ,
    newText("<p> 수고하셨습니다. 읽기 실험이 끝났습니다. <br> 마지막 테스트입니다. </p>")
        .center()
        .print()
    ,
    newButton("시작")
        .center()
        .print()
        .wait()
    );
    
/**
 * 연습 실험
 */

newTrial("practice1",
        newText("스페이스 바를 누르면서 문장을 읽습니다.")
        .print()
        ,
        newText("가능한 빠르고 정확하게 이해하면서 읽어주세요.")
        .print()
        ,
    newController("sentence_00", "DashedSentence", {s: "자신의 읽는 속도에 맞추어 스페이스바를 눌러서 문장을 신속하고 정확하게 읽어주세요."})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .center()
            .wait()
            .remove()
        ,
    newController("sentence_01", "DashedSentence", {s: "중간 중간 앞의 문장을 이해했는지 확인하는 문제가 나옵니다."})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .center()
            .wait()
            .remove()
        ,
    newController("Comprehesion_00", "Question", {q: "문제가 나오면 신속하고 정확하게 풀어주세요.", as: [["F","문장이 참(True)이면 F나 1을 누르세요."], ["J","문장이 거짓(False)이면 J나 2를 누르세요."]]})
            .print()
            .wait()
            .remove()  
    );

Template("practice.csv", row => 
    newTrial("practice2",
            newText("다음은 연습문장입니다.")
            .print()
            ,
            newText("스페이스바를 누르면서 가능한 빠르고 정확하게 이해하면서 읽어주세요.")
            .print()
            ,
        newController("sentence_prime", "DashedSentence", {s: row.prime_sentence})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .log()
            .center()
            .wait()
            .remove()
        ,
    newController("sentence_target", "DashedSentence", {s: row.target_sentence})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .log()
            .center()
            .wait()
            .remove()
        ,
        newController("Comprehesion_practice", "Question", {q: row.question, as: [["F","True"], ["J","False"]], hasCorrect: parseInt(row.correct), randomOrder: false})
            .print()
            .log()
            .wait()
            .remove()
        )
        .log("LIST" , row.list)
        .log("ITEM", row.item)
        .log("CONDITION", row.condition)
        .log("TYPE", row.type)  
    )

//////////////////////

// 24 sentences
Template("srcorc_materials_0514_list3csv.csv", row => 
    newTrial("Target-sentence",
        newController("Target-sentence", "DashedSentence", {s: row.sentence})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .center()
            .log()      
            .wait()
            .remove()
        ,
        newController("Target-comprehesion", "Question", {q: row.question, as: [["F","True"], ["J","False"]], hasCorrect: parseInt(row.correct), randomOrder: false})
            .log()
            .print()
            .wait()
            .remove()
        )
        .log("LIST" , row.list)
        .log("ITEM", row.item)
        .log("CONDITION", row.condition)
        .log("TYPE", row.type)            
    );

// 16 sentences
Template("filler_garden_plain_0502.csv", row => 
    newTrial("filler-garden",
        newController("filler-sentence", "DashedSentence", {s: row.sentence})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .log()
            .center()
            .wait()
            .remove()
        )
        .log("LIST" , row.list)
        .log("ITEM", row.item)
        .log("CONDITION", row.condition)
        .log("TYPE", row.type)  
    );

// 8 sentences
Template("filler_garden_question_0502.csv", row => 
    newTrial("filler-garden-comprehension",
        newController("filler-garden-prime", "DashedSentence", {s: row.prime_sentence})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .center()
            .log()      
            .wait()
            .remove()
        ,
        newController("filler-garden-target", "DashedSentence", {s: row.target_sentence})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .center()
            .log()      
            .wait()
            .remove()
        ,
        newController("filler-garden-question", "Question", {q: row.question, as: [["F","True"], ["J","False"]], hasCorrect: parseInt(row.correct), randomOrder: false})
            .log()
            .print()
            .wait()
            .remove()
        )
        .log("LIST" , row.list)
        .log("ITEM", row.item)
        .log("CONDITION", row.condition)
        .log("TYPE", row.type)            
    );

// 21 sentences
Template("filler_sentence_plain_0502.csv", row => 
    newTrial("filler",
        newController("filler", "DashedSentence", {s: row.sentence})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .center()
            .log()      
            .wait()
            .remove()
        )
        .log("LIST" , row.list)
        .log("ITEM", row.item)
        .log("CONDITION", row.condition)
        .log("TYPE", row.type)            
    );

// 10 sentences
Template("filler_sentence_question_0503.csv", row => 
    newTrial("filler-comprehension",
        newController("filler-pre", "DashedSentence", {s: row.sentence})
            .cssContainer("white-space","nowrap", {"margin-top":"2em", "margin-bottom":"2em"})
            .print()
            .center()
            .log()      
            .wait()
            .remove()
        ,
        newController("filler-question", "Question", {q: row.question, as: [["F","True"], ["J","False"]], hasCorrect: parseInt(row.correct), randomOrder: false})
            .log()
            .print()
            .wait()
            .remove()
        )
        .log("LIST" , row.list)
        .log("ITEM", row.item)
        .log("CONDITION", row.condition)
        .log("TYPE", row.type)            
    );
    
////////////////////

newTrial("cloze test",
    newHtml("cloze_test", "ClozeTest.html")
    .checkboxWarning("동의없이는 실험을 진행할 수 없습니다다.")
    .print()
    .log()
    ,
    newButton("complete", "완료")
    .center()
    .print()
    .wait(
        getHtml("cloze_test").test.complete()
        .failure(getHtml("cloze_test").warn() )
        )
    );

/**
 * 실험 종료 알림
 */
newTrial("end",
        newText("수고하셨습니다. 실험이 끝났습니다.")
            .center().print()
        ,
        newText("이제 창을 닫으셔도 됩니다.")
            .center().print()
        ,
        newButton().wait()
)



