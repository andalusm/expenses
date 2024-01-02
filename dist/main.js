const renderer = new Renderer()
let page = 0
let length = 0
let maxPage = 0
let search_url = ""

const searchIngredient = function () {
    const ingredient = ingredientInput.val()
    if (!ingredient) {
        alert(ingredientError)
    }
    else {
        const dairy = dairyCheckBox.prop('checked');
        const gluten = glutenCheckBox.prop('checked');
        const vegeterian = vegeterianCheckBox.prop('checked');
        const recipesURL = `/recipes/${ingredient}?dairyFree=${dairy}&glutenFree=${gluten}&vegeterian=${vegeterian}`
        search_url = recipesURL
        $.get(recipesURL)
            .then((recipes) => {
                console.log(recipes)
                const recipes_page = recipes.recipes
                page = 0
                length = recipes.recipesNum
                maxPage = recipes.maxPage
                const pages =arrayRange(1,maxPage,1)
                renderer.renderRecipes(recipes_page.slice(0,MAX_RECIPES_IN_PAGE),length,page,pages)
            })
            .catch((error) => {
                console.log(error)
                alert(error.responseJSON.Error)
            })
    }
}
recipesContainer.on("click", ".share", function(){
    const ahref = $(this).siblings(".titlemoji").find(".title")
    console.log(ahref)
    const youtube_url = ahref.attr('href').replace("?", "%3F");
    const url = `mailto:?subject=Check%20out%20this%20recipe! ${ahref.text()}&body=You%20can%20see%20this%20recipe%20in%20this%20video%3A ${youtube_url}`
    $(this).attr('href',url)
})


recipesContainer.on("click", "img", function () {
    const ingredient = $($(this).siblings("ul").children()[0]).text()
    alert(ingredient)
})

const navigation_next = function(){
    if(maxPage > page+1)
    {
        page++;
        const url = search_url+"&page="+page
        $.get(url)
            .then((recipes) => {
                console.log(recipes)
                const recipes_page = recipes.recipes
                const pages =arrayRange(1,maxPage,1)
                renderer.renderRecipes(recipes_page.slice(0,MAX_RECIPES_IN_PAGE),length,page,pages)
            })
            .catch((error) => {
                console.log(error)
                alert(error.responseJSON.Error)
            })
        
    }

    
}
const navigation_prev = function(){
    if(page > 0){
        page--;
        const url = search_url+"&page="+page
        $.get(url)
            .then((recipes) => {
                console.log(recipes)
                const recipes_page = recipes.recipes
                const pages =arrayRange(1,maxPage,1)
                renderer.renderRecipes(recipes_page.slice(0,MAX_RECIPES_IN_PAGE), length ,page, pages)
            })
            .catch((error) => {
                console.log(error)
                alert(error.responseJSON.Error)
            })
        
    }
}

const navigation_to_page= function(page_number){
    page = Number(page_number) - 1
    console.log(page)
    if(page >= 0 && maxPage > page){
        const url = search_url+"&page="+page
        $.get(url)
            .then((recipes) => {
                console.log(recipes)
                const recipes_page = recipes.recipes
                const pages =arrayRange(1,maxPage,1)                
                renderer.renderRecipes(recipes_page.slice(0,MAX_RECIPES_IN_PAGE), length ,page, pages)
            })
            .catch((error) => {
                console.log(error)
                alert(error.responseJSON.Error)
            })
        
    }
    
}


