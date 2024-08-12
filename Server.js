require('dotenv').config();
const port = 3000;
const express = require("express");
const server = express();
const db = require("mysql");

server.use(express.json()); // JSON 형식의 요청 본문을 파싱
server.use(express.urlencoded({ extended: false })); // URL 인코딩된 요청 본문을 파싱

const connection = db.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
connection.connect((err)=>{

    if(err)
    {
        console.error("MYSQL 연결 오류 : " + err.stack);
        return;
    }
    console.log("IP:Port",)
    console.log("연결 되었습니다. 연결 ID : " + connection.threadId);

});
connection.query('SELECT * FROM music',(err,results,fields)=>{
    
    if(err)
    {
        console.error(err.stack);
        throw err;
    }
    
    const dataArray = results;

    console.log('데이터 배열 : ',dataArray);
});

const DataInfo = {
    SongName: "",
    PayerName: "",
    Score: 0,
    Rank: 0
};

server.post('/addPlayerData', (req, res) => {
    const { SongName, PlayerName, Score ,Rank} = req.body;
    connection.query(`SELECT * FROM music WHERE songName = '${SongName}'`, (err, results, fields) => {
        if (err) 
        {
            console.error('랭크 생성 중 오류 발생 : ' + err);
            //res.status(500).send('중복 아이디 확인 중 오류 발생');
            res.send('랭크등록 중 오류발생');
        } 
        else {
            if (results.length <= 10) 
            {
                connection.query(`INSERT INTO music (songName, playerName, score, dataRank) VALUES ('${SongName}', '${PlayerName}', '${Score}','${Rank}')`, (err, results, fields) => {
                    if (err) 
                    {
                        console.error('랭크등록 오류: ' + err);
                        //res.status(500).send('회원가입 오류');
                        res.send('랭크등록 중 오류발생');
                    } else 
                    {
                        const dataArray = results;
                        console.log('랭크등록 결과: ', dataArray);
                        res.send('랭크등록 성공');
                    }
                });
            } 
            else 
            {

                //여기다가 반복문+비교문 넣으면 됨
            }
        }
    });
    // 요청 본문에서 데이터를 추출하여 로그에 출력
    console.log(SongName + " : 음악 이름");
    console.log(PlayerName + " : 사용자 이름");
    console.log(Score + " : 점수");
    console.log(Rank + " : 순위");
    
    console.log(req.body);
    // 데이터 응답
});

server.listen(port, () => {
    console.log(`서버가 실행 중 입니다. http://localhost:${port}`);
});