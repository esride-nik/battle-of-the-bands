import fetch from 'node-fetch';
import {Headers} from 'node-fetch';

let repeatCounter = 0;
let successfulVoteCounter = 0;

const getPollId = async (body) => {
    let pollId = '';
	let error;
	body.on('error', err => {
		error = err;
	});

	for await (const chunk of body) {
        pollId = chunk.toString().split('\'')[1];
	}

	return new Promise((resolve, reject) => {
        pollId.length > 0 ? resolve(pollId) : reject(error);
	});
};

const submitVote = async (body) => {
	let error;
    let bodyString = '';
	body.on('error', err => {
		error = err;
	});

	for await (const chunk of body) {
        bodyString = chunk.toString();
	}

	return new Promise((resolve, reject) => {
        bodyString.indexOf('\n') > -1 > 0 ? resolve(bodyString) : reject(error);
	});
};

const vote = async () => {
    repeatCounter++;
    const voteId = Date.now();
    console.log(voteId, 'start voting');
    let response = await fetch('https://poll.fm/n/5850d02810fa78428b5592f7999ab8d5/12585159?' + voteId);
    let pollId = '';
    try {
        pollId = await getPollId(response.body);
        console.log('pollId: ', pollId);
    
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
        let voteSubmitted = '';
        try {
            voteSubmitted = await submitVote(response.body);
            console.log('voteSubmitted: ', voteSubmitted);

            successfulVoteCounter++;
            console.log('###', successfulVoteCounter, 'successful /', repeatCounter, 'total votes');
        } catch (err) {
            console.error(voteId + ' error submitVote:' + err);
            console.log('###', successfulVoteCounter, 'successful /', repeatCounter, 'total votes');
        }
    } catch (err) {
        console.error(voteId + ' error getPollId:' + err);
        console.log('###', successfulVoteCounter, 'successful /', repeatCounter, 'total votes');
    }
}

setInterval(vote, 500);