export const render = (html, outerHTML) => {
  const element = htmlToElement(html);
  outerHTML.append(element);
}

export const htmlToElement = html => {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content;
}

export const createHashes = list => {
  const hashedList = [];
  
  for (let item of list) {
    hashedList[item] = `variable${item}number${Math.random().toString(16).slice(2)}`;
  }

  return hashedList;
}

export const renderList = (list, component, classStyle = 'col-6 col-m-12') => {
  let html = '';

  for(let item in list) {
    html += `<div class="${classStyle}">${component.render(list[item])}</div>`;
  }

  return html;
}