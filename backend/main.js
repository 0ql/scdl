const scdl = require("soundcloud-downloader").default
const express = require("express")
const app = new express()
const cors = require("cors")
const CLIENT_ID = "<INSERT CLIENT_ID>"

app.use(cors())
app.use(express.json())

app.post("/getMusicInfo", async (req, res) => {
  if (scdl.isValidUrl(req.body.url)) {
    try {
      const info = await scdl.getInfo(req.body.url)
      return res.json(JSON.stringify(info))
    } catch {
      return res.sendStatus(500)
    }
  }
  res.sendStatus(400)
})

app.post("/download", async (req, res) => {
  if (scdl.isValidUrl(req.body.url)) {
    await scdl.download(req.body.url).then(stream => stream.pipe(res)).catch(err => {
      return res.sendStatus(500)
    })
  } else {
    res.sendStatus(400)
  }
})

app.listen(process.env.PORT || 8080, () => {
  console.log("SERVER ONLINE")
})
