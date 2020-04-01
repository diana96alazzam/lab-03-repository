'use strict';

let keywords = [];

let allAnimals =[];


$(document).ready(function () {

  function Animal(animal) {
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.keyword = animal.keyword;
    this.horns = animal.horns;
  }

  Animal.prototype.render = function () {

    let $animalTemplate = $('#photo-template').html();
    var rendered = Mustache.render($animalTemplate, this);
    $('main').append(rendered);

  };

  Animal.prototype.filters = function() {
    console.log(this.keyword);
    if (!keywords.includes(this.keyword)) {
      keywords.push(this.keyword);
      $('select').append($('<option></option>').html(this.keyword).attr('id', this.keyword).attr('class', 'dropDown'));
    }
  };


  const readJson = (pageNum) => {

    $.ajax(`data/page-${pageNum}.json`, { method: 'GET', dataType: 'JSON' }).then(data => {

      data.forEach(newEle => {
        let newAnimal = new Animal(newEle);
        newAnimal.render();
        newAnimal.filters();
        allAnimals.push(newAnimal);

        for (let i = 0; i<allAnimals.length; i++){
          $(`section:nth-of-type(${i})`).attr('class', allAnimals[i].keyword).attr('id', allAnimals[i].title);

        }

      });

    });

  };

  readJson(1);

  $('select').on('change', function () {

    $('section').hide();

    let selectedVal = $(this).find(':selected').val();
    $(`.${selectedVal}`).show();
  });



  $('button:nth-of-type(1)').on('click', function () {

    $('section').hide();
    readJson(1);
  });

  $('button:nth-of-type(2)').on('click', function () {

    $('section').hide();
    readJson(2);

  });

});
