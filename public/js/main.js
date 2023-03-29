let likes = [...document.querySelectorAll('.like')]
let undolike = [...document.querySelectorAll('.unlike')]
let follow = [...document.querySelectorAll('.follow')]
let unfollow = [...document.querySelectorAll('.unfollow')]
likes.forEach(x => {
    x.addEventListener('click', addLike)
})
undolike.forEach(x => {
    x.addEventListener('click', unlike)
})
follow.forEach(x => {
    x.addEventListener('click', followP)
})
unfollow.forEach(x => {
    x.addEventListener('click', unfollowP)
})
async function addLike(){
    const itemText = this.parentNode.dataset.id
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
    location.reload()
}
async function unlike(){
    const itemText = this.parentNode.dataset.id
    console.log(itemText)
    try{
        const response = await fetch('/unlike', {
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
    location.reload()
}
async function followP(){
    const itemText = this.parentNode.dataset.id
    console.log(itemText)
    try{
        const response = await fetch('/follow', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'tweet': itemText
            })
            })
        const data = await response.json()
        console.log(data)
    } catch(err){
        console.error(err)
    }
    location.reload()
}
async function unfollowP(){
    const itemText = this.parentNode.dataset.id
    console.log(itemText)
    try{
        const response = await fetch('/unfollow', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'tweet': itemText
            })
            })
        const data = await response.json()
        console.log(data)
    } catch(err){
        console.error(err)
    }
    location.reload()
}