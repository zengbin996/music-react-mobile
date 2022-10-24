const express = require('express')
const { exec } = require('child_process');
const app = express()
app.use(express.json())
const port = 9997

app.post('/', (req, res) => {
  if (req.body.password == 'Mc2SajhBp5LTnJ') {
    res.send('success: ' + new Date())

    exec('cd /root/home/web/music-react && npm i && npm run build', (error, stdout, stderr) => {
      console.log(error, stdout, stderr)
    })

  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})