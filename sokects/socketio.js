const socket = io => {
    io.on('connection', client => {
        console.log('New Connection with id ==>>',client.id);
        client.on('subscribeToDateEvent', interval => {
            console.log('Client is subscribing with interval: ', interval);

            // emit message to the client side
            setInterval(() => {
                client.emit("getData1", "subscribeToDateEvent")
                client.emit('getDate', new Date().toUTCString());
            }, interval);
        });
        client.on("neweve", (data) => {
            console.log("data==>>", data);
            client.emit("getData1", "this is new data");
        })
        
    });
}

module.exports = socket;