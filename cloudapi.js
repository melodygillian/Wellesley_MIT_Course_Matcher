//Copied by Melody Lyu, Mat 2nd, 2026
"use strict";

// The url_base is incomplete. Need to append /<user>/<key> or other endpoints.

const url_base = "https://cs.wellesley.edu/cs204cloud";
const url_to_join = url_base+"/join/";
const url_to_login = url_base+"/login/";
const url_to_logout = url_base+"/logout/";
const url_to_change_password = url_base+"/password-change/";

// this URL is incomplete. Need to append username
const url_to_delete_all = url_base+"/delete-all/";

// This is a crucial global variable, set during login and used by
// getItem, setItem, and deleteItem. If it's null, the user needs to
// login, first.

var cloudUser = null;

// ================================================================
// 

/* Join the cloud app via Ajax. Sets the user variable upon
    success. Alerts any errors. */

function do_join(username, password) {
    $.post(url_to_join,
           {username: username, password: password},
           function (resp) {
               if (resp.error) {
                   alert(resp.error)
               } else {
                   console.log('join successful');
                   $("#join_response").text('join successful');
                   cloudUser = username;
               }
           }).fail(function () { alert(`error posting to ${url_to_join}`) });
}

/* Login to the cloud app via Ajax. Sets the user variable upon
   success. Alerts any errors. */

function do_login(username, password) {
    $.post(url_to_login,
           {username: username, password: password},
           function (resp) {
               if (resp.error) {
                   alert(resp.error)
               } else {
                   console.log('login successful');
                   $("#login_response").text('login successful');
                   cloudUser = username;
               }
           }).fail(function () { alert(`error posting to ${url_to_login}`) });
}

/* Password change via Ajax. Sets the cloudUser variable upon
   success. Alerts any errors. */

function do_password_change(username, old_password, new_password) {
    $.post(url_to_change_password,
           {username: username,
            old_password: old_password,
            new_password: new_password},
           function (resp) {
               if (resp.error) {
                   alert(resp.error)
               } else {
                   console.log('change successful');
                   $("#password_change_response").text('change successful');
                   cloudUser = username;
               }
           }).fail(function () { alert(`error posting to ${url_to_change_password}`) });

}

/* join the app, popping up a prompt window for the password. */

// suitable for JS console
function join(username) {
    let password = prompt(`what password for ${username}?`);
    do_join(username, password);
}

/* login to the app, popping up a prompt window for the password. 
   Sets the `user` global variable if successful. */

function login(username) {
    let password = prompt(`what password for ${username}?`);
    do_login(username, password);
}

/* allow Scott to switch to a given user */
function su(username) {
    if(user=='scott') {
        user = username;
        console.log(`su to ${user}`);
    }
}

// ================================================================
// Save to the cloud
// CS 304 students can use these to test their Ajax REST backend routes.
// CS 204 students can use these to save their data

/* Function to create and return a url to get/set/delete a key/value
 * pair. Checks for errors and alerts if there is one. */

function cloudUrl(key) {
    if(cloudUser == null ) {
        alert(`must login first;
               note that if you are off-campus,
               you will probably be asked for an
               htaccess username/password.
               Talk to Prof Scott Anderson if you need this.`);
        return;
    }
    if( key.length > 30 ) {
        alert('key is too long');
    }
    let url = url_base+'/'+cloudUser+'/'+key;
    return url;
}    

/* Ajax call to get data from cloud server. Must be logged in
   first. Invokes user's callback with returned data, which will be a
   dictionary with keys: 'error', 'key', and 'value'. */

function getItem(key, callback) {
    if(!callback) callback = console.log;
    let url = cloudUrl(key);
    console.log('GET', url);
    $.get(url, callback).fail(function () { alert('error in GET from '+url); });
}

/* Ajax call to set (store) data on the cloud server. Must be
   logged in first. Invokes user's callback with the response, which
   will be a dictionary with key 'error'. */

function setItem(key, value, callback) {
    if(!callback) callback = console.log;
    let url = cloudUrl(key);
    console.log('PUT', url);
    $.ajax(url,
           {method: 'PUT',
            success: callback,
            data: {'value': value}}).fail(function () { alert('error in PUT to '+url); });
}

/* Ajax call to delete data on the cloud server. Must be logged in
   first. Invokes user's callback with the response, which will be a
   dictionary with key 'error'. */

function deleteItem(key, callback) {
    if(!callback) callback = console.log;
    let url = cloudUrl(key);
    console.log('DELETE', url);
    $.ajax(url,
           {method: 'DELETE',
            success: callback}).fail(function () { alert('error in DELETE to '+url) });
}

function alertObj(obj) {
    alert(JSON.stringify(obj));
}

// Console.log prints *all* its arguments; this just has one,
// which is nicer as a default callback.

function print(x) {
    console.log(x);
}

// This can be a nice callback if you want to play with the value in
// the JS console. It always sets the global variable "g";

var g;                          // global just for testing purposes

function setg(resp) {
    if( resp.error ) {
        alert(resp.error);
    } else {
        g = resp.value;
    }
}

// This function checks a response for errors and alerts if it's not false.

function checkError(resp) {
    if(resp.error) { alert(resp.error); }
}

// ================================================================
// Extra function for CS 204 students

/* Ajax request for the entire collection. Returns a variant of the
 * usual dictionary with keys of 'error' and 'values' (plural, not
 * singular), but the 'values' data is a JavaScript object literal (a
 * dictionary) with all the key/value pairs that this user has stored.
*/

function getAllItems(callback) {
    if(!callback) callback = console.log;
    if( cloudUser == null ) {
        alert('must login');
        return;
    }
    $.get(url_base+'/'+cloudUser+'/', callback).fail(function () { alert('error in GET from '+url); });
}

// ================================================================
// TO DO

/* Scott should consider implementing better wrappers that (1) check
   for any errors, (2) JSON.stringify the value to be set, and (3)
   JSON.parse any returned value before invoking the user's callback.
*/
// development URL
// const url_base = "http://cs.wellesley.edu:1942";
