import { log } from './logger';
import { eventBus } from './eventBus';
const mqtt = require('mqtt');
let client;

async function initMqttClient(deviceList) {
  console.log('mqtt');
  console.log(deviceList);
  // client = mqtt.connect('wss://mktop-broker.wisoft.io');
  client = mqtt.connect('wss://192.168.10.250');

  const mqttRouter = require('mqtt-router').wrap(client);

  client.on('connect', () => {
    console.log('connect success');
    log.info('info');
  });

  for (let i = 0; i < deviceList.length; i++) {
    mqttRouter.subscribe(
      `/v1/device/${deviceList[i].deviceId}`,
      { qos: 2 },
      (topic, message) => {
        console.log('start');
        let messa = JSON.parse(message);
        // console.log(JSON.parse('topic' + ':' + topic));
        let test = {
          id: deviceList[i].deviceId,
          temperature: messa.temperature,
        };
        console.log(test);
        // console.log(topic);
        // console.log(JSON.parse(message));
        eventBus.$emit('update', test);
      },
    );
  }
}

async function end() {
  client.end();
}

export { initMqttClient, end };
