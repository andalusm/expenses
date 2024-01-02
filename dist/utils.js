const dairyCheckBox = $('#dairy')
const glutenCheckBox = $('#gluten')
const vegeterianCheckBox = $('#vegeterian')
const ingredientInput= $("#ingredient")
const ingredientError = "Please write an ingredient."
const recipesContainer = $("#recipes-container")
const MAX_RECIPES_IN_PAGE = 5

const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );


