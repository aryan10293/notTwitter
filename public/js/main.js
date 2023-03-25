let likes = [...document.querySelectorAll('.like')]
likes.forEach(x => {
    x.addEventListener('click', addLike)
})
async function addLike(){
    const itemText = this.parentNode.dataset.id
    console.log(itemText)
    try{
        const response = await fetch('/like', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'tweet': itemText
            })
            })
        const data = await response.json()
        console.log(data)
       window.location.reload()
    } catch(err){
        console.error(err)
    }
}
console.log(likes)