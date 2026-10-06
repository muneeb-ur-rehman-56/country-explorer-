// Static content (the "live" data comes from the APIs via server.js)
export const PEAKS = [['Gwadar',10],['Lahore',217],['Peshawar',331],['Islamabad',540],['Quetta',1680],['Skardu',2228],['Hunza',2438],['Fairy Meadows',3300],['Deosai',4114],['Khunjerab Pass',4693],['Nanga Parbat',8126],['K2',8611]];

export const POSITIVES = [
 ['Five of the world’s 14 eight-thousanders','K2, Nanga Parbat, Gasherbrum I & II and Broad Peak all rise inside Pakistan, with more than 7,000 glaciers around them.'],
 ['A 5,000-year-old story','Mohenjo-daro and Harappa show the Indus Valley Civilization; Taxila, Lahore Fort and Rohtas Fort are UNESCO World Heritage Sites.'],
 ['Champions at cricket','1992 World Cup, 2009 T20 World Cup and the 2017 Champions Trophy.'],
 ['Minds that changed the world','Abdus Salam won the 1979 Nobel Prize in Physics; Malala Yousafzai won the 2014 Nobel Peace Prize.'],
 ['A young, multilingual nation','Urdu and English are official, alongside Punjabi, Sindhi, Pashto, Balochi and dozens more.'],
 ['Food and hospitality','Biryani, nihari, chapli kebab and some of the world’s finest mangoes — served with famous generosity.']
];

export const PROVINCES = [
 {n:'Punjab',w:'Punjab,_Pakistan',cap:'Lahore',area:'205,344 km²',pop:'~127.7M',tag:'The land of five rivers and Pakistan’s cultural heartland.',hl:['Lahore Fort','Badshahi Mosque','Harappa','Rohtas Fort','Khewra Salt Mine']},
 {n:'Sindh',w:'Sindh',cap:'Karachi',area:'140,914 km²',pop:'~55.7M',tag:'Indus delta, Sufi shrines and the country’s biggest port city.',hl:['Mohenjo-daro','Makli Necropolis','Keenjhar Lake','Clifton Beach']},
 {n:'Khyber Pakhtunkhwa',w:'Khyber_Pakhtunkhwa',cap:'Peshawar',area:'101,741 km²',pop:'~40.9M',tag:'Green valleys, Gandhara heritage and legendary mountain passes.',hl:['Swat Valley','Chitral','Kalash Valleys','Khyber Pass','Takht-i-Bahi']},
 {n:'Balochistan',w:'Balochistan,_Pakistan',cap:'Quetta',area:'347,190 km²',pop:'~14.9M',tag:'The largest province by area, with a vast coastline and wild deserts.',hl:['Hingol National Park','Gwadar','Ziarat Juniper Forest','Hanna Lake']},
 {n:'Gilgit-Baltistan',w:'Gilgit-Baltistan',cap:'Gilgit',area:'72,971 km²',pop:'~1.5M',tag:'Where the Karakoram, Himalaya and Hindu Kush meet.',hl:['K2','Hunza Valley','Skardu','Fairy Meadows','Deosai Plains']},
 {n:'Azad Kashmir',w:'Azad_Kashmir',cap:'Muzaffarabad',area:'13,297 km²',pop:'~4.0M',tag:'Alpine meadows, rivers and lakes in the foothills of the Himalaya.',hl:['Neelum Valley','Ratti Gali Lake','Banjosa Lake']},
 {n:'Islamabad Capital Territory',w:'Islamabad_Capital_Territory',cap:'Islamabad',area:'906 km²',pop:'~2.4M',tag:'A planned, tree-lined capital at the foot of the Margalla Hills.',hl:['Faisal Mosque','Margalla Hills','Pakistan Monument','Lok Virsa']}
];

export const CITIES = [
 {n:'Karachi',w:'Karachi',sub:'Sindh',lat:24.8607,lon:67.0011,b:'Pakistan’s largest city, financial hub and Arabian Sea gateway.'},
 {n:'Lahore',w:'Lahore',sub:'Punjab',lat:31.5204,lon:74.3587,b:'Cultural capital: Mughal monuments, gardens and food streets.'},
 {n:'Islamabad',w:'Islamabad',sub:'Capital Territory',lat:33.6844,lon:73.0479,b:'Calm, green capital set against the Margalla Hills.'},
 {n:'Peshawar',w:'Peshawar',sub:'Khyber Pakhtunkhwa',lat:34.0151,lon:71.5249,b:'One of South Asia’s oldest continuously inhabited cities.'},
 {n:'Quetta',w:'Quetta',sub:'Balochistan',lat:30.1798,lon:66.975,b:'The fruit garden of Pakistan, ringed by high mountains.'},
 {n:'Multan',w:'Multan',sub:'Punjab',lat:30.1575,lon:71.5249,b:'City of Saints, known for blue-tiled shrines and mangoes.'},
 {n:'Skardu',w:'Skardu',sub:'Gilgit-Baltistan',lat:35.2971,lon:75.6333,b:'Gateway to K2, the Baltoro Glacier and Shigar Valley.'},
 {n:'Gwadar',w:'Gwadar',sub:'Balochistan',lat:25.1264,lon:62.3225,b:'Deep-sea port with beaches and dramatic coastal cliffs.'}
];

export const CATS = ['All','Mountains','Valleys & Lakes','Heritage','Coast & Desert'];
export const PLACES = [
 ['K2','K2','Gilgit-Baltistan','Mountains',35.8825,76.5133,'The world’s second-highest peak at 8,611 m.','Jun–Aug'],
 ['Fairy Meadows','Fairy_Meadows','Gilgit-Baltistan','Mountains',35.3869,74.58,'Alpine meadow with a front-row view of Nanga Parbat.','May–Sep'],
 ['Hunza Valley','Hunza_Valley','Gilgit-Baltistan','Valleys & Lakes',36.3167,74.65,'Apricot orchards, old forts and peaks all around.','Apr–Oct'],
 ['Attabad Lake','Attabad_Lake','Gilgit-Baltistan','Valleys & Lakes',36.3,74.85,'A turquoise lake on the Karakoram Highway.','May–Sep'],
 ['Deosai National Park','Deosai_National_Park','Gilgit-Baltistan','Valleys & Lakes',35.0167,75.4,'One of the highest plateaus on Earth, full of wildflowers.','Jul–Aug'],
 ['Swat Valley','Swat_Valley','Khyber Pakhtunkhwa','Valleys & Lakes',35.2227,72.4258,'Rivers, forests and Buddhist ruins, often called the Switzerland of the East.','Apr–Oct'],
 ['Neelum Valley','Neelum_Valley','Azad Kashmir','Valleys & Lakes',34.5833,73.9,'A lush river valley with waterfalls and pine forests.','Apr–Oct'],
 ['Badshahi Mosque','Badshahi_Mosque','Punjab','Heritage',31.5882,74.3105,'A 1673 Mughal masterpiece in red sandstone.','Nov–Mar'],
 ['Lahore Fort','Lahore_Fort','Punjab','Heritage',31.5889,74.3153,'UNESCO-listed royal citadel with mirror and marble palaces.','Nov–Mar'],
 ['Rohtas Fort','Rohtas_Fort','Punjab','Heritage',32.9667,73.7667,'A huge 16th-century fortress built by Sher Shah Suri.','Oct–Mar'],
 ['Faisal Mosque','Faisal_Mosque','Islamabad','Heritage',33.7295,73.0372,'A modern, tent-shaped mosque beneath the Margalla Hills.','Year-round'],
 ['Mohenjo-daro','Mohenjo-daro','Sindh','Heritage',27.3292,68.1389,'A 4,500-year-old Indus Valley city.','Nov–Feb'],
 ['Hingol National Park','Hingol_National_Park','Balochistan','Coast & Desert',25.5,65.5,'Mud volcanoes and the “Princess of Hope” rock along the Makran coast.','Nov–Mar'],
 ['Gwadar','Gwadar','Balochistan','Coast & Desert',25.1264,62.3225,'Golden beaches and a rising deep-sea port.','Oct–Mar']
].map(([n,w,sub,cat,lat,lon,b,best])=>({n,w,sub,cat,lat,lon,b,best}));
