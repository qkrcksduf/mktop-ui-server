import { log } from './logger';
import { eventBus } from './eventBus';
const mqtt = require('mqtt');

async function initMqttClient(deviceList) {
  var client = mqtt.connect('wss://mktop-broker.wisoft.io');

  const mqttRouter = require('mqtt-router').wrap(client);

  client.on('connect', () => {
    console.log('connect success');
    log.info('info');
  });
  for (let i = 0; i < deviceList.length; i++) {
    // console.log(deviceList[i].deviceId);

    mqttRouter.subscribe(
      `/v1/device/${deviceList[i].deviceId}`,
      { qos: 2 },
      (topic, message) => {
        console.log('[subscribe] /v1/device');
        console.log(JSON.parse(message));
        eventBus.$emit('update', JSON.parse(message));
      },
    );
  }
}

export { initMqttClient };
