function createLoader() {
  const loader = document.createElement('div');
  loader.setAttribute('class', 'loader');

  const container = document.getElementById('content');
  container.appendChild(loader);

  return loader;
}

export default createLoader;
