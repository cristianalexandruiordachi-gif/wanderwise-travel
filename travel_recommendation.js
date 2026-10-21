const destinations = {
  beaches: [
    {name:'Bora Bora, French Polynesia',imageUrl:'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?auto=format&fit=crop&w=900&q=85',description:'Turquoise lagoons, palm-fringed shores, and the volcanic silhouette of Mount Otemanu make this island a dreamy coastal escape.',timeZone:'Pacific/Tahiti'},
    {name:'Copacabana, Brazil',imageUrl:'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=900&q=85',description:'Discover Rio de Janeiro’s iconic shoreline, a lively oceanfront promenade, and the rhythm of a city beside the sea.',timeZone:'America/Sao_Paulo'}
  ],
  temples: [
    {name:'Angkor Wat, Cambodia',imageUrl:'https://upload.wikimedia.org/wikipedia/commons/0/09/Angkor-112215.jpg',description:'Explore the monumental Khmer temple complex near Siem Reap, with carved galleries and unforgettable lotus-shaped towers.',timeZone:'Asia/Phnom_Penh'},
    {name:'Kinkaku-ji, Japan',imageUrl:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85',description:'Experience Kyoto’s temple culture, tranquil gardens, and the celebrated Golden Pavilion reflected in its surrounding pond.',timeZone:'Asia/Tokyo'}
  ],
  countries: [
    {name:'Sydney, Australia',imageUrl:'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=85',description:'A sparkling harbor, the Sydney Opera House, and a relaxed outdoor spirit make Australia an inspiring place to explore.',timeZone:'Australia/Sydney'},
    {name:'Kyoto, Japan',imageUrl:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=85',description:'Discover Japan through Kyoto’s historic lanes, seasonal gardens, and centuries of craftsmanship and hospitality.',timeZone:'Asia/Tokyo'}
  ]
};
const input=document.getElementById('search');
const results=document.getElementById('results');
const status=document.getElementById('result-status');
const heading=document.getElementById('results-title');
function categoryFor(query){
  const q=query.trim().toLowerCase();
  if (/^(beach|beaches)$/.test(q)) return 'beaches';
  if (/^(temple|temples)$/.test(q)) return 'temples';
  if (/^(country|countries)$/.test(q)) return 'countries';
  return null;
}
function render(items,category){
  results.replaceChildren();
  for(const item of items){
    const card=document.createElement('article');card.className='card';
    const img=document.createElement('img');img.src=item.imageUrl;img.alt=`Travel inspiration for ${item.name}`;
    const body=document.createElement('div');body.className='card-body';
    const tag=document.createElement('span');tag.className='tag';tag.textContent=category==='beaches'?'COASTAL ESCAPE':category==='temples'?'CULTURAL DISCOVERY':'COUNTRY INSPIRATION';
    const title=document.createElement('h3');title.textContent=item.name;
    const description=document.createElement('p');description.textContent=item.description;
    const time=document.createElement('p');time.className='time';time.textContent=`Local time · ${new Intl.DateTimeFormat('en-US',{timeZone:item.timeZone,hour:'2-digit',minute:'2-digit'}).format(new Date())}`;
    body.append(tag,title,description,time);card.append(img,body);results.append(card);
  }
}
function search(){
  const category=categoryFor(input.value);
  if(!category){results.replaceChildren();heading.textContent='Let’s find your next adventure';status.textContent=input.value.trim()?'No matches. Try beach, temple, or country.':'Enter beach, temple, or country to begin.';return;}
  heading.textContent={beaches:'A little closer to paradise.',temples:'Places that stay with you.',countries:'A world waiting to be explored.'}[category];
  status.textContent=`${destinations[category].length} recommendations for “${input.value.trim()}”`;
  render(destinations[category],category);
}
document.getElementById('search-form').addEventListener('submit',event=>{event.preventDefault();search();});
document.getElementById('clear').addEventListener('click',()=>{input.value='';results.replaceChildren();heading.textContent='Where will curiosity take you?';status.textContent='Search for beaches, temples, or countries to find your escape.';input.focus();});
document.querySelectorAll('[data-query]').forEach(button=>button.addEventListener('click',()=>{input.value=button.dataset.query;search();}));
