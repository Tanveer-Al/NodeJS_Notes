const shortid = require("shortid");
const URL = require("../models/model");

async function handleGenrateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ mes: "url is required" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analitics: result.visitHistory,
  });
}

module.exports = { handleGenrateNewShortUrl, handleGetAnalytics };
