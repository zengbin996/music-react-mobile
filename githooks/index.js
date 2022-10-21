const express = require('express')
const { exec } = require('child_process');
const app = express()
const port = 9997

app.post('/', (req, res) => {
  exec('cd /root/home/web/music-react && git pull && npm run build',(error, stdout, stderr)=>{
    console.log(error, stdout, stderr)
  })
  res.send('success:' + new Date())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})