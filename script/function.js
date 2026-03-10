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
        const cardDesign = `
         <div class="card bg-white border border-gray-100 border-t-4 border-t-green-500 shadow-sm rounded-xl transition-all hover:shadow-md">
    
            <div class="p-5 flex flex-col gap-4">
                <div class="flex flex-row justify-between items-start">
                    <img src="assets/Open-Status.png"  alt="status">
                    <span class="bg-red-50 text-red-500 font-bold text-[12px] px-3 py-1 rounded-full ">
                        HIGH
                    </span>
                </div>

            <div class="flex flex-col gap-1">
                <h3 class="font-bold text-[18px] text-slate-800 ">Fix navigation menu on mobile devices</h3>
                <p class="font-normal text-[12px] text-gray-500">
                    The navigation menu doesn't collapse properly on mobile devices...
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
            <p class="text-gray-400 font-normal text-[12px]">#1 by john_doe</p>
            <p class="text-gray-400 font-normal text-[12px]">1/15/2024</p>
        </div>

    </div>`
    container.append(cardDesign)
        
    });

}