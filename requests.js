import fetch from 'node-fetch';
import {Headers} from 'node-fetch';

let pollId = '';
let repeatCounter = 0;
let successfulVoteCounter = 0;

const parseRes1 = async body => {
	let error;
	body.on('error', err => {
		error = err;
	});

	for await (const chunk of body) {
        pollId = chunk.toString().split('\'')[1];
		console.dir('Requesting pollId', chunk.toString(), '=> pollId: ', pollId);
	}

	return new Promise((resolve, reject) => {
		// body.on('close', () => {
		// 	error ? reject(error) : resolve();
		// });
        resolve();
	});
};

const parseRes2 = async body => {
	let error;
	body.on('error', err => {
		error = err;
	});

	for await (const chunk of body) {
        const bodyString = chunk.toString();
		console.dir('Registering vote', bodyString.length, 'was', bodyString.indexOf('\n') > -1 ? 'successful' : 'unsuccessful');
        if (bodyString.indexOf('\n') > -1) {
            successfulVoteCounter++;
        }
	}

	return new Promise((resolve, reject) => {
        if (error) console.log('error', error)
		// body.on('close', () => {
		// 	error ? reject(error) : resolve();
		// });
        resolve();
	});
};

try {
    while (1==1) {
        let response = await fetch('https://poll.fm/n/5850d02810fa78428b5592f7999ab8d5/12585159?' + Date.now());
        await parseRes1(response.body);
        
        const meta = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,de;q=0.8',
            'Referer': 'https://metaldevastationradio.com/',
            'Sec-Fetch-Dest': 'script',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Host': 'polls.polldaddy.com',
            'Connection': 'keep-alive',
            'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        };
        const headers = new Headers(meta);
    
        const option_id = '56743030';
    
        response = await fetch('https://polls.polldaddy.com/vote-js.php?p=12585159&b=0&a=' + option_id + ',&o=&va=16&cookie=0&tags=12585159-src:poll-embed&n=' + pollId + '&url=https%3A//metaldevastationradio.com/thebeast/blog/23583/battle-of-the-bands-championship-for-the-week-of-07-31-23-08-04-23', {
            method: 'get',
            headers: headers
        });
        await parseRes2(response.body);

        repeatCounter++;
        console.log('###', successfulVoteCounter, 'successful /', repeatCounter, 'total votes');
    }
} catch (err) {
	console.error(err.stack);
}