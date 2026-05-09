// By Melody Lyu, May 2nd, 2026

'use strict';

class Course{
    name; //display name of the course
    category; //subject tag used for color-coding and sorting
    days; //array of day strings the course meets
    start; //start time string in "HH:MM"
    end; //end time string, same format as start time
    id; //unique numeric ID assigned by CourseList

    /*
    constructor builds a Course from a description, creates its DOM element with name, time, and a remove button
    but does not insert into the page
        @param: description object with id(optional), name, category, days, start, end
        @return: N/A
    */
    constructor(description){
        this.id = description.id || null; //id doesn't exist for brand new courses
        this.name = description.name;
        this.category = description.category;
        this.days = description.days
        this.start = description.start;
        this.end = description.end;

        this.$element = $('<li>').addClass('course');
        let $info = $('<div>').addClass('course_info');
        let $name = $('<span>').addClass('course_name').text(this.name);
        let $time = $('<span>').addClass('course_time').text(this.days.join(', ') + ': ' + this.start + '-' + this.end);
        let $deleteBtn = $('<button>').addClass('delete_btn').attr('type', 'button').text('REMOVE');
        this.status = 'enrolled'; // default status
        let $statusBtn = $('<button>').addClass('status_btn').attr('type', 'button').text('✔ enrolled');
        $info.append($name).append($time);
        this.$element.append($statusBtn).append($info).append($deleteBtn);
        this.$element.append($info).append($deleteBtn);
    }

    /*
    function addToDOM appends  this course's DOM element to the given HTML destination 
        @param: a CSS selector string for the container
        @return: N/A
    */
    addToDOM(destination){
        $(destination).append(this.$element); 
    }

    /*
    function delete removes this course's DOM element from the list
    and also removes all of its calendar blocks across every day it meets
        @param: N/A
        @return: N/A
    */
    delete(){
        this.$element.remove();
        this.days.forEach(day => {
            $('#' + this.id + '_cal_' + day).remove();
        });
    }

    /*
    function setId assigns a numeric id to this course and add it as a 
    data attribute to the DOM element
        @param: a number assigned by CourseList's counter
        @return: N/A
    */
    setId(id){
        this.id = id;
        this.$element.attr('data-id', id);
    }

    /*
    function getId return the course's unique numeric id
        @param: N/A
        @return: the number representing the id
    */
    getId(){
        return this.id;
    }

    /*
    function getId return the array of day strings this course ,eets
        @param: N/A
        @return: array of strings for the days (e.g. ["Mon", "Weds"])
    */
    getDays(){
        return this.days;
    }

    /*
    function getName() returns the course's display name
        @param: N/A
        @return: string of name
    */
    getName(){
        return this.name;
    }

    /*
    function getCategory returns the subject category tag
        @param: N/A
        @return: string of the subject tag
    */
    getCategory(){
        return this.category;
    }

    /*
    function getStart returns the start time string
        @param: N/A
        @return: string in "HH:MM" format
    */
    getStart(){
        return this.start;
    }

    /*
    function getEnd() returns the end time string
        @param: N/A
        @return: string in "HH:MM" format, same with getStart()
    */
    getEnd(){
        return this.end;
    }

    /*
    function getDescriptioniObject serializes the course into a plain object
    later used by CourseLIst.save() to convert into JSON data for localStorage
        @param: N/A
        @return: a plain object with all attributes
    */
    getDescriptionObject() {
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            days: this.days,
            start: this.start,
            end: this.end,
        };
    }

    /*
    function toggleStatus switches the course between enrolled and waitlisted,
    updates the button text and applies a visual class to the DOM element
        @param: N/A
        @return: N/A
    */
    toggleStatus(){
        if (this.status === 'enrolled'){
            this.status = 'waitlisted';
            this.$element.addClass('waitlisted');
            this.$element.find('.status_btn').text('⏳ waitlisted');
            // dim the calendar blocks for this course
            this.days.forEach(day => {
                $('#' + this.id + '_cal_' + day).addClass('waitlisted_cal');
            });
        } else {
            this.status = 'enrolled';
            this.$element.removeClass('waitlisted');
            this.$element.find('.status_btn').text('✔ enrolled');
            // restore calendar blocks
            this.days.forEach(day => {
                $('#' + this.id + '_cal_' + day).removeClass('waitlisted_cal');
            });
        }
    }
}
