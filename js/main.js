'use strict';

var DATA_COUNT = 25;
var PICTURE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Артём',
  'Игорь',
  'Ефим',
  'Ульяна',
  'Таисия',
  'Виктория'
];

var data = [];
var fragment = document.createDocumentFragment();
var similarListElement = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var bigPicture = document.querySelector('.big-picture');
var socialComments = document.querySelector('.social__comments');

var randomPicture = function (num) {
  for (var k = 0; k < num.length; k++) {
    var rand = 1 - 0.5 + Math.random() * (25 - 1 + 1);
    if (rand !== num[i]) {
      continue;
    } else {
      num.splice(num.indexOf(rand), 1);
      break;
    }
  }
  return Math.round(rand);
};

var random = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var createComments = function () {
  var comments = [];
  var num = random(1, 100);
  for (var i = 0; i < num; i++) {
    var comment = {
      avatar: 'img/avatar-' + random(1, 6) + '.svg',
      message: MESSAGES[random(1, 6)],
      name: NAMES[random(1, 6)]
    };
    comments.push(comment);
  }
  return comments;
};

var createDataItem = function () {
  var description = {
    url: 'photos/' + randomPicture(PICTURE_NUMBERS) + '.jpg',
    likes: random(15, 200),
    comments: createComments()
  };
  return description;
};

var getData = function (num) {
  var temp = [];
  for (var j = 0; j < num; j++) {
    temp.push(createDataItem());
  }
  return temp;
};

var renderPicture = function (description) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = description.url;
  pictureElement.querySelector('.picture__likes').textContent = description.likes;
  pictureElement.querySelector('.picture__comments').textContent = description.comments;

  return pictureElement;
};

data = getData(DATA_COUNT);

for (var i = 0; i < data.length; i++) {
  fragment.appendChild(renderPicture(data[i]));
}

similarListElement.appendChild(fragment);

bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img').src = data[0].url;
bigPicture.querySelector('.likes-count').textContent = data[0].likes;
bigPicture.querySelector('.comments-count').textContent = data[0].comments.length;

socialComments.querySelector('.social__picture').src = data[0].comments.avatar;
socialComments.querySelector('.social__text').textContent = data[0].comments.message;

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
