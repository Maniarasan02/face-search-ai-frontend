// Stripe Setup
const stripe = Stripe('your_stripe_publishable_key_here');

function checkout() {
  stripe.redirectToCheckout({
    lineItems: [{price: 'price_XXXXXX', quantity: 1}],
    mode: 'subscription',
    successUrl: window.location.origin + '/success.html',
    cancelUrl: window.location.origin + '/cancel.html',
  }).then(function (result) {
    if (result.error) {
      alert(result.error.message);
    }
  });
}

// Function to handle image search
async function searchImage() {
  const imageUpload = document.getElementById('imageUpload').files[0];
  if (!imageUpload) {
    alert("Please upload an image.");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageUpload);

  try {
    const response = await fetch('https://your-backend-url.com/api/search', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error searching for the image.");
  }
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    const img = document.createElement('img');
    img.src = result.imageUrl;
    img.alt = 'Search Result';
    img.style.width = '100px';
    img.style.margin = '0.5rem';
    resultsContainer.appendChild(img);
  });
}
