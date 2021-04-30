async function* chars() {
  for (const u8 of [240, 159, 152, 132, 102, 228, 184, 173]) {
    yield await new Promise((resolve) => setTimeout(resolve, 100, Uint8Array.of(u8)));
  }
}
// 文本流
const textStream = new ReadableStream({
  async start(constroller) {
    for await (const u8 of chars()) {
      constroller.enqueue(u8);
    }
    constroller.close();
  }
});
// 流过管道解码
const decodeTextStream = textStream.pipeThrough(new TextDecoderStream());
// 读取
const reader = decodeTextStream.getReader();
(async () => {
  while(true) {
    const res = await reader.read();
    if (res.done) break;
    console.log(res);
  }
})();