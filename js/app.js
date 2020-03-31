'use strict';
let keywordsP1 = [];
let keywordsP2 = [];
let p1animals = [];
let p2animals = [];


$(document).ready(function () {

  function Animal(animal) {
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.keyword = animal.keyword;
    this.horns = animal.horns;
  }


  Animal.prototype.renderP1 = function () {

    let $animalTemplate = $('#photo-template').html();
    var rendered = Mustache.render($animalTemplate, this);
    $('#page1div').append(rendered);
  };

  Animal.prototype.renderP2 = function () {

    let $animalTemplate = $('#photo-template').html();
    var rendered = Mustache.render($animalTemplate, this);
    $('#page2div').append(rendered);

  };
  const readJason1 = () => {

    $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' }).then(data => {
      data.forEach(newEle => {
        let newAnimal = new Animal(newEle);
        newAnimal.renderP1();

        p1animals.push(newAnimal.keyword);
        for (let i = 0; i<p1animals.length; i++){
          $(`section:nth-of-type(${i})`).attr('class', p1animals[i]);
        }

        if (!(keywordsP1.includes(newEle.keyword))) {
          keywordsP1.push(newAnimal.keyword);
        }
      });

      keywordsP1.forEach(function (filterEl) {
        $('select').append($('<option></option>').html(filterEl).attr('id', filterEl).attr('class', 'dropDown'));
      });
    });

  };

  const readJason2 = () => {
    $.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' }).then(data => {
      data.forEach(newEle => {
        let newAnimalP2 = new Animal(newEle);
        newAnimalP2.renderP2();

        p2animals.push(newAnimalP2.keyword);
        for (let i = 0; i<p2animals.length; i++){
          $(`section:nth-of-type(${i})`).attr('class', p2animals[i]);
        }

        if (!(keywordsP2.includes(newEle.keyword))) {
          keywordsP2.push(newAnimalP2.keyword);
        }

      });

      keywordsP2.forEach(function (filterEl) {
        $('select').append($('<option></option>').html(filterEl).attr('id', filterEl).attr('class', 'dropDown'));
      });
    });

  };

  $('main button:first-of-type').on('click', function () {
    $('#page1div').show();
    $('#page2div').hide();

    $('select').find('option').not('option:nth-of-type(1)').remove();

    keywordsP1.forEach(function (filterEl) {
      $('select').append($('<option></option>').html(filterEl).attr('id', filterEl).attr('class', 'dropDown'));
    });

  });

  $('select').on('change', function () {

    $('#page1div').show();
    $('#page2div').show();


    var selectedVal = $(this).find(':selected').val();
    alert(selectedVal);
    $(`#page1div section:not(.${selectedVal})`).hide();
    $(`#page2div section:not(.${selectedVal})`).hide();

  }
  );


  $('main button:nth-of-type(2)').on('click', function () {
    $('#page2div').show();
    $('#page1div').hide();

    $('select').find('option').not('option:nth-of-type(1)').remove();


    keywordsP2.forEach(function (filterEl) {
      $('select').append($('<option></option>').html(filterEl).attr('id', filterEl).attr('class', 'dropDown'));
    });

  });


  console.log(keywordsP1);
  console.log(keywordsP2);
  readJason1();
  readJason2();
});
