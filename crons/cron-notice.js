const rp = require('request-promise');
const $ = require('cheerio');
require('../config');
require('../models/connection');
const Notice = require('../models/notice');


/**
* @method createNotice
* @description Create notice schema
* @param {*} title
* @param {*} content
* @param {*} origin
* @param {*} url
* @param {*} tag
*/
function createNotice(title, content, origin, url, tag) {
  const n = new Notice({
    title,
    content,
    created: new Date(),
    origin,
    url,
  });

  n.categories.push({ name: tag });

  return n;
}

/**
* @method getInfobaeNews
* @description Scrapper from infobae website
*/
async function getInfobaeNews() {
  const infobaeUrl = 'https://www.infobae.com';
  const tagsInfobae = ['/tag/politica/', '/tag/tecnologia/', '/tag/sociedad/'];

  return Promise.all(tagsInfobae.map(async (tag) => {
    const html = await rp(infobaeUrl + tag);
    await new Promise((resolve, reject) => {
      try {
        const news = $('article.result-item', html);
        if (news.length > 0) {
          news.map(async (i, e) => {
            const url = infobaeUrl + $('a', e).prop('href');
            const title = $('a > h4', e).text();
            const content = $('a > p > span', e).text();

            const notices = await Notice.find({ title });
            if (notices.length === 0 && title.trim() !== '') {
              const n = createNotice(title, content, 'Infobae', url, tag.split('/')[2]);
              await n.save();
              resolve();
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });

    console.log(`Infobae ${tag} finalizó correctamente.`);
  }));
}

/**
* @method getClarinNews
* @description Scrapper from clarin website
*/
async function getClarinNews() {
  const clarinUrl = 'https://www.clarin.com';
  const tagsClarin = ['/politica/', '/tecnologia/', '/sociedad/'];

  return Promise.all(tagsClarin.map(async (tag) => {
    const html = await rp(clarinUrl + tag);
    await new Promise((resolve, reject) => {
      try {
        const news = $('.content-nota', html);
        if (news.length > 0) {
          news.map(async (i, e) => {
            const url = clarinUrl + $('a', e).prop('href');
            const title = $('.max-h > p', e).text();
            const content = $('.max-h > h3', e).text();

            const notices = await Notice.find({ title });
            if (notices.length === 0 && title.trim() !== '') {
              const n = createNotice(title, content, 'Clarin', url, tag.split('/')[1]);
              await n.save();
              resolve();
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });

    console.log(`Clarin ${tag} finalizó correctamente.`);
  }));
}

/**
* @method getElPaisNews
* @description Scrapper from elpais website
*/
async function getElPaisNews() {
  const elPaisUrl = 'https://elpais.com';
  const tagsElPais = ['/tag/politica_exterior/', '/tag/argentina'];

  return Promise.all(tagsElPais.map(async (tag) => {
    const html = await rp(elPaisUrl + tag);
    await new Promise((resolve, reject) => {
      try {
        const news = $('.articulos__interior > article', html);
        if (news.length > 0) {
          news.map(async (i, e) => {
            const url = elPaisUrl + $('.articulo > .articulo__interior > h2 > a', e).prop('href');
            const title = $('.articulo > .articulo__interior > h2 > a', e).text();
            const content = $('.articulo-entradilla', e).text();

            const notices = await Notice.find({ title });
            if (notices.length === 0 && title.trim() !== '') {
              const n = createNotice(title, content, 'ElPais', url, 'politica');
              await n.save();
              resolve();
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });

    console.log(`ElPais ${tag} finalizó correctamente.`);
  }));
}

/**
* @method getBbcNews
* @description Scrapper from bbc website
*/
async function getBbcNews() {
  const bbcUrl = 'https://www.bbc.com';
  const tagsBbc = [
    '/mundo/america_latina',
    '/mundo/topics/31684f19-84d6-41f6-b033-7ae08098572a',
    '/mundo/internacional'
  ];

  return Promise.all(tagsBbc.map(async (tag) => {
    const html = await rp(bbcUrl + tag);
    await new Promise((resolve, reject) => {
      try {
        const news = $('.eagle > .eagle-item', html);
        if (news.length > 0) {
          news.map(async (i, e) => {
            const url = bbcUrl + $('.title-link', e).prop('href');
            const title = $('.title-link__title-text', e).text();
            const content = $('.eagle-item__summary', e).text();

            const notices = await Notice.find({ title });
            if (notices.length === 0 && title.trim() !== '') {
              let tagValue = '';
              if (tag === '/mundo/topics/31684f19-84d6-41f6-b033-7ae08098572a') {
                tagValue = 'tecnologia';
              } else {
                tagValue = 'politica';
              }

              const n = createNotice(title, content, 'Bbc', url, tagValue);
              await n.save();
              resolve();
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });

    console.log(`Bbc ${tag} finalizó correctamente.`);
  }));
}

/**
* @method runSites
* @description Run all sites
*/
async function runSites() {
  await getInfobaeNews();
  await getClarinNews();
  await getElPaisNews();
  await getBbcNews();

  process.exit();
}

runSites();
