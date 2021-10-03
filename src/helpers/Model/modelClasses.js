import * as tf_2 from "@tensorflow/tfjs";

export class scaling extends tf_2.layers.Layer {
    static className = "scaling";
    constructor(config) {
      super(config);
    }
  }
  
export class l2Norm extends tf_2.layers.Layer {
    static className = "l2Norm";
    constructor(config) {
      super(config);
    }
  }
  
  export class L2Norm extends tf_2.layers.Layer {
    static className = "L2Norm";
    constructor(config) {
      super(config);
    }
  }