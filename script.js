
const loadAllCategory = async () => {
    const res = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    displayCategory(data);
};

// Show all Category

const displayCategory = (data) => {

    const categoryContainer = document.getElementById('category-container');

    data?.data.forEach(element => {
        console.log(element.category);

       let btn = document.createElement('button');
       btn.innerHTML = ` 
       
       <input type="radio" aria-label="${element.category}" class="btn px-8 rounded-lg" />
       `;

       categoryContainer.appendChild(btn);

    });
}

loadAllCategory();

