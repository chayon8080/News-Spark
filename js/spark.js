const loadCatagories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCatagories(data.data.news_category);
}


const displayCatagories = (items) => {
    const catagoriesContainer = document.getElementById('catagories');
    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('nav-item')
        li.innerHTML = `
<a class="nav-link active" onclick="loadItemsData('${item.category_id}')" aria-current="page" href="#">${item.category_name}</a>
`
        catagoriesContainer.appendChild(li);
    })
}

const loadItemsData = async (itemId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${itemId}`
    const res = await fetch(url);
    const data = await res.json();
    displayCatagoriesDetails(data.data);
    console.log(data);
}

const displayCatagoriesDetails = (itemDetails) => {
    const detailsContainer = document.getElementById('news-container');
    itemDetails.forEach(detail => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card d-flex flex-row">
                        <div><img src="${detail.thumbnail_url}" class="card-img-top" alt="..."></div>
                        <div class="card-body">
                            <div>
                            <h5 class="card-title">${detail.title}</h5>
                            <p class="card-text">${detail.details}</p>
                            </div>
                            <div>
                            <div class="d-flex flex-row">
                            <img src="${detail.thumbnail_url}" class="card-img-top" alt="...">
                            <h3>${detail.title}</h3>
                            <button type="button" class="btn btn-primary">See Details</button>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    `
    })
}

loadCatagories();