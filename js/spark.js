const loadCatagories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCatagories(data.data.news_category);
    }
    catch (error) {
        console.log(error)
    }
}


const displayCatagories = (items) => {
    const catagoriesContainer = document.getElementById('catagories');
    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('nav-item')
        li.innerHTML = `
<a id="items" class="nav-link p-3" onclick="loadItemsData('${item.category_id}')" aria-current="page" href="#"  >${item.category_name}</a>
`
        catagoriesContainer.appendChild(li);

    })

}

const loadItemsData = async (itemId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${itemId}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCatagoriesDetails(data.data);
    }
    catch (error) {
        console.log(error)
    }
}
const displayCatagoriesDetails = (itemDetails) => {
    itemDetails.sort(function (a, b) {
        return b.total_view - a.total_view;
    })
    loadSpinner(true)
    const detailsContainer = document.getElementById('news-container');
    detailsContainer.innerHTML = "";
    const notFound = document.getElementById('not-found');
    if (itemDetails.length === 0) {
        notFound.classList.remove('d-none');
    }
    else {
        notFound.classList.add('d-none');
    }
    itemDetails.forEach(detail => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                       <div class="">
                       <div><img src="${detail.image_url}" class="card-img-top" alt="..."></div>
                       <div class="card-body container">
                           <div>
                           <h5 class="card-title">${detail.title ? detail.title : "No Title found"}</h5>
                           <p class="card-text textSizing">${detail.details.slice(0, 200)}...</p>
                           </div>
                           
                       </div></div>
                        <div class="d-flex flex-row justify-content-around img-body">
                        <img  src="${detail.author.img ? detail.author.img : "No img found"}" class="card-img-top" alt="...">
                        <div><p >${detail.author.name ? detail.author.name : "No name found"}</p><p >${detail.author.published_date ? detail.author.published_date : "No date found"}</p></div>
                        <div><i class="fa-solid fa-eye"></i> <span class="fw-bold">${detail.total_view ? detail.total_view : "No data found"}</span></div>
                        <div><i onclick="loadModalDetails('${detail.category_id}', '${detail._id}')" class="fa-solid fa-right-long cart-icon icon" data-bs-toggle="modal"  data-bs-target="#blogDetailsModal"></i></div>
                        </div>
                        
                    </div>

                    `
        detailsContainer.appendChild(div);

    })
    loadSpinner(false);
    document.getElementById('countData').value = `${itemDetails.length} items found`;

}
loadItemsData('08', "All News");

const loadModalDetails = async (category_id, id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayModalDetails(data.data, id);
    }
    catch (error) {
        console.log(error)
    }
}
const displayModalDetails = (modals, id) => {
    const index = modals.indexOf(modals.find(modalItem => modalItem._id === id));
    console.log(index)


    const modalTitle = document.getElementById('blogDetailsModalLabel');
    modalTitle.innerText = modals[index].title ? modals[index].title : 'Title Not Found';
    const phoneDetails = document.getElementById('modal-details');
    phoneDetails.innerHTML = `
          <img src="${modals[index].author.img}" height="100px" width="100px">
          <p>Authore Name: ${modals[index].author.name ? modals[index].author.name : 'Author Name Not Found'} </p>
          <p>Publish Date: ${modals[index].author.published_date ? modals[index].author.published_date : 'Publish Date Not Found'} </p>
          <p>View: ${modals[index].total_view ? modals[index].total_view : 'Total View Not Found'}</p>
          <p>Rating: ${modals[index].rating.number ? modals[index].rating.number : 'Rating Not Found'} </p>
          
      `;
}

const loadSpinner = isLoading => {
    const spinner = document.getElementById("loading");
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}


loadCatagories();