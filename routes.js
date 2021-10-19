/* import mainComp from '/static/js/comp_main.js'
import searchComp from '/static/js/comp_search.js'
import tweetComp from '/static/js/comp_tweets.js'
import mapComp from '/static/js/comp_map.js'
import postComp from '/static/js/comp_post.js'
import cloudComp from '/static/js/comp_cloud.js'
import graphsComp from '/static/js/comp_graphs.js' */
import resComp from '/public/js/access.js'
import mainComp from '/public/js/main_page.js'

export const router = new VueRouter({
    routes: [
      {path: '/',             component: mainComp       },
      {path: '/reserved',       component: resComp     }
      /*{path: '/tweets',       component: tweetComp      },
      {path: '/map',          component: mapComp        },
      {path: '/cloud',        component: cloudComp      },
      {path: '/graphs',       component: graphsComp     },
      {path: '/post',         component: postComp}*/
    ], 
  }) 


router.beforeEach((to, from, next) => {
    console.log("sono dentro routes");

    if(to.path == '/') {
        $('#stylesheetComp').attr('href','');
    } else {
        $('#stylesheetComp').attr('href','/public/css' + to.path + ".css");
    }
    next();
})


new Vue({
    router: router,
    el: '#app', 
})