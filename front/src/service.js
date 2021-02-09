import get from 'lodash/get'
import  axios from 'axios'

class SlamService{

  constructor({config = {}}) {
    this.API = axios.create({
      baseURL: `http://localhost:4000/`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  getSlam = async slam =>
    await this.API.get(`winner/${slam}`)
      .then(response => get(response, 'data', []))

  getLastDateWinner = async (slam, player) =>
    await this.API.post(
      `winner/${slam}/date`,
      {player}
      )
      .then(response => get(response, 'data', []))

}

export default SlamService
