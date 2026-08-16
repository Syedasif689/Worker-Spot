package com.workerspot.dto;

public class WorkerProfileUpdateRequest {

    private String fullName;
    private int age;

    private String category;
    private int experienceYears;

    private String state;
    private String district;
    private String city;
    private String area;

    private Double latitude;
    private Double longitude;

    private double charges;
    private String availability;

    private String about;


    // ==========================================
    // FULL NAME
    // ==========================================

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    // ==========================================
    // AGE
    // ==========================================

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }


    // ==========================================
    // CATEGORY
    // ==========================================

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    // ==========================================
    // EXPERIENCE
    // ==========================================

    public int getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(int experienceYears) {
        this.experienceYears = experienceYears;
    }


    // ==========================================
    // STATE
    // ==========================================

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    // ==========================================
    // DISTRICT
    // ==========================================

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }


    // ==========================================
    // CITY
    // ==========================================

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    // ==========================================
    // AREA
    // ==========================================

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }


    // ==========================================
    // LATITUDE
    // ==========================================

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }


    // ==========================================
    // LONGITUDE
    // ==========================================

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }


    // ==========================================
    // CHARGES
    // ==========================================

    public double getCharges() {
        return charges;
    }

    public void setCharges(double charges) {
        this.charges = charges;
    }


    // ==========================================
    // AVAILABILITY
    // ==========================================

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }


    // ==========================================
    // ABOUT
    // ==========================================

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }
}