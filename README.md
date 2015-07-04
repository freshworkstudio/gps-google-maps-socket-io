# GPS Tracking Basic Demo Web Application
This is a demo applications that uses the [gps-tracking](https://www.npmjs.com/package/gps-tracking)   node.js package.
It uses MongoDB to store data coming from the GPS and [Express](expressjs.com) & [Socket.io](http://socket.io/) to serve a mini web-app to see your devices in a Google Map. 

## DEMO
You can check out a [demo here](http://gps.freshwork.co:3000/).
Actually, it works with real data coming from a real device or emulator.

You can use our demo (and pretty basic) [emulator](https://gps-tracking-emulator.meteor.com) to send some data to the server of this demo app. 

- IP: 45.55.74.234
- PORT: 8090
- Model: TK103

![captura de pantalla 2015-06-23 a las 1 54 57](https://cloud.githubusercontent.com/assets/1103494/8299178/16d459de-194b-11e5-9562-4ae450db5cef.png)


# Installation
You'll need: 
- [Node.js installed](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)
- A mongo DB server running

```bash
cd /path/to/projects
git clone https://github.com/freshworkstudio/gps-google-maps-socket-io.git
cd gps-google-maps-socket-io
npm install
node index.js
```

That's all. 
Just clone the repo, install the dependencies (gps-tracking package) and start your brand new server. 

By default it will start an express http server and socket.io in port 3000. 

### NOTES
You are not going to see anything until you receive some data from a gps device/emulator. 
If you install this package on you computer, you can also use our demo (and pretty basic) [emulator](gps-tracking-emulator.meteor.com) to send dummy data to your computer, but you probably have to set up port forwarding in your router. 

I would recommend you to install this in a public server, like a VPS.
Don't forget to allow traffic in the port you setup the express & socket.io port in your firewall.  


![captura de pantalla 2015-06-23 a las 1 43 51](https://cloud.githubusercontent.com/assets/1103494/8299177/16b6985e-194b-11e5-8104-801faac4cbd2.png)
