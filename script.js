async function GenerateComic()
   {
     const comicForm=document.querySelector('.Container');
     const formData=new FormData(comicForm);
     const panelTexts = [];
     const loadingSpinner = document.getElementById('loadingSpinner');
    
     for(let i=1;i<=10;i++)
     {
        const panelValue=formData.get(`panel${i}`);
        if(!panelValue)
        {
            alert(`please fill all panel`);
            return;
        }
        panelTexts.push(panelValue);
        console.log(panelValue);
     }
    try{
    loadingSpinner.style.display = 'flex';
    const imageLoadingPromises = panelTexts.map(async (text, i) => 
    {
        try{
       
        const imageData=await query({ "inputs": text });
        const img=document.createElement('img');
        img.src=URL.createObjectURL(imageData);
        img.style.width = '260px';
        img.style.height='280px';
        const panel = document.getElementById(`panel${i+1}`);

        panel.appendChild(img);
        }
        catch(imageError){
            console.log(`Error loading image for Panel ${i + 1}:`, imageError);

        }
     });
     await Promise.all(imageLoadingPromises);
    }
    catch{
        console.error('Error generating comic:', error);
        lert('Error generating comic. Please try again.');

    }
    finally{
        loadingSpinner.style.display = 'none';
        alert(`Image Loading Done`);
    }
    
   
    
   }

   async function query(data) 
   {
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: {
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            return result;
    }