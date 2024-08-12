const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json()) // 요청을 JSON으로 파싱
app.use(bodyParser.urlencoded({extended: false})) 

app.post("/ddd", (req,res) => {
  const {id, pw} = req.body
  console.log(req.body)
})

const port = 8080
app.listen(port, () => console.log(`SERVER ON PORT : ${port}`))