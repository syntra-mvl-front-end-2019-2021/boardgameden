import axios from 'axios';

export const getGames = ({ commit }) => {
    axios.get('https://api.boardgameatlas.com/api/search?name=Catan&client_id=KrUdcULOvp')
    .then(response => {
        commit('SET_GAMES', response.data);
    })
}

// export const getGame = {{commit}} => {
//     axios.get('https://api.boardgameatlas.com/api/search?name=Catan&client_id=KrUdcULOvp')
// }