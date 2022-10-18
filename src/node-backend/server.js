const express = require('express')
const app = express()
const port = 3000
const { mwn } = require('mwn');

const test = new mwn({
  apiUrl: 'http://localhost/mediawiki/api.php',
  userAgent: 'testApiAccess'
});

const mainPage = test.read('Main Page');
let title = ""
mainPage.then(res => {
  title = res.title.toString()
})

app.get('/', (req, res) => {
  res.send('Hello World, again! ' + title)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
