const giphy = require('giphy-api')(process.env.GIPHY_API_KEY);
const _ = require('lodash');

/** queries stickers - returns promise */
module.exports.getSticker = query => giphy.search({
  api: 'stickers',
  q: query,
});

/** gets random sticker - returns promise */
module.exports.getRandomSticker = (query) => {
  return module.exports.getSticker(query)
    .then((res) => {
      return res.data.length ? _.sample(res.data) : null;
    });
};
