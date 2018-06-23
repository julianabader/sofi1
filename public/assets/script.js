let inputHasErrors;

// Resource lists
const parentsResource = [
  {
    type: 'parents',
    title: 'All parents',
    description: 'View all parents',
    path: () => 'parents/'
  },
  {
    type: 'parent',
    title: 'Parent',
    description: 'Enter parent id to view a specific parent, an Id can be retrieved from the "All parents" list',
    inputLabels: ['Parent id'],
    inputs: ['parentId'],
    path: (inputs) => `parents/${inputs[0]}`
  },
  {
    type: 'children',
    title: 'All children',
    inputLabels: ['Parent id'],
    inputs: ['parentId'],
    description: 'Enter parent id to view a specific parent\'s children, an Id can be retrieved from the "All parents" list',
    path: (inputs) => `parents/${inputs[0]}/children`
  },
  {
    type: 'child',
    title: 'Child',
    inputLabels: ['Parent id', 'Child id'],
    inputs: ['parentId', 'childId'],
    description: 'Enter parent id & child id to view a specific child, an Id can be retrieved from the "All parents" list or the "All children" list',
    path: (inputs) => `parents/${inputs[0]}/children/${inputs[1]}`
  }
];
const activityResource = [
  {
    type: 'categories',
    title: 'All categories',
    description: 'View all categories',
    path: () => 'categories/'
  },
  {
    type: 'category',
    title: 'Category',
    description: 'Enter category id to view a specific category, an Id can be retrieved from the "All categories" list',
    inputLabels: ['Category id'],
    inputs: ['categoryId'],
    path: (inputs) => `categories/${inputs[0]}`
  },
  {
    type: 'activities',
    title: 'All activities',
    inputLabels: ['Category id'],
    inputs: ['categoryId'],
    description: 'Enter category id to view a specific category\'s activities, an Id can be retrieved from the "All categories" list',
    path: (inputs) => `categories/${inputs[0]}/activities`
  },
  {
    type: 'activity',
    title: 'Activity',
    inputLabels: ['Category id', 'Activity id'],
    inputs: ['categoryId', 'activityId'],
    description: 'Enter category id & activity id to view a specific activity, an Id can be retrieved from the "All categories" list or the "All activities" list',
    path: (inputs) => `categories/${inputs[0]}/activities/${inputs[1]}`
  }
];

const resourceTypes = {
  Parents: parentsResource,
  Activities: activityResource
};

let resources = [];

function getInput(name, type) {
  const inputVal = $(`#${type}-${name}`).val();

  if (!inputVal.length || !inputVal) {
    return inputHasErrors = type;
  }

  return inputVal;
}


function getResource(type) {
  const pathPrefix = '/';
  const resource = resources.find(resource => resource.type === type);

  let inputs = [];
  if (resource.inputs) {
    inputs = resource.inputs.map(input => getInput(input, resource.type));
    if (inputHasErrors === type) {
      return;
    }
  }

  $.get(`${pathPrefix}/${resource.path(inputs)}`).then((data) => {
    const displayData = resource.template.find('.displayData');
    displayData.find('.content').html(JSON.stringify(data, null, 4));
    displayData.show();

    displayData.on('click', '.close', () => displayData.hide());
  });
}




// Deal with view and HTML
const resourceTemplate = (resource) => {
  const { type, title, description, inputs, inputLabels } = resource;
  const resourceTemplate = $(`<div class="resource" id="${type}">
        <h2>${title}</h2>
        <p>${description}</p>
        
        <div class="form"></div>
        <button class="submitButton" onclick="getResource('${type}')">Submit</button>
        
        <pre class="displayData">
            <div class="close">Close</div>
            <div class="content"></div>
        </pre>
    </div>`);

  if (inputs) {
    inputs.forEach((input, index) => {
      resourceTemplate.find('.form').append(`<label for="${input}">${inputLabels[index]}</label>
        <input type="text" name="${input}" id="${type}-${input}" placeholder="${input}" />`);
    });
  }

  return resourceTemplate;
};



function initView() {
  Object.keys(resourceTypes).forEach((type) => {
    const resourceDomBlock = $(`<div class="resourceBlock"></div>`);

    resourceTypes[type].forEach(resource => {
      resource.template = resourceTemplate(resource);
      resourceDomBlock.append(resource.template);
    });
    resourceDomBlock.append('<hr>');
    $('.container').append(resourceDomBlock);

    // Maintain one big resources list
    resources.push(...resourceTypes[type]);
  });
}

initView();