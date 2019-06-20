//console.log('Client side JavScript loaded')

//Fetch is a client(browser) based API and not a node feature.



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.summary
            messageTwo.textContent = data.temparature
        }
        
    })
})

})