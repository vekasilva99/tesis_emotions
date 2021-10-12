import * as tf_2 from "@tensorflow/tfjs";

export class scaling extends tf_2.layers.Layer {
  static className = "scaling";
  constructor(config) {
    super(config);
    this.scale = config.scale;
  }
  call(input) {
    return tf_2.tidy(() => {
      //   console.log("SCALE ",this)
      // console.log("SCALE Antes",JSON.stringify(input[0].arraySync()))
      // console.log("SCALE Despues",input[0].mul(this.scale).dataSync())
      return input[0].mul(this.scale);
      // return tf_2.math.l2_normalize(input,-1,1e-12,this.name)
    });
  }
  getConfig() {
    const config = super.getConfig();
    Object.assign(config, { scale: this.scale });
    return config;
  }
}

export class l2Norm extends tf_2.layers.Layer {
  static className = "l2Norm";
  constructor(config) {
    super(config);
  }

  call(input) {
    return tf_2.tidy(() => {
      // console.log("SJA ANTES",JSON.stringify(input[0].arraySync()))
      // console.log("SJA",input[0].div(tf_2.sqrt(tf_2.maximum(tf_2.sum(tf_2.square(input[0])), 1e-12))).dataSync())
      return input[0].div(
        tf_2.sqrt(tf_2.maximum(tf_2.sum(tf_2.square(input[0])), 1e-12))
      );
      // return tf_2.math.l2_normalize(input,-1,1e-12,this.name)
    });
  }
}