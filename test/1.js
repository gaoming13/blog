const wokerScriptBlobUrl = URL.createObjectURL(new Blob([`
self.onmessage = ({data}) => {
  const view = new Uint32Array(data);
  for (let i = 0; i < 10000; i++) {
    view[0] += 1;
  }
  console.log(view[0]);
  self.postMessage(null);
};
`]));

const woker1 = new Worker(wokerScriptBlobUrl);
woker1.onmessage = () => {
  console.log('worker1 => ' + view[0]);
};
const woker2 = new Worker(wokerScriptBlobUrl);
woker2.onmessage = () => {
  console.log('worker2 => ' + view[0]);
};

const sharedArrayBuffer = new SharedArrayBuffer(4);
const view = new Uint32Array(sharedArrayBuffer);
view[0] = 0;
woker1.postMessage(sharedArrayBuffer);
woker2.postMessage(sharedArrayBuffer);

