const giphy = require('giphy-api')(process.env.GIPHY_API_KEY);
const _ = require('lodash');

const rating = 'pg-13';

/** queries stickers - returns promise */
module.exports.getGif = query => giphy.search({
  rating,
  q: query,
});

module.exports.getSticker = query => giphy.search({
  api: 'stickers',
  rating,
  q: query,
});

/** gets random sticker - returns promise */
module.exports.getRandomSticker = (query) => {
  return module.exports.getSticker(query)
    .then((res) => {
      return res.data.length ? _.sample(res.data) : null;
    });
};
