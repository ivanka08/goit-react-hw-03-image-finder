const apiKey = '40087799-873756a7f0c0976e3054c80be'; 

async function fetchData(query, page) {
  const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data.hits;
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
}

export { fetchData };