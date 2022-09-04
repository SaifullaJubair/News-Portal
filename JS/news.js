const loadAllNewsCategories = async() => {
      const url = `https://openapi.programming-hero.com/api/news/categories`;
      loadingSpinner(true);

      try {
            const res = await fetch(url);
            const data = await res.json();
            setAllNews(data.data.news_category)

      } catch (error) {
            console.log(error)
      }
     // displayNewsCategories(data.data.news_category);
}

const setAllNews = async (data) => {
      // console.log(data);
      loadingSpinner(false);
      const newsMenu = document.getElementById('all-menu')
      for (const news of data) {
            // console.log(news.category_name); 
            const li = document.createElement('li');
            li.innerHTML = `<a onclick = "loadNewses('${news.category_id}')" class="nav-link" href="#">${news.category_name}</a>`;
            newsMenu.appendChild(li);
            
      }
}

const loadNewses = (id) => {
      const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
      loadingSpinner(true);
      fetch(url)
      .then(res => res.json())
            .then(data => displayNews(data.data)) 
      .catch(error => console.log(error))
      
      
      
}

// displayNews

const displayNews = news => {
      loadingSpinner(false);
      const newsContainer = document.getElementById('news-container')
      newsContainer.innerHTML = "";
      const noNews = document.getElementById('no-news-found');
      if (news.length === 0) {
            noNews.innerText = `
           no data found for this category
            `
      }
      else {
            noNews.innerText = `
            ${news.length} data found for this category
            `
      }
      news.sort(function (a, b) {
            return b.total_view - a.total_view;
          });
      news.forEach(data => {
            const newsDiv = document.createElement('div')
            newsDiv.innerHTML = `
            <div class="card my-5">
                  <img src="${data.image_url}" class="card-img-top" alt="...">
                  <div class="card-body">
                        <h3 class="card-title">${data.title}</h3>
                        <p class="card-text">${data.details}</p>
                        <div class="d-flex align-items-center">
                              <img src="${data.author.img}" class="rounded-circle mx-3" style="width: 70px;" alt="...">
                              <h5><span></span>${data.author.name}</h5>
                              
                              <h3 class="ms-5" ><i class="fa-solid fa-eye"></i>${data.total_view}</h3>
                              
                        </div>
                  </div>
            </div>
            `;
            newsContainer.appendChild(newsDiv);
            
      });
      console.log(news);
}

const loadingSpinner = (isLoading) => {
      const spinnerDiv = document.getElementById('spinner');
      if (isLoading === true) {
            spinnerDiv.classList.remove('d-none');

      }
      else {
            spinnerDiv.classList.add('d-none');
      }
}


loadAllNewsCategories()
loadNewses('01')
