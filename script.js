

// navbar section
const navContainer = document.getElementById('navbar-container');
let navDiv = document.createElement('div');
navDiv.classList = `navbar bg-base-100 mt-12`;
navDiv.innerHTML = `  
    <div class="navbar-start">
            <a href="index.html" class="flex gap-1 ">
                <img src="./logo.svg" alt="">
                <p class="text-xl md:text-4xl lg:text-4xl tex font-bold"><span class="text-[#FF1F3D]">PH</span> Tube</p>
            </a>
        </div>

        
        <div class="lg:navbar-center sm:navbar-end">
            <button  id="sort-btn" class="btn text-base rounded-lg normal-case">Sort by view</button>
        </div>
        <div class="navbar-end">
            <button onclick="window.location.href='blog-qa.html'" class="btn rounded-lg normal-case hover:bg-[#e4223c] bg-[#FF1F3D] text-white"></a>Blog</button>
        </div>
    `;
navContainer.appendChild(navDiv);  

const loadAllCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    displayCategory(data);
    
};

// Show all Category

const displayCategory = (data) => {

    // console.log(data);
    const categoryContainer = document.getElementById('category-container');

    data?.data.forEach(element => {
        // console.log(element.category);

        let btn = document.createElement('button');
        btn.innerHTML = ` 
       
       <input onclick = "loadCategoryDetails(${element.category_id})" type="radio" aria-label="${element.category}" class="btn text-lg lg:text-xl md:text-xl normal-case px-8 rounded-lg" />
       `;

        categoryContainer.appendChild(btn);

    });
}


// Fetching Category details
const loadCategoryDetails = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const defaultData = data.data;
    // console.log(defaultData);
        document.getElementById('sort-btn').addEventListener('click', function(){
        const sortedData = defaultData;
        const sorted = sortedData.sort((a,b)=>parseFloat(b.others.views) - parseFloat(a.others.views));
            displayDetailsOfCategory(sorted);
        })
        
    
         displayDetailsOfCategory(defaultData);
 
};


const displayDetailsOfCategory = (details) => {
    // console.log(details.data);

    // const unSortedData = details;

    const noDataContainer = document.getElementById('no-data-container ');
    noDataContainer.innerText = " ";
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerText = " ";

    
    details.length !== 0 ? details.forEach(element => {
        // console.log(element);
       

        const div = document.createElement('div');

        div.classList = `card  bg-base-100`;

        div.innerHTML = ` 
        
        <figure class="rounded-lg relative "><img class =" h-[200px] w-full" src="${element.thumbnail}" alt="" /> 

        <div class = "absolute bottom-0 right-0 mr-3 mb-3  ${element.others.posted_date ? `bg-[#1c1c1c]` : " "} w-auto whitespace-nowrap  px-2 py-1  text-center  rounded text-base font-normal text-white ">
         ${element.others.posted_date ? countTime(element.others.posted_date) : " "} 
       </div>
        </figure>

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
    <h1 class="text-3xl text-center mb-16 font-bold">Oops!! Sorry, There is no <br> content here</h1>` ;
    
    isSort = false;
};





const countTime = (time) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    return h + "hrs " + m + " min " + " ago";
}


loadAllCategory();
loadCategoryDetails('1000');



