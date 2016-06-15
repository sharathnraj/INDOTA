var data;

// fires before generation so we can get data in one go
hexo.on('generateBefore', function(){
  data = hexo.locals.get('data');
});

/**
 * GetMatchHistory
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetMatchHistory', function() {
  return data.GetMatchHistory.result;
});

/**
 * GetMatchDetails
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetMatchDetails', function() {
  return data.GetMatchDetails.result;
});

/**
 * GetHeroes
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetHeroes', function() {
  return data.GetHeroes.result.heroes;
});

/**
 * GetGameItems
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetGameItems', function() {
  return data.GetGameItems.result.items;
});

/**
 * GetLobbyType
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetLobbyType', function() {
  return data.GetLobbyType.result;
});

/**
 * GetTowerStatus
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetTowerStatus', function() {
  return data.GetTowerStatus.result;
});

/**
 * GetBarracksStatus
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetBarracksStatus', function() {
  return data.GetBarracksStatus.result;
});

/**
 * GetGameMode
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetGameMode', function() {
  return data.GetGameMode.result;
});

/**
 * GetLeaverStatus
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetLeaverStatus', function() {
  return data.GetLeaverStatus.result;
});

/**
 * GetDOTANews
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetDOTANews', function() {
  return data.GetDOTANews.result;
});

/**
 * GetSitemap
 *
 * @return {object} matching module from data
 */
hexo.extend.helper.register('GetSitemap', function() {
  return data.sitemap;
});

