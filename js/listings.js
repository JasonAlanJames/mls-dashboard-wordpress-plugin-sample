function loadDoc(cb) {                      
    var xhttp = new XMLHttpRequest();                      
    var listings;                   

    xhttp.onreadystatechange = function() {                                
        if (this.readyState == 4 && this.status == 200) {                                          
            listings = JSON.parse(this.responseText).bundle;                                    
            cb(listings);                               
        }                    
    };    
    
    xhttp.open("GET", "https://api.bridgedataoutput.com/api/v2/idx_crmls/listings?access_token=BRIDGE_DATA_API_TOKEN_PLACEHOLDER&limit=32&ListAgentMlsId=AGENT_MLS_ID_PLACEHOLDER&MlsStatus=Active", true);                      
    xhttp.send();            
}

(function() {                    
    loadDoc(function(listings) {                            
        var listingView = document.getElementById("homelistings"); 
        

        // Price Formatter
        var numUSD = new Intl.NumberFormat("en-US", {
            style:"currency",
            currency: "USD"
        })                           
        for (var i = 0; i < listings.length; i++) {   
            var homedetails;
            var status;

            if ( listings[i].PropertyType === "Residential"){
                homedetails = `
                        <p class="small">
                        Beds: ${listings[i].BedroomsTotal}
                        , Baths: ${listings[i].BathroomsFull}
                        , Sq Ft: ${listings[i].LotSizeSquareFeet}
                        </p>
                        ` 
            } else {
                // Manufactured Homes
                homedetails = `
                        <p class="small">
                        Beds: ${listings[i].BedroomsTotal}
                        , Baths: ${listings[i].BathroomsFull}
                        </p>
                        `
            }

            // MLS Status
            if ( listings[i].StandardStatus === "Active") {
               status = `<span class="Active">${listings[i].StandardStatus}</span>`
            } else {
               status = `<span class="NotActive">${listings[i].StandardStatus}</span>`
            }

            

      var container = `                                     
            <li class="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-xs-12 home-div" id=${listings[i].ListingId} onclick="listingDetails()">
            <a href="/listing-details/?${listings[i].ListingId}" target="_self" class="ListingThumbs">
            <img class="thumbnail-image" src='${ listings[i].Media && listings[i].Media.length > 0 ? listings[i].Media[0].MediaURL :  "/wp-content/plugins/mls-dashboard-sample/includes/defaultimage/defaultImage.jpg"} ' alt="${listings[i].UnparsedAddress}" />
            <p class="listPrice">${numUSD.format(listings[i].ListPrice)}</p>                                              
            <p class="address">${listings[i].UnparsedAddress}</p>                                          
            <p class="homedetails">${homedetails}</p>
            <p class="small">Status: ${status}</p>
            </a> 
            </li>               
            `

            listingView.insertAdjacentHTML("beforeend", container);                                    
        }                            
    })                    
})();

// Listing Details View
function listingDetails(cb) {                      
    var xhttp = new XMLHttpRequest();                      
    var listingsdetails;   
    

    
    xhttp.onreadystatechange = function() {                                
        if (this.readyState == 4 && this.status == 200) {                                          
            listingsdetails = JSON.parse(this.responseText).bundle;                                    
            cb(listingsdetails);                               
        }                    
    };    

        xhttp.open("GET", `https://api.bridgedataoutput.com/api/v2/idx_crmls/listings?access_token=BRIDGE_DATA_API_TOKEN_PLACEHOLDER&limit=32&ListAgentMlsId=AGENT_MLS_ID_PLACEHOLDER&MlsStatus=Active`, true);                      
        xhttp.send();       
}


(function() {                    
    listingDetails(function(listingsdetails) {                            
        var listingDetailsView = document.getElementById("homelistings-details"); 
        // var thumbnailPicsView = document.getElementById("thumbnails-container");

        // Price Formatter
        var numUSD = new Intl.NumberFormat("en-US", {
            style:"currency",
            currency: "USD"
        })                           
        for (var i = 0; i < listingsdetails.length; i++) {   
            var homedetails;
            var status;
            var tour;
            var fireplace, acre, lotsizesqft, cooling, heating, halfBaths, stories, attachedgarage, propertysubtype, pool, spa, view, yearbuilt;
            var thumbnailscontainer;

            if ( listingsdetails[i].PropertyType === "Residential"){
                homedetails = `
                        <p class="small">
                        Beds: ${listingsdetails[i].BedroomsTotal}
                        , Baths: ${listingsdetails[i].BathroomsFull}
                        , Sq Ft: ${listingsdetails[i].LotSizeSquareFeet}
                        </p>
                        ` 
            } else {
                // Manufactured Homes
                homedetails = `
                        <p class="small">
                        Beds: ${listingsdetails[i].BedroomsTotal}
                        , Baths: ${listingsdetails[i].BathroomsFull}
                        </p>
                        `
            }

            // MLS Status
            if ( listingsdetails[i].StandardStatus === "Active") {
               status = `<span class="Active">${listingsdetails[i].StandardStatus}</span>`
            } else {
               status = `<span>${listingsdetails[i].StandardStatus}</span>`
            }

            // Virtual Tour
            if ( listingsdetails[i].VirtualTourURLBranded === null) {
                tour = `<span>Contact agent for tour</span>`;
             } else {
                tour = `<span>${listingsdetails[i].VirtualTourURLBranded}</span>`;
             }

             // Fireplace formatter
             if(listingsdetails[i].FireplaceYN === null) {
                fireplace = `<span>No</span>`;
             } else {
                fireplace = `<span>Yes</span>`;
             }

             // Acre Handler
             if(listingsdetails[i].LotSizeAcres === null) {
                acre = `<span>No</span>`;
             } else {
                acre = `<span>${listingsdetails[i].LotSizeAcres}</span>`;
             }

             // Lot Size Sq. Ft. Handler
             if(listingsdetails[i].LotSizeSquareFeet === null) {
                lotsizesqft = `<span>N/A</span>`;
             } else {
                lotsizesqft = `<span>${listingsdetails[i].LotSizeSquareFeet}</span>`;
             }

            // Cooling Formatter
            var originalCooling = `${listingsdetails[i].Cooling}`;
            var Cooling = originalCooling.replace(/,/gi, ", ");

             if(listingsdetails[i].Cooling === null) {
                cooling = `<span>No</span>`;
             } else {
                cooling = `<span>${Cooling}</span>`;
             }

             // Heating Handler
             var originalHeating = `${listingsdetails[i].Heating}`;
             var Heating = originalHeating.replace(/,/gi, ", ");

             if(listingsdetails[i].Heating === null) {
                heating = `<span>No</span>`;
             } else {
                heating = `<span>${Heating}</span>`;
             }
             // AttachedGarageYN Handler
             if(listingsdetails[i].AttachedGarageYN === null) {
                attachedgarage = `<span>No</span>`;
             } else {
                attachedgarage = `<span>Yes</span>`;
             }
             // Property Sub Type Handler
             if(listingsdetails[i].PropertySubType === null) {
                propertysubtype = `<span>N/A</span>`;
             } else {
                propertysubtype = `<span>${listingsdetails[i].PropertySubType}</span>`;
             }
            // Pool and Spa Handler
             if(listingsdetails[i].PoolPrivateYN || listingsdetails[i].PoolFeatures > 0 || listingsdetails[i].PoolFeatures === null ) {
                pool = `<span>No</span>`;
             } else {
                pool = `<span>Yes<br/><span class="details-features_li_header">Special Pool Features:</span> ${PoolFeatures}</span>`;
             }
            if(listingsdetails[i].SpaYN || listingsdetails[i].SpaFeatures > 0 || listingsdetails[i].SpaFeatures === null) {
                spa = `<span>No</span>`;
            } else {
                spa = `<span>Yes<br/><span class="details-features_li_header">Special Spa Features:</span> ${SpaFeatures}</span>`;
            }
            // View Handler
            if(listingsdetails[i].ViewYN || listingsdetails[i].View > 0) {
                view = `<span>No</span>`;
            } else {
                view = `<span>Yes<br/><span class="details-features_li_header">View Featuring:</span> ${listingsdetails[i].View}</span>`;
            }
            // Year Built Handler
            if(listingsdetails[i].YearBuilt === null) {
                yearbuilt = `<span>N/A</span>`;
             } else {
                yearbuilt = `<span>${listingsdetails[i].YearBuilt}</span>`;
             }
            // Half Baths Handler
            if(listingsdetails[i].BathroomsHalf === null) {
                halfBaths = ``;
             } else {
                halfBaths = `<span class="details-features_li_header">Half Baths:</span> ${listingsdetails[i].BathroomsHalf}`;
             }
             // Stories Handler
            if(listingsdetails[i].StoriesTotal === null) {
                stories = ``;
             } else {
                stories = `<span class="details-features_li_header">Total Stories:</span> ${listingsdetails[i].StoriesTotal}`;
             }
             // RoomType Formatter
            var originalRoomTypes = `${listingsdetails[i].RoomType}`;
            var RoomTypes = originalRoomTypes.replace(/,/gi, ", ");
            // MasterBathroom Formatter
            var originalMasterBathroom = `${listingsdetails[i].RoomMasterBathroomFeatures}`;
            var MasterBathroom = originalMasterBathroom.replace(/,/gi, ", ");
            // LaundryFeatures Formatter
            var originalLaundryFeatures = `${listingsdetails[i].LaundryFeatures}`;
            var LaundryFeatures = originalLaundryFeatures.replace(/,/gi, ", ");
            // LotFeatures Formatter
            var originalLotFeatures = `${listingsdetails[i].LotFeatures}`;
            var LotFeatures = originalLotFeatures.replace(/,/gi, ", ");
            // SpecialPoolFeatures Formatter
            var originalPoolFeatures = `${listingsdetails[i].PoolFeatures}`;
            var PoolFeatures = originalPoolFeatures.replace(/,/gi, ", ");
            // SpecialSpaFeatures Formatter
            var originalSpaFeatures = `${listingsdetails[i].SpaFeatures}`;
            var SpaFeatures = originalSpaFeatures.replace(/,/gi, ", ");

            //Media Thumbnail Formatter
            var thumbnailscontainer = "";
            if(listingsdetails[i].Media && listingsdetails[i].Media.length > 0){
                for (var j = 0; j < listingsdetails[i].Media.length; j++) {  
                    thumbnailscontainer +=`
                    <li class="thumbnail col-sm col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" >
                    <a data-fancybox="gallery" data-caption='${listingsdetails[i].UnparsedAddress}' href='${ listingsdetails[i].Media && listingsdetails[i].Media.length > 0 ? listingsdetails[i].Media[j].MediaURL :  "/wp-content/plugins/mls-dashboard-sample/includes/defaultimage/defaultImage.jpg"}' data-alt="${listingsdetails[i].UnparsedAddress}" data-title="${listingsdetails[i].UnparsedAddress}" data-fancybox="gallery"><img class="details-thumbnail-image" src='${ listingsdetails[i].Media && listingsdetails[i].Media.length > 0 ? listingsdetails[i].Media[j].MediaURL :  "/wp-content/plugins/mls-dashboard-sample/includes/defaultimage/defaultImage.jpg"}'/></a>
                    </li>  
                    `                                    
                };
            } else {
                thumbnailscontainer = "";
            }



 
            var x = location.pathname;
            var y = location.search;

            var detailscontainer;

             if(y == "?" + listingsdetails[i].ListingId) {
                            detailscontainer = `                                          
            <li class="col-md-10 col-sm-10 col-xs-10 home-details-div show" id=${listingsdetails[i].ListingId} name=${listingsdetails[i].ListingId}>
            <img class="details-main-image col-md-12 col-sm-12 col-xs-12" src='${ listingsdetails[i].Media && listingsdetails[i].Media.length > 0 ? listingsdetails[i].Media[0].MediaURL :  "/wp-content/plugins/mls-dashboard-sample/includes/defaultimage/defaultImage.jpg"} ' alt="${listingsdetails[i].UnparsedAddress}" />
            <p class="details-listPrice">${numUSD.format(listingsdetails[i].ListPrice)}</p>
            <div class="container">
                <div class="row"> 
                    <ul id="${listingsdetails[i].ListingId}thumbnail-container" class="thumbnail-container">${thumbnailscontainer}</ul>
                </div>
            </div>
            <p><hr></p>
            <p class="details-address">${listingsdetails[i].UnparsedAddress}</p>
            <p><hr></p>
            <strong>Listing #${listingsdetails[i].ListingId} Details</strong><br/>                                               
            <span class="details-homedetails col-md-6 col-sm-12 col-xs-12">${homedetails}</span>
            <span class="details-status small col-md-6 col-sm-12 col-xs-12">Property Type: ${listingsdetails[i].PropertyType}</span>
            <span class="details-status small col-md-6 col-sm-12 col-xs-12">Status: ${status}</span>
            <p class="details-virtualTourUrl">Virtual Tour: <a href='${listingsdetails[i].VirtualTourURLBranded}' target="_blank">${tour}</a></p>
            <p><hr></p>
            <p class="details-description-heading">Description:</p>  
            <p class="details-description">${listingsdetails[i].PublicRemarks}</p>
            <hr>
            <p class="details-propertyfeatures-heading">Property Features:</p>
            <div class="features-container">
                <div class="row">
                    <div class="col-sm">
                    
                        <ul id="features_col1">
                            <li class="propertyFeature_text"><span class="details-features_li_header">Lot Features:</span> ${LotFeatures}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Lot Sq. Ft:</span> ${lotsizesqft}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Living Area Sq. Ft:</span> ${listingsdetails[i].LivingArea}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Acres:</span> ${acre}</li>  
                            <li class="propertyFeature_text"><span class="details-features_li_header">County:</span> ${listingsdetails[i].CountyOrParish}</li> 
                            <li class="propertyFeature_text"><span class="details-features_li_header">Fireplace:</span> ${fireplace}</li> 
                            <li class="propertyFeature_text"><span class="details-features_li_header">Cooling:</span> ${cooling}</li> 
                            <li class="propertyFeature_text"><span class="details-features_li_header">Heating:</span> ${heating}</li> 
                            <li class="propertyFeature_text"><span class="details-features_li_header">Attached Garage:</span> ${attachedgarage}</li> 
                            <li class="propertyFeature_text"><span class="details-features_li_header">Association Fee:</span> ${numUSD.format(listingsdetails[i].AssociationFee)}</li> 
                            <li class="propertyFeature_text"><span class="details-features_li_header">Property Sub-Type:</span> ${propertysubtype}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Pool:</span> ${pool}</li> 
                            <li class="propertyFeature_text"><span class="details-features_li_header">Spa:</span> ${spa}</li> 
                            <li class="propertyFeature_text">${stories}</li> 
                            <li class="propertyFeature_text"><span class="details-features_li_header">View:</span> ${view}</li> 
                            <li class="propertyFeature_text"><span class="details-features_li_header">High School District:</span> ${listingsdetails[i].HighSchoolDistrict}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Sale Type:</span> ${listingsdetails[i].SpecialListingConditions}</li> 
                        </ul>
                    </div>
                    <div class="col-sm">
                    
                        <ul id="features_col2">
                            <li class="propertyFeature_text"><span class="details-features_li_header">Room Types:</span> ${RoomTypes}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Master Bathroom Features:</span> ${MasterBathroom}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Laundry Features:</span> ${LaundryFeatures}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Area:</span> ${listingsdetails[i].MLSAreaMajor}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Common Walls:</span> ${listingsdetails[i].CommonWalls}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Full Baths:</span> ${listingsdetails[i].BathroomsFull}</li>
                            <li class="propertyFeature_text">${halfBaths}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Parking Spaces:</span> ${listingsdetails[i].ParkingTotal}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Year Built:</span> ${yearbuilt}</li>
                            <li class="propertyFeature_text"><span class="details-features_li_header">Days on Market:</span> ${listingsdetails[i].DaysOnMarket} day(s)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <p id="propertymap">
            <iframe
            width="80%"
            min-width="200px"
            height="350px"
            min-height="200px"
            frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/place?key=GOOGLE_MAPS_API_KEY_PLACEHOLDER&q=${listingsdetails[i].UnparsedAddress}" allowfullscreen>
          </iframe>
            </p>
            <p>To learn more about MLS# ${listingsdetails[i].ListingId}, or schedule your personal tour:<br/><button class="btn btn-danger"><a href="mailto:inquiries@example.com?subject=Client Inquiry - MLS Listing ID ${listingsdetails[i].ListingId}&body=I'd like to know more about this property: MLS# ${listingsdetails[i].ListingId}. Thank you.">Email Us</a></button><br/>Or Call <tel>(555) 555-0100</tel></p>
            <p class="pull-left back-btn"><button onclick="goBack()" class="btn btn-primary">Go Back</button></p>
                

            </li>             
            `; 
             } else {
                detailscontainer = `                                          
                <li class="col-md-12 home-details-div hidden" id=${listingsdetails[i].ListingId} name=${listingsdetails[i].ListingId}>
                <img class="details-main-image" src='${ listingsdetails[i].Media && listingsdetails[i].Media.length > 0 ? listingsdetails[i].Media[0].MediaURL :  "/wp-content/plugins/mls-dashboard-sample/includes/defaultimage/defaultImage.jpg"} ' alt="${listingsdetails[i].UnparsedAddress}" />
                <p class="details-listPrice">${numUSD.format(listingsdetails[i].ListPrice)}</p>    

                <p class="details-address">${listingsdetails[i].UnparsedAddress}</p>
                <p><hr></p>
                <strong>Listing #${listingsdetails[i].ListingId} Details</strong><br/>                                               
                <span class="details-homedetails col-md-6">${homedetails}</span>
                <span class="details-status small col-md-6">Property Type: ${listingsdetails[i].PropertyType}</span>
                <span class="details-status small col-md-6">Status: ${status}</span>
                <p class="details-virtualTourUrl">Virtual Tour: <a href='${listingsdetails[i].VirtualTourURLBranded}' target="_blank">${tour}</a></p>
                <p><hr></p>
                <p class="details-description"><strong>Description:</strong></p>  
                <p class="details-description">${listingsdetails[i].PublicRemarks}</p>
                </li>             
                `;
             }


            
            listingDetailsView.insertAdjacentHTML("beforeend", detailscontainer);                                    
        }                            
    })                    
})();


// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


function goBack() {
    window.history.back();
  }

  