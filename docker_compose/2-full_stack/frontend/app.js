// Load existing items on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadItems();

  // Handle form submission
  const form = document.getElementById('itemForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await submitForm();
  });
});

// Load items from the API and display them
async function loadItems() {
  try {
    const response = await fetch('/api/items');
    const items = await response.json();
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.content;
      itemsList.appendChild(li);
    });
  } catch (error) {
    console.error('Error loading items:', error);
  }
}

// Submit the form to the API
async function submitForm() {
  const form = document.getElementById('itemForm');
  const formData = new FormData(form);
  const item = formData.get('item');

  try {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item }),
    });

    if (response.ok) {
      form.reset();
      await loadItems();
    } else {
      console.error('Error submitting form:', await response.text());
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}
