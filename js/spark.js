const loadCatagories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCatagories(data.data.news_category);
}


const displayCatagories = (items) => {
    const catagoriesContainer = document.getElementById('catagories');
    for (const item of items) {
        const li = document.createElement('li');
        li.classList.add('nav-item')
        li.innerHTML = `
<a class="nav-link active" onclick="loadItemsData(item.category_id)" aria-current="page" href="#">${item.category_name}</a>
`
        catagoriesContainer.appendChild(li);
    }
}

const loadItemsData = async (itemId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${itemId}`
    const res = await fetch(url);
    const data = await res.json();
    displayCatagoriesDetails(data.data.news_category);
}

const displayCatagoriesDetails = () => {
    const detailsContainer = document.getElementById('news-container');

}

loadCatagories();