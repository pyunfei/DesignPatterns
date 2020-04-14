(async () => {
  const urls = ['hanhan/yi', 'hanhan/er'];
  for (const url of urls) {
    const { ok, body } = await fetch(url);
    ok & console.log(body)
  }
})()