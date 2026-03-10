const labelConfig = {
        'bug' : {color: "bg-red-100 text-red-600 border-red-200" ,icon:"fa-bug"},
        'help wanted' : {color:"bg-orange-100 text-orange-600 border-orange-100  ", icon:"fa-life-ring"},
        'documentation' : {color:"bg-violet-100 text-violet-600 border-violet-100", icon:"fa-file-lines"},
        'enhancement':{color:"bg-green-100 text-green-600 border-green-100", icon:"fa-wand-magic-sparkles"},
        "good first issue" : {color:"bg-yellow-100 text-yellow-600 border-yellow-100" ,'icon':'fa-seedling'}

    }
let allIssues = [];
let currentFilter = 'all';
const toggleLoader = (show) =>{
    const loader = document.getElementById('loader');
    if(show){
        loader.classList.remove('hidden');

    }
    else{
        loader.classList.add('hidden');
    }

}
const loadCard = () =>{
    
    toggleLoader(true)
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
      .then(res => res.json())
      .then(result => {
        allIssues  = result.data;
        toggleLoader(false)
        displayCard(allIssues);
        
      })
}

const searchIssues = () =>{
    const searchText = document.getElementById('search-input').value;
    // const container = document.getElementById('card-container');
    // container.innerHTML = '';
    toggleLoader(true);

     if(searchText.trim() === ""){
         const filtered = (currentFilter === 'all')?
         allIssues:allIssues.filter(issue => issue.status === currentFilter);
         displayCard(filtered)
         toggleLoader(false)
         return;
     }
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    .then(res => res.json())
    .then(result => {
        const apiData = result.data;
        const sectionWiseData = apiData.filter(issue => {
            return (currentFilter === "all" || issue.status === currentFilter)
        });
        toggleLoader(false);
        displayCard(sectionWiseData);
    })
    
}
const filterIssues = (status) => {
    currentFilter = status;
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('btn-primary');

    });
    const activeBtn = document.getElementById(`btn-${status}`);
    if(activeBtn){
        activeBtn.classList.add('btn-primary')
    }
    
    searchIssues()

}

const showDetails = (issue) => {
    const modal = document.getElementById('my_modal_5');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const modalStatus = document.getElementById('modal-status');
    const modalAuthor = document.getElementById('modal-author');
    const modalDate = document.getElementById('modal-date');
    const modalLabels = document.getElementById('modal-labels');
    const assignee = document.getElementById('modal-assignee');
    const modalPriority = document.getElementById('modal-priority');

    title.innerText = issue.title;
    description.innerText = issue.description;
    modalAuthor.innerText = `Opened by ${issue.author}`;
    modalDate.innerText = new Date(issue.createdAt).toLocaleDateString();
    assignee.innerText = issue.author;

    if(issue.status === 'open'){
        modalStatus.innerText = 'Opened';
        modalStatus.classList.add('px-3', 'py-1', 'rounded-full', 'bg-green-500', 'text-white', 'font-normal', 'text-[12px]')
    }
    else{
        modalStatus.innerText = 'Closed';
        modalStatus.classList.add('px-3', 'py-1', 'rounded-full', 'bg-violet-500', 'text-white', 'font-normal', 'text-[12px]')

    }
    let priorityColor = '';
    if(issue.priority === 'high'){
        priorityColor = 'bg-red-500';
    }
    else if(issue.priority === 'medium'){
        priorityColor = 'bg-orange-500';
    }
    else if(issue.priority === 'low'){
        priorityColor = 'bg-violet-500';
    }
    modalPriority.classList.add('px-4', 'py-1', 'rounded-full', 'text-white', 'font-bold', 'text-[12px]', 'uppercase', '${priorityColor}')
    modalLabels.innerHTML = issue.labels.map(label => {
        const config = labelConfig[label.toLowerCase()] || {color: "bg-gray-100", icon: "fa-tag"};
        return `
            <span class="${config.color} text-[10px] font-bold px-2 py-1 rounded-full border flex items-center gap-1">
                <i class="fa-solid ${config.icon}"></i> ${label.toUpperCase()}
            </span>`;
    }).join('');

    modal.showModal();

}

const displayCard = (issues) =>{
    const container = document.getElementById('card-container')
    const issuesCount = document.getElementById('issues-count')
    container.innerHTML = '';
    if(issuesCount){
        issuesCount.innerText = `${issues.length} Issues`;
    }
    
   
    issues.forEach(issue => {

        const newCard = document.createElement('div');
        newCard.onclick = () => {
            showDetails(issue)

        };
        newCard.classList.add('cursor-pointer');
        let statusImage='';
        
        let borderTopStyle = '';
        if(issue.status === 'open'){
            borderTopStyle = "border-t-green-500";
            statusImage = 'assets/Open-Status.png';
        }
        else if(issue.status === "closed"){
            borderTopStyle = "border-t-violet-500";
            statusImage = 'assets/Closed-Status.png'
        }
        let priorityStyle = '';
        if(issue.priority === 'high'){
            priorityStyle = "bg-red-50 text-red-500";

        }
        else if(issue.priority === 'medium'){
            priorityStyle = "bg-orange-50 text-orange-500"
        }
        else if(issue.priority === 'low'){
            priorityStyle = "bg-violet-50 text-violet-500"
        }
        const labelHtml = issue.labels.map(lable => {
            const config = labelConfig[lable.toLowerCase()];
            return `
             <span class="${config.color} font-bold text-[10px] px-2 py-1 rounded-full border flex items-center gap-1">
                <i class="fa-solid ${config.icon} text-[12px]"></i> ${lable.toUpperCase()}
            </span>
            `
        }).join('');
        
        newCard.innerHTML = `
         <div class="card bg-white border border-gray-100 border-t-4 ${borderTopStyle} shadow-sm rounded-xl transition-all hover:shadow-md h-full">
    
            <div class="p-5 flex flex-col gap-4">
                <div class="flex flex-row justify-between items-start">
                    <img src= ${statusImage}  alt="status">
                    <span class="font-bold text-[12px] px-3 py-1 rounded-full uppercase ${priorityStyle}">
                       ${issue.priority}
                    </span>
                </div>

            <div class="flex flex-col gap-1">
                <h3 class="font-bold text-[18px] text-slate-800 ">${issue.title}</h3>
                <p class="font-normal text-[12px] text-gray-500">
                    ${issue.description}
                </p>
            </div>

        <div class="flex flex-col  md:flex-row  overflow-hidden gap-2">
        ${labelHtml}
           
            
        </div>
        <hr class="border-t border-gray-300">
        <div>
            <p class="text-gray-400 font-normal text-[12px]">#${issue.id} by ${issue.author}</p>
            <p class="text-gray-400 font-normal text-[12px]">${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>

    </div>`
    container.append(newCard)
        
    });

}

loadCard()