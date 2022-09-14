// Include the Redis package
var redis = require('redis');

var redisEndpoint = 'YOUR_REDIS_ENDPOINT';
// Get the port and host from the endpoint string
var PORT = redisEndpoint.slice(-4);
var HOST = redisEndpoint.slice(0,-5);
//create a new Redis client 
var client = redis.createClient(PORT, HOST);

// Connect to Redis endpoint 
client.on('connect', function () {
    console.log('Connected to Redis node: ' + redisEndpoint);
    writeRedisKey("myHighScore", "1000");
});

// Write to Redis
function writeRedisKey(keyRedis, value) {
    client.set(keyRedis, value, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(response);
        }
    });
}
