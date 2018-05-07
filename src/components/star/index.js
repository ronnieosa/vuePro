/**
 * Created by knrainy on 17/12/5.
 */

import starComponent from './Star.vue'

const star = {
    install: function(Vue){
        Vue.component('Star',starComponent)
    }
}

export default star
