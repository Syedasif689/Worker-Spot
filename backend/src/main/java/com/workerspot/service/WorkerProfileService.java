package com.workerspot.service;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.workerspot.dto.NearbyWorkerResponse;
import com.workerspot.entity.Availability;
import com.workerspot.entity.WorkerProfile;
import com.workerspot.repository.WorkerProfileRepository;

@Service
public class WorkerProfileService {

    private final WorkerProfileRepository workerProfileRepository;

    public WorkerProfileService(
            WorkerProfileRepository workerProfileRepository
    ) {
        this.workerProfileRepository = workerProfileRepository;
    }

    // =====================================================
    // FIND NEARBY WORKERS
    // =====================================================

    public List<NearbyWorkerResponse> findNearbyWorkers(
            double customerLatitude,
            double customerLongitude,
            String category
    ) {

        System.out.println(
                "=============================================="
        );

        System.out.println(
                "NEARBY WORKER SEARCH"
        );

        System.out.println(
                "Customer latitude: " + customerLatitude
        );

        System.out.println(
                "Customer longitude: " + customerLongitude
        );

        System.out.println(
                "Requested category: " + category
        );

        System.out.println(
                "=============================================="
        );


        // =====================================================
        // VALIDATE CUSTOMER GPS
        // =====================================================

        if (customerLatitude == 0 ||
            customerLongitude == 0) {

            System.out.println(
                    "Customer GPS coordinates are invalid."
            );

            return List.of();
        }


        // =====================================================
        // VALIDATE CATEGORY
        // =====================================================

        if (category == null ||
            category.trim().isEmpty()) {

            System.out.println(
                    "Category is empty."
            );

            return List.of();
        }


        String requestedCategory =
                normalizeCategory(category);


        // =====================================================
        // GET ALL WORKERS
        // =====================================================

        List<WorkerProfile> workers =
                workerProfileRepository.findAll();

        System.out.println(
                "Total worker profiles in database: "
                        + workers.size()
        );


        // =====================================================
        // FILTER + DISTANCE + DTO
        // =====================================================

        return workers.stream()

                // =================================================
                // CATEGORY MATCH
                // =================================================

                .filter(worker -> {

                    if (worker.getCategory() == null) {

                        System.out.println(
                                "Worker "
                                + worker.getId()
                                + " rejected: category is null"
                        );

                        return false;
                    }


                    String workerCategory =
                            normalizeCategory(
                                    worker.getCategory()
                            );


                    boolean matches =
                            categoryMatches(
                                    requestedCategory,
                                    workerCategory
                            );


                    if (!matches) {

                        System.out.println(
                                "Worker "
                                + worker.getId()
                                + " rejected: category = "
                                + worker.getCategory()
                        );
                    } else {

                        System.out.println(
                                "Worker "
                                + worker.getId()
                                + " category matched: "
                                + worker.getCategory()
                        );
                    }


                    return matches;
                })


                // =================================================
                // AVAILABLE WORKERS ONLY
                // =================================================

                .filter(worker -> {

                    if (worker.getAvailability() == null) {

                        System.out.println(
                                "Worker "
                                + worker.getId()
                                + " rejected: availability is null"
                        );

                        return false;
                    }


                    boolean available =
                            worker.getAvailability()
                                    == Availability.AVAILABLE;


                    if (!available) {

                        System.out.println(
                                "Worker "
                                + worker.getId()
                                + " rejected: worker is "
                                + worker.getAvailability()
                        );
                    }


                    return available;
                })


                // =================================================
                // GPS EXISTS
                // =================================================

                .filter(worker -> {

                    if (worker.getLatitude() == null ||
                        worker.getLongitude() == null) {

                        System.out.println(
                                "Worker "
                                + worker.getId()
                                + " rejected: GPS is missing"
                        );

                        return false;
                    }

                    return true;
                })


                // =================================================
                // GPS VALID
                // =================================================

                .filter(worker -> {

                    if (worker.getLatitude() == 0 ||
                        worker.getLongitude() == 0) {

                        System.out.println(
                                "Worker "
                                + worker.getId()
                                + " rejected: GPS is zero"
                        );

                        return false;
                    }

                    return true;
                })


                // =================================================
                // 10 KM RADIUS
                // =================================================

                .filter(worker -> {

                    double distance =
                            calculateDistance(
                                    customerLatitude,
                                    customerLongitude,
                                    worker.getLatitude(),
                                    worker.getLongitude()
                            );


                    System.out.println(
                            "Worker "
                            + worker.getId()
                            + " distance = "
                            + distance
                            + " km"
                    );


                    boolean nearby =
                            distance <= 10.0;


                    if (!nearby) {

                        System.out.println(
                                "Worker "
                                + worker.getId()
                                + " rejected: more than 10 KM away"
                        );
                    }


                    return nearby;
                })


                // =================================================
                // NEAREST FIRST
                // =================================================

                .sorted(
                        Comparator.comparingDouble(
                                worker ->
                                        calculateDistance(
                                                customerLatitude,
                                                customerLongitude,
                                                worker.getLatitude(),
                                                worker.getLongitude()
                                        )
                        )
                )


                // =================================================
                // CONVERT TO RESPONSE DTO
                // =================================================

                .map(worker -> {

                    double distance =
                            calculateDistance(
                                    customerLatitude,
                                    customerLongitude,
                                    worker.getLatitude(),
                                    worker.getLongitude()
                            );


                    String fullName = "";


                    if (worker.getUser() != null) {

                        fullName =
                                worker.getUser()
                                        .getFullName();

                        if (fullName == null) {
                            fullName = "";
                        }
                    }


                    return new NearbyWorkerResponse(

                            worker.getId(),

                            fullName,

                            worker.getCategory(),

                            worker.getExperienceYears(),

                            worker.getState(),

                            worker.getDistrict(),

                            worker.getCity(),

                            worker.getArea(),

                            worker.getCharges(),

                            worker.getAvailability()
                                    .name(),

                            worker.getAbout(),

                            worker.getLatitude(),

                            worker.getLongitude(),

                            Math.round(
                                    distance * 100.0
                            ) / 100.0
                    );
                })


                .collect(Collectors.toList());
    }


    // =====================================================
    // NORMALIZE CATEGORY
    // =====================================================

    private String normalizeCategory(
            String category
    ) {

        if (category == null) {
            return "";
        }


        return category
                .trim()
                .toLowerCase(Locale.ROOT)
                .replace("-", " ")
                .replace("_", " ")
                .replaceAll("\\s+", " ");
    }


    // =====================================================
    // CATEGORY MATCHING
    // =====================================================

    private boolean categoryMatches(
            String requestedCategory,
            String workerCategory
    ) {

        if (requestedCategory.isEmpty() ||
            workerCategory.isEmpty()) {

            return false;
        }


        // =================================================
        // EXACT MATCH
        // =================================================

        if (workerCategory.equals(
                requestedCategory
        )) {

            return true;
        }


        // =================================================
        // MECHANIC
        // =================================================

        if (requestedCategory.equals("mechanic")) {

            return containsAny(
                    workerCategory,

                    "mechanic",
                    "automobile",
                    "auto repair",
                    "vehicle repair",
                    "car repair",
                    "bike repair",
                    "motorcycle repair"
            );
        }


        // =================================================
        // PLUMBER
        // =================================================

        if (requestedCategory.equals("plumber")) {

            return containsAny(
                    workerCategory,

                    "plumber",
                    "plumbing",
                    "pipe repair",
                    "water pipe",
                    "sanitary"
            );
        }


        // =================================================
        // ELECTRICIAN
        // =================================================

        if (requestedCategory.equals("electrician")) {

            return containsAny(
                    workerCategory,

                    "electrician",
                    "electrical",
                    "electric technician",
                    "electrical technician",
                    "wiring technician",
                    "wiring"
            );
        }


        // =================================================
        // CARPENTER
        // =================================================

        if (requestedCategory.equals("carpenter")) {

            return containsAny(
                    workerCategory,

                    "carpenter",
                    "carpentry",
                    "wood worker",
                    "woodwork",
                    "furniture"
            );
        }


        // =================================================
        // PAINTER
        // =================================================

        if (requestedCategory.equals("painter")) {

            return containsAny(
                    workerCategory,

                    "painter",
                    "painting",
                    "wall painter",
                    "house painter"
            );
        }


        // =================================================
        // AC TECHNICIAN
        // =================================================

        if (requestedCategory.equals(
                "ac technician"
        )) {

            return containsAny(
                    workerCategory,

                    "ac technician",
                    "ac repair",
                    "air conditioner",
                    "air conditioning",
                    "hvac",
                    "cooling technician"
            );
        }


        // =================================================
        // WELDER
        // =================================================

        if (requestedCategory.equals("welder")) {

            return containsAny(
                    workerCategory,

                    "welder",
                    "welding",
                    "fabrication",
                    "metal worker"
            );
        }


        // =================================================
        // GENERIC FALLBACK
        // =================================================

        /*
         * This allows future categories to work
         * without requiring a new condition every time.
         *
         * Example:
         *
         * Customer:
         * "Cleaner"
         *
         * Worker:
         * "House Cleaner"
         *
         * Result:
         * MATCH
         */

        String[] requestedWords =
                requestedCategory.split(" ");


        for (String word : requestedWords) {

            if (word.length() >= 4 &&
                workerCategory.contains(word)) {

                return true;
            }
        }


        return false;
    }


    // =====================================================
    // CHECK MULTIPLE CATEGORY KEYWORDS
    // =====================================================

    private boolean containsAny(
            String workerCategory,
            String... keywords
    ) {

        for (String keyword : keywords) {

            if (workerCategory.contains(
                    keyword
            )) {

                return true;
            }
        }


        return false;
    }


    // =====================================================
    // HAVERSINE DISTANCE
    // =====================================================

    private double calculateDistance(
            double lat1,
            double lon1,
            double lat2,
            double lon2
    ) {

        final double EARTH_RADIUS_KM = 6371.0;


        double latitudeDifference =
                Math.toRadians(
                        lat2 - lat1
                );


        double longitudeDifference =
                Math.toRadians(
                        lon2 - lon1
                );


        double a =
                Math.sin(
                        latitudeDifference / 2
                )
                *
                Math.sin(
                        latitudeDifference / 2
                )

                +

                Math.cos(
                        Math.toRadians(lat1)
                )

                *

                Math.cos(
                        Math.toRadians(lat2)
                )

                *

                Math.sin(
                        longitudeDifference / 2
                )

                *

                Math.sin(
                        longitudeDifference / 2
                );


        double c =
                2 * Math.atan2(
                        Math.sqrt(a),
                        Math.sqrt(1 - a)
                );


        return EARTH_RADIUS_KM * c;
    }
}