let likes = [...document.querySelectorAll('.like')]
likes.forEach(x => {
    x.addEventListener('click', addLike)
})
async function addLike(){
    const itemText = this.parentNode.dataset.id
    location.reload()
    console.log(itemText)
    try{
        const response = await fetch('/like', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'tweet': itemText
            })
            })
        const data = await response.json()
        console.log(data)
        console.log('hey')
        console.log('hoe')
    } catch(err){
        console.error(err)
    }
}
console.log(likes)