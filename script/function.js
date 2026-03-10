const loadCard = () =>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
      .then(res => res.json())
      .then(result => {
        displayCard(result.data)
        
      })
}

const displayCard = (issues) =>{
    const container = document.getElementById('card-container')
    container.innerHTML = '';
   
    issues.forEach(issue => {

        const newCard = document.createElement('div');
        let borderTopStyle = '';
        if(issue.status === 'open'){
            borderTopStyle = "border-t-green-500";
        }
        else if(issue.status === "closed"){
            borderTopStyle = "border-t-violet-500";
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
        
        newCard.innerHTML = `
         <div class="card bg-white border border-gray-100 border-t-4 ${borderTopStyle} shadow-sm rounded-xl transition-all hover:shadow-md h-full">
    
            <div class="p-5 flex flex-col gap-4">
                <div class="flex flex-row justify-between items-start">
                    <img src="assets/Open-Status.png"  alt="status">
                    <span class="font-bold text-[12px] px-3 py-1 rounded-full uppercase ${priorityStyle.split(' ')[0]} ${priorityStyle.split(' ')[1]}">
                       ${issue.priority}
                    </span>
                </div>

            <div class="flex flex-col gap-1">
                <h3 class="font-bold text-[18px] text-slate-800 ">${issue.title}</h3>
                <p class="font-normal text-[12px] text-gray-500">
                    ${issue.description}
                </p>
            </div>

        <div class="flex flex-row flex-wrap gap-2">
            <span class="bg-red-100 text-red-600 font-bold text-[10px] px-2 py-1 rounded-full border border-red-200 flex items-center gap-1">
                <i class="fa-solid fa-bug text-[12px]"></i> BUG
            </span>
            <span class="bg-orange-100 text-orange-600 font-bold text-[10px] px-2 py-1 rounded-full border border-orange-100 flex items-center gap-1">
                <i class="fa-solid fa-life-ring text-[12px]"></i> HELP WANTED
            </span>
        </div>
        <hr class="border-t border-gray-300">
        <div>
            <p class="text-gray-400 font-normal text-[12px]">#${issue.id} by ${issue.author}</p>
            <p class="text-gray-400 font-normal text-[12px]">1/15/2024</p>
        </div>

    </div>`
    container.append(newCard)
        
    });

}

loadCard()