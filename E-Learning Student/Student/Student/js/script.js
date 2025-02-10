document.addEventListener('DOMContentLoaded', function () {
    let toggleBtn = document.getElementById('toggle-btn');
    let body = document.body;
    let darkMode = localStorage.getItem('dark-mode');
 
    const enableDarkMode = () => {
       toggleBtn.classList.replace('fa-sun', 'fa-moon');
       body.classList.add('dark');
       localStorage.setItem('dark-mode', 'enabled');

    
    };
 
    const disableDarkMode = () => {
       toggleBtn.classList.replace('fa-moon', 'fa-sun');
       body.classList.remove('dark');
       localStorage.setItem('dark-mode', 'disabled');
    };
 
    if (darkMode === 'enabled') {
       enableDarkMode();
    }
 
    toggleBtn.onclick = (e) => {
       darkMode = localStorage.getItem('dark-mode');
       if (darkMode === 'disabled') {
          enableDarkMode();
       } else {
          disableDarkMode();
       }
    };
 
    let profile = document.querySelector('.header .flex .profile');
    let search = document.querySelector('.header .flex .search-form');
 
    if (profile) {
       document.querySelector('#user-btn').onclick = () => {
          profile.classList.toggle('active');
          search.classList.remove('active');
       };
    }
 
    if (search) {
       document.querySelector('#search-btn').onclick = () => {
          search.classList.toggle('active');
          profile.classList.remove('active');
       };
    }
 
    let sideBar = document.querySelector('.side-bar');
    if (sideBar) {
       document.querySelector('#menu-btn').onclick = () => {
          sideBar.classList.toggle('active');
          body.classList.toggle('active');
       };
 
       document.querySelector('#close-btn').onclick = () => {
          sideBar.classList.remove('active');
          body.classList.remove('active');
       };
    }
 
    window.onscroll = () => {
       if (profile) profile.classList.remove('active');
       if (search) search.classList.remove('active');
 
       if (window.innerWidth < 1200) {
          if (sideBar) sideBar.classList.remove('active');
          body.classList.remove('active');
       }
    };
 });
 
 
//payment
document.addEventListener("DOMContentLoaded",function(){
   const cardNumber = document.getElementById("cardNumber");
   const expiryDate = document.getElementById("expiryDate");
   const cvv = document.getElementById("cvv");
   const amount = document.getElementById("amount");
   const paymentStatus = document.getElementById("paymentStatus");

   const cardRegex=/^\d{16}$/
   const expiryRegex=/^(0[1-9] | 1[0-2])\/\d{4}$/
   const cvvRegex = /^\d{3,4}$/;

   

   function validateInput(InputElement,regex,errorMessage)
   {
       InputElement.addEventListener("blur",function(){
           if(!regex.test(InputElement.value))
           {
               paymentStatus.innerHTML=errorMessage;
               paymentStatus.style.color="red";
           }else{
               paymentStatus.innerHTML="";
           }
       })
   }

   validateInput(cardNumber,cardRegex,"Invalid card number (must be 16 digits).");
   validateInput(expiryDate,expiryRegex,"Invalid expiry date (MM/YY).");
   validateInput(cvv,cvvRegex,"Invalid CVV (3-4 digits).");

   amount.addEventListener('blur',function(){
       
       if (isNaN(amount) || amount <= 0) {
           paymentStatus.innerHTML = "Enter a valid amount.";
           paymentStatus.style.color = "red";
           return;
       }
       })
      

})
document.getElementById("paymentForm").addEventListener("submit", function(event) {
   event.preventDefault();
  
   if (!cardNumber || !expiryDate || !cvv || !amount) {
       paymentStatus.innerHTML = "Please fill all fields!";
       paymentStatus.style.color = "red";
       return;
   }
   const paymentData = {
       cardNumber: cardNumber,
       expiryDate: expiryDate,
       cvv: cvv,
       amount: amount
   };
  


   fetch("https://jsonplaceholder.typicode.com/posts", { // Fake API
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(paymentData)
   })
   .then(response => response.json())
   .then(data => {
       console.log("Success:", data);
       paymentStatus.innerHTML = "Payment Successful!";
       paymentStatus.style.color = "green";
   })
   .catch(error => {
       console.error("Error:", error);
       paymentStatus.innerHTML = "Payment Failed!";
       paymentStatus.style.color = "red";
   });
});























// JavaScript to control the images transition timing (optional)
let currentIndex = 0;
const images = document.querySelectorAll('.home-background .header-image img');
const headerText = document.querySelector('.home-background .header');

function showNextImage() {
   images.forEach((image, index) => {
       image.style.opacity = '0';  // Hide all images
   });
   currentIndex = (currentIndex + 1) % images.length; // Cycle through images
   images[currentIndex].style.opacity = '1';  // Show next image

   // Add opacity to the header text
   headerText.classList.add('visible');
}

// Initially display the first image
showNextImage();

// Change images every 4 seconds (optional)
setInterval(showNextImage, 4000);

//Home circle
let number=document.getElementById("number");
let counter=0;

setInterval(() => {
  if(counter==65){
     clearInterval();
  }else{
     counter +=1;
  number.innerHTML = counter + "%";
  }
  
},30 )
