const superagent = require('superagent');

(async () => {
  try {
    const res = await superagent.get('https://poll.fm/n/5850d02810fa78428b5592f7999ab8d5/12585159?1690995928215');
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Res:', res.);
    console.log('Date in Response header:', headerDate);

    // const users = res.body;
    // for(user of users) {
    //   console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    // }
  } catch (err) {
    console.log(err.message); //can be console.error
  }
})();