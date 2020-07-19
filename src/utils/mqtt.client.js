import { log } from './logger';
import { eventBus } from './eventBus';
import mqtt from 'mqtt';
let client;

async function initMqttClient(deviceList) {
  client = mqtt.connect('wss://mktop-broker.wisoft.io');

  const mqttRouter = require('mqtt-router').wrap(client);

  client.on('connect', () => {
    console.log('connect success');
    log.info('info');
  });

  for (let i = 0; i < deviceList.length; i++) {
    mqttRouter.subscribe(
      `/v1/device/${deviceList[i].deviceId}/status`,
      { qos: 2 },
      (topic, message) => {
        let json_message = JSON.parse(message);
        let body = {
          id: deviceList[i].deviceId,
          temperature: json_message.temperature,
        };
        eventBus.$emit('update', body);
      },
    );
  }
}

async function end() {
  client.end();
}

export { initMqttClient, end };
