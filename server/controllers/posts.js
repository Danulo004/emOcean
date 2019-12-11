const CustomError = require('../common/CustomError')
const asyncMiddleware = require('../middleware/asyncMiddleware')
const postsService = require('../services/PostsService')
const VideoHandler = require('../videoHandling/videoHandler')
const clearTempFiles = require('../common/clearTempFiles')
const searchService = require("../services/SearchService")


const uploadVideos = asyncMiddleware(async (req, res, next) => {
  const { type } = req.query
  const media = req.files
  const id = req.userId
  const videoHandler = new VideoHandler(media, type, id)
  videoHandler.apply().then(videoUrl => {
    res.status(200).json({ videoUrl })
  }).finally(() => {
    clearTempFiles('uploads', id)
  })
}
)


const savePost = asyncMiddleware(async (req, res, next) => {
  // TODO
  res.status(200).json({ success: true })
})


const searchPosts = function(req, res) {
  if (!req.query.tag) {    
    return res.status(400).send('no tag specified!')
  }
  const tagName = req.query.tag

  let postsDocs = searchService.findByTag(tagName)
  postsDocs
  .then(snapshot => {
    if (snapshot.empty) {
      return res.send(400).send('No matching documents.')
    }
    posts = [];
    snapshot.forEach(doc => {
      posts.push(doc.data());
    });
    res.json({posts})
  })
  .catch(err => {
    console.log('Error getting documents', err);
    res.status(500).send(err)
  });
}

module.exports = {
  savePost,
  uploadVideos,
  searchPosts
}
