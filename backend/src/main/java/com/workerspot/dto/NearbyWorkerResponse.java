package com.workerspot.dto;

public class NearbyWorkerResponse {

    private Long workerId;
    private String fullName;

    private String category;
    private int experienceYears;

    private String state;
    private String district;
    private String city;
    private String area;

    private double charges;
    private String availability;

    private String about;

    private Double latitude;
    private Double longitude;

    private double distanceKm;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public NearbyWorkerResponse(
            Long workerId,
            String fullName,
            String category,
            int experienceYears,
            String state,
            String district,
            String city,
            String area,
            double charges,
            String availability,
            String about,
            Double latitude,
            Double longitude,
            double distanceKm
    ) {

        this.workerId = workerId;
        this.fullName = fullName;
        this.category = category;
        this.experienceYears = experienceYears;

        this.state = state;
        this.district = district;
        this.city = city;
        this.area = area;

        this.charges = charges;
        this.availability = availability;

        this.about = about;

        this.latitude = latitude;
        this.longitude = longitude;

        this.distanceKm = distanceKm;
    }


    // =====================================================
    // GETTERS
    // =====================================================

    public Long getWorkerId() {
        return workerId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getCategory() {
        return category;
    }

    public int getExperienceYears() {
        return experienceYears;
    }

    public String getState() {
        return state;
    }

    public String getDistrict() {
        return district;
    }

    public String getCity() {
        return city;
    }

    public String getArea() {
        return area;
    }

    public double getCharges() {
        return charges;
    }

    public String getAvailability() {
        return availability;
    }

    public String getAbout() {
        return about;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public double getDistanceKm() {
        return distanceKm;
    }
}