const loadAllNewsCategories = async() => {
      const url = `https://openapi.programming-hero.com/api/news/categories`;
      const res = await fetch(url);
      const data = await res.json();
     setAllNews(data.data.news_category)
     // displayNewsCategories(data.data.news_category);
}

const setAllNews = (data) => {
      // console.log(data);
      const newsMenu = document.getElementById('all-menu')
      for (const news of data) {
            // console.log(news.category_name); 
            const li = document.createElement('li');
            li.innerHTML = `<a onclick = "loadNewses('id')" class="nav-link" href="#">${news.category_name}</a>`;
            newsMenu.appendChild(li);
            
      }
}

const loadNewses = (id) => {
      const url = `https://openapi.programming-hero.com/api/news/category/01`;
      fetch(url)
      .then(res => res.json())
      .then(data => displayNews(data.data)) 
      
      
}

// displayNews

const displayNews = news => {
      const newsContainer = document.getElementById('news-container')
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
                              
                        </div>
                  </div>
            </div>
            `;
            newsContainer.appendChild(newsDiv);
            
      });
      console.log(news);
}


loadNewses()
loadAllNewsCategories()
