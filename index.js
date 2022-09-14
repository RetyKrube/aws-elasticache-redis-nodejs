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
            epireRedisKey(keyRedis, 30);
        }
    });
}

// Set key expiry time
function expireRedisKey(keyRedis, value) {
    client.expire(keyRedis, value, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            if (response){
                console.log("Successfully set expiry time");
                readRedisKey(keyRedis);
            }    
            else
                console.log("Unsuccessful. Key " + keyRedis + "does not exist!");
        }
    });
}

// Read from Redis
function readRedisKey(keyRedis) {
    client.get(keyRedis, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(response);
            var objInfo = {
                info1: "This is info 1",
                info2: "This is info 2",
                info3: "This is info 3"
            };
            writeRedisObject("myInfo", objInfo);
        }
    });
}

// Write Redis Object of keys
function writeRedisObject(objRedis, value) {
    client.hmset(objRedis, value, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(response);
            readRedisObject(objRedis);
        }
    });
}

// Read Redis Object of keys
function readRedisObject(objRedis) {
    client.hgetall(objRedis, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(response);
        }
    });
}
