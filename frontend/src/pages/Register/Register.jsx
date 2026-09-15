import { useState, useRef, useEffect } from "react";

import {
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  Briefcase,
  Calendar,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck,
  Clock,
  HandCoins,
  Users,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Wrench,
  IndianRupee,
  FileText,
  LocateFixed,
  Map,
  Navigation,
  Target,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./Register.css";

// =====================================================
// FIX LEAFLET DEFAULT MARKER ICON
// =====================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// =====================================================
// WORKER SPOT PRICING CONFIGURATION
// =====================================================

const PRICING_RULES = {
  Plumber: [
    { maxExperience: 2, min: 250, max: 350 },
    { maxExperience: 5, min: 300, max: 450 },
    { maxExperience: 10, min: 350, max: 500 },
    { maxExperience: Infinity, min: 400, max: 500 },
  ],

  Electrician: [
    { maxExperience: 2, min: 250, max: 350 },
    { maxExperience: 5, min: 300, max: 450 },
    { maxExperience: 10, min: 400, max: 500 },
    { maxExperience: Infinity, min: 450, max: 500 },
  ],

  Carpenter: [
    { maxExperience: 2, min: 250, max: 350 },
    { maxExperience: 5, min: 350, max: 500 },
    { maxExperience: 10, min: 400, max: 500 },
    { maxExperience: Infinity, min: 450, max: 500 },
  ],

  Mechanic: [
    { maxExperience: 2, min: 300, max: 400 },
    { maxExperience: 5, min: 350, max: 500 },
    { maxExperience: 10, min: 400, max: 500 },
    { maxExperience: Infinity, min: 450, max: 500 },
  ],

  Painter: [
    { maxExperience: 2, min: 200, max: 300 },
    { maxExperience: 5, min: 250, max: 350 },
    { maxExperience: 10, min: 300, max: 400 },
    { maxExperience: Infinity, min: 350, max: 450 },
  ],

  "AC Technician": [
    { maxExperience: 2, min: 300, max: 400 },
    { maxExperience: 5, min: 400, max: 500 },
    { maxExperience: 10, min: 450, max: 500 },
    { maxExperience: Infinity, min: 500, max: 500 },
  ],

  Mason: [
    { maxExperience: 2, min: 250, max: 350 },
    { maxExperience: 5, min: 300, max: 400 },
    { maxExperience: 10, min: 350, max: 500 },
    { maxExperience: Infinity, min: 400, max: 500 },
  ],

  Welder: [
    { maxExperience: 2, min: 250, max: 350 },
    { maxExperience: 5, min: 350, max: 400 },
    { maxExperience: 10, min: 350, max: 500 },
    { maxExperience: Infinity, min: 400, max: 500 },
  ],

  Other: [
    { maxExperience: 2, min: 250, max: 350 },
    { maxExperience: 5, min: 300, max: 450 },
    { maxExperience: 10, min: 350, max: 500 },
    { maxExperience: Infinity, min: 400, max: 500 },
  ],
};

// =====================================================
// GET RECOMMENDED PRICE RANGE
// =====================================================

const getPriceRange = (category, experience) => {
  if (!category || experience === "") {
    return null;
  }

  const years = Number(experience);

  if (Number.isNaN(years) || years < 0) {
    return null;
  }

  const rules = PRICING_RULES[category];

  if (!rules) {
    return null;
  }

  return (
    rules.find(
      (rule) => years <= rule.maxExperience
    ) || rules[rules.length - 1]
  );
};

// =====================================================
// MAP CLICK HANDLER
// =====================================================

function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      onLocationSelect(lat, lng);
    },
  });

  return null;
}

// =====================================================
// MAP VIEW CONTROLLER
// IMPORTANT:
// MapContainer's "center" only controls initial position.
// This component moves the map whenever mapPosition changes.
// =====================================================

function MapViewController({ position }) {
  const map = useMap();

  useEffect(() => {
    if (!position) {
      return;
    }

    map.setView(position, 17, {
      animate: true,
    });
  }, [position, map]);

  return null;
}

// =====================================================
// REGISTER COMPONENT
// =====================================================

function Register() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // LOCATION STATE
  // =====================================================

  const [locationStatus, setLocationStatus] =
    useState("");

  const [gettingLocation, setGettingLocation] =
    useState(false);

  const [showMap, setShowMap] = useState(false);

  const [mapPosition, setMapPosition] =
    useState(null);

  const [locationAccuracy, setLocationAccuracy] =
    useState(null);

  const [locationSource, setLocationSource] =
    useState("");

  // =====================================================
  // LOCATION REFS
  // =====================================================

  const locationWatchRef = useRef(null);

  const locationTimeoutRef = useRef(null);

  const locationReadingsRef = useRef([]);

  const locationRequestIdRef = useRef(0);

  const reverseGeocodeRequestRef =
    useRef(0);

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",

    category: "",
    age: "",
    experienceYears: "",
    charges: "",
    about: "",

    state: "",
    district: "",
    city: "",
    area: "",

    latitude: "",
    longitude: "",

    terms: false,
  });

  // =====================================================
  // RECOMMENDED PRICE
  // =====================================================

  const recommendedRange = getPriceRange(
    formData.category,
    formData.experienceYears
  );

  // =====================================================
  // STOP LOCATION DETECTION
  // =====================================================

  const stopLocationDetection = () => {
    if (
      locationWatchRef.current !== null &&
      navigator.geolocation
    ) {
      navigator.geolocation.clearWatch(
        locationWatchRef.current
      );

      locationWatchRef.current = null;
    }

    if (
      locationTimeoutRef.current !== null
    ) {
      clearTimeout(
        locationTimeoutRef.current
      );

      locationTimeoutRef.current = null;
    }
  };

  // =====================================================
  // CLEANUP ON COMPONENT UNMOUNT
  // =====================================================

  useEffect(() => {
    return () => {
      stopLocationDetection();

      locationRequestIdRef.current += 1;

      reverseGeocodeRequestRef.current += 1;
    };
  }, []);

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // DISTANCE BETWEEN TWO GPS POINTS
  // HAVERSINE FORMULA
  // =====================================================

  const calculateDistanceMeters = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const earthRadius = 6371000;

    const toRadians = (degrees) =>
      (degrees * Math.PI) / 180;

    const dLat = toRadians(
      lat2 - lat1
    );

    const dLon = toRadians(
      lon2 - lon1
    );

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return earthRadius * c;
  };

  // =====================================================
  // SELECT BEST LOCATION READING
  //
  // We do NOT simply use the first reading.
  //
  // Priority:
  // 1. Good accuracy
  // 2. Stable position
  // 3. Multiple readings agreeing with each other
  // =====================================================

  const selectBestLocationReading = (
    readings
  ) => {
    if (!readings.length) {
      return null;
    }

    // Remove obviously invalid readings.

    const validReadings =
      readings.filter(
        (reading) =>
          Number.isFinite(
            reading.latitude
          ) &&
          Number.isFinite(
            reading.longitude
          ) &&
          Number.isFinite(
            reading.accuracy
          ) &&
          reading.accuracy > 0
      );

    if (!validReadings.length) {
      return null;
    }

    // Sort by reported accuracy.

    const sorted = [
      ...validReadings,
    ].sort(
      (a, b) =>
        a.accuracy - b.accuracy
    );

    // ===================================================
    // FIND A STABLE CLUSTER
    //
    // A reading is considered stable when other fresh
    // readings are geographically close to it.
    // ===================================================

    let bestCandidate = sorted[0];

    let bestScore = Infinity;

    sorted.forEach(
      (candidate) => {
        let nearbyCount = 0;

        let totalDistance = 0;

        validReadings.forEach(
          (other) => {
            const distance =
              calculateDistanceMeters(
                candidate.latitude,
                candidate.longitude,
                other.latitude,
                other.longitude
              );

            // Allow a cluster based on the reported
            // accuracy of both readings.

            const allowedDistance =
              Math.max(
                50,
                Math.min(
                  150,
                  Math.max(
                    candidate.accuracy,
                    other.accuracy
                  )
                )
              );

            if (
              distance <=
              allowedDistance
            ) {
              nearbyCount += 1;
              totalDistance += distance;
            }
          }
        );

        // Lower score = better.

        const score =
          candidate.accuracy * 2 -
          nearbyCount * 20 +
          totalDistance * 0.02;

        if (
          score < bestScore
        ) {
          bestScore = score;
          bestCandidate =
            candidate;
        }
      }
    );

    return bestCandidate;
  };

  // =====================================================
  // REVERSE GEOCODE LOCATION
  // =====================================================

  const reverseGeocodeLocation = async (
    latitude,
    longitude,
    requestId
  ) => {
    const currentRequest =
      ++reverseGeocodeRequestRef.current;

    try {
      setLocationStatus(
        "Location found. Getting your address..."
      );

      const url =
        `https://nominatim.openstreetmap.org/reverse` +
        `?format=jsonv2` +
        `&lat=${encodeURIComponent(
          latitude
        )}` +
        `&lon=${encodeURIComponent(
          longitude
        )}` +
        `&zoom=18` +
        `&addressdetails=1` +
        `&accept-language=en`;

      const response =
        await fetch(url, {
          method: "GET",
          headers: {
            Accept:
              "application/json",
          },
        });

      if (!response.ok) {
        throw new Error(
          "Unable to find the address."
        );
      }

      const data =
        await response.json();

      // Ignore old/stale response.

      if (
        currentRequest !==
        reverseGeocodeRequestRef.current
      ) {
        return false;
      }

      const address =
        data.address || {};

      // =================================================
      // LOCATION HIERARCHY
      // =================================================

      const state =
        address.state ||
        address.state_district ||
        "";

      const district =
        address.state_district ||
        address.district ||
        address.county ||
        address.region ||
        "";

      const city =
        address.city ||
        address.town ||
        address.municipality ||
        address.city_district ||
        address.village ||
        address.locality ||
        "";

      const area =
        address.suburb ||
        address.neighbourhood ||
        address.residential ||
        address.quarter ||
        address.hamlet ||
        address.village ||
        address.locality ||
        "";

      // =================================================
      // UPDATE ALL LOCATION FIELDS
      // =================================================

      setFormData((prev) => ({
        ...prev,

        latitude:
          latitude.toFixed(7),

        longitude:
          longitude.toFixed(7),

        state,
        district,
        city,
        area,
      }));

      setLocationStatus(
        "Current location detected and address filled successfully."
      );

      // Prevent an old request from changing state.

      if (
        requestId ===
        locationRequestIdRef.current
      ) {
        setGettingLocation(false);
      }

      return true;
    } catch (reverseError) {
      console.error(
        "Reverse geocoding error:",
        reverseError
      );

      if (
        currentRequest !==
        reverseGeocodeRequestRef.current
      ) {
        return false;
      }

      // Coordinates are still valid even if address
      // lookup failed.

      setFormData((prev) => ({
        ...prev,

        latitude:
          latitude.toFixed(7),

        longitude:
          longitude.toFixed(7),
      }));

      setLocationStatus(
        "Exact coordinates detected. Please enter the address fields manually."
      );

      return false;
    }
  };

  // =====================================================
  // FINALIZE CURRENT LOCATION
  // =====================================================

  const finalizeDetectedLocation = async (
    reading,
    requestId
  ) => {
    if (!reading) {
      setGettingLocation(false);

      setLocationStatus(
        "No reliable location reading was received. Please choose your exact location on the map."
      );

      setShowMap(true);

      return;
    }

    const {
      latitude,
      longitude,
      accuracy,
    } = reading;

    console.log(
      "Final Worker Spot location:",
      {
        latitude,
        longitude,
        accuracy,
        timestamp:
          new Date(
            reading.timestamp
          ).toISOString(),
      }
    );

    stopLocationDetection();

    // =================================================
    // SAVE ONLY THIS FRESH LOCATION
    // =================================================

    setFormData((prev) => ({
      ...prev,

      latitude:
        latitude.toFixed(7),

      longitude:
        longitude.toFixed(7),
    }));

    // =================================================
    // SET MAP POINTER
    // =================================================

    setMapPosition([
      latitude,
      longitude,
    ]);

    setLocationAccuracy(
      accuracy
    );

    setLocationSource(
      "Fresh device location"
    );

    // =================================================
    // SHOW MAP
    // =================================================

    setShowMap(true);

    // =================================================
    // LOCATION MESSAGE
    // =================================================

    if (accuracy <= 30) {
      setLocationStatus(
        `Excellent location accuracy: approximately ${Math.round(
          accuracy
        )} meters.`
      );
    } else if (accuracy <= 75) {
      setLocationStatus(
        `Good location accuracy: approximately ${Math.round(
          accuracy
        )} meters.`
      );
    } else if (accuracy <= 150) {
      setLocationStatus(
        `Location detected with approximately ${Math.round(
          accuracy
        )} meters accuracy. Please verify the marker on the map.`
      );
    } else {
      setLocationStatus(
        `Location detected with approximately ${Math.round(
          accuracy
        )} meters accuracy. Please verify or correct the marker on the map.`
      );
    }

    // =================================================
    // REVERSE GEOCODE
    // =================================================

    await reverseGeocodeLocation(
      latitude,
      longitude,
      requestId
    );

    if (
      requestId ===
      locationRequestIdRef.current
    ) {
      setGettingLocation(false);
    }
  };

  // =====================================================
  // USE CURRENT LOCATION
  //
  // IMPORTANT:
  // This starts a completely NEW request.
  // It does NOT use formData.latitude/longitude.
  // It does NOT intentionally use cached location.
  // =====================================================

  const handleUseCurrentLocation = () => {
    if (
      !navigator.geolocation
    ) {
      setLocationStatus(
        "Your browser does not support location services."
      );

      setShowMap(true);

      return;
    }

    if (gettingLocation) {
      return;
    }

    setError("");
    setSuccess("");

    // ===================================================
    // NEW REQUEST ID
    // ===================================================

    const requestId =
      ++locationRequestIdRef.current;

    // ===================================================
    // CLEAR EVERYTHING FROM PREVIOUS ATTEMPT
    // ===================================================

    stopLocationDetection();

    locationReadingsRef.current =
      [];

    // ===================================================
    // IMPORTANT:
    // Do NOT retain previous location while detecting.
    // ===================================================

    setFormData((prev) => ({
      ...prev,

      latitude: "",
      longitude: "",
    }));

    setMapPosition(null);

    setLocationAccuracy(null);

    setLocationSource("");

    setGettingLocation(true);

    setShowMap(true);

    setLocationStatus(
      "Searching for a fresh and accurate location..."
    );

    // ===================================================
    // LOCATION SUCCESS
    // ===================================================

    const handleLocationSuccess = (
      position
    ) => {
      // Ignore old requests.

      if (
        requestId !==
        locationRequestIdRef.current
      ) {
        return;
      }

      const {
        latitude,
        longitude,
        accuracy,
      } = position.coords;

      // =================================================
      // VALIDATION
      // =================================================

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        !Number.isFinite(accuracy)
      ) {
        return;
      }

      // Ignore completely unreliable readings.

      if (accuracy > 1000) {
        console.warn(
          "Ignoring very inaccurate location:",
          accuracy
        );

        setLocationStatus(
          `Location signal is currently weak (${Math.round(
            accuracy
          )}m). Waiting for a better reading...`
        );

        return;
      }

      const reading = {
        latitude,
        longitude,
        accuracy,
        timestamp:
          position.timestamp ||
          Date.now(),
      };

      // =================================================
      // SAVE FRESH READING
      // =================================================

      locationReadingsRef.current.push(
        reading
      );

      // Keep only latest 12 readings.

      if (
        locationReadingsRef.current
          .length > 12
      ) {
        locationReadingsRef.current =
          locationReadingsRef.current.slice(
            -12
          );
      }

      const readings =
        locationReadingsRef.current;

      console.log(
        "Fresh location reading:",
        reading
      );

      // =================================================
      // TEMPORARILY SHOW BEST CURRENT READING
      //
      // This lets the user see the pointer moving
      // toward the best current position.
      // =================================================

      const temporaryBest =
        [...readings].sort(
          (a, b) =>
            a.accuracy -
            b.accuracy
        )[0];

      if (temporaryBest) {
        setMapPosition([
          temporaryBest.latitude,
          temporaryBest.longitude,
        ]);

        setLocationAccuracy(
          temporaryBest.accuracy
        );
      }

      // =================================================
      // VERY GOOD READING
      //
      // If we get <= 25m accuracy AND have at least
      // 2 fresh readings, we can finish early.
      // =================================================

      if (
        accuracy <= 25 &&
        readings.length >= 2
      ) {
        const best =
          selectBestLocationReading(
            readings
          );

        finalizeDetectedLocation(
          best,
          requestId
        );

        return;
      }

      // =================================================
      // GOOD READING + ENOUGH READINGS
      // =================================================

      if (
        readings.length >= 5
      ) {
        const best =
          selectBestLocationReading(
            readings
          );

        if (
          best &&
          best.accuracy <= 75
        ) {
          finalizeDetectedLocation(
            best,
            requestId
          );

          return;
        }
      }

      // =================================================
      // UPDATE USER
      // =================================================

      setLocationStatus(
        `Searching for a more accurate position... Current reading: approximately ${Math.round(
          accuracy
        )}m`
      );
    };

    // ===================================================
    // LOCATION ERROR
    // ===================================================

    const handleLocationError = (
      locationError
    ) => {
      if (
        requestId !==
        locationRequestIdRef.current
      ) {
        return;
      }

      console.error(
        "Geolocation error:",
        locationError
      );

      stopLocationDetection();

      setGettingLocation(false);

      switch (
        locationError.code
      ) {
        case locationError.PERMISSION_DENIED:
          setLocationStatus(
            "Location permission was denied. Please allow location access in your browser."
          );
          break;

        case locationError.POSITION_UNAVAILABLE:
          setLocationStatus(
            "Your device could not determine the current location. Please use the map to select it."
          );
          break;

        case locationError.TIMEOUT:
          setLocationStatus(
            "The device took too long to determine the location. Please select your exact location on the map."
          );
          break;

        default:
          setLocationStatus(
            "Unable to determine your current location. Please select it on the map."
          );
      }

      setShowMap(true);
    };

    // ===================================================
    // START A BRAND NEW LOCATION WATCH
    // ===================================================

    try {
      locationWatchRef.current =
        navigator.geolocation.watchPosition(
          handleLocationSuccess,
          handleLocationError,
          {
            // Ask browser/device for best available
            // positioning method.

            enableHighAccuracy: true,

            // VERY IMPORTANT:
            // Never intentionally accept a cached
            // position.

            maximumAge: 0,

            // Individual location request timeout.

            timeout: 30000,
          }
        );
    } catch (watchError) {
      console.error(
        "Unable to start location watch:",
        watchError
      );

      setGettingLocation(false);

      setLocationStatus(
        "Unable to start location detection. Please select your location on the map."
      );

      setShowMap(true);

      return;
    }

    // ===================================================
    // FINAL LOCATION COLLECTION TIME
    //
    // We deliberately wait several seconds instead of
    // trusting the first browser result.
    // ===================================================

    locationTimeoutRef.current =
      setTimeout(() => {
        if (
          requestId !==
          locationRequestIdRef.current
        ) {
          return;
        }

        const readings =
          locationReadingsRef.current;

        const best =
          selectBestLocationReading(
            readings
          );

        stopLocationDetection();

        if (!best) {
          setGettingLocation(false);

          setLocationStatus(
            "No usable current location was received. Please select your exact location on the map."
          );

          setShowMap(true);

          return;
        }

        // =================================================
        // FINAL BEST READING
        // =================================================

        finalizeDetectedLocation(
          best,
          requestId
        );
      }, 10000);
  };

  // =====================================================
  // MAP LOCATION SELECTED MANUALLY
  // =====================================================

  const handleMapLocationSelect = async (
    latitude,
    longitude
  ) => {
    // Stop GPS detection if it is still running.

    stopLocationDetection();

    // Invalidate current GPS request.

    locationRequestIdRef.current += 1;

    // Invalidate old reverse-geocode request.

    reverseGeocodeRequestRef.current += 1;

    setError("");
    setSuccess("");

    setGettingLocation(true);

    setLocationSource(
      "Selected manually on map"
    );

    setLocationAccuracy(null);

    // =================================================
    // SET EXACT MAP POINTER
    // =================================================

    setMapPosition([
      latitude,
      longitude,
    ]);

    // =================================================
    // SAVE EXACT CLICKED COORDINATES
    // =================================================

    setFormData((prev) => ({
      ...prev,

      latitude:
        latitude.toFixed(7),

      longitude:
        longitude.toFixed(7),
    }));

    setLocationStatus(
      "Exact map location selected. Getting address..."
    );

    // =================================================
    // REVERSE GEOCODE
    // =================================================

    await reverseGeocodeLocation(
      latitude,
      longitude,
      locationRequestIdRef.current
    );

    setGettingLocation(false);
  };

  // =====================================================
  // CENTER MAP ON CURRENT SAVED LOCATION
  // =====================================================

  const handleCenterOnMarker = () => {
    if (!mapPosition) {
      return;
    }

    setShowMap(true);

    // MapViewController automatically handles
    // centering when mapPosition exists.
  };

  // =====================================================
  // REGISTRATION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -----------------------------------------------------
    // BASIC VALIDATION
    // -----------------------------------------------------

    if (!formData.fullName.trim()) {
      setError(
        "Please enter your full name."
      );

      return;
    }

    if (
      !formData.age ||
      Number(formData.age) < 19
    ) {
      setError(
        "Workers must be 19 years or older."
      );

      return;
    }

    if (
      Number(formData.age) > 100
    ) {
      setError(
        "Please provide a valid age."
      );

      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    if (
      formData.password.length < 8
    ) {
      setError(
        "Password must be at least 8 characters."
      );

      return;
    }

    if (
      !/^[6-9][0-9]{9}$/.test(
        formData.mobile
      )
    ) {
      setError(
        "Please provide a valid 10-digit Indian mobile number."
      );

      return;
    }

    if (
      formData.experienceYears === ""
    ) {
      setError(
        "Please enter your experience."
      );

      return;
    }

    if (
      Number(formData.experienceYears) < 0
    ) {
      setError(
        "Experience cannot be negative."
      );

      return;
    }

    // -----------------------------------------------------
    // CATEGORY + PRICING
    // -----------------------------------------------------

    if (!recommendedRange) {
      setError(
        "Please select your work category and enter your experience."
      );

      return;
    }

    const workerCharge =
      Number(formData.charges);

    if (
      Number.isNaN(workerCharge) ||
      workerCharge <= 0
    ) {
      setError(
        "Please enter a valid hourly service charge."
      );

      return;
    }

    if (workerCharge > 500) {
      setError(
        "Worker service charge cannot exceed ₹500 per hour."
      );

      return;
    }

    if (
      workerCharge <
        recommendedRange.min ||
      workerCharge >
        recommendedRange.max
    ) {
      setError(
        `Your hourly charge should be between ₹${recommendedRange.min} and ₹${recommendedRange.max} for your category and experience.`
      );

      return;
    }

    // -----------------------------------------------------
    // LOCATION VALIDATION
    // -----------------------------------------------------

    if (
      !formData.latitude ||
      !formData.longitude
    ) {
      setError(
        "Please detect your current location or select your exact location on the map."
      );

      setShowMap(true);

      return;
    }

    if (
      !formData.state.trim()
    ) {
      setError(
        "Please provide your state."
      );

      return;
    }

    if (
      !formData.district.trim()
    ) {
      setError(
        "Please provide your district."
      );

      return;
    }

    if (
      !formData.city.trim()
    ) {
      setError(
        "Please provide your city or town."
      );

      return;
    }

    if (!formData.terms) {
      setError(
        "Please agree to the Terms and Conditions."
      );

      return;
    }

    // -----------------------------------------------------
    // DATA SENT TO BACKEND
    // -----------------------------------------------------

    const workerData = {
      fullName:
        formData.fullName.trim(),

      mobile:
        formData.mobile.trim(),

      email:
        formData.email.trim(),

      password:
        formData.password,

      category:
        formData.category,

      age:
        Number(formData.age),

      experienceYears:
        Number(
          formData.experienceYears
        ),

      charges:
        Number(formData.charges),

      state:
        formData.state.trim(),

      district:
        formData.district.trim(),

      city:
        formData.city.trim(),

      area:
        formData.area.trim(),

      latitude:
        Number(formData.latitude),

      longitude:
        Number(formData.longitude),

      about:
        formData.about.trim(),
    };

    console.log(
      "Worker registration data:",
      workerData
    );

    // -----------------------------------------------------
    // API REQUEST
    // -----------------------------------------------------

    try {
      setLoading(true);

      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/register/worker`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                workerData
              ),
          }
        );

      const contentType =
        response.headers.get(
          "content-type"
        );

      let result = null;

      if (
        contentType &&
        contentType.includes(
          "application/json"
        )
      ) {
        const text =
          await response.text();

        if (text) {
          try {
            result =
              JSON.parse(text);
          } catch {
            result = null;
          }
        }
      } else {
        const text =
          await response.text();

        if (text) {
          result = {
            message: text,
          };
        }
      }

      // -----------------------------------------------------
      // API ERROR
      // -----------------------------------------------------

      if (!response.ok) {
        let errorMessage =
          "Worker registration failed.";

        if (result?.message) {
          errorMessage =
            result.message;
        } else if (result?.error) {
          errorMessage =
            result.error;
        } else if (
          response.status === 409
        ) {
          errorMessage =
            "Email or mobile number is already registered.";
        } else if (
          response.status === 400
        ) {
          errorMessage =
            "Please check your registration details.";
        } else if (
          response.status === 500
        ) {
          errorMessage =
            "Server error. Please try again later.";
        }

        throw new Error(
          errorMessage
        );
      }

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      setSuccess(
        result?.message ||
          "Worker registered successfully!"
      );

      // -----------------------------------------------------
      // CLEAR FORM
      // -----------------------------------------------------

      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",

        category: "",
        age: "",
        experienceYears: "",
        charges: "",
        about: "",

        state: "",
        district: "",
        city: "",
        area: "",

        latitude: "",
        longitude: "",

        terms: false,
      });

      setMapPosition(null);

      setShowMap(false);

      setLocationStatus("");

      setLocationAccuracy(null);

      setLocationSource("");

      locationReadingsRef.current =
        [];
    } catch (err) {
      console.error(
        "Worker registration error:",
        err
      );

      setError(
        err.message ||
          "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // MAP DEFAULT POSITION
  // =====================================================

  const defaultMapPosition =
    mapPosition || [
      20.5937,
      78.9629,
    ];

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <style>{`
        .register-input-box input[type="number"]::-webkit-inner-spin-button,
        .register-input-box input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .register-input-box input[type="number"] {
          -moz-appearance: textfield;
          appearance: textfield;
        }

        .worker-location-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .map-location-button,
        .register-location-button,
        .map-center-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          border: none;
          border-radius: 9px;
          cursor: pointer;
          font-weight: 600;
        }

        .register-location-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .map-center-button {
          margin-top: 10px;
        }

        .worker-map-container {
          margin-top: 15px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #ddd;
        }

        .worker-map-help {
          padding: 12px;
          font-size: 13px;
          background: #f7f7f7;
          line-height: 1.5;
        }

        .worker-map-help strong {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .worker-map-status {
          padding: 10px 12px;
          font-size: 13px;
          background: #fff;
          border-top: 1px solid #eee;
        }

        .worker-map-accuracy {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 5px;
          font-size: 13px;
        }

        .register-location-status {
          margin-top: 9px;
          font-size: 13px;
          line-height: 1.5;
        }

        .register-location-detected {
          margin-top: 10px;
          padding: 12px;
          border-radius: 9px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .register-location-detected small {
          display: block;
          margin-top: 4px;
          line-height: 1.5;
        }

        .location-coordinate-preview {
          margin-top: 8px;
          font-size: 12px;
          line-height: 1.5;
          word-break: break-all;
        }
      `}</style>

      <div className="register-page">

        <div className="register-layout">

          {/* =====================================================
              LEFT SIDE
          ====================================================== */}

          <section className="register-content">

            <div className="register-content-inner">

              <div className="register-brand">

                <div className="register-brand-icon">
                  <Briefcase size={28} />
                </div>

                <div>
                  <h2>
                    Worker<span> Spot</span>
                  </h2>

                  <p>
                    Opportunities for skilled workers
                  </p>
                </div>

              </div>

              <div className="register-badge">

                <Sparkles size={15} />

                <span>
                  Join Worker Spot
                </span>

              </div>

              <div className="register-message">

                <h1>
                  Turn your{" "}
                  <span>skills</span>{" "}
                  into opportunities.
                </h1>

                <p>
                  Create your Worker Spot account
                  and connect with customers looking
                  for skilled workers in your area.
                </p>

              </div>

              <div className="register-features">

                <div className="register-feature">

                  <div className="feature-icon">
                    <HandCoins size={20} />
                  </div>

                  <div>
                    <h3>
                      No registration fees
                    </h3>

                    <p>
                      Worker Spot does not charge
                      workers to join.
                    </p>
                  </div>

                </div>

                <div className="register-feature">

                  <div className="feature-icon">
                    <CheckCircle size={20} />
                  </div>

                  <div>
                    <h3>
                      Keep your earnings
                    </h3>

                    <p>
                      Your service charges are yours.
                    </p>
                  </div>

                </div>

                <div className="register-feature">

                  <div className="feature-icon">
                    <Clock size={20} />
                  </div>

                  <div>
                    <h3>
                      Work on your terms
                    </h3>

                    <p>
                      Choose when and which services
                      you accept.
                    </p>
                  </div>

                </div>

                <div className="register-feature">

                  <div className="feature-icon">
                    <Users size={20} />
                  </div>

                  <div>
                    <h3>
                      Connect with customers
                    </h3>

                    <p>
                      Get opportunities from
                      customers nearby.
                    </p>
                  </div>

                </div>

              </div>

              <div className="register-side-note">

                <ShieldCheck size={18} />

                <span>
                  You remain an independent
                  service provider.
                </span>

              </div>

            </div>

          </section>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <section className="register-form-side">

            <div className="register-container">

              <div className="register-header">

                <div className="register-icon">
                  <UserPlus size={27} />
                </div>

                <h1>
                  Create Worker Account
                </h1>

                <p>
                  Register as a worker and start
                  receiving opportunities.
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                {/* =================================================
                    PERSONAL INFORMATION
                ================================================= */}

                <div className="register-form-group">

                  <label>
                    Full Name
                  </label>

                  <div className="register-input-box">

                    <User size={19} />

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                </div>

                <div className="register-form-group">

                  <label>
                    Mobile Number
                  </label>

                  <div className="register-input-box">

                    <Phone size={19} />

                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter your mobile number"
                      value={
                        formData.mobile
                      }
                      onChange={
                        handleChange
                      }
                      pattern="[6-9][0-9]{9}"
                      maxLength="10"
                      required
                    />

                  </div>

                </div>

                <div className="register-form-group">

                  <label>
                    Email Address
                  </label>

                  <div className="register-input-box">

                    <Mail size={19} />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                </div>

                <div className="register-form-group">

                  <label>
                    Password
                  </label>

                  <div className="register-input-box">

                    <Lock size={19} />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Create a password"
                      value={
                        formData.password
                      }
                      onChange={
                        handleChange
                      }
                      minLength="8"
                      required
                    />

                    <button
                      type="button"
                      className="register-password-button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                <div className="register-form-group">

                  <label>
                    Confirm Password
                  </label>

                  <div className="register-input-box">

                    <Lock size={19} />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={
                        formData.confirmPassword
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                    <button
                      type="button"
                      className="register-password-button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* =================================================
                    WORKER INFORMATION
                ================================================= */}

                <div className="register-form-group">

                  <label>
                    Work Category
                  </label>

                  <div className="register-input-box">

                    <Briefcase size={19} />

                    <select
                      name="category"
                      value={
                        formData.category
                      }
                      onChange={
                        handleChange
                      }
                      required
                    >

                      <option value="">
                        Select your category
                      </option>

                      <option value="Plumber">
                        Plumber
                      </option>

                      <option value="Electrician">
                        Electrician
                      </option>

                      <option value="Carpenter">
                        Carpenter
                      </option>

                      <option value="Mechanic">
                        Mechanic
                      </option>

                      <option value="Painter">
                        Painter
                      </option>

                      <option value="AC Technician">
                        AC Technician
                      </option>

                      <option value="Mason">
                        Mason
                      </option>

                      <option value="Welder">
                        Welder
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>

                </div>

                <div className="register-form-group">

                  <label>
                    Age
                  </label>

                  <div className="register-input-box">

                    <Calendar size={19} />

                    <input
                      type="number"
                      name="age"
                      placeholder="Enter your age"
                      min="19"
                      max="100"
                      value={
                        formData.age
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  <small>
                    Workers must be 19 years or older.
                  </small>

                </div>

                <div className="register-form-group">

                  <label>
                    Experience
                  </label>

                  <div className="register-input-box">

                    <Wrench size={19} />

                    <input
                      type="number"
                      name="experienceYears"
                      placeholder="Years of experience"
                      min="0"
                      value={
                        formData.experienceYears
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  <small>
                    Enter your total professional
                    experience in years.
                  </small>

                </div>

                {/* =================================================
                    SERVICE CHARGES
                ================================================= */}

                <div className="register-form-group">

                  <label>
                    Service Charge (per hour)
                  </label>

                  {recommendedRange && (
                    <div className="pricing-recommendation">

                      <IndianRupee size={17} />

                      <div>

                        <strong>
                          Recommended: ₹
                          {recommendedRange.min}
                          {" – ₹"}
                          {recommendedRange.max}
                          /hour
                        </strong>

                        <span>
                          Based on your category and experience.
                        </span>

                      </div>

                    </div>
                  )}

                  <div className="register-input-box">

                    <IndianRupee size={19} />

                    <input
                      type="number"
                      name="charges"
                      placeholder={
                        recommendedRange
                          ? `Enter ₹${recommendedRange.min}–₹${recommendedRange.max}`
                          : "Select category and experience first"
                      }
                      min={
                        recommendedRange?.min ||
                        0
                      }
                      max="500"
                      step="1"
                      value={
                        formData.charges
                      }
                      onChange={
                        handleChange
                      }
                      required
                      disabled={
                        !recommendedRange
                      }
                    />

                  </div>

                  <small>
                    Enter your normal hourly service charge
                    within the recommended range.
                  </small>

                </div>

                {/* =================================================
                    ABOUT
                ================================================= */}

                <div className="register-form-group">

                  <label>
                    About You
                  </label>

                  <div className="register-input-box register-textarea-box">

                    <FileText size={19} />

                    <textarea
                      name="about"
                      placeholder="Tell customers about your skills and experience"
                      value={
                        formData.about
                      }
                      onChange={
                        handleChange
                      }
                      maxLength="2000"
                      rows="4"
                    />

                  </div>

                  <small>
                    Maximum 2000 characters.
                  </small>

                </div>

                {/* =================================================
                    LOCATION
                ================================================= */}

                <div className="register-form-group">

                  <label>
                    Worker Location
                  </label>

                  <div className="worker-location-buttons">

                    <button
                      type="button"
                      className="register-location-button"
                      onClick={
                        handleUseCurrentLocation
                      }
                      disabled={
                        gettingLocation
                      }
                    >

                      <LocateFixed size={18} />

                      {gettingLocation
                        ? "Finding Fresh Location..."
                        : "Use Current Location"}

                    </button>

                    <button
                      type="button"
                      className="map-location-button"
                      onClick={() => {
                        setShowMap(
                          !showMap
                        );

                        setError("");
                      }}
                    >

                      <Map size={18} />

                      {showMap
                        ? "Hide Map"
                        : "Choose on Map"}

                    </button>

                  </div>

                  {locationStatus && (
                    <p className="register-location-status">
                      {locationStatus}
                    </p>
                  )}

                  {/* =================================================
                      MAP
                  ================================================= */}

                  {showMap && (
                    <div className="worker-map-container">

                      <div className="worker-map-help">

                        <strong>
                          <Target size={16} />

                          Verify your exact location
                        </strong>

                        <br />

                        The marker shows the location
                        detected by your device.

                        <br />

                        If the marker is not exactly where
                        you are, click directly on your
                        location on the map.

                      </div>

                      <MapContainer
                        center={
                          defaultMapPosition
                        }
                        zoom={
                          mapPosition
                            ? 17
                            : 5
                        }
                        scrollWheelZoom={
                          true
                        }
                        style={{
                          height:
                            "350px",
                          width:
                            "100%",
                        }}
                      >

                        <TileLayer
                          attribution='&copy; OpenStreetMap contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <MapViewController
                          position={
                            mapPosition
                          }
                        />

                        <MapClickHandler
                          onLocationSelect={
                            handleMapLocationSelect
                          }
                        />

                        {mapPosition && (
                          <Marker
                            position={
                              mapPosition
                            }
                          />
                        )}

                      </MapContainer>

                      <div className="worker-map-status">

                        {locationAccuracy !==
                          null && (
                          <div className="worker-map-accuracy">

                            <Navigation
                              size={15}
                            />

                            Device-reported accuracy:
                            approximately{" "}
                            <strong>
                              {Math.round(
                                locationAccuracy
                              )}{" "}
                              meters
                            </strong>

                          </div>
                        )}

                        {locationSource && (
                          <div className="location-coordinate-preview">

                            Source:{" "}
                            <strong>
                              {locationSource}
                            </strong>

                          </div>
                        )}

                        {mapPosition && (
                          <div className="location-coordinate-preview">

                            Coordinates:{" "}
                            {mapPosition[0].toFixed(
                              7
                            )}
                            ,{" "}
                            {mapPosition[1].toFixed(
                              7
                            )}

                          </div>
                        )}

                      </div>

                      {mapPosition && (
                        <button
                          type="button"
                          className="map-center-button"
                          onClick={
                            handleCenterOnMarker
                          }
                        >

                          <Navigation
                            size={17}
                          />

                          Center Map on Selected
                          Location

                        </button>
                      )}

                    </div>
                  )}

                </div>

                {/* =================================================
                    STATE
                ================================================= */}

                <div className="register-form-group">

                  <label>
                    State
                  </label>

                  <div className="register-input-box">

                    <MapPin size={19} />

                    <input
                      type="text"
                      name="state"
                      placeholder="Enter your state"
                      value={
                        formData.state
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                </div>

                {/* =================================================
                    DISTRICT
                ================================================= */}

                <div className="register-form-group">

                  <label>
                    District
                  </label>

                  <div className="register-input-box">

                    <MapPin size={19} />

                    <input
                      type="text"
                      name="district"
                      placeholder="Enter your district"
                      value={
                        formData.district
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                </div>

                {/* =================================================
                    CITY
                ================================================= */}

                <div className="register-form-group">

                  <label>
                    City / Town
                  </label>

                  <div className="register-input-box">

                    <MapPin size={19} />

                    <input
                      type="text"
                      name="city"
                      placeholder="Enter your city or town"
                      value={
                        formData.city
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                </div>

                {/* =================================================
                    AREA
                ================================================= */}

                <div className="register-form-group">

                  <label>
                    Area / Village
                  </label>

                  <div className="register-input-box">

                    <MapPin size={19} />

                    <input
                      type="text"
                      name="area"
                      placeholder="Enter your area or village"
                      value={
                        formData.area
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                </div>

                {/* =================================================
                    GPS CONFIRMATION
                ================================================= */}

                {formData.latitude &&
                  formData.longitude && (
                    <div className="register-location-detected">

                      <CheckCircle size={17} />

                      <div>

                        <strong>
                          Exact location saved
                        </strong>

                        <small>
                          The coordinates currently
                          shown on the map will be used
                          for nearby-worker matching.
                        </small>

                        <div className="location-coordinate-preview">

                          Latitude:{" "}
                          {formData.latitude}

                          <br />

                          Longitude:{" "}
                          {formData.longitude}

                        </div>

                      </div>

                    </div>
                  )}

                {/* =================================================
                    WORKER POLICY
                ================================================= */}

                <div className="worker-policy">

                  <div className="worker-policy-title">

                    <ShieldCheck size={19} />

                    <h3>
                      Worker Independence & No
                      Worker Fees
                    </h3>

                  </div>

                  <p>
                    Workers on Worker Spot are
                    independent service providers
                    and are not employees, agents,
                    partners, or representatives of
                    Worker Spot.
                  </p>

                  <p>
                    <strong>
                      Worker Spot does not charge
                      workers
                    </strong>{" "}
                    any registration fee,
                    subscription fee, booking fee,
                    commission, platform fee, or
                    service fee for using the
                    platform.
                  </p>

                  <p>
                    Workers independently decide
                    whether to accept service
                    requests and are responsible for
                    providing their services to
                    customers.
                  </p>

                </div>

                {/* =================================================
                    TERMS
                ================================================= */}

                <label className="register-terms">

                  <input
                    type="checkbox"
                    name="terms"
                    checked={
                      formData.terms
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                  <span>

                    I have read and agree to the{" "}

                    <a
                      href="/terms"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms & Conditions
                    </a>{" "}

                    and{" "}

                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .

                  </span>

                </label>

                {/* =================================================
                    SAFETY
                ================================================= */}

                <p className="registration-safety">

                  <ShieldCheck size={14} />

                  Please read our{" "}

                  <a
                    href="/safety"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Safety Guidelines
                  </a>{" "}

                  before using Worker Spot.

                </p>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                  <div className="register-error">
                    {error}
                  </div>
                )}

                {/* =================================================
                    SUCCESS
                ================================================= */}

                {success && (
                  <div className="register-success">

                    <CheckCircle size={18} />

                    <span>
                      {success}
                    </span>

                  </div>
                )}

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  className="register-button"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <Clock size={19} />

                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus size={19} />

                      Create Worker Account

                      <ArrowRight size={18} />

                    </>
                  )}

                </button>

              </form>

              {/* =================================================
                  LOGIN
              ================================================= */}

              <div className="register-login">

                <p>
                  Already have a Worker Spot account?
                </p>

                <a href="/worker-login">
                  Login as Worker
                </a>

              </div>

            </div>

          </section>

        </div>

      </div>
    </>
  );
}

export default Register;