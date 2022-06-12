const server = require("http").createServer();
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"],
});
const os = require("os-utils");
const port = 4200;
let tick = 0;

io.on("connection", (client) => {
  // setInterval(()=>{
  //   os.cpuUsage((value)=>{
  //     tick++;
  //     client.emit("getCpuUsageInfo", {
  //       name: tick,
  //       value,
  //     });
  //   })
  // },500)

  setInterval(() => {
    tick++;
    os.cpuUsage((cpuUsageValue) => {
      client.emit("getCpuUsageInfo", {
        name: tick,
        cpuUsageValue,
        scoreValue: Math.floor(Math.random() * 3),
      });
    });
  }, 500);
});

server.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
