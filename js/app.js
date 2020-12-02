'use strict';

const imgObjArray = [];

function JImageObject (jImgObject){
  this.image_url = jImgObject.image_url;
  this.title = jImgObject.title;
  this.description = jImgObject.description;
  this.keyword = jImgObject.keyword;
  this.horns = jImgObject.horns;

  imgObjArray.push(this);
}

JImageObject.prototype.render = function() {
  const $imgCopy = $('#photo-template').clone();

  console.log(this.description);

  $imgCopy.find('h2').text(this.title);
  $imgCopy.find('h4').text(`horns: ${this.horns}`);
  $imgCopy.find('img').attr('src', this.image_url);
  $imgCopy.find('img').attr('alt', this.keyword);
  $imgCopy.find('p').text(`${this.description}`);

  $imgCopy.removeAttr('id');

  $('ul').append($imgCopy);
}

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
})
