import { log } from './logger';
import { eventBus } from './eventBus';
import {accounts} from "@/api";
const mqtt = require('mqtt');

async function initMqttClient() {
  // const client = await mqtt.connect({
  //   // port: 3002,
  //   'wss://mktop-broker.wisoft.io'
  // });
  var client = mqtt.connect('wss://mktop-broker.wisoft.io');

  const mqttRouter = require('mqtt-router').wrap(client);

  client.on('connect', () => {
    console.log('connect success');
    log.info('info');
  });
  mqttRouter.subscribe(`/v1/device/${id}`, { qos: 2 }, (topic, message) => {
    console.log(id);
    log.info('info_sub');
    console.log('[subscribe] /v1/device');
    console.log(JSON.parse(message));
    eventBus.$emit('test', JSON.parse(message));
  });
}

export { initMqttClient };
