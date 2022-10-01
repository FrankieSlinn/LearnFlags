let flags = [
    "Algeria",
    "Angola",
    "Burundi",
    "Benin",
    "Burkina Faso",
    "Botswana",
    "Cameroon",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "Democratic Republic of Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea Bissau",
    "Ivory Coast",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mauritania",
    "Mauritius",
    "Mali",
    "Mayotte",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Reunion",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "eSwatini",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zanzibar",
    "Zambia",
    "Zimbabwe",
    "Afghanistan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "East Timor",
    "Hong Kong",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Jordan",
    "Japan",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Lebanon",
    "Macau",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "North Korea",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "Saudi Arabia",
    "Korea",
    "Sri Lanka",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Turkmenistan",
    "United Arab Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
    "Albania",
    "Andorra",
    "Armenia",
    "Austria",
    "Azerbaijan",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czechia",
    "Denmark",
    "England",
    "Estonia",
    "Faroe Islands",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Kazakhstan",
    "Kosovo",
    "Liechtenstein",
    "Lithuania",
    "Latvia",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "Norway",
    "North Macedonia",
    "Northern Ireland",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Scotland",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Ukraine",
    "Wales",
    "American Samoa",
    "Australia",
    "Cook Islands",
    "Fiji",
    "Kiribati",
    "Micronesia",
    "New Caledonia",
    "New Zealand",
    "Northern Mariana Islands",
    "Papua New Guinea",
    "Samoa",
    "Solomon Islands",
    "Tahiti",
    "Tuvalu",
    "Vanuatu",
    "Argentina",
    "Bolivia",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Paraguay",
    "Uruguay",
    "Venezuela",
    "Anguilla",
    "Aruba",
    "Antigua and Barbuda",
    "Bahamas",
    "Barbados",
    "Belize",
    "Bermuda",
    "Bonaire",
    "British Virgin Islands",
    "Saint Barthelemy",
    "Canada",
    "Cayman Islands",
    "Costa Rica",
    "Cuba",
    "Curacao",
    "Dominica",
    "Dominican Republic",
    "El Salvador",
    "French Guiana",
    "Grenada",
    "Guadeloupe",
    "Guatemala",
    "Guyana",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Martinique",
    "Mexico",
    "Montserrat",
    "Nicaragua",
    "Panama",
    "Puerto Rico",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Suriname",
    "Trinidad and Tobago",
    "Turks and Caicos",
    "United Kingdom",
    "United States",
    "Greenland",
    "Peru",
    "Singapore",
    "Tonga",
    "Wallis and Futuna",
  ];
  fullDate = new Date();
  console.log(fullDate);
 let year = String(fullDate.getFullYear());
 let month = String(fullDate.getMonth()+1);
let day = String(fullDate.getDate());
console.log("YMD", year, month, day);
let dateNumber = day+month+year;
console.log(dateNumber);
  
  function MurmurHash3(string) {
    let i = 0;
    for (i, hash = 1779033703 ^ flags.length; i < flags.length; i++) {
        let bitwise_xor_from_character = hash ^ string[i];
        hash = Math.imul(bitwise_xor_from_character, 3432918353);
        hash = hash << 13 | hash >>> 19;
    } return () => {
       // Return the hash that you can use as a seed
        hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
        hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
        return (hash ^= hash >>> 16) >>> 0;
    }
  }
  
  MurmurHash3(dateNumber);
  
  function SimpleFastCounter32(seed_1, seed_2, seed_3, seed_4) {
    return () => {
      seed_1 >>>= 0; seed_2 >>>= 0; seed_3 >>>= 0; seed_4 >>>= 0;
      let cast32 = (seed_1 + seed_2) | 0;
      seed_1 = seed_2 ^ seed_2 >>> 9;
      seed_2 = seed_3 + (seed_3 << 3) | 0;
      seed_3 = (seed_3 << 21 | seed_3 >>> 11);
      seed_4 = seed_4 + 1 | 0;
      cast32 = cast32 + seed_4 | 0;
      seed_3 = seed_3 + cast32 | 0;
      return (cast32 >>> 0) / 4294967296;}}
  
      let generate_seed = MurmurHash3("String for the Seed Key");
      let random_number = SimpleFastCounter32(generate_seed(), generate_seed());
      console.log("run random seed before local storage", SimpleFastCounter32(generate_seed(), generate_seed()));
      console.log("print random number not full function", random_number());
      //let random = JSON.stringify(SimpleFastCounter32(generate_seed(), generate_seed()))
      //console.log("random before localstorage", random);
    let flagsToday = [];
      for (i=0; i<5; i++){
    localStorage.setItem("flag1", Math.abs(Math.floor(random_number())));
  flagsToday.push(Math.abs(Math.floor(JSON.parse(localStorage.getItem("random_number")*225))));
  
  localStorage.setItem("random_number", random_number());
  console.log(JSON.parse(localStorage.getItem("random_number")*225));
  localStorage.setItem("random_number", random_number());
  console.log(JSON.parse(localStorage.getItem("random_number")*225));
  localStorage.setItem("random_number", random_number());
  console.log(JSON.parse(localStorage.getItem("random_number")*225));
  localStorage.setItem("random_number", random_number());
  console.log(JSON.parse(localStorage.getItem("random_number")*225));}
  console.log("flagsToday", flagsToday);




  
  