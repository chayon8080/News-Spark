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
    detailsContainer.innerHTML = "";
    itemDetails.forEach(detail => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                       <div class="d-flex flex-row">
                       <div><img src="${detail.image_url}" class="card-img-top imageAdj py-3" alt="..."></div>
                       <div class="card-body container">
                           <div>
                           <h5 class="card-title">${detail.title ? detail.title : "No Title found"}</h5>
                           <p class="card-text">${detail.details.slice(0, 200)}</p>
                           </div>
                           
                       </div></div>
                        <div class="d-flex flex-row justify-content-around img-body">
                        <img  src="${detail.author.img ? detail.author.img : "No img found"}" class="card-img-top" alt="...">
                        <div><p >${detail.author.name ? detail.author.name : "No name found"}</p><p >${detail.author.published_date ? detail.author.published_date : "No date found"}</p></div>
                        <div><i class="fa-solid fa-eye"></i> <span class="fw-bold">${detail.total_view ? detail.total_view : "No data found"}</span></div>
                        <div><i class="fa-solid fa-right-long icon"></i></div>
                        </div>
                        
                    </div>

                    `
        detailsContainer.appendChild(div);
    })
}

loadCatagories();