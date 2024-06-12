document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/data.json')
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.querySelector('.carousel-inner');
            console.log('Number of slides:', data.length);
            data.forEach((slide, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active');
                }

                const img = document.createElement('img');
                img.classList.add('d-block', 'w-100');
                img.src = slide.imgSrc;
                img.alt = slide.altText;
                carouselItem.appendChild(img);

                if (slide.spotlight) {
                    const carouselContent = document.createElement('div');
                    carouselContent.classList.add('carousel-content', 'container-1');

                    const spotlight = document.createElement('h2');
                    spotlight.classList.add('spotlight');
                    spotlight.textContent = slide.spotlight;
                    carouselContent.appendChild(spotlight);

                    const title = document.createElement('h1');
                    title.classList.add('carousel-title');
                    title.textContent = slide.title;
                    carouselContent.appendChild(title);

                    const infoList = document.createElement('div');
                    infoList.classList.add('main-slider-anime-information-list');

                    const animeInfoList = document.createElement('ul');
                    animeInfoList.classList.add('anime-inf-list');
                    slide.infoList.forEach(infoItem => {
                        const listItem = document.createElement('li');
                        listItem.classList.add('anime-inf-element');
                        if (infoItem.type === 'nested') {
                            const nestedList = document.createElement('ul');
                            nestedList.classList.add('three-box');
                            infoItem.list.forEach(nestedItem => {
                                const nestedListItem = document.createElement('li');
                                nestedListItem.classList.add('three-inf-boxes');
                                if (nestedItem.imgSrc) {
                                    const nestedImg = document.createElement('img');
                                    nestedImg.src = nestedItem.imgSrc;
                                    nestedListItem.appendChild(nestedImg);
                                }
                                nestedListItem.appendChild(document.createTextNode(nestedItem.text));
                                nestedList.appendChild(nestedListItem);
                            });
                            listItem.appendChild(nestedList);
                        } else {
                            if (infoItem.imgSrc) {
                                const img = document.createElement('img');
                                img.src = infoItem.imgSrc;
                                listItem.appendChild(img);
                            }
                            listItem.appendChild(document.createTextNode(infoItem.text));
                        }
                        animeInfoList.appendChild(listItem);
                    });
                    infoList.appendChild(animeInfoList);
                    carouselContent.appendChild(infoList);

                    const description = document.createElement('div');
                    description.classList.add('anime-slider-desk');
                    description.textContent = slide.description;
                    carouselContent.appendChild(description);

                    const watchButton = document.createElement('div');
                    watchButton.classList.add('watch-button');
                    const watchImg = document.createElement('img');
                    watchImg.src = slide.watchButtonImgSrc;
                    watchButton.appendChild(watchImg);
                    watchButton.appendChild(document.createTextNode(slide.watchButtonText));
                    carouselContent.appendChild(watchButton);

                    carouselItem.appendChild(carouselContent);
                }

                carouselInner.appendChild(carouselItem);
            });
        })
        .catch(error => console.error('Error loading data:', error));
});
