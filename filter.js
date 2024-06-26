let animeList = [];
let filteredAnimeList = [];
let selectedGenre = [];
let selectedYear = [];
let selectedType = [];
let selectedStatus = [];

const applyFilters = () => {
    filteredAnimeList = animeList.filter(anime => {
        const matchesGenre = selectedGenre.length ? selectedGenre.some(genre => anime.genres.includes(genre)) : true;
        const matchesYear = selectedYear.length ? selectedYear.includes(anime.startDate.year.toString()) : true;

        const matchesType = selectedType.length ? selectedType.includes(anime.format) : true;
        const matchesStatus = selectedStatus.length ? selectedStatus.includes(anime.status) : true;
        return matchesGenre && matchesYear && matchesType && matchesStatus;
    });
    updateAnimeList(filteredAnimeList, 1);
};

document.getElementById('apply-filters').addEventListener('click', applyFilters);

const updateFilterSelection = (selector, filterArray) => {
    document.querySelectorAll(selector).forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const value = checkbox.value;
            if (checkbox.checked) {
                filterArray.push(value);
            } else {
                const index = filterArray.indexOf(value);
                if (index > -1) {
                    filterArray.splice(index, 1);
                }
            }
        });
    });
};

updateFilterSelection('#year-options input', selectedYear);
updateFilterSelection('#genre-options input', selectedGenre);
updateFilterSelection('#type-options input', selectedType);
updateFilterSelection('#status-options input', selectedStatus);

document.querySelectorAll('.filter-category h4').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});