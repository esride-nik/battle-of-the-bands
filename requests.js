import fetch from 'node-fetch';

const read = async body => {
	let error;
	body.on('error', err => {
		error = err;
	});

	for await (const chunk of body) {
		console.dir(chunk.toString());
	}

	return new Promise((resolve, reject) => {
		body.on('close', () => {
			error ? reject(error) : resolve();
		});
	});
};

try {
	const response = await fetch('https://poll.fm/n/5850d02810fa78428b5592f7999ab8d5/12585159?1690995928215');
	await read(response.body);
} catch (err) {
	console.error(err.stack);
}