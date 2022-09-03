// const loadCategorys = () => {
//       fetch('https://openapi.programming-hero.com/api/news/categories')
//             .then(res => res.json())
//             .then(data => displayCategorys(data.data.news_category))
// }

const loadAllNewsCategories = async() => {
      const url = `https://openapi.programming-hero.com/api/news/categories`;
      const res = await fetch(url);
      const data = await res.json();
      displayAllNewsCategories(data.data)
}

const displayAllNewsCategories = allNews => {
      console.log(allNews)
}

// const newsCategory = document.getElementById('catagories-container')
// const displayCategorys = categorys => {
//       categorys.forEach(category => {
//             console.log(category.category_name)
//       });
// }

loadAllNewsCategories();