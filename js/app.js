'use strict';

const imgObjArray = [];
const OptionKeyWord = [];

 // ano means addNewOption
 const addNewOption = anoKeyword => {
  if(OptionKeyWord.length === 0 || !OptionKeyWord.includes(anoKeyword)){
    OptionKeyWord.push(anoKeyword);
    const newOption = `<option value="${anoKeyword}">${anoKeyword}</option>`;
    $('select').append(newOption);
  }
};

function JImageObject (jImgObject){
  this.image_url = jImgObject.image_url;
  this.title = jImgObject.title;
  this.description = jImgObject.description;
  this.keyword = jImgObject.keyword;
  this.horns = jImgObject.horns;

  imgObjArray.push(this);
}

// or represents object render
JImageObject.prototype.render = function(orKeyword = '') {
 
  if(this.keyword === orKeyword || !orKeyword || orKeyword === "default"){
    const $imgCopy = $('#photo-template').clone();
    $imgCopy.find('h2').text(this.title);
    $imgCopy.find('h4').text(`horns: ${this.horns}`);
    $imgCopy.find('img').attr('src', this.image_url);
    $imgCopy.find('img').attr('alt', this.keyword);
    $imgCopy.find('p').text(`${this.description}`);
  
    $imgCopy.removeAttr('id');
  
    $('ul').append($imgCopy);
    
  }
  addNewOption(this.keyword);
}

 

$('select').on('change', e => {
  e.preventDefault();
  $('ul').empty();
  imgObjArray.forEach(imgDataObjRender => {
    imgDataObjRender.render(e.target.value);
  });
 
});


$.ajax({
  url: './data/page-1.json',
  async: true,
  success: dataObj => {
    dataObj.forEach(imgDataObj => new JImageObject(imgDataObj));
  }
}).then(() => {
  imgObjArray.forEach(imgDataObjRender => {
    imgDataObjRender.render();
  });  
});

