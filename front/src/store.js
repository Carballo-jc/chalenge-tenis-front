import {observable, action, computed } from 'mobx';

import Service from "./service"

class Store{

  constructor(config) {
    this.Service = new Service({config})
  }


  @observable openDialog = false
  @observable player = null
  @observable slams = [
    'us-open',
    'australian-open',
    'wimbledon',
    'roland-garros'
  ]

  @observable currentSlam = this.slams[0]


  @action
  setCurrentSlam(slam) {
    this.currentSlam = slam
  }


  @action
  setToggleDialog(value) {
    this.openDialog = value
  }


  @action
  setPlayer(player) {
    this.player = player
  }

  @action
  getSlam = async (slam)=>{
    return await this.Service.getSlam(slam);
  }

  @action
  getLastDateWinner = async ()=>{
    return await this.Service.getLastDateWinner(this.currentSlam, this.player);
  }


}

export default Store
