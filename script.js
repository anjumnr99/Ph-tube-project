
const loadAllCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    displayCategory(data);
};

// Show all Category

const displayCategory = (data) => {

    const categoryContainer = document.getElementById('category-container');

    data?.data.forEach(element => {
        // console.log(element.category);

        let btn = document.createElement('button');
        btn.innerHTML = ` 
       
       <input onclick = "loadCategoryDetails(${element.category_id})" type="radio" aria-label="${element.category}" class="btn px-8 rounded-lg" />
       `;

        categoryContainer.appendChild(btn);

    });
}


// Fetching Category details
const loadCategoryDetails = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    displayDetailsOfCategory(data);
};

const displayDetailsOfCategory = (details) => {
    console.log(details.data);

    const defaultData = details.data;

    const noDataContainer = document.getElementById('no-data-container ');
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerText = " ";


    defaultData.length !== 0 ? defaultData.forEach(element => {
        console.log(element);

        const div = document.createElement('div');

        div.classList = `card  bg-base-100`;

        div.innerHTML = ` 
        
        <figure class="rounded-lg "><img class ="h-[200px] w-full" src="${element.thumbnail}" alt="" /></figure>
        <div class="card-body p-0 mt-5">
           <div class="flex gap-3">
            <div class="avatar">
                <div class="w-10 h-10 rounded-full">
                    <img src="${element?.authors[0]?.profile_picture}" />
                </div>
            </div>
            <div class="space-y-2">
                <p class="text-base font-bold">${element.title}</p>
                 
                <div class="flex  items-center">
                <h2 class="text-base font-normal text-[#171717b3]">${element?.authors[0]?.profile_name}</h2>
                <div class="badge  border-none w-fit"><img src="${element.authors[0].verified ? './verified.svg' : ' '}"></div>
                </div>
            
                

                <p class="text-base font-normal text-[#171717b3] ">${element.others.views} views</p>
            </div>
           </div>
        </div> `;
        cardContainer.appendChild(div);

    }) : noDataContainer.innerHTML = 
     ` <img class="w-20" src="./nodata.svg" alt="">
    <h1 class="text-3xl text-center font-bold">Oops!! Sorry, There is no <br> content here</h1>` ;

};






loadAllCategory();

