function renderPage(data) {
  const contentContainer = document.getElementById('content');
  renderAddress(contentContainer, data.location);
}

function renderAddress(container, addressString) {
  if (document.getElementById('address') == null) {
    const address = document.createElement('div');
    address.innerHTML = addressString;
    container.appendChild(address);
    address.setAttribute('id', 'address');
  } else {
    document.getElementById('address').innerHTML = addressString;
  }
}

export default renderPage;

// Create today display, temp, location, high, low, humidity, weather forcast

// Create hourly display

// Create daily display
