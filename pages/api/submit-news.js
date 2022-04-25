const Ably = require('ably');

const rest = new Ably.Rest(process.env.ABLY_API_KEY);

var channel = rest.channels.get('news-list');

export default function handler(req, res) {
    if (req.method === 'POST') {
        channel.publish([{data: req.body.headline}]);
    
        res.status(200).json({})
    }
    else {
        res.status(405).json({})
    }
}