var price=document.getElementById('price');
var taxes=document.querySelector('#taxes');
var ads=document.querySelector('#ads');
var discount=document.querySelector('#discount');
var total=document.querySelector('#total');
var count=document.querySelector('#count');
var category=document.querySelector('#category');
var submit=document.querySelector('#submit');

// console.log(price,taxes,ads,discount,total,count,category,submit);
let mood='Create';
let temp;

 
function getTotal(){
   
    if(price.value ==''||taxes.value==''||ads.value==''||discount.value=='')
        {
            total.innerHTML='';
            total.style.background='#a00d02';

        }
        else{
            
            var result=(((parseInt(price.value))) + ((parseInt(taxes.value)) + ((parseInt(ads.value)))));
             var afterDis= result - (parseInt(discount.value));
            //  console.log(afterDis);

            total.innerHTML=afterDis;
             total.value=afterDis;

            total.style.background='aquamarine';

        }
    // console.log("done");

}
////////////////////////////////////////////
//Create new array
//Create object //[object,object,...etc]
//you must store the data in local storage 3shan t save it
//local storage doesn't take any data rather than string you must 
//convert the data to be string using JSON.stringfy(array)
let dataobjects;
if(localStorage.product !=null)
    {
      dataobjects =JSON.parse(localStorage.product)
      showData()
    }
    else{
        dataobjects=[];

    }

function deleteRow(i){
    dataobjects.splice(0,1);
    localStorage.product=JSON.stringify(dataobjects);
    showData();
}


submit.onclick=function(){
    let newProduct={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value
    }
// count functtion
if(mood ==='Create'){

    if(newProduct.count > 1)
        {
            for(let i=0;i<newProduct.count;i++)
                {
                    dataobjects.push(newProduct);

                }
        }
        else{
            dataobjects.push(newProduct);

        }
}
   
else{
mood='Update';
dataobjects[temp]=newProduct;
submit.innerHTML='Update';
count.style.display='block';


}
    localStorage.setItem('product',JSON.stringify(dataobjects))
    clearData()
    showData()
    console.log(dataobjects); 
}


function clearData()
{
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
category.value='';
total.innerHTML='';
count.value='';

}


function showData(){
    let table='';
    for(var i=0;i < dataobjects.length;i++){
table +=`
        <tr>
                        <td>
                            <th>${i}</th>
                            <th>${dataobjects[i].title}</th>
                            <th>${dataobjects[i].price}</th>
                            <th>${dataobjects[i].discount}</th>
                            <th>${dataobjects[i].ads}</th>
                            <th>${dataobjects[i].taxes}</th>
                            <th>${dataobjects[i].total}</th>
                            <th>${dataobjects[i].category}</th>
                           
    <th><button id="updateBnt" onclick="update(${i})">Update</button></th>
    <th><button id="deleteBtn" onclick="deleteRow(${i})">Delete</button></th>
                        </td>
                     
                    </tr>

`
    }
     document.getElementById('dataBody').innerHTML=table;
     if(dataobjects.length > 0){
        let btnDelete=document.getElementById("DeleteAll");

        btnDelete.innerHTML=`
    <button id="deleteAll" onclick="deleteAll()">Delete All(${dataobjects.length})</button>
        `;
     }
     else{
        btnDelete.innerHTML='';
     
    }
}
function deleteAll(){
    localStorage.clear();
    dataobjects.splice(0);
    showData();
}

//Function Update
function update(i)
{
// console.log(i);
price.value=dataobjects[i].price;
title.value=dataobjects[i].title;
taxes.value=dataobjects[i].taxes;
ads.value=dataobjects[i].ads;
discount.value=dataobjects[i].discount;
category.value=dataobjects[i].category;
getTotal()
submit.innerHTML="Update";
temp=i;
scroll({top:0,
    behavior:'smooth'
})
}

let searchMood='title';

let search=document.getElementById('searchInput');

//function Search
function Search(id)
{
    if(id==='searchByTitle')
        {
            searchMood='title';
            search.placeholder='searchByTitle';
        }else{
            searchMood='Category';

            search.placeholder='SearchByCategory';

        }
        search.focus();
}

function SearchData(value)
{
    let table='';
    if(searchMood=='title')
        {
            for(let i=0;i<dataobjects.length;i++){
                if(dataobjects[i].title.includes(value)){
                table +=`
        <tr>
                        <td>
                            <th>${i}</th>
                            <th>${dataobjects[i].title}</th>
                            <th>${dataobjects[i].price}</th>
                            <th>${dataobjects[i].discount}</th>
                            <th>${dataobjects[i].ads}</th>
                            <th>${dataobjects[i].taxes}</th>
                            <th>${dataobjects[i].total}</th>
                            <th>${dataobjects[i].category}</th>
                           
    <th><button id="updateBnt" onclick="update(${i})">Update</button></th>
    <th><button id="deleteBtn" onclick="deleteRow(${i})">Delete</button></th>
                        </td>
                     
                    </tr>

`;
    }
            
        }}
        else{
            for(let i=0;i<dataobjects.length;i++){
                if(dataobjects[i].category.includes(value)){
                table +=`
        <tr>
                        <td>
                            <th>${i}</th>
                            <th>${dataobjects[i].title}</th>
                            <th>${dataobjects[i].price}</th>
                            <th>${dataobjects[i].discount}</th>
                            <th>${dataobjects[i].ads}</th>
                            <th>${dataobjects[i].taxes}</th>
                            <th>${dataobjects[i].total}</th>
                            <th>${dataobjects[i].category}</th>
                           
    <th><button id="updateBnt" onclick="update(${i})">Update</button></th>
    <th><button id="deleteBtn" onclick="deleteRow(${i})">Delete</button></th>
                        </td>
                     
                    </tr>

`;
    }
        }}
     document.getElementById('dataBody').innerHTML=table;

}