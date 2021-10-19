/*import tweetsComp from './comp_tweets.js';
import { dispatch_search, setSearchObj } from "./search.js";
import { streamStart } from "./stream.js";
import { splitCoordinatesIntoLatLng } from './utils.js';*/


/* map used to draw the search area
export var map = null;
// current search area on the map
var search_area = null;
// saving the last shape i drew, so when I draw a new shape I remove the previous one
var shape = null;

// number of decimal digits in the coordinates
const DECIMAL_DIGITS = 5;
// color of the search area
const SEARCH_AREA_COLOR = "#00FF00";*/

export default {
    name: 'reserved',

    /*data() {
        return{
            value: 100,
            stream: false
        }
    },*/

    template: `

        <div id="menu">
            <h1 id="title">NoloNoloPlus - agenzia di noleggio</h1>
            <button id="worker" class="menuBtn" onclick="load('/Worker')">
                Worker
                <span class="icon-group">
                    <i tabindex="0" class="fas fa-pen-fancy" title="Worker"></i>
                </span>
            </button>
            <button id="manager" class="menuBtn" onclick="load('/Manager')">
                Manager
                <span class="icon-group">
                    <i tabindex="0" class="fas fa-clipboard" title="Manager"></i>
                </span>
            </button>
        </div>


        <div class="container login-container">
            <div class="row">
                <div class="col-md-6 login-form-1">
                    <h3>Login for workers</h3>
                    <form>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Your Email *" value="" />
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Your Password *" value="" />
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btnSubmit" value="Login" />
                            </div>
                            <div class="form-group">
                                <a href="#" class="ForgetPwd">Forget Password?</a>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6 login-form-2">
                        <h3>Login for managers</h3>
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Your Email *" value="" />
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Your Password *" value="" />
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btnSubmit" value="Login" />
                            </div>
                            <div class="form-group">

                                <a href="#" class="ForgetPwd" value="Login">Forget Password?</a>
                            </div>
                        </form>
                    </div>
                </div>
        </div>

    `,
    methods: {
        
    },

    activated() {
        console.log("sono dentro access.js");
        //Request trends
        /*$.ajax({    
            method: "GET",
            url: "/trends",
            success: (data) => {

                
            }
        });*/
    },

    mounted() {
        
    }
}