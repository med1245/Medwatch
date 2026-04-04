// Mock data representing content from minochinos.com and myvidplay.com
// In production these would be fetched from their APIs or scraped

const posterBase = 'https://image.tmdb.org/t/p/w342'

export function getMockMovies(source = 'minochinos') {
    const movies = [
        {
            id: 'tt15398776', title: 'Oppenheimer', year: 2023, rating: '8.3',
            poster: `${posterBase}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
            embedId: 'tt15398776', genres: ['Drama', 'History']
        },
        {
            id: 'tt1517268', title: 'Barbie', year: 2023, rating: '7.0',
            poster: `${posterBase}/iuFNMS8vlodykwN83GO0hroJpGC.jpg`,
            embedId: 'tt1517268', genres: ['Comedy', 'Fantasy']
        },
        {
            id: 'tt6791350', title: 'Guardians of the Galaxy Vol. 3', year: 2023, rating: '7.9',
            poster: `${posterBase}/r2J02Z2OpNTctfOSN1Ydgzy38z3.jpg`,
            embedId: 'tt6791350', genres: ['Action', 'Sci-Fi']
        },
        {
            id: 'tt9362722', title: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: '8.6',
            poster: `${posterBase}/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg`,
            embedId: 'tt9362722', genres: ['Animation', 'Action']
        },
        {
            id: 'tt14444726', title: 'The Creator', year: 2023, rating: '6.7',
            poster: `${posterBase}/vBZ0qvaRxqEfh2D3RLZP5vBIEDk.jpg`,
            embedId: 'tt14444726', genres: ['Action', 'Sci-Fi']
        },
        {
            id: 'tt1630029', title: 'Avatar: The Way of Water', year: 2022, rating: '7.6',
            poster: `${posterBase}/t6HIqrRAclMCA60NsSmeqe9eSef.jpg`,
            embedId: 'tt1630029', genres: ['Action', 'Adventure']
        },
        {
            id: 'tt10366206', title: 'John Wick: Chapter 4', year: 2023, rating: '7.7',
            poster: `${posterBase}/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg`,
            embedId: 'tt10366206', genres: ['Action', 'Thriller']
        },
        {
            id: 'tt16153300', title: 'Indiana Jones 5', year: 2023, rating: '6.5',
            poster: `${posterBase}/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg`,
            embedId: 'tt16153300', genres: ['Action', 'Adventure']
        },
        {
            id: 'tt1302006', title: 'The Equalizer 3', year: 2023, rating: '7.0',
            poster: `${posterBase}/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg`,
            embedId: 'tt1302006', genres: ['Action', 'Crime']
        },
        {
            id: 'tt15239678', title: 'Dune: Part Two', year: 2024, rating: '8.5',
            poster: `${posterBase}/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg`,
            embedId: 'tt15239678', genres: ['Sci-Fi', 'Adventure']
        },
        {
            id: 'tt11389872', title: 'Wonka', year: 2023, rating: '7.0',
            poster: `${posterBase}/qhb1qOilapbapxWQn9jtRCMwLJV.jpg`,
            embedId: 'tt11389872', genres: ['Fantasy', 'Comedy']
        },
        {
            id: 'tt5834426', title: 'Fast X', year: 2023, rating: '5.8',
            poster: `${posterBase}/fiVW06jE7z9YnO4trhaMEdclSiC.jpg`,
            embedId: 'tt5834426', genres: ['Action', 'Adventure']
        },
    ]
    return movies.map(m => ({ ...m, source }))
}

export function getMockSeries(source = 'myvidplay') {
    const series = [
        {
            id: 'tt21815562', title: 'The Last of Us', year: 2023, seasons: 1, rating: '8.8',
            poster: `${posterBase}/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg`,
            embedId: 'tt21815562', genres: ['Drama', 'Horror']
        },
        {
            id: 'tt4574334', title: 'Stranger Things', year: 2022, seasons: 4, rating: '8.7',
            poster: `${posterBase}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,
            embedId: 'tt4574334', genres: ['Drama', 'Horror']
        },
        {
            id: 'tt2356777', title: 'Breaking Bad', year: 2013, seasons: 5, rating: '9.5',
            poster: `${posterBase}/ggFHVNu6YYI5L9pCfOacjizRGt.jpg`,
            embedId: 'tt2356777', genres: ['Crime', 'Drama']
        },
        {
            id: 'tt5180504', title: 'The Witcher', year: 2023, seasons: 3, rating: '8.1',
            poster: `${posterBase}/7vjaCdMw15FEbXyLQTVa04URsPm.jpg`,
            embedId: 'tt5180504', genres: ['Fantasy', 'Action']
        },
        {
            id: 'tt6468322', title: 'Money Heist', year: 2021, seasons: 5, rating: '8.3',
            poster: `${posterBase}/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg`,
            embedId: 'tt6468322', genres: ['Crime', 'Drama']
        },
        {
            id: 'tt7221388', title: 'Ted Lasso', year: 2023, seasons: 3, rating: '8.8',
            poster: `${posterBase}/5fhZdwP1DVJ0FyVH6vrFdHwpXIn.jpg`,
            embedId: 'tt7221388', genres: ['Comedy', 'Drama']
        },
        {
            id: 'tt3581920', title: 'The Mandalorian', year: 2023, seasons: 3, rating: '8.7',
            poster: `${posterBase}/eU1i6eHXlzMzVd4D7agaoa8UHlj.jpg`,
            embedId: 'tt3581920', genres: ['Sci-Fi', 'Action']
        },
        {
            id: 'tt11126994', title: 'Andor', year: 2022, seasons: 1, rating: '8.4',
            poster: `${posterBase}/59SVNzkEFAcHPmE9fCFE6wHCAmJ.jpg`,
            embedId: 'tt11126994', genres: ['Sci-Fi', 'Drama']
        },
        {
            id: 'tt0903747', title: '1923', year: 2022, seasons: 1, rating: '8.4',
            poster: `${posterBase}/3lHMBMIhpZUINECjdZJbQPbsOrP.jpg`,
            embedId: 'tt0903747', genres: ['Drama', 'Western']
        },
        {
            id: 'tt12593682', title: 'Succession', year: 2023, seasons: 4, rating: '8.9',
            poster: `${posterBase}/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg`,
            embedId: 'tt12593682', genres: ['Drama', 'Comedy']
        },
        {
            id: 'tt3230854', title: 'House of the Dragon', year: 2023, seasons: 2, rating: '8.4',
            poster: `${posterBase}/z2yahl2uefxDCl0nogcRBstwruJ.jpg`,
            embedId: 'tt3230854', genres: ['Fantasy', 'Drama']
        },
        {
            id: 'tt11198330', title: 'The Bear', year: 2023, seasons: 2, rating: '8.7',
            poster: `${posterBase}/sHm9vKEuGNGnsqVSVLBIVoBfTHp.jpg`,
            embedId: 'tt11198330', genres: ['Drama', 'Comedy']
        },
    ]
    return series.map(s => ({ ...s, source }))
}

export function getAllContent() {
    return [
        ...getMockMovies('minochinos'),
        ...getMockMovies('myvidplay'),
        ...getMockMovies('egydead'),
        ...getMockMovies('faselhdx'),
        ...getMockSeries('myvidplay'),
        ...getMockSeries('egydead'),
        ...getMockSeries('faselhdx'),
        ...getCleanContent(),
    ]
}

export function getCleanContent() {
    const clean = [
        {
            id: 'tt0110357', title: 'The Lion King', year: 1994, type: 'movie', rating: '8.5',
            poster: `${posterBase}/sKCr78AS8cb58NiWzwN6uNypk0g.jpg`,
            embedId: 'tt0110357', genres: ['Animation', 'Family']
        },
        {
            id: 'tt0253666', title: 'The Chosen', year: 2017, type: 'series', rating: '9.2',
            poster: `${posterBase}/nqkR83NqGZqV40Mmt1QZf002Zqg.jpg`,
            embedId: 'tt0253666', genres: ['Drama', 'History']
        },
        {
            id: 'tt0109830', title: 'Forrest Gump', year: 1994, type: 'movie', rating: '8.8',
            poster: `${posterBase}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`,
            embedId: 'tt0109830', genres: ['Drama', 'Romance']
        },
        {
            id: 'tt0454876', title: 'Life of Pi', year: 2012, type: 'movie', rating: '7.9',
            poster: `${posterBase}/mYMKhaAhXj0vB3pX98TIF8O78PZ.jpg`,
            embedId: 'tt0454876', genres: ['Adventure', 'Drama']
        }
    ]
    return clean.map(c => ({ ...c, source: 'cleanwatch' }))
}
