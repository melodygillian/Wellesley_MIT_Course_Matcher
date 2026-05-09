//By Melody Lyu, May 2nd, 2026

'use strict';

class CourseList{
    key; //localStorage jey string used to save/load course data
    destination; //CSS selector where course list elements are appended
    courses; //array of course objects currently in the list
    counter; //auto-incrementing number used to generate unique course IDs

    /*
    constructor initializes an empty CourseList with a localStorage key 
    a DOM destination for rendering
        @param: a string ket for localStorage, and a string CSS selector for course list container
        @return: N/A
    */
    constructor(key, destination){
        this.key = key;
        this.destination = destination;
        this.courses = [];
        this.counter = 100; //start at 100 to avoid conflicts with index
    }

    /*
    function addNewCourse creates a Course from a description object,
    assigns an id from the counter, pushes it into the course array, and 
    adds it to the displayed course list.
        @param: description object
        @return: N/A
    */
    addNewCourse(description){
        let newCourse = new Course(description);
        newCourse.setId(this.counter);
        this.counter++; //increment after assigning, so no two course gets the same ID

        this.courses.push(newCourse);
        newCourse.addToDOM(this.destination);

        $('#no_courses_msg').hide(); //hide the empty-state message when one course exists
    }

    /*
    function addSavedCourse recreates a Course from a previously description and reuse the id,
    calls renderCourseOnCalendar to skip the normal add flow
        @param: description including an id
        @return: N/A
    */
    addSavedCourse(description){
        let newCourse = new Course(description);
        newCourse.setId(description.id); //preserve origional id
        this.courses.push(newCourse);
        newCourse.addToDOM(this.destination);
        renderCourseOnCalendar(newCourse);
    }

    /*
    function getCourse finds and returns the Course object matchinf the given id
        @param: numerical id of the targetted course
        @return: the matching Course object
    */
    getCourse(id){
        return this.courses.find(course => course.getId() === parseInt(id));
    }

    /*
    function deleteCourse removes a course from the page (both the list and calendar view)
    and also from the courses array
        @param: numerical id for the targetted course
        @return: N/A
    */
    deleteCourse(id){
        let targetCourse = this.getCourse(id);
        targetCourse.delete();
        let index = this.courses.findIndex(c => c.getId() === parseInt(id));
        this.courses.splice(index, 1);
    }

    /*
    function save serializes all current courses into a JSON string and input to localStorage
    also save the current counter so IDs don't repeat after a reload
        @param: N/A
        @return: N/A
    */
    save(){
        let descriptions = this.courses.map(c => c.getDescriptionObject()); //convert course into description
        localStorage.setItem(this.key, JSON.stringify(descriptions)); //store as JSON string
        localStorage.setItem(this.key + '_counter', this.counter); //preserve counter
    }

    /*
    function load reads saved course data from localStorage and rebuilds the page
    clearing the existing displayed list and calendar beforehand
        @param: N/A
        @return: N/A
    */
    load(){
        this.counter = parseInt(localStorage.getItem(this.key + '_counter'))||100;
        let stringData = localStorage.getItem(this.key);

        if (!stringData) return; //do nothing if nothing is saved

        let arrayData = JSON.parse(stringData);

        //clear all exsting UI state
        $("#course_list").empty();
        $('.cal_event').remove();

        this.courses = []; //avoid duplicates
        arrayData.forEach(courseDescription => {
            this.addSavedCourse(courseDescription);
        });
    }

    /*
    function sort is the generic sort helper that accepts any comparison function
    sorts the internal courses array, then re-builds the list from scratch in the new order
        @param: a comparator function 
        @return: N/A
    */
    sort(comparison){
        this.courses.sort(comparison);
        $("#course_list").empty();
        this.courses.forEach(course => {
            course.addToDOM(this.destination);
        });
    }
    
    /*
    function sortByName sorts courses alphabetically by name, case-insensitive
        @param: N/A
        @return: N/A
    */
    sortByName(){
        this.sort(function(a, b){
            let aName = a.getName().toUpperCase(); //avoid case difference
            let bName = b.getName().toUpperCase();
            if (aName < bName) return -1;
            if (aName > bName) return 1;
            return 0;
        });
    }

    /*
    function sortByCategory sorts courses alphabetically by category tag, case-insensitive
        @param: N/A
        @return: N/A
    */
    sortByCategory(){
        this.sort(function(a, b){
            let aCat = a.getCategory().toUpperCase();
            let bCat = b.getCategory().toUpperCase();
            if (aCat < bCat) return -1;
            if (aCat > bCat) return 1;
            return 0;
        });
    }

    /*
    function sortByTime sorts courses by start time in ascending order.
    which works correctly for 24-hour format strings of equal length
        @param: N/A
        @return: N/A
    */
    sortByTime(){
        this.sort((a, b) => a.getStart() - b.getStart());
    }

    /*
    function sortByDay sorts courses by the first day in their days array,
    ordered Mon → Tue → Wed → Thu → Fri using indexOf on the order array
        @param: N/A
        @return: N/A
    */
    sortByDay(){
        let order = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        this.sort((a, b) => order.indexOf(a.getDays()[0]) - order.indexOf(b.getDays()[0]));
    }
}
