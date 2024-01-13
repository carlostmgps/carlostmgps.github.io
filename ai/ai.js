const { Layer, Network } = window.synaptic;
var learningRate = .3;
function customizeNetwork(arrays){
  console.log("CuztomizingNetwork");
  if (arrays.length < 3){
    console.error("customizeNetwork array is shorter than three")
    return None
  }
  input = new Layer(arrays[0]);
  output = new Layer(arrays[arrays.length - 1]);
  hiddens = [];
  for (var n = 0; n < arrays.length - 2 ; n++) {
    hiddens = [...hiddens,
      new Layer(arrays[n+1])
    ];
  }
  input.project(hiddens[0]);
  for (var n2 = 0; n2 < hiddens.length-1; n2++){
    console.log("projecting " + String(n2) + "to " + String(n2+1))
    hiddens[n2].project(hiddens[n2+1]);
  }
  hiddens[hiddens.length-1].project(output);
  
  networktem = new  Network({
    input: input,
    hidden: [...hiddens],
    output: output
  });
  
  var newnet = Object.assign(networktem, mynet);
  
  return newnet
}

var mynet = {
  get : function get(value){ return this.activate(value); },
  batchTrain : function batchTrain(times,vs,os){
    for (var i = 0; i < times; i++) {
      for (var n = 0; n < vs.length;n++) {
        this.activate(vs[n]);
        this.propagate(0.3, [os[n]]);
      };
    };
  },
  train : function train(v,o){
    batchTrain(1,[v],[o]);
  }
};
