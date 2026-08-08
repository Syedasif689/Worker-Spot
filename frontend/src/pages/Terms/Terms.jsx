import { useState } from "react";
import "./Terms.css";

const termsData = {
  English: {
    title: "Worker Spot - Terms & Conditions",
    intro:
      "Please read these Terms and Conditions carefully before using Worker Spot. By creating an account or using our services, you agree to follow these Terms.",
    sections: [
      {
        title: "1. About Worker Spot",
        text: [
          "Worker Spot is a platform designed to help customers discover and connect with local service workers.",
          "Worker Spot may facilitate communication, discovery, booking and service-related processes between customers and workers.",
          "Worker Spot does not automatically become the employer, employee, partner or legal representative of a worker merely because the worker uses the platform."
        ]
      },
      {
        title: "2. Eligibility",
        text: [
          "Users must provide accurate information during registration.",
          "A worker registering on Worker Spot must be at least 19 years old.",
          "Users must have the legal capacity required to enter into applicable agreements.",
          "Worker Spot may request additional information or verification where reasonably necessary."
        ]
      },
      {
        title: "3. Worker Registration",
        text: [
          "Workers must provide truthful information including their name, mobile number, email address, age, location and service category.",
          "Workers must not create an account using another person's identity or information.",
          "Workers are responsible for keeping their login credentials secure.",
          "Workers must update their profile when important information changes."
        ]
      },
      {
        title: "4. Customer Accounts",
        text: [
          "Customers must provide accurate registration information.",
          "Customers must not misuse another person's account.",
          "Customers are responsible for activity performed through their account."
        ]
      },
      {
        title: "5. Services and Bookings",
        text: [
          "Worker Spot helps customers find and connect with workers based on available information.",
          "Workers are responsible for performing the services they agree to provide.",
          "Customers and workers should clearly discuss the service requirements, charges, timing and other relevant conditions before the service begins.",
          "Worker Spot does not guarantee that a particular worker will always be available or that a service will be completed within a particular time."
        ]
      },
      {
        title: "6. Payments and Service Credits",
        text: [
          "Where Worker Spot uses a prepaid service-credit or top-up system, customers must complete the required payment before using the applicable service.",
          "A service credit may be used according to the service rules displayed by Worker Spot.",
          "Customers must not attempt to bypass, manipulate or fraudulently obtain service credits.",
          "Any applicable platform fees, service charges, taxes, refunds or expiry rules will be displayed to users before the relevant transaction where required.",
          "Worker Spot may investigate suspicious or fraudulent transactions and may restrict accounts involved in payment abuse."
        ]
      },
      {
        title: "7. Online and Offline Services",
        text: [
          "Worker Spot may support both online and offline service connection where the relevant feature is available.",
          "Offline functionality may depend on device capabilities, local connectivity, Bluetooth, Wi-Fi Direct or other supported communication methods.",
          "Users understand that offline communication may have technical limitations and may not provide all features available through the online system.",
          "Users must use offline features only for legitimate Worker Spot service interactions."
        ]
      },
      {
        title: "8. Location Information",
        text: [
          "Worker Spot may use location information to help customers discover workers in relevant areas.",
          "Users should provide accurate location information when required for service matching.",
          "Users must not falsely represent their location in order to mislead another user."
        ]
      },
      {
        title: "9. Worker Responsibilities",
        text: [
          "Workers must provide services honestly and professionally.",
          "Workers must not falsely claim qualifications, experience, certifications or skills.",
          "Workers must communicate their charges honestly.",
          "Workers must not intentionally damage customer property.",
          "Workers must respect customer privacy and must not misuse customer information.",
          "Workers must follow applicable laws, safety requirements and professional requirements relating to their work."
        ]
      },
      {
        title: "10. Customer Responsibilities",
        text: [
          "Customers must provide accurate information about the requested service.",
          "Customers must treat workers respectfully and must not threaten, harass, discriminate against or abuse workers.",
          "Customers must provide a reasonably safe environment for the agreed service.",
          "Customers must pay applicable charges according to the agreed service terms."
        ]
      },
      {
        title: "11. Safety Rules",
        text: [
          "Users should use reasonable precautions when meeting another person through the platform.",
          "Users should verify the identity and relevant details of the other party before allowing or beginning a service.",
          "Users must not request or perform illegal, dangerous or unlawful work through Worker Spot.",
          "Any suspected fraud, serious misconduct, threat or safety concern should be reported to Worker Spot as soon as reasonably possible.",
          "In an emergency, users should contact the appropriate emergency authorities rather than relying solely on Worker Spot."
        ]
      },
      {
        title: "12. Prohibited Activities",
        text: [
          "Fraud, impersonation or providing false information.",
          "Harassment, threats, abuse or discriminatory behaviour.",
          "Illegal services or activities.",
          "Attempts to steal, misuse or manipulate service credits or payments.",
          "Unauthorised access to another user's account or data.",
          "Uploading malicious software or attempting to damage Worker Spot systems.",
          "Using Worker Spot for spam, scams or other activities unrelated to legitimate services.",
          "Using another person's identity, phone number or personal information without permission."
        ]
      },
      {
        title: "13. Cancellations",
        text: [
          "Cancellation rules may depend on the type of service and the stage at which the cancellation occurs.",
          "Users should cancel as early as reasonably possible when they can no longer proceed with a booking.",
          "Worker Spot may apply reasonable cancellation rules or restrictions where repeated misuse is detected."
        ]
      },
      {
        title: "14. Refunds",
        text: [
          "Refund eligibility depends on the applicable payment, service and cancellation rules displayed by Worker Spot.",
          "A refund may be investigated where a service was not provided, a technical problem occurred, or an unauthorised transaction is reported.",
          "Fraudulent or abusive refund requests may be rejected and may result in account restrictions."
        ]
      },
      {
        title: "15. Reviews and Ratings",
        text: [
          "Users may be allowed to provide ratings and reviews based on their genuine experience.",
          "Reviews must be truthful, relevant and respectful.",
          "Users must not post fake reviews, manipulate ratings, threaten another user with a review or use reviews for harassment.",
          "Worker Spot may remove content that violates these Terms or applicable law."
        ]
      },
      {
        title: "16. Privacy and Personal Data",
        text: [
          "Worker Spot may collect and process personal information required to provide, secure and improve its services.",
          "Personal data may include information such as name, contact details, account information, location information and service-related information, depending on the features used.",
          "Worker Spot will handle personal data according to its Privacy Policy and applicable data-protection requirements.",
          "Users should not share unnecessary sensitive personal information through public profiles, reviews or service communications."
        ]
      },
      {
        title: "17. Account Suspension or Termination",
        text: [
          "Worker Spot may suspend, restrict or terminate an account when there is a reasonable basis to believe that the account has violated these Terms, applicable law, safety requirements or platform rules.",
          "Accounts may also be restricted where there is suspected fraud, abuse, security risk or misuse of the platform.",
          "Where appropriate, Worker Spot may provide an opportunity to resolve an issue before permanent termination."
        ]
      },
      {
        title: "18. Platform Availability",
        text: [
          "Worker Spot aims to keep its services available, but uninterrupted availability cannot be guaranteed.",
          "Services may temporarily become unavailable because of maintenance, technical failures, network problems, device limitations or circumstances beyond reasonable control."
        ]
      },
      {
        title: "19. Limitation of Responsibility",
        text: [
          "Worker Spot is a platform connecting customers and workers and should not be treated as a guarantee of the quality, legality, safety or outcome of every service provided by a worker.",
          "Users remain responsible for their own actions, agreements and interactions.",
          "Nothing in these Terms is intended to exclude or limit any liability or consumer right that cannot lawfully be excluded or limited under applicable law."
        ]
      },
      {
        title: "20. Disputes",
        text: [
          "Users should first contact Worker Spot to attempt to resolve platform-related complaints.",
          "Disputes will be handled according to applicable Indian law and the legally applicable dispute-resolution process.",
          "Nothing in these Terms removes rights or remedies that users have under applicable law."
        ]
      },
      {
        title: "21. Changes to These Terms",
        text: [
          "Worker Spot may update these Terms when necessary because of changes to the service, technology, security requirements or applicable law.",
          "Material changes will be communicated through reasonable means where required.",
          "Continued use of Worker Spot after an updated version becomes effective means that the user agrees to the updated Terms, subject to applicable law."
        ]
      },
      {
        title: "22. Contact",
        text: [
          "For questions, complaints, safety reports or account-related concerns, users should contact Worker Spot through the official support channel provided in the application."
        ]
      },
      {
        title: "23. Customer Fees, Free Services & Worker Fees",
        points: [
          "Worker Spot provides 4 free service bookings to each new customer/user. No Worker Spot platform fee is charged for these first 4 services.",
          "After a customer/user has used all 4 free service bookings, a ₹20 Worker Spot platform fee will apply to each subsequent service booking.",
          "The ₹20 platform fee is charged to the customer/user and is separate from the worker's service fee.",
          "Workers are independent service providers and are not employees, agents, partners, or representatives of Worker Spot.",
          "Workers are charged ₹0 by Worker Spot for using the platform.",
          "Worker Spot does not charge workers registration fees, subscription fees, booking fees, commissions, or platform fees.",
          "Workers receive the service fee they have described or agreed for the particular work.",
          "Worker Spot does not deduct the ₹20 customer platform fee from the worker's agreed service fee.",
          "The customer/user is responsible for the applicable Worker Spot platform fee after the 4 free services have been used.",
          "The worker is responsible for providing the agreed service to the customer and independently deciding whether to accept or decline a service request."
        ]
      }
    ]
  },

  // -------- Telugu (తెలుగు) --------
  Telugu: {
    title: "వర్కర్ స్పాట్ - నిబంధనలు మరియు షరతులు",
    intro:
      "వర్కర్ స్పాట్‌ను ఉపయోగించే ముందు ఈ నిబంధనలు మరియు షరతులను జాగ్రత్తగా చదవండి. ఖాతాను సృష్టించడం లేదా సేవలను ఉపయోగించడం ద్వారా మీరు ఈ నిబంధనలను అంగీకరిస్తారు.",
    sections: [
      // Sections 1–10 are the originally provided Telugu translations
      {
        title: "1. వర్కర్ స్పాట్ గురించి",
        text: [
          "వర్కర్ స్పాట్ స్థానిక సేవా కార్మికులను కనుగొని వారితో కనెక్ట్ అవ్వడానికి కస్టమర్లకు సహాయపడే ప్లాట్‌ఫారమ్.",
          "ప్లాట్‌ఫారమ్ అందుబాటులో ఉన్న ఫీచర్ల ఆధారంగా కస్టమర్లు మరియు కార్మికుల మధ్య కనెక్షన్, కమ్యూనికేషన్ మరియు బుకింగ్ ప్రక్రియలకు సహాయపడవచ్చు.",
          "కేవలం ప్లాట్‌ఫారమ్‌ను ఉపయోగించడం వల్ల కార్మికుడు వర్కర్ స్పాట్ ఉద్యోగి లేదా ప్రతినిధి అవడు."
        ]
      },
      {
        title: "2. అర్హత",
        text: [
          "రిజిస్ట్రేషన్ సమయంలో వినియోగదారులు నిజమైన సమాచారాన్ని ఇవ్వాలి.",
          "వర్కర్‌గా నమోదు చేసుకునే వ్యక్తి కనీసం 19 సంవత్సరాల వయస్సు కలిగి ఉండాలి.",
          "వర్తించే ఒప్పందాల్లోకి ప్రవేశించడానికి అవసరమైన చట్టపరమైన సామర్థ్యం వినియోగదారునికి ఉండాలి."
        ]
      },
      {
        title: "3. వర్కర్ నమోదు",
        text: [
          "పేరు, మొబైల్ నంబర్, ఇమెయిల్, వయస్సు, ప్రాంతం మరియు పని విభాగం వంటి వివరాలను నిజాయితీగా ఇవ్వాలి.",
          "ఇతర వ్యక్తి గుర్తింపు లేదా సమాచారాన్ని ఉపయోగించి ఖాతా సృష్టించకూడదు.",
          "లాగిన్ వివరాలను సురక్షితంగా ఉంచడం వర్కర్ బాధ్యత."
        ]
      },
      {
        title: "4. సేవలు మరియు బుకింగ్‌లు",
        text: [
          "వర్కర్ స్పాట్ అందుబాటులో ఉన్న సమాచారం ఆధారంగా కస్టమర్లను కార్మికులతో కనెక్ట్ చేయడంలో సహాయపడుతుంది.",
          "కార్మికుడు అంగీకరించిన సేవను బాధ్యతగా అందించాలి.",
          "సేవ ప్రారంభానికి ముందు పని, ఛార్జీలు మరియు సమయాన్ని స్పష్టంగా నిర్ధారించుకోవాలి."
        ]
      },
      {
        title: "5. చెల్లింపులు మరియు సర్వీస్ క్రెడిట్లు",
        text: [
          "ప్రీపెయిడ్ సర్వీస్ క్రెడిట్ విధానం ఉన్నప్పుడు, సంబంధిత సేవను ఉపయోగించే ముందు అవసరమైన చెల్లింపు చేయాలి.",
          "క్రెడిట్లను మోసం చేయడం లేదా దుర్వినియోగం చేయడం నిషేధం.",
          "రిఫండ్ మరియు రద్దు నియమాలు వర్తించే సందర్భంలో యాప్‌లో చూపబడతాయి."
        ]
      },
      {
        title: "6. భద్రత మరియు నిషేధిత చర్యలు",
        text: [
          "మోసం, నకిలీ గుర్తింపు, బెదిరింపు, వేధింపు, వివక్ష, అక్రమ సేవలు మరియు చెల్లింపు మోసం నిషేధించబడతాయి.",
          "ఇతర వినియోగదారుల వ్యక్తిగత సమాచారాన్ని దుర్వినియోగం చేయకూడదు.",
          "అక్రమ లేదా ప్రమాదకర పనులను ప్లాట్‌ఫారమ్ ద్వారా అభ్యర్థించకూడదు."
        ]
      },
      {
        title: "7. గోప్యత",
        text: [
          "సేవలను అందించడానికి అవసరమైన వ్యక్తిగత సమాచారాన్ని వర్కర్ స్పాట్ ప్రాసెస్ చేయవచ్చు.",
          "వ్యక్తిగత డేటా వర్తించే గోప్యతా చట్టాలు మరియు వర్కర్ స్పాట్ గోప్యతా విధానానికి అనుగుణంగా నిర్వహించబడుతుంది."
        ]
      },
      {
        title: "8. ఖాతా నిలిపివేత",
        text: [
          "నిబంధనల ఉల్లంఘన, మోసం, భద్రతా ప్రమాదం లేదా ప్లాట్‌ఫారమ్ దుర్వినియోగం జరిగినప్పుడు ఖాతాను పరిమితం చేయవచ్చు లేదా నిలిపివేయవచ్చు."
        ]
      },
      {
        title: "9. వివాదాలు",
        text: [
          "ముందుగా వర్కర్ స్పాట్ సపోర్ట్ ద్వారా సమస్యను పరిష్కరించడానికి ప్రయత్నించాలి.",
          "వర్తించే భారతీయ చట్టాల ప్రకారం వివాదాలు పరిష్కరించబడతాయి."
        ]
      },
      {
        title: "10. నిబంధనల మార్పులు",
        text: [
          "సేవ, సాంకేతికత, భద్రత లేదా చట్టపరమైన అవసరాల మార్పుల కారణంగా ఈ నిబంధనలను వర్కర్ స్పాట్ నవీకరించవచ్చు."
        ]
      },
      // ----- Sections 11–23 (English placeholder – to be translated) -----
      {
        title: "11. Safety Rules (Translation needed)",
        text: [
          "Users should use reasonable precautions when meeting another person through the platform.",
          "Users should verify the identity and relevant details of the other party before allowing or beginning a service.",
          "Users must not request or perform illegal, dangerous or unlawful work through Worker Spot.",
          "Any suspected fraud, serious misconduct, threat or safety concern should be reported to Worker Spot as soon as reasonably possible.",
          "In an emergency, users should contact the appropriate emergency authorities rather than relying solely on Worker Spot."
        ]
      },
      {
        title: "12. Prohibited Activities (Translation needed)",
        text: [
          "Fraud, impersonation or providing false information.",
          "Harassment, threats, abuse or discriminatory behaviour.",
          "Illegal services or activities.",
          "Attempts to steal, misuse or manipulate service credits or payments.",
          "Unauthorised access to another user's account or data.",
          "Uploading malicious software or attempting to damage Worker Spot systems.",
          "Using Worker Spot for spam, scams or other activities unrelated to legitimate services.",
          "Using another person's identity, phone number or personal information without permission."
        ]
      },
      {
        title: "13. Cancellations (Translation needed)",
        text: [
          "Cancellation rules may depend on the type of service and the stage at which the cancellation occurs.",
          "Users should cancel as early as reasonably possible when they can no longer proceed with a booking.",
          "Worker Spot may apply reasonable cancellation rules or restrictions where repeated misuse is detected."
        ]
      },
      {
        title: "14. Refunds (Translation needed)",
        text: [
          "Refund eligibility depends on the applicable payment, service and cancellation rules displayed by Worker Spot.",
          "A refund may be investigated where a service was not provided, a technical problem occurred, or an unauthorised transaction is reported.",
          "Fraudulent or abusive refund requests may be rejected and may result in account restrictions."
        ]
      },
      {
        title: "15. Reviews and Ratings (Translation needed)",
        text: [
          "Users may be allowed to provide ratings and reviews based on their genuine experience.",
          "Reviews must be truthful, relevant and respectful.",
          "Users must not post fake reviews, manipulate ratings, threaten another user with a review or use reviews for harassment.",
          "Worker Spot may remove content that violates these Terms or applicable law."
        ]
      },
      {
        title: "16. Privacy and Personal Data (Translation needed)",
        text: [
          "Worker Spot may collect and process personal information required to provide, secure and improve its services.",
          "Personal data may include information such as name, contact details, account information, location information and service-related information, depending on the features used.",
          "Worker Spot will handle personal data according to its Privacy Policy and applicable data-protection requirements.",
          "Users should not share unnecessary sensitive personal information through public profiles, reviews or service communications."
        ]
      },
      {
        title: "17. Account Suspension or Termination (Translation needed)",
        text: [
          "Worker Spot may suspend, restrict or terminate an account when there is a reasonable basis to believe that the account has violated these Terms, applicable law, safety requirements or platform rules.",
          "Accounts may also be restricted where there is suspected fraud, abuse, security risk or misuse of the platform.",
          "Where appropriate, Worker Spot may provide an opportunity to resolve an issue before permanent termination."
        ]
      },
      {
        title: "18. Platform Availability (Translation needed)",
        text: [
          "Worker Spot aims to keep its services available, but uninterrupted availability cannot be guaranteed.",
          "Services may temporarily become unavailable because of maintenance, technical failures, network problems, device limitations or circumstances beyond reasonable control."
        ]
      },
      {
        title: "19. Limitation of Responsibility (Translation needed)",
        text: [
          "Worker Spot is a platform connecting customers and workers and should not be treated as a guarantee of the quality, legality, safety or outcome of every service provided by a worker.",
          "Users remain responsible for their own actions, agreements and interactions.",
          "Nothing in these Terms is intended to exclude or limit any liability or consumer right that cannot lawfully be excluded or limited under applicable law."
        ]
      },
      {
        title: "20. Disputes (Translation needed)",
        text: [
          "Users should first contact Worker Spot to attempt to resolve platform-related complaints.",
          "Disputes will be handled according to applicable Indian law and the legally applicable dispute-resolution process.",
          "Nothing in these Terms removes rights or remedies that users have under applicable law."
        ]
      },
      {
        title: "21. Changes to These Terms (Translation needed)",
        text: [
          "Worker Spot may update these Terms when necessary because of changes to the service, technology, security requirements or applicable law.",
          "Material changes will be communicated through reasonable means where required.",
          "Continued use of Worker Spot after an updated version becomes effective means that the user agrees to the updated Terms, subject to applicable law."
        ]
      },
      {
        title: "22. Contact (Translation needed)",
        text: [
          "For questions, complaints, safety reports or account-related concerns, users should contact Worker Spot through the official support channel provided in the application."
        ]
      },
      {
        title: "23. Customer Fees, Free Services & Worker Fees (Translation needed)",
        points: [
          "Worker Spot provides 4 free service bookings to each new customer/user. No Worker Spot platform fee is charged for these first 4 services.",
          "After a customer/user has used all 4 free service bookings, a ₹20 Worker Spot platform fee will apply to each subsequent service booking.",
          "The ₹20 platform fee is charged to the customer/user and is separate from the worker's service fee.",
          "Workers are independent service providers and are not employees, agents, partners, or representatives of Worker Spot.",
          "Workers are charged ₹0 by Worker Spot for using the platform.",
          "Worker Spot does not charge workers registration fees, subscription fees, booking fees, commissions, or platform fees.",
          "Workers receive the service fee they have described or agreed for the particular work.",
          "Worker Spot does not deduct the ₹20 customer platform fee from the worker's agreed service fee.",
          "The customer/user is responsible for the applicable Worker Spot platform fee after the 4 free services have been used.",
          "The worker is responsible for providing the agreed service to the customer and independently deciding whether to accept or decline a service request."
        ]
      }
    ]
  },

  // -------- Hindi (हिन्दी) --------
  Hindi: {
    title: "वर्कर स्पॉट - नियम और शर्तें",
    intro:
      "Worker Spot का उपयोग करने से पहले इन नियमों और शर्तों को ध्यान से पढ़ें। खाता बनाने या सेवा का उपयोग करने का अर्थ है कि आप इन नियमों को स्वीकार करते हैं।",
    sections: [
      // Sections 1–10 (original Hindi translations)
      {
        title: "1. Worker Spot के बारे में",
        text: [
          "Worker Spot ग्राहकों को स्थानीय सेवा कर्मचारियों को खोजने और उनसे जुड़ने में सहायता करने वाला प्लेटफ़ॉर्म है।",
          "प्लेटफ़ॉर्म उपलब्ध सुविधाओं के अनुसार ग्राहकों और कर्मचारियों के बीच संपर्क, संचार और बुकिंग में सहायता कर सकता है।",
          "केवल प्लेटफ़ॉर्म का उपयोग करने से कोई कर्मचारी Worker Spot का कर्मचारी या प्रतिनिधि नहीं बन जाता।"
        ]
      },
      {
        title: "2. पात्रता",
        text: [
          "पंजीकरण के समय सही जानकारी देना आवश्यक है।",
          "Worker के रूप में पंजीकरण करने वाले व्यक्ति की आयु कम से कम 19 वर्ष होनी चाहिए।",
          "उपयोगकर्ता के पास लागू समझौते में प्रवेश करने की आवश्यक कानूनी क्षमता होनी चाहिए।"
        ]
      },
      {
        title: "3. Worker पंजीकरण",
        text: [
          "नाम, मोबाइल नंबर, ईमेल, आयु, स्थान और कार्य श्रेणी जैसी जानकारी सही देनी होगी।",
          "किसी अन्य व्यक्ति की पहचान या जानकारी का उपयोग करके खाता नहीं बनाया जा सकता।",
          "लॉगिन जानकारी की सुरक्षा उपयोगकर्ता की जिम्मेदारी है।"
        ]
      },
      {
        title: "4. सेवाएँ और बुकिंग",
        text: [
          "Worker Spot उपलब्ध जानकारी के आधार पर ग्राहकों को Workers से जोड़ने में सहायता करता है।",
          "Worker द्वारा स्वीकार की गई सेवा को जिम्मेदारी से पूरा करना आवश्यक है।",
          "सेवा शुरू होने से पहले काम, शुल्क और समय को स्पष्ट रूप से तय करना चाहिए।"
        ]
      },
      {
        title: "5. भुगतान और Service Credits",
        text: [
          "जहाँ prepaid service-credit प्रणाली उपलब्ध है, वहाँ संबंधित सेवा का उपयोग करने से पहले आवश्यक भुगतान करना होगा।",
          "Service Credits के साथ धोखाधड़ी या दुरुपयोग प्रतिबंधित है।",
          "लागू refund और cancellation नियम प्लेटफ़ॉर्म पर बताए जाएंगे।"
        ]
      },
      {
        title: "6. सुरक्षा और प्रतिबंधित गतिविधियाँ",
        text: [
          "धोखाधड़ी, गलत पहचान, धमकी, उत्पीड़न, भेदभाव, अवैध सेवाएँ और भुगतान धोखाधड़ी प्रतिबंधित हैं।",
          "दूसरे उपयोगकर्ताओं की व्यक्तिगत जानकारी का दुरुपयोग नहीं किया जा सकता।"
        ]
      },
      {
        title: "7. गोपनीयता",
        text: [
          "सेवा प्रदान करने के लिए आवश्यक व्यक्तिगत जानकारी को Worker Spot संसाधित कर सकता है।",
          "व्यक्तिगत डेटा लागू डेटा-सुरक्षा कानूनों और Worker Spot की Privacy Policy के अनुसार संभाला जाएगा।"
        ]
      },
      {
        title: "8. खाता निलंबन",
        text: [
          "नियमों के उल्लंघन, धोखाधड़ी, सुरक्षा जोखिम या प्लेटफ़ॉर्म के दुरुपयोग के कारण खाते को सीमित या निलंबित किया जा सकता है।"
        ]
      },
      {
        title: "9. विवाद",
        text: [
          "समस्या होने पर पहले Worker Spot Support से संपर्क करके समाधान का प्रयास करें।",
          "विवाद लागू भारतीय कानूनों के अनुसार संभाले जाएंगे।"
        ]
      },
      {
        title: "10. नियमों में बदलाव",
        text: [
          "सेवा, तकनीक, सुरक्षा या कानून में बदलाव के कारण Worker Spot इन नियमों को अपडेट कर सकता है।"
        ]
      },
      // ----- Sections 11–23 (English placeholder) -----
      {
        title: "11. Safety Rules (Translation needed)",
        text: [
          "Users should use reasonable precautions when meeting another person through the platform.",
          "Users should verify the identity and relevant details of the other party before allowing or beginning a service.",
          "Users must not request or perform illegal, dangerous or unlawful work through Worker Spot.",
          "Any suspected fraud, serious misconduct, threat or safety concern should be reported to Worker Spot as soon as reasonably possible.",
          "In an emergency, users should contact the appropriate emergency authorities rather than relying solely on Worker Spot."
        ]
      },
      {
        title: "12. Prohibited Activities (Translation needed)",
        text: [
          "Fraud, impersonation or providing false information.",
          "Harassment, threats, abuse or discriminatory behaviour.",
          "Illegal services or activities.",
          "Attempts to steal, misuse or manipulate service credits or payments.",
          "Unauthorised access to another user's account or data.",
          "Uploading malicious software or attempting to damage Worker Spot systems.",
          "Using Worker Spot for spam, scams or other activities unrelated to legitimate services.",
          "Using another person's identity, phone number or personal information without permission."
        ]
      },
      {
        title: "13. Cancellations (Translation needed)",
        text: [
          "Cancellation rules may depend on the type of service and the stage at which the cancellation occurs.",
          "Users should cancel as early as reasonably possible when they can no longer proceed with a booking.",
          "Worker Spot may apply reasonable cancellation rules or restrictions where repeated misuse is detected."
        ]
      },
      {
        title: "14. Refunds (Translation needed)",
        text: [
          "Refund eligibility depends on the applicable payment, service and cancellation rules displayed by Worker Spot.",
          "A refund may be investigated where a service was not provided, a technical problem occurred, or an unauthorised transaction is reported.",
          "Fraudulent or abusive refund requests may be rejected and may result in account restrictions."
        ]
      },
      {
        title: "15. Reviews and Ratings (Translation needed)",
        text: [
          "Users may be allowed to provide ratings and reviews based on their genuine experience.",
          "Reviews must be truthful, relevant and respectful.",
          "Users must not post fake reviews, manipulate ratings, threaten another user with a review or use reviews for harassment.",
          "Worker Spot may remove content that violates these Terms or applicable law."
        ]
      },
      {
        title: "16. Privacy and Personal Data (Translation needed)",
        text: [
          "Worker Spot may collect and process personal information required to provide, secure and improve its services.",
          "Personal data may include information such as name, contact details, account information, location information and service-related information, depending on the features used.",
          "Worker Spot will handle personal data according to its Privacy Policy and applicable data-protection requirements.",
          "Users should not share unnecessary sensitive personal information through public profiles, reviews or service communications."
        ]
      },
      {
        title: "17. Account Suspension or Termination (Translation needed)",
        text: [
          "Worker Spot may suspend, restrict or terminate an account when there is a reasonable basis to believe that the account has violated these Terms, applicable law, safety requirements or platform rules.",
          "Accounts may also be restricted where there is suspected fraud, abuse, security risk or misuse of the platform.",
          "Where appropriate, Worker Spot may provide an opportunity to resolve an issue before permanent termination."
        ]
      },
      {
        title: "18. Platform Availability (Translation needed)",
        text: [
          "Worker Spot aims to keep its services available, but uninterrupted availability cannot be guaranteed.",
          "Services may temporarily become unavailable because of maintenance, technical failures, network problems, device limitations or circumstances beyond reasonable control."
        ]
      },
      {
        title: "19. Limitation of Responsibility (Translation needed)",
        text: [
          "Worker Spot is a platform connecting customers and workers and should not be treated as a guarantee of the quality, legality, safety or outcome of every service provided by a worker.",
          "Users remain responsible for their own actions, agreements and interactions.",
          "Nothing in these Terms is intended to exclude or limit any liability or consumer right that cannot lawfully be excluded or limited under applicable law."
        ]
      },
      {
        title: "20. Disputes (Translation needed)",
        text: [
          "Users should first contact Worker Spot to attempt to resolve platform-related complaints.",
          "Disputes will be handled according to applicable Indian law and the legally applicable dispute-resolution process.",
          "Nothing in these Terms removes rights or remedies that users have under applicable law."
        ]
      },
      {
        title: "21. Changes to These Terms (Translation needed)",
        text: [
          "Worker Spot may update these Terms when necessary because of changes to the service, technology, security requirements or applicable law.",
          "Material changes will be communicated through reasonable means where required.",
          "Continued use of Worker Spot after an updated version becomes effective means that the user agrees to the updated Terms, subject to applicable law."
        ]
      },
      {
        title: "22. Contact (Translation needed)",
        text: [
          "For questions, complaints, safety reports or account-related concerns, users should contact Worker Spot through the official support channel provided in the application."
        ]
      },
      {
        title: "23. Customer Fees, Free Services & Worker Fees (Translation needed)",
        points: [
          "Worker Spot provides 4 free service bookings to each new customer/user. No Worker Spot platform fee is charged for these first 4 services.",
          "After a customer/user has used all 4 free service bookings, a ₹20 Worker Spot platform fee will apply to each subsequent service booking.",
          "The ₹20 platform fee is charged to the customer/user and is separate from the worker's service fee.",
          "Workers are independent service providers and are not employees, agents, partners, or representatives of Worker Spot.",
          "Workers are charged ₹0 by Worker Spot for using the platform.",
          "Worker Spot does not charge workers registration fees, subscription fees, booking fees, commissions, or platform fees.",
          "Workers receive the service fee they have described or agreed for the particular work.",
          "Worker Spot does not deduct the ₹20 customer platform fee from the worker's agreed service fee.",
          "The customer/user is responsible for the applicable Worker Spot platform fee after the 4 free services have been used.",
          "The worker is responsible for providing the agreed service to the customer and independently deciding whether to accept or decline a service request."
        ]
      }
    ]
  },

  // -------- Kannada (ಕನ್ನಡ) --------
  Kannada: {
    title: "ವರ್ಕರ್ ಸ್ಪಾಟ್ - ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",
    intro:
      "Worker Spot ಬಳಸುವ ಮೊದಲು ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಗಮನದಿಂದ ಓದಿ. ಖಾತೆ ರಚಿಸುವುದು ಅಥವಾ ಸೇವೆ ಬಳಸುವುದು ಈ ನಿಯಮಗಳನ್ನು ಒಪ್ಪಿಕೊಂಡಿರುವುದನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
    sections: [
      // Sections 1–10 (original Kannada translations)
      {
        title: "1. Worker Spot ಬಗ್ಗೆ",
        text: [
          "Worker Spot ಗ್ರಾಹಕರಿಗೆ ಸ್ಥಳೀಯ ಸೇವಾ ಕಾರ್ಮಿಕರನ್ನು ಹುಡುಕಲು ಮತ್ತು ಸಂಪರ್ಕಿಸಲು ಸಹಾಯ ಮಾಡುವ ವೇದಿಕೆಯಾಗಿದೆ.",
          "ಲಭ್ಯವಿರುವ ವೈಶಿಷ್ಟ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ ಗ್ರಾಹಕರು ಮತ್ತು ಕಾರ್ಮಿಕರ ನಡುವೆ ಸಂಪರ್ಕ ಮತ್ತು ಬುಕಿಂಗ್ ಪ್ರಕ್ರಿಯೆಗೆ ವೇದಿಕೆ ಸಹಾಯ ಮಾಡಬಹುದು.",
          "ವೇದಿಕೆಯನ್ನು ಬಳಸುವುದರಿಂದ ಮಾತ್ರ ಕಾರ್ಮಿಕರು Worker Spot ನ ಉದ್ಯೋಗಿ ಅಥವಾ ಪ್ರತಿನಿಧಿಯಾಗುವುದಿಲ್ಲ."
        ]
      },
      {
        title: "2. ಅರ್ಹತೆ",
        text: [
          "ನೋಂದಣಿ ಸಮಯದಲ್ಲಿ ಸರಿಯಾದ ಮಾಹಿತಿಯನ್ನು ನೀಡಬೇಕು.",
          "Worker ಆಗಿ ನೋಂದಾಯಿಸುವ ವ್ಯಕ್ತಿಯ ವಯಸ್ಸು ಕನಿಷ್ಠ 19 ವರ್ಷ ಇರಬೇಕು.",
          "ಅಗತ್ಯವಿರುವ ಕಾನೂನುಬದ್ಧ ಸಾಮರ್ಥ್ಯ ಬಳಕೆದಾರರಿಗೆ ಇರಬೇಕು."
        ]
      },
      {
        title: "3. Worker ನೋಂದಣಿ",
        text: [
          "ಹೆಸರು, ಮೊಬೈಲ್ ಸಂಖ್ಯೆ, ಇಮೇಲ್, ವಯಸ್ಸು, ಸ್ಥಳ ಮತ್ತು ಕೆಲಸದ ವರ್ಗದ ಮಾಹಿತಿಯನ್ನು ನಿಖರವಾಗಿ ನೀಡಬೇಕು.",
          "ಇನ್ನೊಬ್ಬರ ಗುರುತು ಅಥವಾ ಮಾಹಿತಿಯನ್ನು ಬಳಸಿಕೊಂಡು ಖಾತೆ ತೆರೆಯಬಾರದು.",
          "ಲಾಗಿನ್ ಮಾಹಿತಿಯ ಸುರಕ್ಷತೆ ಬಳಕೆದಾರರ ಜವಾಬ್ದಾರಿ."
        ]
      },
      {
        title: "4. ಸೇವೆಗಳು ಮತ್ತು ಬುಕಿಂಗ್",
        text: [
          "Worker Spot ಲಭ್ಯವಿರುವ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಗ್ರಾಹಕರನ್ನು Workers ಜೊತೆ ಸಂಪರ್ಕಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
          "Worker ಒಪ್ಪಿಕೊಂಡ ಸೇವೆಯನ್ನು ಜವಾಬ್ದಾರಿಯಿಂದ ಒದಗಿಸಬೇಕು.",
          "ಸೇವೆ ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಕೆಲಸ, ಶುಲ್ಕ ಮತ್ತು ಸಮಯವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ನಿರ್ಧರಿಸಬೇಕು."
        ]
      },
      {
        title: "5. ಪಾವತಿಗಳು ಮತ್ತು Service Credits",
        text: [
          "Prepaid service-credit ವ್ಯವಸ್ಥೆ ಅನ್ವಯಿಸಿದರೆ, ಸೇವೆ ಬಳಸುವ ಮೊದಲು ಅಗತ್ಯ ಪಾವತಿಯನ್ನು ಮಾಡಬೇಕು.",
          "Service Credits ಅನ್ನು ಮೋಸದಿಂದ ಪಡೆಯುವುದು ಅಥವಾ ದುರುಪಯೋಗ ಮಾಡುವುದು ನಿಷೇಧಿತ.",
          "ಅನ್ವಯಿಸುವ refund ಮತ್ತು cancellation ನಿಯಮಗಳನ್ನು ವೇದಿಕೆಯಲ್ಲಿ ತಿಳಿಸಲಾಗುತ್ತದೆ."
        ]
      },
      {
        title: "6. ಸುರಕ್ಷತೆ ಮತ್ತು ನಿಷೇಧಿತ ಚಟುವಟಿಕೆಗಳು",
        text: [
          "ಮೋಸ, ಸುಳ್ಳು ಗುರುತು, ಬೆದರಿಕೆ, ಕಿರುಕುಳ, ಭೇದಭಾವ, ಕಾನೂನುಬಾಹಿರ ಸೇವೆಗಳು ಮತ್ತು ಪಾವತಿ ಮೋಸ ನಿಷೇಧಿತ.",
          "ಇತರ ಬಳಕೆದಾರರ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ದುರುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳಬಾರದು."
        ]
      },
      {
        title: "7. ಗೌಪ್ಯತೆ",
        text: [
          "ಸೇವೆ ಒದಗಿಸಲು ಅಗತ್ಯವಿರುವ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು Worker Spot ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಬಹುದು.",
          "ವೈಯಕ್ತಿಕ ಡೇಟಾವನ್ನು ಅನ್ವಯಿಸುವ ಡೇಟಾ ಸಂರಕ್ಷಣಾ ಕಾನೂನುಗಳು ಮತ್ತು Privacy Policy ಪ್ರಕಾರ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ."
        ]
      },
      {
        title: "8. ಖಾತೆ ಅಮಾನತು",
        text: [
          "ನಿಯಮ ಉಲ್ಲಂಘನೆ, ಮೋಸ, ಸುರಕ್ಷತಾ ಅಪಾಯ ಅಥವಾ ವೇದಿಕೆಯ ದುರುಪಯೋಗದ ಸಂದರ್ಭದಲ್ಲಿ ಖಾತೆಯನ್ನು ನಿರ್ಬಂಧಿಸಬಹುದು ಅಥವಾ ಅಮಾನತುಗೊಳಿಸಬಹುದು."
        ]
      },
      {
        title: "9. ವಿವಾದಗಳು",
        text: [
          "ಸಮಸ್ಯೆ ಉಂಟಾದರೆ ಮೊದಲು Worker Spot Support ಅನ್ನು ಸಂಪರ್ಕಿಸಿ ಪರಿಹಾರ ಕಂಡುಕೊಳ್ಳಲು ಪ್ರಯತ್ನಿಸಬೇಕು.",
          "ವಿವಾದಗಳನ್ನು ಅನ್ವಯಿಸುವ ಭಾರತೀಯ ಕಾನೂನುಗಳ ಪ್ರಕಾರ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ."
        ]
      },
      {
        title: "10. ನಿಯಮಗಳ ಬದಲಾವಣೆ",
        text: [
          "ಸೇವೆ, ತಂತ್ರಜ್ಞಾನ, ಸುರಕ್ಷತೆ ಅಥವಾ ಕಾನೂನಿನ ಬದಲಾವಣೆಗಳಿಗೆ ಅನುಗುಣವಾಗಿ Worker Spot ಈ ನಿಯಮಗಳನ್ನು ನವೀಕರಿಸಬಹುದು."
        ]
      },
      // ----- Sections 11–23 (English placeholder) -----
      {
        title: "11. Safety Rules (Translation needed)",
        text: [
          "Users should use reasonable precautions when meeting another person through the platform.",
          "Users should verify the identity and relevant details of the other party before allowing or beginning a service.",
          "Users must not request or perform illegal, dangerous or unlawful work through Worker Spot.",
          "Any suspected fraud, serious misconduct, threat or safety concern should be reported to Worker Spot as soon as reasonably possible.",
          "In an emergency, users should contact the appropriate emergency authorities rather than relying solely on Worker Spot."
        ]
      },
      {
        title: "12. Prohibited Activities (Translation needed)",
        text: [
          "Fraud, impersonation or providing false information.",
          "Harassment, threats, abuse or discriminatory behaviour.",
          "Illegal services or activities.",
          "Attempts to steal, misuse or manipulate service credits or payments.",
          "Unauthorised access to another user's account or data.",
          "Uploading malicious software or attempting to damage Worker Spot systems.",
          "Using Worker Spot for spam, scams or other activities unrelated to legitimate services.",
          "Using another person's identity, phone number or personal information without permission."
        ]
      },
      {
        title: "13. Cancellations (Translation needed)",
        text: [
          "Cancellation rules may depend on the type of service and the stage at which the cancellation occurs.",
          "Users should cancel as early as reasonably possible when they can no longer proceed with a booking.",
          "Worker Spot may apply reasonable cancellation rules or restrictions where repeated misuse is detected."
        ]
      },
      {
        title: "14. Refunds (Translation needed)",
        text: [
          "Refund eligibility depends on the applicable payment, service and cancellation rules displayed by Worker Spot.",
          "A refund may be investigated where a service was not provided, a technical problem occurred, or an unauthorised transaction is reported.",
          "Fraudulent or abusive refund requests may be rejected and may result in account restrictions."
        ]
      },
      {
        title: "15. Reviews and Ratings (Translation needed)",
        text: [
          "Users may be allowed to provide ratings and reviews based on their genuine experience.",
          "Reviews must be truthful, relevant and respectful.",
          "Users must not post fake reviews, manipulate ratings, threaten another user with a review or use reviews for harassment.",
          "Worker Spot may remove content that violates these Terms or applicable law."
        ]
      },
      {
        title: "16. Privacy and Personal Data (Translation needed)",
        text: [
          "Worker Spot may collect and process personal information required to provide, secure and improve its services.",
          "Personal data may include information such as name, contact details, account information, location information and service-related information, depending on the features used.",
          "Worker Spot will handle personal data according to its Privacy Policy and applicable data-protection requirements.",
          "Users should not share unnecessary sensitive personal information through public profiles, reviews or service communications."
        ]
      },
      {
        title: "17. Account Suspension or Termination (Translation needed)",
        text: [
          "Worker Spot may suspend, restrict or terminate an account when there is a reasonable basis to believe that the account has violated these Terms, applicable law, safety requirements or platform rules.",
          "Accounts may also be restricted where there is suspected fraud, abuse, security risk or misuse of the platform.",
          "Where appropriate, Worker Spot may provide an opportunity to resolve an issue before permanent termination."
        ]
      },
      {
        title: "18. Platform Availability (Translation needed)",
        text: [
          "Worker Spot aims to keep its services available, but uninterrupted availability cannot be guaranteed.",
          "Services may temporarily become unavailable because of maintenance, technical failures, network problems, device limitations or circumstances beyond reasonable control."
        ]
      },
      {
        title: "19. Limitation of Responsibility (Translation needed)",
        text: [
          "Worker Spot is a platform connecting customers and workers and should not be treated as a guarantee of the quality, legality, safety or outcome of every service provided by a worker.",
          "Users remain responsible for their own actions, agreements and interactions.",
          "Nothing in these Terms is intended to exclude or limit any liability or consumer right that cannot lawfully be excluded or limited under applicable law."
        ]
      },
      {
        title: "20. Disputes (Translation needed)",
        text: [
          "Users should first contact Worker Spot to attempt to resolve platform-related complaints.",
          "Disputes will be handled according to applicable Indian law and the legally applicable dispute-resolution process.",
          "Nothing in these Terms removes rights or remedies that users have under applicable law."
        ]
      },
      {
        title: "21. Changes to These Terms (Translation needed)",
        text: [
          "Worker Spot may update these Terms when necessary because of changes to the service, technology, security requirements or applicable law.",
          "Material changes will be communicated through reasonable means where required.",
          "Continued use of Worker Spot after an updated version becomes effective means that the user agrees to the updated Terms, subject to applicable law."
        ]
      },
      {
        title: "22. Contact (Translation needed)",
        text: [
          "For questions, complaints, safety reports or account-related concerns, users should contact Worker Spot through the official support channel provided in the application."
        ]
      },
      {
        title: "23. Customer Fees, Free Services & Worker Fees (Translation needed)",
        points: [
          "Worker Spot provides 4 free service bookings to each new customer/user. No Worker Spot platform fee is charged for these first 4 services.",
          "After a customer/user has used all 4 free service bookings, a ₹20 Worker Spot platform fee will apply to each subsequent service booking.",
          "The ₹20 platform fee is charged to the customer/user and is separate from the worker's service fee.",
          "Workers are independent service providers and are not employees, agents, partners, or representatives of Worker Spot.",
          "Workers are charged ₹0 by Worker Spot for using the platform.",
          "Worker Spot does not charge workers registration fees, subscription fees, booking fees, commissions, or platform fees.",
          "Workers receive the service fee they have described or agreed for the particular work.",
          "Worker Spot does not deduct the ₹20 customer platform fee from the worker's agreed service fee.",
          "The customer/user is responsible for the applicable Worker Spot platform fee after the 4 free services have been used.",
          "The worker is responsible for providing the agreed service to the customer and independently deciding whether to accept or decline a service request."
        ]
      }
    ]
  },

  // -------- Tamil (தமிழ்) --------
  Tamil: {
    title: "வொர்க்கர் ஸ்பாட் - விதிமுறைகள் மற்றும் நிபந்தனைகள்",
    intro:
      "Worker Spot-ஐ பயன்படுத்துவதற்கு முன் இந்த விதிமுறைகள் மற்றும் நிபந்தனைகளை கவனமாக படிக்கவும். கணக்கை உருவாக்குவது அல்லது சேவையைப் பயன்படுத்துவது இந்த விதிமுறைகளை ஏற்றுக்கொள்வதாகும்.",
    sections: [
      // Sections 1–10 (original Tamil translations)
      {
        title: "1. Worker Spot பற்றி",
        text: [
          "Worker Spot வாடிக்கையாளர்கள் உள்ளூர் சேவைத் தொழிலாளர்களைக் கண்டறிந்து அவர்களுடன் தொடர்பு கொள்ள உதவும் ஒரு தளமாகும்.",
          "கிடைக்கும் அம்சங்களின் அடிப்படையில் வாடிக்கையாளர்கள் மற்றும் தொழிலாளர்களுக்கு இடையிலான தொடர்பு மற்றும் முன்பதிவுக்கு தளம் உதவலாம்.",
          "தளத்தைப் பயன்படுத்துவதால் மட்டும் தொழிலாளர் Worker Spot நிறுவனத்தின் ஊழியர் அல்லது பிரதிநிதியாக மாறமாட்டார்."
        ]
      },
      {
        title: "2. தகுதி",
        text: [
          "பதிவு செய்யும் போது சரியான தகவல்களை வழங்க வேண்டும்.",
          "Worker ஆக பதிவு செய்யும் நபர் குறைந்தது 19 வயது நிரம்பியவராக இருக்க வேண்டும்.",
          "பொருந்தும் ஒப்பந்தங்களில் நுழைவதற்குத் தேவையான சட்டபூர்வ திறன் பயனரிடம் இருக்க வேண்டும்."
        ]
      },
      {
        title: "3. Worker பதிவு",
        text: [
          "பெயர், மொபைல் எண், மின்னஞ்சல், வயது, இருப்பிடம் மற்றும் வேலை வகை போன்ற தகவல்கள் உண்மையாக இருக்க வேண்டும்.",
          "மற்றொருவரின் அடையாளத்தைப் பயன்படுத்தி கணக்கு உருவாக்கக்கூடாது.",
          "உள்நுழைவு தகவல்களை பாதுகாப்பாக வைத்திருப்பது பயனரின் பொறுப்பு."
        ]
      },
      {
        title: "4. சேவைகள் மற்றும் முன்பதிவுகள்",
        text: [
          "Worker Spot கிடைக்கும் தகவலின் அடிப்படையில் வாடிக்கையாளர்களை Workers உடன் இணைக்க உதவுகிறது.",
          "Worker ஏற்றுக்கொண்ட சேவையை பொறுப்புடன் வழங்க வேண்டும்.",
          "சேவை தொடங்குவதற்கு முன் வேலை, கட்டணம் மற்றும் நேரத்தை தெளிவாக உறுதி செய்ய வேண்டும்."
        ]
      },
      {
        title: "5. பணம் மற்றும் Service Credits",
        text: [
          "Prepaid service-credit முறை பயன்படுத்தப்படும் இடங்களில், சேவையைப் பயன்படுத்துவதற்கு முன் தேவையான கட்டணம் செலுத்த வேண்டும்.",
          "Service Credits-ஐ மோசடியாக பெறுவது அல்லது தவறாக பயன்படுத்துவது தடைசெய்யப்பட்டுள்ளது.",
          "பொருந்தும் refund மற்றும் cancellation விதிகள் தளத்தில் காட்டப்படும்."
        ]
      },
      {
        title: "6. பாதுகாப்பு மற்றும் தடைசெய்யப்பட்ட செயல்கள்",
        text: [
          "மோசடி, போலி அடையாளம், மிரட்டல், தொந்தரவு, பாகுபாடு, சட்டவிரோத சேவைகள் மற்றும் பண மோசடி தடைசெய்யப்பட்டவை.",
          "மற்ற பயனர்களின் தனிப்பட்ட தகவல்களை தவறாக பயன்படுத்தக்கூடாது."
        ]
      },
      {
        title: "7. தனியுரிமை",
        text: [
          "சேவைகளை வழங்க தேவையான தனிப்பட்ட தகவல்களை Worker Spot செயலாக்கலாம்.",
          "தனிப்பட்ட தரவு பொருந்தும் தரவு பாதுகாப்பு சட்டங்கள் மற்றும் Privacy Policy படி கையாளப்படும்."
        ]
      },
      {
        title: "8. கணக்கு இடைநிறுத்தம்",
        text: [
          "விதிமுறை மீறல், மோசடி, பாதுகாப்பு அபாயம் அல்லது தளத்தின் தவறான பயன்பாடு ஏற்பட்டால் கணக்கு கட்டுப்படுத்தப்படலாம் அல்லது இடைநிறுத்தப்படலாம்."
        ]
      },
      {
        title: "9. தகராறுகள்",
        text: [
          "பிரச்சினை ஏற்பட்டால் முதலில் Worker Spot Support-ஐ தொடர்பு கொண்டு தீர்வு காண முயற்சிக்க வேண்டும்.",
          "தகராறுகள் பொருந்தும் இந்திய சட்டங்களின்படி கையாளப்படும்."
        ]
      },
      {
        title: "10. விதிமுறைகளில் மாற்றங்கள்",
        text: [
          "சேவை, தொழில்நுட்பம், பாதுகாப்பு அல்லது சட்ட மாற்றங்களுக்கேற்ப Worker Spot இந்த விதிமுறைகளை புதுப்பிக்கலாம்."
        ]
      },
      // ----- Sections 11–23 (English placeholder) -----
      {
        title: "11. Safety Rules (Translation needed)",
        text: [
          "Users should use reasonable precautions when meeting another person through the platform.",
          "Users should verify the identity and relevant details of the other party before allowing or beginning a service.",
          "Users must not request or perform illegal, dangerous or unlawful work through Worker Spot.",
          "Any suspected fraud, serious misconduct, threat or safety concern should be reported to Worker Spot as soon as reasonably possible.",
          "In an emergency, users should contact the appropriate emergency authorities rather than relying solely on Worker Spot."
        ]
      },
      {
        title: "12. Prohibited Activities (Translation needed)",
        text: [
          "Fraud, impersonation or providing false information.",
          "Harassment, threats, abuse or discriminatory behaviour.",
          "Illegal services or activities.",
          "Attempts to steal, misuse or manipulate service credits or payments.",
          "Unauthorised access to another user's account or data.",
          "Uploading malicious software or attempting to damage Worker Spot systems.",
          "Using Worker Spot for spam, scams or other activities unrelated to legitimate services.",
          "Using another person's identity, phone number or personal information without permission."
        ]
      },
      {
        title: "13. Cancellations (Translation needed)",
        text: [
          "Cancellation rules may depend on the type of service and the stage at which the cancellation occurs.",
          "Users should cancel as early as reasonably possible when they can no longer proceed with a booking.",
          "Worker Spot may apply reasonable cancellation rules or restrictions where repeated misuse is detected."
        ]
      },
      {
        title: "14. Refunds (Translation needed)",
        text: [
          "Refund eligibility depends on the applicable payment, service and cancellation rules displayed by Worker Spot.",
          "A refund may be investigated where a service was not provided, a technical problem occurred, or an unauthorised transaction is reported.",
          "Fraudulent or abusive refund requests may be rejected and may result in account restrictions."
        ]
      },
      {
        title: "15. Reviews and Ratings (Translation needed)",
        text: [
          "Users may be allowed to provide ratings and reviews based on their genuine experience.",
          "Reviews must be truthful, relevant and respectful.",
          "Users must not post fake reviews, manipulate ratings, threaten another user with a review or use reviews for harassment.",
          "Worker Spot may remove content that violates these Terms or applicable law."
        ]
      },
      {
        title: "16. Privacy and Personal Data (Translation needed)",
        text: [
          "Worker Spot may collect and process personal information required to provide, secure and improve its services.",
          "Personal data may include information such as name, contact details, account information, location information and service-related information, depending on the features used.",
          "Worker Spot will handle personal data according to its Privacy Policy and applicable data-protection requirements.",
          "Users should not share unnecessary sensitive personal information through public profiles, reviews or service communications."
        ]
      },
      {
        title: "17. Account Suspension or Termination (Translation needed)",
        text: [
          "Worker Spot may suspend, restrict or terminate an account when there is a reasonable basis to believe that the account has violated these Terms, applicable law, safety requirements or platform rules.",
          "Accounts may also be restricted where there is suspected fraud, abuse, security risk or misuse of the platform.",
          "Where appropriate, Worker Spot may provide an opportunity to resolve an issue before permanent termination."
        ]
      },
      {
        title: "18. Platform Availability (Translation needed)",
        text: [
          "Worker Spot aims to keep its services available, but uninterrupted availability cannot be guaranteed.",
          "Services may temporarily become unavailable because of maintenance, technical failures, network problems, device limitations or circumstances beyond reasonable control."
        ]
      },
      {
        title: "19. Limitation of Responsibility (Translation needed)",
        text: [
          "Worker Spot is a platform connecting customers and workers and should not be treated as a guarantee of the quality, legality, safety or outcome of every service provided by a worker.",
          "Users remain responsible for their own actions, agreements and interactions.",
          "Nothing in these Terms is intended to exclude or limit any liability or consumer right that cannot lawfully be excluded or limited under applicable law."
        ]
      },
      {
        title: "20. Disputes (Translation needed)",
        text: [
          "Users should first contact Worker Spot to attempt to resolve platform-related complaints.",
          "Disputes will be handled according to applicable Indian law and the legally applicable dispute-resolution process.",
          "Nothing in these Terms removes rights or remedies that users have under applicable law."
        ]
      },
      {
        title: "21. Changes to These Terms (Translation needed)",
        text: [
          "Worker Spot may update these Terms when necessary because of changes to the service, technology, security requirements or applicable law.",
          "Material changes will be communicated through reasonable means where required.",
          "Continued use of Worker Spot after an updated version becomes effective means that the user agrees to the updated Terms, subject to applicable law."
        ]
      },
      {
        title: "22. Contact (Translation needed)",
        text: [
          "For questions, complaints, safety reports or account-related concerns, users should contact Worker Spot through the official support channel provided in the application."
        ]
      },
      {
        title: "23. Customer Fees, Free Services & Worker Fees (Translation needed)",
        points: [
          "Worker Spot provides 4 free service bookings to each new customer/user. No Worker Spot platform fee is charged for these first 4 services.",
          "After a customer/user has used all 4 free service bookings, a ₹20 Worker Spot platform fee will apply to each subsequent service booking.",
          "The ₹20 platform fee is charged to the customer/user and is separate from the worker's service fee.",
          "Workers are independent service providers and are not employees, agents, partners, or representatives of Worker Spot.",
          "Workers are charged ₹0 by Worker Spot for using the platform.",
          "Worker Spot does not charge workers registration fees, subscription fees, booking fees, commissions, or platform fees.",
          "Workers receive the service fee they have described or agreed for the particular work.",
          "Worker Spot does not deduct the ₹20 customer platform fee from the worker's agreed service fee.",
          "The customer/user is responsible for the applicable Worker Spot platform fee after the 4 free services have been used.",
          "The worker is responsible for providing the agreed service to the customer and independently deciding whether to accept or decline a service request."
        ]
      }
    ]
  },

  // -------- Malayalam (മലയാളം) --------
  Malayalam: {
    title: "വർകർ സ്പോട്ട് - നിബന്ധനകളും വ്യവസ്ഥകളും",
    intro:
      "Worker Spot ഉപയോഗിക്കുന്നതിന് മുമ്പ് ഈ നിബന്ധനകളും വ്യവസ്ഥകളും ശ്രദ്ധാപൂർവ്വം വായിക്കുക. അക്കൗണ്ട് സൃഷ്ടിക്കുകയോ സേവനം ഉപയോഗിക്കുകയോ ചെയ്യുന്നത് ഈ നിബന്ധനകൾ അംഗീകരിക്കുന്നതായിരിക്കും.",
    sections: [
      // Sections 1–10 (original Malayalam translations)
      {
        title: "1. Worker Spot കുറിച്ച്",
        text: [
          "പ്രാദേശിക സേവന തൊഴിലാളികളെ കണ്ടെത്താനും അവരുമായി ബന്ധപ്പെടാനും ഉപഭോക്താക്കളെ സഹായിക്കുന്ന ഒരു പ്ലാറ്റ്‌ഫോമാണ് Worker Spot.",
          "ലഭ്യമായ സൗകര്യങ്ങൾ അനുസരിച്ച് ഉപഭോക്താക്കളും തൊഴിലാളികളും തമ്മിലുള്ള ബന്ധം, ആശയവിനിമയം, ബുക്കിംഗ് എന്നിവയ്ക്ക് പ്ലാറ്റ്‌ഫോം സഹായിച്ചേക്കാം.",
          "പ്ലാറ്റ്‌ഫോം ഉപയോഗിക്കുന്നതിലൂടെ മാത്രം ഒരു തൊഴിലാളി Worker Spot-ന്റെ ജീവനക്കാരനോ പ്രതിനിധിയോ ആകുന്നില്ല."
        ]
      },
      {
        title: "2. യോഗ്യത",
        text: [
          "രജിസ്ട്രേഷൻ സമയത്ത് ശരിയായ വിവരങ്ങൾ നൽകണം.",
          "Worker ആയി രജിസ്റ്റർ ചെയ്യുന്ന വ്യക്തിക്ക് കുറഞ്ഞത് 19 വയസ്സ് ഉണ്ടായിരിക്കണം.",
          "ബാധകമായ കരാറുകളിൽ പ്രവേശിക്കാൻ ആവശ്യമായ നിയമപരമായ ശേഷി ഉപയോക്താവിന് ഉണ്ടായിരിക്കണം."
        ]
      },
      {
        title: "3. Worker രജിസ്ട്രേഷൻ",
        text: [
          "പേര്, മൊബൈൽ നമ്പർ, ഇമെയിൽ, പ്രായം, സ്ഥലം, ജോലി വിഭാഗം എന്നിവ ശരിയായി നൽകണം.",
          "മറ്റൊരാളുടെ തിരിച്ചറിയൽ വിവരങ്ങൾ ഉപയോഗിച്ച് അക്കൗണ്ട് സൃഷ്ടിക്കരുത്.",
          "ലോഗിൻ വിവരങ്ങളുടെ സുരക്ഷ ഉപയോക്താവിന്റെ ഉത്തരവാദിത്തമാണ്."
        ]
      },
      {
        title: "4. സേവനങ്ങളും ബുക്കിംഗുകളും",
        text: [
          "ലഭ്യമായ വിവരങ്ങളുടെ അടിസ്ഥാനത്തിൽ ഉപഭോക്താക്കളെ Workers-ുമായി ബന്ധിപ്പിക്കാൻ Worker Spot സഹായിക്കുന്നു.",
          "Worker ഏറ്റെടുത്ത സേവനം ഉത്തരവാദിത്തത്തോടെ നൽകണം.",
          "സേവനം ആരംഭിക്കുന്നതിന് മുമ്പ് ജോലി, നിരക്ക്, സമയം എന്നിവ വ്യക്തമായി തീരുമാനിക്കണം."
        ]
      },
      {
        title: "5. പേയ്‌മെന്റുകളും Service Credits-ഉം",
        text: [
          "Prepaid service-credit സംവിധാനം ബാധകമായിടത്ത് സേവനം ഉപയോഗിക്കുന്നതിന് മുമ്പ് ആവശ്യമായ പേയ്‌മെന്റ് നടത്തണം.",
          "Service Credits തട്ടിപ്പ് നടത്തുകയോ ദുരുപയോഗം ചെയ്യുകയോ ചെയ്യുന്നത് നിരോധിച്ചിരിക്കുന്നു.",
          "ബാധകമായ refund, cancellation നിയമങ്ങൾ പ്ലാറ്റ്‌ഫോമിൽ കാണിക്കും."
        ]
      },
      {
        title: "6. സുരക്ഷയും നിരോധിത പ്രവർത്തനങ്ങളും",
        text: [
          "തട്ടിപ്പ്, വ്യാജ തിരിച്ചറിയൽ, ഭീഷണി, ഉപദ്രവം, വിവേചനം, നിയമവിരുദ്ധ സേവനങ്ങൾ, പേയ്‌മെന്റ് തട്ടിപ്പ് എന്നിവ നിരോധിച്ചിരിക്കുന്നു.",
          "മറ്റ് ഉപയോക്താക്കളുടെ വ്യക്തിഗത വിവരങ്ങൾ ദുരുപയോഗം ചെയ്യരുത്."
        ]
      },
      {
        title: "7. സ്വകാര്യത",
        text: [
          "സേവനങ്ങൾ നൽകുന്നതിന് ആവശ്യമായ വ്യക്തിഗത വിവരങ്ങൾ Worker Spot പ്രോസസ്സ് ചെയ്യാം.",
          "വ്യക്തിഗത ഡാറ്റ ബാധകമായ ഡാറ്റാ സംരക്ഷണ നിയമങ്ങൾക്കും Privacy Policy-ക്കും അനുസരിച്ച് കൈകാര്യം ചെയ്യും."
        ]
      },
      {
        title: "8. അക്കൗണ്ട് സസ്പെൻഷൻ",
        text: [
          "നിയമലംഘനം, തട്ടിപ്പ്, സുരക്ഷാ അപകടം അല്ലെങ്കിൽ പ്ലാറ്റ്‌ഫോം ദുരുപയോഗം ഉണ്ടായാൽ അക്കൗണ്ട് നിയന്ത്രിക്കുകയോ സസ്പെൻഡ് ചെയ്യുകയോ ചെയ്യാം."
        ]
      },
      {
        title: "9. തർക്കങ്ങൾ",
        text: [
          "പ്രശ്നമുണ്ടെങ്കിൽ ആദ്യം Worker Spot Support-നെ ബന്ധപ്പെടുകയും പരിഹാരം കണ്ടെത്താൻ ശ്രമിക്കുകയും വേണം.",
          "തർക്കങ്ങൾ ബാധകമായ ഇന്ത്യൻ നിയമങ്ങൾ അനുസരിച്ച് കൈകാര്യം ചെയ്യും."
        ]
      },
      {
        title: "10. നിബന്ധനകളിലെ മാറ്റങ്ങൾ",
        text: [
          "സേവനം, സാങ്കേതികവിദ്യ, സുരക്ഷ, നിയമം എന്നിവയിലെ മാറ്റങ്ങൾക്കനുസരിച്ച് Worker Spot ഈ നിബന്ധനകൾ പുതുക്കാം."
        ]
      },
      // ----- Sections 11–23 (English placeholder) -----
      {
        title: "11. Safety Rules (Translation needed)",
        text: [
          "Users should use reasonable precautions when meeting another person through the platform.",
          "Users should verify the identity and relevant details of the other party before allowing or beginning a service.",
          "Users must not request or perform illegal, dangerous or unlawful work through Worker Spot.",
          "Any suspected fraud, serious misconduct, threat or safety concern should be reported to Worker Spot as soon as reasonably possible.",
          "In an emergency, users should contact the appropriate emergency authorities rather than relying solely on Worker Spot."
        ]
      },
      {
        title: "12. Prohibited Activities (Translation needed)",
        text: [
          "Fraud, impersonation or providing false information.",
          "Harassment, threats, abuse or discriminatory behaviour.",
          "Illegal services or activities.",
          "Attempts to steal, misuse or manipulate service credits or payments.",
          "Unauthorised access to another user's account or data.",
          "Uploading malicious software or attempting to damage Worker Spot systems.",
          "Using Worker Spot for spam, scams or other activities unrelated to legitimate services.",
          "Using another person's identity, phone number or personal information without permission."
        ]
      },
      {
        title: "13. Cancellations (Translation needed)",
        text: [
          "Cancellation rules may depend on the type of service and the stage at which the cancellation occurs.",
          "Users should cancel as early as reasonably possible when they can no longer proceed with a booking.",
          "Worker Spot may apply reasonable cancellation rules or restrictions where repeated misuse is detected."
        ]
      },
      {
        title: "14. Refunds (Translation needed)",
        text: [
          "Refund eligibility depends on the applicable payment, service and cancellation rules displayed by Worker Spot.",
          "A refund may be investigated where a service was not provided, a technical problem occurred, or an unauthorised transaction is reported.",
          "Fraudulent or abusive refund requests may be rejected and may result in account restrictions."
        ]
      },
      {
        title: "15. Reviews and Ratings (Translation needed)",
        text: [
          "Users may be allowed to provide ratings and reviews based on their genuine experience.",
          "Reviews must be truthful, relevant and respectful.",
          "Users must not post fake reviews, manipulate ratings, threaten another user with a review or use reviews for harassment.",
          "Worker Spot may remove content that violates these Terms or applicable law."
        ]
      },
      {
        title: "16. Privacy and Personal Data (Translation needed)",
        text: [
          "Worker Spot may collect and process personal information required to provide, secure and improve its services.",
          "Personal data may include information such as name, contact details, account information, location information and service-related information, depending on the features used.",
          "Worker Spot will handle personal data according to its Privacy Policy and applicable data-protection requirements.",
          "Users should not share unnecessary sensitive personal information through public profiles, reviews or service communications."
        ]
      },
      {
        title: "17. Account Suspension or Termination (Translation needed)",
        text: [
          "Worker Spot may suspend, restrict or terminate an account when there is a reasonable basis to believe that the account has violated these Terms, applicable law, safety requirements or platform rules.",
          "Accounts may also be restricted where there is suspected fraud, abuse, security risk or misuse of the platform.",
          "Where appropriate, Worker Spot may provide an opportunity to resolve an issue before permanent termination."
        ]
      },
      {
        title: "18. Platform Availability (Translation needed)",
        text: [
          "Worker Spot aims to keep its services available, but uninterrupted availability cannot be guaranteed.",
          "Services may temporarily become unavailable because of maintenance, technical failures, network problems, device limitations or circumstances beyond reasonable control."
        ]
      },
      {
        title: "19. Limitation of Responsibility (Translation needed)",
        text: [
          "Worker Spot is a platform connecting customers and workers and should not be treated as a guarantee of the quality, legality, safety or outcome of every service provided by a worker.",
          "Users remain responsible for their own actions, agreements and interactions.",
          "Nothing in these Terms is intended to exclude or limit any liability or consumer right that cannot lawfully be excluded or limited under applicable law."
        ]
      },
      {
        title: "20. Disputes (Translation needed)",
        text: [
          "Users should first contact Worker Spot to attempt to resolve platform-related complaints.",
          "Disputes will be handled according to applicable Indian law and the legally applicable dispute-resolution process.",
          "Nothing in these Terms removes rights or remedies that users have under applicable law."
        ]
      },
      {
        title: "21. Changes to These Terms (Translation needed)",
        text: [
          "Worker Spot may update these Terms when necessary because of changes to the service, technology, security requirements or applicable law.",
          "Material changes will be communicated through reasonable means where required.",
          "Continued use of Worker Spot after an updated version becomes effective means that the user agrees to the updated Terms, subject to applicable law."
        ]
      },
      {
        title: "22. Contact (Translation needed)",
        text: [
          "For questions, complaints, safety reports or account-related concerns, users should contact Worker Spot through the official support channel provided in the application."
        ]
      },
      {
        title: "23. Customer Fees, Free Services & Worker Fees (Translation needed)",
        points: [
          "Worker Spot provides 4 free service bookings to each new customer/user. No Worker Spot platform fee is charged for these first 4 services.",
          "After a customer/user has used all 4 free service bookings, a ₹20 Worker Spot platform fee will apply to each subsequent service booking.",
          "The ₹20 platform fee is charged to the customer/user and is separate from the worker's service fee.",
          "Workers are independent service providers and are not employees, agents, partners, or representatives of Worker Spot.",
          "Workers are charged ₹0 by Worker Spot for using the platform.",
          "Worker Spot does not charge workers registration fees, subscription fees, booking fees, commissions, or platform fees.",
          "Workers receive the service fee they have described or agreed for the particular work.",
          "Worker Spot does not deduct the ₹20 customer platform fee from the worker's agreed service fee.",
          "The customer/user is responsible for the applicable Worker Spot platform fee after the 4 free services have been used.",
          "The worker is responsible for providing the agreed service to the customer and independently deciding whether to accept or decline a service request."
        ]
      }
    ]
  }
};

function Terms() {
  const [language, setLanguage] = useState("English");

  const terms = termsData[language];

  return (
    <div className="terms-page">
      <div className="terms-container">

        <div className="terms-header">
          <h1>{terms.title}</h1>

          <p className="terms-intro">
            {terms.intro}
          </p>

          <div className="language-selector">
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Telugu">తెలుగు</option>
              <option value="Hindi">हिन्दी</option>
              <option value="Kannada">ಕನ್ನಡ</option>
              <option value="Tamil">தமிழ்</option>
              <option value="Malayalam">മലയാളം</option>
            </select>
          </div>
        </div>

        <div className="terms-content">
          {terms.sections.map((section, index) => (
            <section className="terms-section" key={index}>
              <h2>{section.title}</h2>

              {/* Render paragraphs if 'text' exists */}
              {section.text &&
                section.text.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}

              {/* Render bullet list if 'points' exists */}
              {section.points && (
                <ul>
                  {section.points.map((point, ptIdx) => (
                    <li key={ptIdx}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="terms-footer">
          <strong>Worker Spot</strong>
          <p>
            By using Worker Spot, you acknowledge that you have read
            and understood these Terms and Conditions.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Terms;