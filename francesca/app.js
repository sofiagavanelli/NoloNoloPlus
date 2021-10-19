
const app = Vue.createApp({
    data(){
      return{
        firstName: 'Josh',
        lastName: 'Doe',
        email: 'john.client@gmail.com',
        user_id: 'C0093',
        //picture: '',
      }
    },
    methods:{
     getUser(){
  
        this.firstName= 'Sam',
        this.lastName= 'Smith',
        this.email= 'sam.customer@gmail.com',
        this.user_id= 'W0238',
        //this.picture= 'customer.jpeg',
        
        console.log(this.firstName)
      },
    },
  })
  
  app.mount('#app')