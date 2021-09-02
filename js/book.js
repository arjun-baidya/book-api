
document.getElementById('error-message').style.display = 'none';

// data get through button click and clear search field
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText === '') {
        const empty = document.getElementById('total-count').innerText = 'Please write something';
    }
    else{
        url = ` https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
            .catch(error => displayError(error))
    }

};


const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

// display result our html view
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    books.docs.forEach(book => {
        console.log(book)        
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML =`
        <div class="card-group mb-4">
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i:'null'}-M.jpg" height="300" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">Book Name :  ${book.title ? book.title:'null'}</h5>
                    <p class="card-text text-center">Author Name :  ${book.author_name ? book.author_name:'null'}</p>
                    <br>
                    <p class="card-text text-center">Publisher  :  ${book.publisher ? book.publisher:'null'}</p>
                </div>
                <div class="card-footer">
                <small class="text-muted text-center">First Published: ${book.first_publish_year ? book.first_publish_year:'null'}</small>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
    // total search result show
    document.getElementById('total-count').innerText = ` Total search results ${books.docs.length}`
    // condion wise message show
    if (`${books.docs.length}`=== '0'){
        document.getElementById('total-count').innerText = 'Not found';
        document.getElementById('search-result').style.display = 'none';
    }
    else{
        document.getElementById('search-result').style.display = '';
    }
}

