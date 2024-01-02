class Renderer {
    
    constructor(){
        this.recipeContainer = $("#recipes-container");
        this.recipeTemplate = $("#recipes-template");
    }
    render(container, handleTemplate, attribute){
        container.empty()
        const source = handleTemplate.html();
        const template = Handlebars.compile(source);
        const newHTML = template(attribute);
        container.append(newHTML)
    }

    renderRecipes(recipes,length,page,pages){
        this.render(this.recipeContainer,this.recipeTemplate,{recipes: recipes, length:length, min:page*5+1, max: Math.min((page+1)*MAX_RECIPES_IN_PAGE,length), pages})
    }

}