const loadPhone = async(searchText,isLoadAll) =>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data= await res.json();
    const phones= data.data;
    // console.log(phones);
    displayPhones(phones,isLoadAll);
    
}

const displayPhones =( phones,isLoadAll) =>{
    const phoneContainer= document.getElementById('phone-container');
    // clear phone container
    phoneContainer.textContent='';
    const loadAllContainer= document.getElementById('load-all-container');
    // display load all button if phones greater than 12
    if(phones.length > 12){
        loadAllContainer.classList.remove('hidden');
    }
    else{
        loadAllContainer.classList.add('hidden');
    }

    
    // show only first 12 phones  if load All button does not enable 
    if(!isLoadAll){
        phones= phones.slice(0,12);
    }
    
    phones.forEach(phone =>{
        // console.log(phone);
        const phoneCard= document.createElement('div');
        phoneCard.classList= `card bg-base-100 p-4 shadow-xl`;
        phoneCard.innerHTML=`
            <figure class="px-10 pt-10">
                <img src="${phone.image}"
                alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title font-bold text-2xl">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <h3 class="font-bold">$9999</h3>
                <div class="card-actions">
                    <button onclick="showDetailsButton('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(phoneCard); 
    })
    toggleSpinner(false);
}

const searchButton = (isLoadAll) =>{
    const searchField= document.getElementById('search-field');
    const searchText= searchField.value;
    // console.log(searchText);
    toggleSpinner(true);
    loadPhone(searchText,isLoadAll);  
}

const toggleSpinner= (isLoading)=>{
    const loadSpinner= document.getElementById('loading-spinner');
    if(isLoading){
        loadSpinner.classList.remove('hidden');
    }
    else{
        loadSpinner.classList.add('hidden');
    }
}

// load All Phone
const loadAllButton= () =>{
    searchButton(true);
    
}

const showDetailsButton = async (id) =>{
    // console.log('show details clicked', id);
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data= await res.json();
    const phone= data.data
    // console.log(data);
    showPhoneDetails(phone);
      
}

// show details modal 
const showPhoneDetails= (phone)=>{
    console.log(phone);
    const modalDescription= document.getElementById('modal-description');
    modalDescription.innerHTML=`
    <div class="text-center mb-5"><img src="${phone.image}" class="mx-auto"></div>
        <h2 class="text-2xl font-bold text-center mb-5">${phone.name}</h2>
    </div>
    <div class="text-left">
        <p><span>Brand</span>: ${phone?.brand}</p>
        <p>Storage: ${phone?.mainFeatures?.storage}</p>
        <p>Released Date: ${phone?.releaseDate}</p>
        <p>Memory Size: ${phone?.mainFeatures?.memory}</p>
        <p>Chip set: ${phone?.mainFeatures?.chipSet}</p>
        <p>Display Size: ${phone?.mainFeatures?.displaySize}</p>
        <p>Bluetooth: ${phone?.others?.Bluetooth}</p>
        <p>GPS: ${phone?.others?.GPS || 'No GPS Available'}</p>
        <p>WLAN: ${phone?.others?.WLAN ? phone?.others?.WLAN : 'No WLAN Available'}</p>
    
    </div>
    `
show_details_modal.showModal();   

}
// loadPhone();
