import * as tf from "@tensorflow/tfjs-core";

export async function loadBackend() {
  await tf.ready();
  return tf.getBackend();
}
