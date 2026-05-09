//By Melody Lyu, May 2nd, 2026
//Can use any account for cloud storage, 
//but my username is jl153, which i saved a trial data in

'use strict';

var days = ["Mon", "Tue", "Wed", "Thu", "Fri"]; //ordered weekday labels to build calendar columns
var cloudUser = null; //stores the logged-in username

//for color-coding each subject tags
let tagColors = {
    "Mathematics": "#f9c74f",
    "Computer Science": "#90be6d",
    "Neuroscience": "#a8dadc",
    "Biology": "#caffbf",
    "Physics": "#ffd6a5",
    "Chemistry": "#fdffb6",
    "Economics": "#c77dff",
    "Psychology": "#f4a261",
    "History": "#e9c46a",
    "Literature": "#f1c0e8",
    "Philosophy": "#b5ead7",
    "Political Science": "#ff9999",
    "Sociology": "#d4a5a5",
    "Art": "#ffb4a2",
    "Music": "#b5deff",
    "Writing": "#e2f0cb",
    "Other": "#dddddd"
};

let theCourseList; //ethe CourseList instance for the entire page, intialized in document.ready

/*
function addCourseFromForm reads all values from the input form
constructs a desscription object, add new course to theCourseList,
displays it on the calendar and resets the form for the next entry
    @param: N/A
    @return: N/A
*/
function addCourseFromForm(){
    let name = $('#course_name').val();
    let category = $('#course_category').val();
    //collect all checked day checkboxes into an array
    let days = $('input[name="days"]:checked').map(function(){
        return $(this).val();
    }).get(); //converts the kQuery object into a JS array
    let start = $('#course_start').val();
    let end = $('#course_end').val();

    let description = {name: name, category: category, days: days, start: start, end: end};
    theCourseList.addNewCourse(description);
    let newCourse = theCourseList.courses[theCourseList.courses.length - 1];
    //grab the newly added course and display on the calendar grid
    renderCourseOnCalendar(newCourse);

    $("#add_course_form")[0].reset(); //reset only works on raw DOM element, so need to use [0]
}

/*
function renderCourseOnCalendar places a colored block on the calendar grid for each day a course meets
it calculates the block's height and top offset in pixels based on start/end time
    @param: a Course object 
    return: N/A
*/
function renderCourseOnCalendar(course){
    let course_days = course.getDays();
    let course_start = course.getStart();
    let course_end = course.getEnd();

    //parse hours and minutes separately
    let startHour= parseInt(course_start.split(":")[0]);
    let endHour= parseInt(course_end.split(":")[0]);
    let startMin= parseInt(course_start.split(":")[1]);
    let endMin= parseInt(course_end.split(":")[1]);

    let durationMins = (endHour * 60 + endMin) - (startHour * 60 + startMin); //use duration to calculate block height
    let topOffset = (startMin/60) * 40 //how far down inside the hour slot the block starts
    let heightPx = (durationMins / 60) * 40; //each hour slot is 40px tall, calculate proportionally

    course_days.forEach(function(day){
        let $slot = $('[data_day="' + day + '"][data_hour="' + startHour + '"]');
        let color = tagColors[course.getCategory()] || "#c8d8e8"; //default color
        let $block = $('<div>').addClass('cal_event')
                               .attr('id', course.getId() + "_cal_" + day) //unique id for each 
                               .text(course.name)
                               .css('height', heightPx + 'px')
                               .css('top', topOffset + 'px')
                               .css('background-color', color);
        $slot.append($block);
    });
}

/*
function rebuildingTagList clears and regenerates the tag management panel
called any time a tag is added or removed to keep the UI in sync
    @paramL N/A
    @return: N/A
*/
function rebuildTagList(){
    $('#current_tags').empty();
    for (let tag in tagColors){
        let $item = $('<div>').addClass('tag_item');
        let $swatch = $('<span>').addClass('tag_color_swatch').css('background-color', tagColors[tag]);
        let $name = $('<span>').text(tag);
        let $deleteBtn = $('<button>').addClass('delete_tag_btn').attr('type', 'button').text('✖').attr('data-tag', tag);
        $item.append($swatch).append($name).append($deleteBtn);
        $('#current_tags').append($item);
    }
}

/*
function rebuildDropDown clears and regenerates the category list in the original form
called any time a tag is added or removed
    @param: N/A
    @return: N/A
*/
function rebuildDropdown(){
    $('#course_category').empty();
    $('#course_category').append($('<option>').val('').text('— Select Category —'));
    for (let tag in tagColors){
        $('#course_category').append($('<option>').val(tag).text(tag));
    }
}

/*
function addTag inserts a new tag into tagColors and immediately refreshes both 
the tag panel and the category dropdown to reflect the addition
    @param: string name for the label, hex color string for the color
    @return: N/A
*/
function addTag(name, color){
    tagColors[name] = color;
    rebuildTagList();
    rebuildDropdown();
}

/*
function deleteTag removes a tag from tagColors and immediately refreshes
both the tag panel ad the category dropdown
    @param: string name for the label
    @return: N/A
*/
function deleteTag(name){
    delete tagColors[name];
    rebuildTagList();
    rebuildDropdown();
}

/*
function cloudLogin prompts the user for a username,
logs into the cloud server, and stores the username for display/reference.
must be called before save or load will work correctly
    @param: N/A
    @return: N/A
*/
function cloudLogin(){
    let username = prompt("Enter your cloud username:");
    if (!username) return;
    login(username);
    cloudUser = username;
    alert("Logged in as " +  username);
}

/*
function cloudSave serializes tagColors and the course list and saves both to the cloud.
saves under two keys: username_tags and username_courses
    @param: N/A
    @return: N/A
*/
function cloudSave() {
    if (!cloudUser) {
        alert("Please log in first.");
        return;
    }
    //save tagColors as a JSON string
    setItem(cloudUser + '_tags', JSON.stringify(tagColors), checkError);

    //save courses the same way as localStorage — array of description objects
    let descriptions = theCourseList.courses.map(c => c.getDescriptionObject());
    setItem(cloudUser + '_courses', JSON.stringify(descriptions), checkError);

    //save the counter so IDs don't restart after a reload
    setItem(cloudUser + '_counter', String(theCourseList.counter), checkError);

    alert("Saved to cloud!");
}

/*
function cloudLoad retrieves all saved data from the cloud for the current user
and rebuilds tagColors and the course list from scratch.
uses getAllItems so both keys are handled in one callback
    @param: N/A
    @return: N/A
*/
function cloudLoad() {
    if (!cloudUser) {
        alert("Please log in first.");
        return;
    }
    getAllItems(function(resp) {
        if (resp.error) {
            alert("Error loading: " + resp.error);
            return;
        }

        let values = resp.values; //object containing all key-value pairs for this user

        if (values[cloudUser + '_tags']) { //restore tagColors if saved data exists
            //overwrite the global tagColors with the saved version
            let savedTags = values[cloudUser + '_tags'];
            //clear and repopulate tagColors in place 
            for (let key in tagColors) delete tagColors[key];
            Object.assign(tagColors, savedTags); //copies all the key-value pairs from savedTags into the now-empty tagColors object
            rebuildTagList();
            rebuildDropdown();
        }

        //restore courses if saved data exists
        if (values[cloudUser + '_courses']) {
            let arrayData = values[cloudUser + '_courses'];

            //restore counter so new courses don't reuse old IDs
            theCourseList.counter = parseInt(values[cloudUser + '_counter']) || 100;

            //wipe existing UI before rebuilding
            $("#course_list").empty();
            $('.cal_event').remove();
            theCourseList.courses = [];

            arrayData.forEach(desc => {
                theCourseList.addSavedCourse(desc);
            });
        }

        alert("Loaded from cloud!");
    });
}

$(document).ready(function(){
    //intialize the global CourseList, saving under "MELODY", set destination
    theCourseList = new CourseList("MELODY", "#course_list");

    for (let hour = 7; hour <= 22; hour++) { //build the time label column, one label per hour from 7am to 10pm
        let label = hour < 12 ? hour + 'am' : hour === 12 ? '12pm': (hour - 12) + 'pm'; //am or pm
        let $label = $('<div>').addClass('time_label').text(label);
        $('#time_col').append($label);
    }
        
    //build one calendar column per weekday, each with a header 
    days.forEach(function(day) {
        let $col = $("#cal_col_template").clone(); //clone the hidden template column 
        $col.find(".cal_header").text(day);
        $col.show(); //template is hidden by default
        for (let hour = 7; hour <= 22; hour++) {
            let $slot = $('<div>').addClass('cal_slot')
                                .attr('data_day', day)
                                .attr('data_hour', hour);
            $col.append($slot);
        }
        $("#calendar_grid").append($col);
    });

    //button to submit the add-course form
    $("#add_btn").on('click', addCourseFromForm);
    //reset all form fields without submitting
    $("#clear_btn").on('click', function(){$("#add_course_form")[0].reset();}); //reset only works on js, so use [0] tp get the raw DOM element
    //delegated click handler on the list container 
    $("#course_list").on('click', '.delete_btn', function(event){
        let clickee = event.target;
        let element = $(clickee).closest('.course'); //transverse up to the parent to get the course id
        let elementId = element.attr('data-id');
        theCourseList.deleteCourse(elementId);
    });
    
    //button for saving data to localStorage
    $("#save_local_btn").on('click', function(){
        theCourseList.save();
        alert("Data saved!");
    });

    //button for loading data from localStorage
    $("#load_local_btn").on('click', function(){
        theCourseList.load();
        alert("Data loaded!");
    });

    //button for clearing all data in localStorageb with the current key
    $("#reset_local_btn").on('click', function(){
        localStorage.removeItem(theCourseList.key);
        localStorage.removeItem(theCourseList.key + '_counter');
        alert("Data cleared!");
    });

    //button for logging into cloudStorage
    $("#login_cloud_btn").on('click', cloudLogin);

    //button for saving data to cloudStorage
    $("#save_cloud_btn").on('click', cloudSave);

    //button for loading data from cloudStorage
    $("#load_cloud_btn").on('click', cloudLoad);

    //sort buttons each call the corresponding CourseList sort method
    $("#sort_name_btn").on('click', function(){theCourseList.sortByName();});
    $("#sort_category_btn").on('click', function(){theCourseList.sortByCategory();});
    $("#sort_time_btn").on('click', function(){theCourseList.sortByTime();});
    $("#sort_day_btn").on('click', function(){theCourseList.sortByDay();});

    rebuildTagList(); //populate the category dropdown once on load from the initial tagColors

    //add a new tag when the user fills in a name and picks a color
    $("#add_tag_btn").on('click', function(){
        let name = $('#tag_name').val().trim();
        let color = $('#tag_color').val();
        if (name === '') {
            alert('Please enter a category name.');
            return;
        }
        addTag(name, color);
        $('#tag_name').val(''); //clear name field after adding, color picker resets naturally
    });

    //delegated handler so delete buttons generated by rebuildTagList are always caught
    $("#current_tags").on('click', '.delete_tag_btn', function(){
        let tagName = $(this).attr('data-tag');
        deleteTag(tagName);
    });

    // delegated handler for status toggle button, traverses up to parent .course to get the id
    $("#course_list").on('click', '.status_btn', function(event){
        let elementId = $(event.target).closest('.course').attr('data-id');
        theCourseList.getCourse(elementId).toggleStatus();
    });
});
