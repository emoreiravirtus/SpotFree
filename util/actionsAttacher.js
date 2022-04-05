export const attachFunctionToElement = (query, func) => {
  const elements = document.querySelectorAll(query);
  
  elements.forEach(i => i.addEventListener('click', func));
}