import { log } from './logger';
import { eventBus } from './eventBus';
const mqtt = require('mqtt');

async function initMqttClient() {
  const client = await mqtt.connect({
    port: 3002,
    host: 'mktop-broker.wisoft.io',
  });
  const mqttRouter = require('mqtt-router').wrap(client);

  client.on('connect', () => {
    console.log('connect success');
    log.info('info');
  });

  mqttRouter.subscribe('/v1/device', { qos: 2 }, (topic, message, param) => {
    log.info('info_sub');
    console.log('[subscribe] /v1/device');
    console.log(JSON.parse(message));
    eventBus.$emit('test', JSON.parse(message));
  });
}

export { initMqttClient };
