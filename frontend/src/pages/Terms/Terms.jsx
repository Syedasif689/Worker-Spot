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
    "వర్కర్ స్పాట్‌ను ఉపయోగించే ముందు ఈ నిబంధనలు మరియు షరతులను జాగ్రత్తగా చదవండి. ఖాతాను సృష్టించడం లేదా మా సేవలను ఉపయోగించడం ద్వారా మీరు ఈ నిబంధనలను అంగీకరిస్తారు.",

  sections: [
    {
      title: "1. వర్కర్ స్పాట్ గురించి",
      text: [
        "వర్కర్ స్పాట్ కస్టమర్లు స్థానిక సేవా కార్మికులను కనుగొని వారితో కనెక్ట్ అవ్వడానికి సహాయపడే ఒక ప్లాట్‌ఫారమ్.",
        "వర్కర్ స్పాట్ కస్టమర్లు మరియు కార్మికుల మధ్య కమ్యూనికేషన్, కార్మికుల అన్వేషణ, బుకింగ్ మరియు సేవలకు సంబంధించిన ప్రక్రియలకు సహాయపడవచ్చు.",
        "ఒక కార్మికుడు ప్లాట్‌ఫారమ్‌ను ఉపయోగించడం వల్ల మాత్రమే అతను లేదా ఆమె వర్కర్ స్పాట్ యొక్క ఉద్యోగి, భాగస్వామి, ఏజెంట్ లేదా చట్టపరమైన ప్రతినిధిగా మారరు."
      ]
    },

    {
      title: "2. అర్హత",
      text: [
        "రిజిస్ట్రేషన్ సమయంలో వినియోగదారులు ఖచ్చితమైన మరియు నిజమైన సమాచారాన్ని అందించాలి.",
        "వర్కర్ స్పాట్‌లో వర్కర్‌గా నమోదు చేసుకునే వ్యక్తికి కనీసం 19 సంవత్సరాల వయస్సు ఉండాలి.",
        "వర్తించే ఒప్పందాల్లోకి ప్రవేశించడానికి అవసరమైన చట్టపరమైన సామర్థ్యం వినియోగదారునికి ఉండాలి.",
        "అవసరమైన సందర్భాల్లో వర్కర్ స్పాట్ అదనపు సమాచారం లేదా ధృవీకరణను కోరవచ్చు."
      ]
    },

    {
      title: "3. వర్కర్ నమోదు",
      text: [
        "వర్కర్లు తమ పేరు, మొబైల్ నంబర్, ఇమెయిల్ చిరునామా, వయస్సు, ప్రాంతం మరియు సేవా విభాగం వంటి వివరాలను నిజాయితీగా అందించాలి.",
        "మరొక వ్యక్తి యొక్క గుర్తింపు లేదా సమాచారాన్ని ఉపయోగించి ఖాతాను సృష్టించకూడదు.",
        "తమ లాగిన్ వివరాలను సురక్షితంగా ఉంచడం వర్కర్ల బాధ్యత.",
        "ముఖ్యమైన సమాచారం మారినప్పుడు వర్కర్లు తమ ప్రొఫైల్‌ను నవీకరించాలి."
      ]
    },

    {
      title: "4. కస్టమర్ ఖాతాలు",
      text: [
        "కస్టమర్లు రిజిస్ట్రేషన్ సమయంలో ఖచ్చితమైన సమాచారాన్ని అందించాలి.",
        "మరొక వ్యక్తి యొక్క ఖాతాను దుర్వినియోగం చేయకూడదు.",
        "తమ ఖాతా ద్వారా జరిగే కార్యకలాపాలకు కస్టమర్లే బాధ్యత వహించాలి."
      ]
    },

    {
      title: "5. సేవలు మరియు బుకింగ్‌లు",
      text: [
        "అందుబాటులో ఉన్న సమాచారం ఆధారంగా కస్టమర్లు వర్కర్లను కనుగొని వారితో కనెక్ట్ అవ్వడానికి వర్కర్ స్పాట్ సహాయపడుతుంది.",
        "వర్కర్లు తాము అంగీకరించిన సేవలను బాధ్యతగా అందించాలి.",
        "సేవ ప్రారంభమయ్యే ముందు కస్టమర్ మరియు వర్కర్ సేవ అవసరాలు, ఛార్జీలు, సమయం మరియు ఇతర సంబంధిత విషయాలను స్పష్టంగా చర్చించుకోవాలి.",
        "ఒక నిర్దిష్ట వర్కర్ ఎల్లప్పుడూ అందుబాటులో ఉంటాడని లేదా ఒక సేవ నిర్దిష్ట సమయంలో పూర్తవుతుందని వర్కర్ స్పాట్ హామీ ఇవ్వదు."
      ]
    },

    {
      title: "6. చెల్లింపులు మరియు సర్వీస్ క్రెడిట్లు",
      text: [
        "వర్కర్ స్పాట్ ప్రీపెయిడ్ సర్వీస్ క్రెడిట్ లేదా టాప్-అప్ విధానాన్ని ఉపయోగించే సందర్భంలో, సంబంధిత సేవను ఉపయోగించే ముందు కస్టమర్లు అవసరమైన చెల్లింపును పూర్తి చేయాలి.",
        "సర్వీస్ క్రెడిట్‌ను వర్కర్ స్పాట్‌లో చూపించిన సేవా నియమాల ప్రకారం ఉపయోగించవచ్చు.",
        "సర్వీస్ క్రెడిట్లను తప్పించుకోవడానికి, మార్చడానికి లేదా మోసపూరితంగా పొందడానికి ప్రయత్నించకూడదు.",
        "వర్తించే ప్లాట్‌ఫారమ్ ఫీజులు, సేవా ఛార్జీలు, పన్నులు, రీఫండ్ లేదా గడువు నియమాలు అవసరమైనప్పుడు సంబంధిత లావాదేవీకి ముందు వినియోగదారులకు చూపించబడతాయి.",
        "అనుమానాస్పద లేదా మోసపూరిత లావాదేవీలను వర్కర్ స్పాట్ పరిశీలించవచ్చు మరియు చెల్లింపు దుర్వినియోగంలో పాల్గొన్న ఖాతాలను పరిమితం చేయవచ్చు."
      ]
    },

    {
      title: "7. ఆన్‌లైన్ మరియు ఆఫ్‌లైన్ సేవలు",
      text: [
        "సంబంధిత ఫీచర్ అందుబాటులో ఉన్నప్పుడు వర్కర్ స్పాట్ ఆన్‌లైన్ మరియు ఆఫ్‌లైన్ సేవా కనెక్షన్‌లకు మద్దతు ఇవ్వవచ్చు.",
        "ఆఫ్‌లైన్ ఫీచర్లు పరికర సామర్థ్యాలు, స్థానిక కనెక్టివిటీ, బ్లూటూత్, Wi-Fi Direct లేదా ఇతర మద్దతు ఉన్న కమ్యూనికేషన్ పద్ధతులపై ఆధారపడి ఉండవచ్చు.",
        "ఆఫ్‌లైన్ కమ్యూనికేషన్‌కు సాంకేతిక పరిమితులు ఉండవచ్చని మరియు ఆన్‌లైన్ వ్యవస్థలో అందుబాటులో ఉన్న అన్ని ఫీచర్లు ఆఫ్‌లైన్‌లో అందుబాటులో ఉండకపోవచ్చని వినియోగదారులు అర్థం చేసుకోవాలి.",
        "ఆఫ్‌లైన్ ఫీచర్లను చట్టబద్ధమైన వర్కర్ స్పాట్ సేవా సంబంధిత కార్యకలాపాల కోసం మాత్రమే ఉపయోగించాలి."
      ]
    },

    {
      title: "8. ప్రాంత సమాచారం",
      text: [
        "సంబంధిత ప్రాంతాల్లో ఉన్న వర్కర్లను కస్టమర్లు కనుగొనడానికి వర్కర్ స్పాట్ ప్రాంత సమాచారాన్ని ఉపయోగించవచ్చు.",
        "సేవలను సరైన విధంగా సరిపోల్చడానికి అవసరమైనప్పుడు వినియోగదారులు ఖచ్చితమైన ప్రాంత సమాచారాన్ని అందించాలి.",
        "మరొక వినియోగదారుని తప్పుదారి పట్టించే ఉద్దేశంతో తప్పుడు ప్రాంత సమాచారాన్ని ఇవ్వకూడదు."
      ]
    },

    {
      title: "9. వర్కర్ల బాధ్యతలు",
      text: [
        "వర్కర్లు సేవలను నిజాయితీగా మరియు వృత్తిపరంగా అందించాలి.",
        "అర్హతలు, అనుభవం, ధృవపత్రాలు లేదా నైపుణ్యాల గురించి తప్పుడు సమాచారం ఇవ్వకూడదు.",
        "తమ సేవా ఛార్జీలను నిజాయితీగా తెలియజేయాలి.",
        "కస్టమర్ ఆస్తికి ఉద్దేశపూర్వకంగా నష్టం కలిగించకూడదు.",
        "కస్టమర్ గోప్యతను గౌరవించాలి మరియు కస్టమర్ సమాచారాన్ని దుర్వినియోగం చేయకూడదు.",
        "తమ పనికి సంబంధించిన వర్తించే చట్టాలు, భద్రతా నియమాలు మరియు వృత్తిపరమైన అవసరాలను పాటించాలి."
      ]
    },

    {
      title: "10. కస్టమర్ల బాధ్యతలు",
      text: [
        "కస్టమర్లు కోరుతున్న సేవకు సంబంధించిన ఖచ్చితమైన సమాచారాన్ని అందించాలి.",
        "కస్టమర్లు వర్కర్లను గౌరవంగా చూడాలి మరియు వారిని బెదిరించడం, వేధించడం, వివక్ష చూపడం లేదా దుర్వినియోగం చేయకూడదు.",
        "అంగీకరించిన సేవను అందించడానికి సహేతుకంగా సురక్షితమైన వాతావరణాన్ని కల్పించాలి.",
        "అంగీకరించిన సేవా నిబంధనల ప్రకారం వర్తించే ఛార్జీలను చెల్లించాలి."
      ]
    },

    {
      title: "11. భద్రతా నియమాలు",
      text: [
        "ప్లాట్‌ఫారమ్ ద్వారా మరొక వ్యక్తిని కలిసేటప్పుడు వినియోగదారులు తగిన భద్రతా జాగ్రత్తలు తీసుకోవాలి.",
        "సేవను ప్రారంభించే ముందు లేదా మరొక వ్యక్తిని ఇంటికి లేదా ప్రదేశానికి అనుమతించే ముందు వారి గుర్తింపు మరియు సంబంధిత వివరాలను ధృవీకరించాలి.",
        "వర్కర్ స్పాట్ ద్వారా చట్టవిరుద్ధమైన, ప్రమాదకరమైన లేదా అక్రమ పనులను అభ్యర్థించకూడదు లేదా చేయకూడదు.",
        "అనుమానాస్పద మోసం, తీవ్రమైన దుర్వినియోగం, బెదిరింపు లేదా భద్రతా సమస్యను వీలైనంత త్వరగా వర్కర్ స్పాట్‌కు తెలియజేయాలి.",
        "అత్యవసర పరిస్థితుల్లో కేవలం వర్కర్ స్పాట్‌పై ఆధారపడకుండా సంబంధిత అత్యవసర అధికారులను సంప్రదించాలి."
      ]
    },

    {
      title: "12. నిషేధిత కార్యకలాపాలు",
      text: [
        "మోసం చేయడం, తప్పుడు గుర్తింపును ఉపయోగించడం లేదా తప్పుడు సమాచారాన్ని అందించడం.",
        "వేధించడం, బెదిరించడం, దుర్వినియోగం చేయడం లేదా వివక్ష చూపడం.",
        "చట్టవిరుద్ధమైన సేవలు లేదా కార్యకలాపాలు.",
        "సర్వీస్ క్రెడిట్లు లేదా చెల్లింపులను దొంగిలించడానికి, దుర్వినియోగం చేయడానికి లేదా మార్చడానికి ప్రయత్నించడం.",
        "మరొక వినియోగదారుని ఖాతా లేదా డేటాను అనధికారికంగా యాక్సెస్ చేయడం.",
        "హానికరమైన సాఫ్ట్‌వేర్‌ను అప్‌లోడ్ చేయడం లేదా వర్కర్ స్పాట్ వ్యవస్థలకు నష్టం కలిగించడానికి ప్రయత్నించడం.",
        "స్పామ్, మోసాలు లేదా చట్టబద్ధమైన సేవలకు సంబంధం లేని ఇతర కార్యకలాపాల కోసం వర్కర్ స్పాట్‌ను ఉపయోగించడం.",
        "అనుమతి లేకుండా మరొక వ్యక్తి యొక్క గుర్తింపు, ఫోన్ నంబర్ లేదా వ్యక్తిగత సమాచారాన్ని ఉపయోగించడం."
      ]
    },

    {
      title: "13. రద్దులు",
      text: [
        "రద్దు నియమాలు సేవ రకం మరియు రద్దు జరిగే దశపై ఆధారపడి ఉండవచ్చు.",
        "బుకింగ్‌ను కొనసాగించలేని పరిస్థితి ఏర్పడితే వినియోగదారులు వీలైనంత త్వరగా రద్దు చేయాలి.",
        "పునరావృతంగా దుర్వినియోగం జరుగుతున్నట్లు గుర్తించినప్పుడు వర్కర్ స్పాట్ సహేతుకమైన రద్దు నియమాలు లేదా పరిమితులను అమలు చేయవచ్చు."
      ]
    },

    {
      title: "14. రీఫండ్‌లు",
      text: [
        "రీఫండ్ అర్హత వర్కర్ స్పాట్‌లో చూపించిన వర్తించే చెల్లింపు, సేవ మరియు రద్దు నియమాలపై ఆధారపడి ఉంటుంది.",
        "సేవ అందించబడకపోతే, సాంకేతిక సమస్య ఏర్పడితే లేదా అనధికారిక లావాదేవీ నివేదించబడితే రీఫండ్ అభ్యర్థనను పరిశీలించవచ్చు.",
        "మోసపూరితమైన లేదా దుర్వినియోగమైన రీఫండ్ అభ్యర్థనలను తిరస్కరించవచ్చు మరియు ఖాతాపై పరిమితులు విధించవచ్చు."
      ]
    },

    {
      title: "15. సమీక్షలు మరియు రేటింగ్‌లు",
      text: [
        "వినియోగదారులు తమ నిజమైన అనుభవం ఆధారంగా రేటింగ్‌లు మరియు సమీక్షలను ఇవ్వవచ్చు.",
        "సమీక్షలు నిజమైనవి, సంబంధితమైనవి మరియు గౌరవప్రదమైనవిగా ఉండాలి.",
        "నకిలీ సమీక్షలను పోస్ట్ చేయడం, రేటింగ్‌లను మార్చడం, సమీక్ష ద్వారా మరొక వినియోగదారుని బెదిరించడం లేదా సమీక్షలను వేధింపుల కోసం ఉపయోగించడం నిషేధించబడుతుంది.",
        "ఈ నిబంధనలు లేదా వర్తించే చట్టాలను ఉల్లంఘించే కంటెంట్‌ను వర్కర్ స్పాట్ తొలగించవచ్చు."
      ]
    },

    {
      title: "16. గోప్యత మరియు వ్యక్తిగత డేటా",
      text: [
        "వర్కర్ స్పాట్ తన సేవలను అందించడానికి, సురక్షితంగా నిర్వహించడానికి మరియు మెరుగుపరచడానికి అవసరమైన వ్యక్తిగత సమాచారాన్ని సేకరించి ప్రాసెస్ చేయవచ్చు.",
        "ఉపయోగించే ఫీచర్లను బట్టి పేరు, సంప్రదింపు వివరాలు, ఖాతా సమాచారం, ప్రాంత సమాచారం మరియు సేవకు సంబంధించిన సమాచారం వంటి వ్యక్తిగత డేటాను సేకరించవచ్చు.",
        "వర్కర్ స్పాట్ వ్యక్తిగత డేటాను తన గోప్యతా విధానం మరియు వర్తించే డేటా రక్షణ అవసరాలకు అనుగుణంగా నిర్వహిస్తుంది.",
        "పబ్లిక్ ప్రొఫైల్‌లు, సమీక్షలు లేదా సేవా కమ్యూనికేషన్‌లలో అవసరం లేని సున్నితమైన వ్యక్తిగత సమాచారాన్ని పంచుకోకూడదు."
      ]
    },

    {
      title: "17. ఖాతా నిలిపివేత లేదా రద్దు",
      text: [
        "ఒక ఖాతా ఈ నిబంధనలు, వర్తించే చట్టాలు, భద్రతా అవసరాలు లేదా ప్లాట్‌ఫారమ్ నియమాలను ఉల్లంఘించినట్లు సహేతుకమైన ఆధారం ఉన్నప్పుడు వర్కర్ స్పాట్ ఆ ఖాతాను నిలిపివేయవచ్చు, పరిమితం చేయవచ్చు లేదా రద్దు చేయవచ్చు.",
        "మోసం, దుర్వినియోగం, భద్రతా ప్రమాదం లేదా ప్లాట్‌ఫారమ్ దుర్వినియోగం అనుమానించబడినప్పుడు కూడా ఖాతాలను పరిమితం చేయవచ్చు.",
        "సాధ్యమైన సందర్భాల్లో శాశ్వతంగా ఖాతాను రద్దు చేయడానికి ముందు సమస్యను పరిష్కరించుకునే అవకాశం వర్కర్ స్పాట్ ఇవ్వవచ్చు."
      ]
    },

    {
      title: "18. ప్లాట్‌ఫారమ్ అందుబాటులో ఉండటం",
      text: [
        "వర్కర్ స్పాట్ తన సేవలను అందుబాటులో ఉంచడానికి ప్రయత్నిస్తుంది, అయితే నిరంతర సేవ అందుబాటులో ఉంటుందని హామీ ఇవ్వలేము.",
        "నిర్వహణ, సాంకేతిక వైఫల్యాలు, నెట్‌వర్క్ సమస్యలు, పరికర పరిమితులు లేదా సహేతుకమైన నియంత్రణకు మించిన పరిస్థితుల కారణంగా సేవలు తాత్కాలికంగా అందుబాటులో లేకపోవచ్చు."
      ]
    },

    {
      title: "19. బాధ్యత పరిమితి",
      text: [
        "వర్కర్ స్పాట్ కస్టమర్లు మరియు వర్కర్లను కనెక్ట్ చేసే ఒక ప్లాట్‌ఫారమ్ మాత్రమే. ప్రతి వర్కర్ అందించే సేవ యొక్క నాణ్యత, చట్టబద్ధత, భద్రత లేదా ఫలితానికి వర్కర్ స్పాట్ హామీ ఇస్తుందని భావించకూడదు.",
        "వినియోగదారులు తమ స్వంత చర్యలు, ఒప్పందాలు మరియు పరస్పర వ్యవహారాలకు తామే బాధ్యత వహించాలి.",
        "వర్తించే చట్టం ప్రకారం మినహాయించలేని లేదా పరిమితం చేయలేని ఏ బాధ్యత లేదా వినియోగదారుల హక్కును ఈ నిబంధనలు తొలగించడానికి లేదా పరిమితం చేయడానికి ఉద్దేశించబడలేదు."
      ]
    },

    {
      title: "20. వివాదాలు",
      text: [
        "ప్లాట్‌ఫారమ్‌కు సంబంధించిన ఫిర్యాదులు లేదా సమస్యలను పరిష్కరించడానికి వినియోగదారులు ముందుగా వర్కర్ స్పాట్‌ను సంప్రదించాలి.",
        "వివాదాలు వర్తించే భారతీయ చట్టాలు మరియు చట్టబద్ధంగా వర్తించే వివాద పరిష్కార ప్రక్రియ ప్రకారం నిర్వహించబడతాయి.",
        "వర్తించే చట్టం ప్రకారం వినియోగదారులకు ఉన్న హక్కులు లేదా పరిహారాలను ఈ నిబంధనలు తొలగించవు."
      ]
    },

    {
      title: "21. ఈ నిబంధనల్లో మార్పులు",
      text: [
        "సేవ, సాంకేతికత, భద్రతా అవసరాలు లేదా వర్తించే చట్టాలలో మార్పుల కారణంగా అవసరమైనప్పుడు వర్కర్ స్పాట్ ఈ నిబంధనలను నవీకరించవచ్చు.",
        "ముఖ్యమైన మార్పులు అవసరమైనప్పుడు సహేతుకమైన మార్గాల ద్వారా వినియోగదారులకు తెలియజేయబడతాయి.",
        "నవీకరించిన నిబంధనలు అమల్లోకి వచ్చిన తర్వాత కూడా వర్కర్ స్పాట్‌ను కొనసాగించి ఉపయోగించడం ద్వారా, వర్తించే చట్టానికి లోబడి, వినియోగదారు నవీకరించిన నిబంధనలను అంగీకరించినట్లు భావించబడుతుంది."
      ]
    },

    {
      title: "22. సంప్రదించండి",
      text: [
        "ప్రశ్నలు, ఫిర్యాదులు, భద్రతా నివేదికలు లేదా ఖాతాకు సంబంధించిన సమస్యల కోసం అప్లికేషన్‌లో అందించిన అధికారిక వర్కర్ స్పాట్ సపోర్ట్ ఛానల్ ద్వారా సంప్రదించాలి."
      ]
    },

    {
      title: "23. కస్టమర్ ఫీజులు, ఉచిత సేవలు మరియు వర్కర్ ఫీజులు",
      points: [
        "ప్రతి కొత్త కస్టమర్/వినియోగదారునికి వర్కర్ స్పాట్ 4 ఉచిత సేవా బుకింగ్‌లను అందిస్తుంది. ఈ మొదటి 4 సేవలకు వర్కర్ స్పాట్ ప్లాట్‌ఫారమ్ ఫీజు వసూలు చేయదు.",
        "కస్టమర్/వినియోగదారు 4 ఉచిత సేవా బుకింగ్‌లను పూర్తిగా ఉపయోగించిన తర్వాత, ప్రతి తదుపరి సేవా బుకింగ్‌కు ₹20 వర్కర్ స్పాట్ ప్లాట్‌ఫారమ్ ఫీజు వర్తిస్తుంది.",
        "₹20 ప్లాట్‌ఫారమ్ ఫీజు కస్టమర్/వినియోగదారుని నుండి వసూలు చేయబడుతుంది మరియు ఇది వర్కర్ సేవా ఫీజుకు వేరుగా ఉంటుంది.",
        "వర్కర్లు స్వతంత్ర సేవా ప్రదాతలు. వారు వర్కర్ స్పాట్ ఉద్యోగులు, ఏజెంట్లు, భాగస్వాములు లేదా ప్రతినిధులు కాదు.",
        "వర్కర్ స్పాట్ ప్లాట్‌ఫారమ్‌ను ఉపయోగించడానికి వర్కర్ల నుండి ₹0 వసూలు చేయబడుతుంది.",
        "వర్కర్ స్పాట్ వర్కర్ల నుండి రిజిస్ట్రేషన్ ఫీజు, సబ్‌స్క్రిప్షన్ ఫీజు, బుకింగ్ ఫీజు, కమిషన్ లేదా ప్లాట్‌ఫారమ్ ఫీజు వసూలు చేయదు.",
        "వర్కర్లు నిర్దిష్ట పనికి తాము పేర్కొన్న లేదా అంగీకరించిన సేవా ఫీజును పొందుతారు.",
        "కస్టమర్ చెల్లించే ₹20 ప్లాట్‌ఫారమ్ ఫీజును వర్కర్ అంగీకరించిన సేవా ఫీజు నుండి వర్కర్ స్పాట్ తగ్గించదు.",
        "4 ఉచిత సేవలను ఉపయోగించిన తర్వాత వర్తించే వర్కర్ స్పాట్ ప్లాట్‌ఫారమ్ ఫీజును చెల్లించడం కస్టమర్/వినియోగదారుని బాధ్యత.",
        "కస్టమర్‌కు అంగీకరించిన సేవను అందించాలా లేదా సేవా అభ్యర్థనను అంగీకరించాలా, తిరస్కరించాలా అనే నిర్ణయం తీసుకోవడం వర్కర్ యొక్క స్వతంత్ర బాధ్యత."
      ]
    }
  ]
},

  // -------- Hindi (हिन्दी) --------
  Hindi: {
  title: "वर्कर स्पॉट - नियम और शर्तें",

  intro:
    "Worker Spot का उपयोग करने से पहले इन नियमों और शर्तों को ध्यानपूर्वक पढ़ें। खाता बनाने या हमारी सेवाओं का उपयोग करने का अर्थ है कि आप इन नियमों को स्वीकार करते हैं।",

  sections: [
    {
      title: "1. Worker Spot के बारे में",
      text: [
        "Worker Spot एक ऐसा प्लेटफ़ॉर्म है जो ग्राहकों को स्थानीय सेवा कर्मचारियों को खोजने और उनसे जुड़ने में सहायता करता है।",
        "Worker Spot ग्राहकों और Workers के बीच संपर्क, खोज, बुकिंग और सेवा से संबंधित प्रक्रियाओं में सहायता कर सकता है।",
        "केवल प्लेटफ़ॉर्म का उपयोग करने से कोई Worker Worker Spot का कर्मचारी, एजेंट, साझेदार या कानूनी प्रतिनिधि नहीं बन जाता।"
      ]
    },

    {
      title: "2. पात्रता",
      text: [
        "पंजीकरण के समय उपयोगकर्ताओं को सही और सटीक जानकारी प्रदान करनी होगी।",
        "Worker Spot पर Worker के रूप में पंजीकरण करने वाले व्यक्ति की आयु कम से कम 19 वर्ष होनी चाहिए।",
        "उपयोगकर्ता के पास लागू समझौतों में प्रवेश करने के लिए आवश्यक कानूनी क्षमता होनी चाहिए।",
        "जहाँ उचित रूप से आवश्यक हो, Worker Spot अतिरिक्त जानकारी या सत्यापन मांग सकता है।"
      ]
    },

    {
      title: "3. Worker पंजीकरण",
      text: [
        "Workers को अपना नाम, मोबाइल नंबर, ईमेल पता, आयु, स्थान और सेवा श्रेणी सहित सही जानकारी प्रदान करनी होगी।",
        "किसी अन्य व्यक्ति की पहचान या जानकारी का उपयोग करके खाता नहीं बनाया जा सकता।",
        "अपने लॉगिन विवरण को सुरक्षित रखना Worker की जिम्मेदारी है।",
        "महत्वपूर्ण जानकारी बदलने पर Workers को अपना प्रोफ़ाइल अपडेट करना चाहिए।"
      ]
    },

    {
      title: "4. ग्राहक खाते",
      text: [
        "ग्राहकों को पंजीकरण के समय सही जानकारी प्रदान करनी होगी।",
        "ग्राहक किसी अन्य व्यक्ति के खाते का दुरुपयोग नहीं कर सकते।",
        "अपने खाते के माध्यम से की गई गतिविधियों के लिए ग्राहक स्वयं जिम्मेदार हैं।"
      ]
    },

    {
      title: "5. सेवाएँ और बुकिंग",
      text: [
        "Worker Spot उपलब्ध जानकारी के आधार पर ग्राहकों को Workers को खोजने और उनसे जुड़ने में सहायता करता है।",
        "Workers द्वारा स्वीकार की गई सेवाओं को जिम्मेदारी से पूरा करना Workers की जिम्मेदारी है।",
        "सेवा शुरू होने से पहले ग्राहक और Worker को सेवा की आवश्यकता, शुल्क, समय और अन्य संबंधित शर्तों पर स्पष्ट रूप से चर्चा करनी चाहिए।",
        "Worker Spot यह गारंटी नहीं देता कि कोई विशेष Worker हमेशा उपलब्ध रहेगा या कोई सेवा निश्चित समय के भीतर पूरी होगी।"
      ]
    },

    {
      title: "6. भुगतान और Service Credits",
      text: [
        "जहाँ Worker Spot prepaid service-credit या top-up प्रणाली का उपयोग करता है, वहाँ संबंधित सेवा का उपयोग करने से पहले ग्राहक को आवश्यक भुगतान पूरा करना होगा।",
        "Service Credit का उपयोग Worker Spot द्वारा प्रदर्शित सेवा नियमों के अनुसार किया जा सकता है।",
        "ग्राहक Service Credits को बायपास करने, बदलने या धोखाधड़ी से प्राप्त करने का प्रयास नहीं कर सकते।",
        "लागू प्लेटफ़ॉर्म शुल्क, सेवा शुल्क, कर, रिफंड या समाप्ति संबंधी नियम आवश्यक होने पर संबंधित लेनदेन से पहले उपयोगकर्ताओं को दिखाए जाएंगे।",
        "Worker Spot संदिग्ध या धोखाधड़ी वाले लेनदेन की जाँच कर सकता है और भुगतान के दुरुपयोग में शामिल खातों पर प्रतिबंध लगा सकता है।"
      ]
    },

    {
      title: "7. ऑनलाइन और ऑफलाइन सेवाएँ",
      text: [
        "जहाँ संबंधित सुविधा उपलब्ध हो, Worker Spot ऑनलाइन और ऑफलाइन दोनों प्रकार की सेवा कनेक्शन सुविधाएँ प्रदान कर सकता है।",
        "ऑफलाइन सुविधा डिवाइस की क्षमता, स्थानीय कनेक्टिविटी, Bluetooth, Wi-Fi Direct या अन्य समर्थित संचार माध्यमों पर निर्भर हो सकती है।",
        "उपयोगकर्ता समझते हैं कि ऑफलाइन संचार में तकनीकी सीमाएँ हो सकती हैं और ऑनलाइन सिस्टम में उपलब्ध सभी सुविधाएँ ऑफलाइन उपलब्ध नहीं हो सकती हैं।",
        "ऑफलाइन सुविधाओं का उपयोग केवल वैध Worker Spot सेवा संबंधी गतिविधियों के लिए किया जाना चाहिए।"
      ]
    },

    {
      title: "8. स्थान की जानकारी",
      text: [
        "ग्राहकों को संबंधित क्षेत्रों में Workers खोजने में सहायता करने के लिए Worker Spot स्थान की जानकारी का उपयोग कर सकता है।",
        "सेवा मिलान के लिए आवश्यक होने पर उपयोगकर्ताओं को सही स्थान की जानकारी प्रदान करनी चाहिए।",
        "किसी अन्य उपयोगकर्ता को गुमराह करने के लिए गलत स्थान की जानकारी नहीं देनी चाहिए।"
      ]
    },

    {
      title: "9. Workers की जिम्मेदारियाँ",
      text: [
        "Workers को सेवाएँ ईमानदारी और पेशेवर तरीके से प्रदान करनी चाहिए।",
        "योग्यता, अनुभव, प्रमाणपत्र या कौशल के बारे में गलत जानकारी नहीं देनी चाहिए।",
        "Workers को अपने सेवा शुल्क की सही जानकारी देनी चाहिए।",
        "ग्राहक की संपत्ति को जानबूझकर नुकसान नहीं पहुँचाना चाहिए।",
        "Workers को ग्राहक की गोपनीयता का सम्मान करना चाहिए और ग्राहक की जानकारी का दुरुपयोग नहीं करना चाहिए।",
        "Workers को अपने कार्य से संबंधित लागू कानूनों, सुरक्षा नियमों और पेशेवर आवश्यकताओं का पालन करना चाहिए।"
      ]
    },

    {
      title: "10. ग्राहकों की जिम्मेदारियाँ",
      text: [
        "ग्राहकों को अनुरोधित सेवा के बारे में सही जानकारी प्रदान करनी चाहिए।",
        "ग्राहकों को Workers के साथ सम्मानपूर्वक व्यवहार करना चाहिए और उन्हें धमकी, उत्पीड़न, भेदभाव या दुर्व्यवहार नहीं करना चाहिए।",
        "ग्राहकों को सहमत सेवा के लिए उचित रूप से सुरक्षित वातावरण प्रदान करना चाहिए।",
        "ग्राहकों को सहमत सेवा शर्तों के अनुसार लागू शुल्क का भुगतान करना चाहिए।"
      ]
    },

    {
      title: "11. सुरक्षा नियम",
      text: [
        "प्लेटफ़ॉर्म के माध्यम से किसी अन्य व्यक्ति से मिलते समय उपयोगकर्ताओं को उचित सुरक्षा सावधानियाँ बरतनी चाहिए।",
        "सेवा शुरू करने या किसी अन्य व्यक्ति को अपने स्थान पर आने की अनुमति देने से पहले उसकी पहचान और संबंधित जानकारी की पुष्टि करनी चाहिए।",
        "Worker Spot के माध्यम से अवैध, खतरनाक या गैरकानूनी कार्य का अनुरोध या प्रदर्शन नहीं किया जाना चाहिए।",
        "किसी भी संदिग्ध धोखाधड़ी, गंभीर दुर्व्यवहार, धमकी या सुरक्षा संबंधी चिंता की सूचना जल्द से जल्द Worker Spot को देनी चाहिए।",
        "आपातकालीन स्थिति में केवल Worker Spot पर निर्भर रहने के बजाय संबंधित आपातकालीन अधिकारियों से संपर्क करना चाहिए।"
      ]
    },

    {
      title: "12. प्रतिबंधित गतिविधियाँ",
      text: [
        "धोखाधड़ी करना, किसी अन्य व्यक्ति की पहचान का उपयोग करना या गलत जानकारी प्रदान करना।",
        "उत्पीड़न, धमकी, दुर्व्यवहार या भेदभावपूर्ण व्यवहार करना।",
        "अवैध सेवाएँ या गतिविधियाँ करना।",
        "Service Credits या भुगतान को चुराने, दुरुपयोग करने या उनमें हेरफेर करने का प्रयास करना।",
        "किसी अन्य उपयोगकर्ता के खाते या डेटा तक बिना अनुमति पहुँच प्राप्त करना।",
        "हानिकारक सॉफ़्टवेयर अपलोड करना या Worker Spot के सिस्टम को नुकसान पहुँचाने का प्रयास करना।",
        "स्पैम, धोखाधड़ी या वैध सेवाओं से संबंधित न होने वाली अन्य गतिविधियों के लिए Worker Spot का उपयोग करना।",
        "बिना अनुमति किसी अन्य व्यक्ति की पहचान, फोन नंबर या व्यक्तिगत जानकारी का उपयोग करना।"
      ]
    },

    {
      title: "13. रद्दीकरण",
      text: [
        "रद्दीकरण के नियम सेवा के प्रकार और रद्दीकरण किए जाने के चरण पर निर्भर कर सकते हैं।",
        "जब उपयोगकर्ता बुकिंग जारी नहीं रख सकता हो, तो उसे जितनी जल्दी संभव हो सके बुकिंग रद्द करनी चाहिए।",
        "यदि बार-बार दुरुपयोग पाया जाता है, तो Worker Spot उचित रद्दीकरण नियम या प्रतिबंध लागू कर सकता है।"
      ]
    },

    {
      title: "14. रिफंड",
      text: [
        "रिफंड की पात्रता Worker Spot पर प्रदर्शित लागू भुगतान, सेवा और रद्दीकरण नियमों पर निर्भर करती है।",
        "यदि सेवा प्रदान नहीं की गई हो, तकनीकी समस्या हुई हो या अनधिकृत लेनदेन की सूचना दी गई हो, तो रिफंड अनुरोध की जाँच की जा सकती है।",
        "धोखाधड़ीपूर्ण या दुरुपयोग वाले रिफंड अनुरोधों को अस्वीकार किया जा सकता है और खाते पर प्रतिबंध लगाया जा सकता है।"
      ]
    },

    {
      title: "15. समीक्षाएँ और रेटिंग",
      text: [
        "उपयोगकर्ताओं को अपने वास्तविक अनुभव के आधार पर रेटिंग और समीक्षा देने की अनुमति हो सकती है।",
        "समीक्षाएँ सच्ची, प्रासंगिक और सम्मानजनक होनी चाहिए।",
        "उपयोगकर्ताओं को नकली समीक्षा पोस्ट नहीं करनी चाहिए, रेटिंग में हेरफेर नहीं करना चाहिए, समीक्षा के माध्यम से किसी अन्य उपयोगकर्ता को धमकी नहीं देनी चाहिए और समीक्षा का उपयोग उत्पीड़न के लिए नहीं करना चाहिए।",
        "Worker Spot इन नियमों या लागू कानून का उल्लंघन करने वाली सामग्री को हटा सकता है।"
      ]
    },

    {
      title: "16. गोपनीयता और व्यक्तिगत डेटा",
      text: [
        "Worker Spot अपनी सेवाएँ प्रदान करने, सुरक्षित रखने और बेहतर बनाने के लिए आवश्यक व्यक्तिगत जानकारी एकत्र और संसाधित कर सकता है।",
        "उपयोग की जाने वाली सुविधाओं के आधार पर व्यक्तिगत डेटा में नाम, संपर्क विवरण, खाता जानकारी, स्थान की जानकारी और सेवा से संबंधित जानकारी शामिल हो सकती है।",
        "Worker Spot अपनी Privacy Policy और लागू डेटा-सुरक्षा आवश्यकताओं के अनुसार व्यक्तिगत डेटा को संभालेगा।",
        "उपयोगकर्ताओं को सार्वजनिक प्रोफ़ाइल, समीक्षा या सेवा संचार में अनावश्यक संवेदनशील व्यक्तिगत जानकारी साझा नहीं करनी चाहिए।"
      ]
    },

    {
      title: "17. खाता निलंबन या समाप्ति",
      text: [
        "यदि उचित आधार हो कि किसी खाते ने इन नियमों, लागू कानून, सुरक्षा आवश्यकताओं या प्लेटफ़ॉर्म नियमों का उल्लंघन किया है, तो Worker Spot उस खाते को निलंबित, प्रतिबंधित या समाप्त कर सकता है।",
        "धोखाधड़ी, दुर्व्यवहार, सुरक्षा जोखिम या प्लेटफ़ॉर्म के दुरुपयोग के संदेह में भी खाते पर प्रतिबंध लगाया जा सकता है।",
        "जहाँ उचित हो, स्थायी रूप से खाता समाप्त करने से पहले Worker Spot समस्या को हल करने का अवसर दे सकता है।"
      ]
    },

    {
      title: "18. प्लेटफ़ॉर्म की उपलब्धता",
      text: [
        "Worker Spot अपनी सेवाओं को उपलब्ध रखने का प्रयास करता है, लेकिन लगातार और बिना रुकावट सेवा उपलब्ध रहने की गारंटी नहीं दी जा सकती।",
        "रखरखाव, तकनीकी समस्याओं, नेटवर्क की समस्या, डिवाइस की सीमाओं या उचित नियंत्रण से बाहर की परिस्थितियों के कारण सेवाएँ अस्थायी रूप से अनुपलब्ध हो सकती हैं।"
      ]
    },

    {
      title: "19. जिम्मेदारी की सीमा",
      text: [
        "Worker Spot ग्राहकों और Workers को जोड़ने वाला एक प्लेटफ़ॉर्म है। इसे किसी Worker द्वारा प्रदान की जाने वाली प्रत्येक सेवा की गुणवत्ता, वैधता, सुरक्षा या परिणाम की गारंटी के रूप में नहीं माना जाना चाहिए।",
        "उपयोगकर्ता अपने कार्यों, समझौतों और आपसी व्यवहार के लिए स्वयं जिम्मेदार हैं।",
        "इन नियमों का उद्देश्य ऐसी किसी भी कानूनी जिम्मेदारी या उपभोक्ता अधिकार को समाप्त या सीमित करना नहीं है जिसे लागू कानून के तहत कानूनी रूप से समाप्त या सीमित नहीं किया जा सकता।"
      ]
    },

    {
      title: "20. विवाद",
      text: [
        "प्लेटफ़ॉर्म से संबंधित शिकायतों को हल करने के लिए उपयोगकर्ताओं को पहले Worker Spot से संपर्क करना चाहिए।",
        "विवादों को लागू भारतीय कानून और कानूनी रूप से लागू विवाद समाधान प्रक्रिया के अनुसार संभाला जाएगा।",
        "इन नियमों के कारण लागू कानून के तहत उपयोगकर्ताओं को प्राप्त अधिकारों या कानूनी उपायों को समाप्त नहीं किया जाएगा।"
      ]
    },

    {
      title: "21. इन नियमों में बदलाव",
      text: [
        "सेवा, तकनीक, सुरक्षा आवश्यकताओं या लागू कानून में बदलाव के कारण आवश्यकता पड़ने पर Worker Spot इन नियमों को अपडेट कर सकता है।",
        "जहाँ आवश्यक हो, महत्वपूर्ण बदलावों के बारे में उचित माध्यमों से उपयोगकर्ताओं को सूचित किया जाएगा।",
        "अपडेट किए गए नियम लागू होने के बाद Worker Spot का उपयोग जारी रखने का अर्थ है कि उपयोगकर्ता, लागू कानून के अधीन, अपडेट किए गए नियमों को स्वीकार करता है।"
      ]
    },

    {
      title: "22. संपर्क करें",
      text: [
        "प्रश्नों, शिकायतों, सुरक्षा रिपोर्ट या खाते से संबंधित समस्याओं के लिए उपयोगकर्ताओं को एप्लिकेशन में उपलब्ध आधिकारिक Worker Spot Support चैनल के माध्यम से संपर्क करना चाहिए।"
      ]
    },

    {
      title: "23. ग्राहक शुल्क, मुफ्त सेवाएँ और Worker शुल्क",
      points: [
        "Worker Spot प्रत्येक नए ग्राहक/उपयोगकर्ता को 4 मुफ्त सेवा बुकिंग प्रदान करता है। इन पहली 4 सेवाओं के लिए कोई Worker Spot प्लेटफ़ॉर्म शुल्क नहीं लिया जाता।",
        "जब ग्राहक/उपयोगकर्ता सभी 4 मुफ्त सेवा बुकिंग का उपयोग कर लेता है, तब प्रत्येक अगली सेवा बुकिंग पर ₹20 Worker Spot प्लेटफ़ॉर्म शुल्क लागू होगा।",
        "₹20 प्लेटफ़ॉर्म शुल्क ग्राहक/उपयोगकर्ता से लिया जाता है और यह Worker के सेवा शुल्क से अलग होता है।",
        "Workers स्वतंत्र सेवा प्रदाता हैं और वे Worker Spot के कर्मचारी, एजेंट, साझेदार या प्रतिनिधि नहीं हैं।",
        "Worker Spot प्लेटफ़ॉर्म का उपयोग करने के लिए Workers से ₹0 शुल्क लिया जाता है।",
        "Worker Spot Workers से पंजीकरण शुल्क, सदस्यता शुल्क, बुकिंग शुल्क, कमीशन या प्लेटफ़ॉर्म शुल्क नहीं लेता।",
        "Workers को उनके द्वारा बताए गए या संबंधित कार्य के लिए सहमत सेवा शुल्क प्राप्त होता है।",
        "Worker Spot ग्राहक से लिए गए ₹20 प्लेटफ़ॉर्म शुल्क को Worker के सहमत सेवा शुल्क से नहीं काटता।",
        "4 मुफ्त सेवाओं का उपयोग करने के बाद लागू Worker Spot प्लेटफ़ॉर्म शुल्क का भुगतान करना ग्राहक/उपयोगकर्ता की जिम्मेदारी है।",
        "ग्राहक को सहमत सेवा प्रदान करना और सेवा अनुरोध को स्वीकार या अस्वीकार करने का स्वतंत्र निर्णय लेना Worker की जिम्मेदारी है।"
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
    {
      title: "1. ವರ್ಕರ್ ಸ್ಪಾಟ್ ಬಗ್ಗೆ",
      text: [
        "Worker Spot ಗ್ರಾಹಕರಿಗೆ ಸ್ಥಳೀಯ ಸೇವಾ ಕಾರ್ಮಿಕರನ್ನು ಹುಡುಕಲು ಮತ್ತು ಸಂಪರ್ಕಿಸಲು ಸಹಾಯ ಮಾಡುವ ವೇದಿಕೆಯಾಗಿದೆ.",
        "ಲಭ್ಯವಿರುವ ವೈಶಿಷ್ಟ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ ಗ್ರಾಹಕರು ಮತ್ತು ಕಾರ್ಮಿಕರ ನಡುವೆ ಸಂಪರ್ಕ, ಸಂವಹನ ಮತ್ತು ಬುಕಿಂಗ್ ಪ್ರಕ್ರಿಯೆಗೆ ವೇದಿಕೆ ಸಹಾಯ ಮಾಡಬಹುದು.",
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
      title: "3. ಕಾರ್ಮಿಕರ ನೋಂದಣಿ",
      text: [
        "ಹೆಸರು, ಮೊಬೈಲ್ ಸಂಖ್ಯೆ, ಇಮೇಲ್, ವಯಸ್ಸು, ಸ್ಥಳ ಮತ್ತು ಕೆಲಸದ ವರ್ಗದ ಮಾಹಿತಿಯನ್ನು ನಿಖರವಾಗಿ ನೀಡಬೇಕು.",
        "ಇನ್ನೊಬ್ಬರ ಗುರುತು ಅಥವಾ ಮಾಹಿತಿಯನ್ನು ಬಳಸಿಕೊಂಡು ಖಾತೆ ತೆರೆಯಬಾರದು.",
        "ಲಾಗಿನ್ ಮಾಹಿತಿಯ ಸುರಕ್ಷತೆ ಬಳಕೆದಾರರ ಜವಾಬ್ದಾರಿಯಾಗಿದೆ."
      ]
    },

    {
      title: "4. ಸೇವೆಗಳು ಮತ್ತು ಬುಕಿಂಗ್‌ಗಳು",
      text: [
        "Worker Spot ಲಭ್ಯವಿರುವ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಗ್ರಾಹಕರನ್ನು Workers ಜೊತೆ ಸಂಪರ್ಕಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
        "Worker ಒಪ್ಪಿಕೊಂಡ ಸೇವೆಯನ್ನು ಜವಾಬ್ದಾರಿಯಿಂದ ಒದಗಿಸಬೇಕು.",
        "ಸೇವೆ ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಕೆಲಸ, ಶುಲ್ಕ ಮತ್ತು ಸಮಯವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ನಿರ್ಧರಿಸಬೇಕು."
      ]
    },

    {
      title: "5. ಪಾವತಿಗಳು ಮತ್ತು ಸೇವಾ ಕ್ರೆಡಿಟ್‌ಗಳು",
      text: [
        "Prepaid service-credit ವ್ಯವಸ್ಥೆ ಅನ್ವಯಿಸಿದರೆ, ಸೇವೆ ಬಳಸುವ ಮೊದಲು ಅಗತ್ಯ ಪಾವತಿಯನ್ನು ಮಾಡಬೇಕು.",
        "Service Credits ಅನ್ನು ಮೋಸದಿಂದ ಪಡೆಯುವುದು ಅಥವಾ ದುರುಪಯೋಗ ಮಾಡುವುದು ನಿಷೇಧಿತವಾಗಿದೆ.",
        "ಅನ್ವಯಿಸುವ ಮರುಪಾವತಿ ಮತ್ತು ರದ್ದತಿ ನಿಯಮಗಳನ್ನು ವೇದಿಕೆಯಲ್ಲಿ ತಿಳಿಸಲಾಗುತ್ತದೆ."
      ]
    },

    {
      title: "6. ಆನ್‌ಲೈನ್ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಸೇವೆಗಳು",
      text: [
        "ಸಂಬಂಧಿತ ವೈಶಿಷ್ಟ್ಯ ಲಭ್ಯವಿದ್ದಲ್ಲಿ Worker Spot ಆನ್‌ಲೈನ್ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಸೇವಾ ಸಂಪರ್ಕವನ್ನು ಬೆಂಬಲಿಸಬಹುದು.",
        "ಆಫ್‌ಲೈನ್ ಕಾರ್ಯವು ಸಾಧನದ ಸಾಮರ್ಥ್ಯಗಳು, ಸ್ಥಳೀಯ ಸಂಪರ್ಕ, Bluetooth, Wi-Fi Direct ಅಥವಾ ಇತರ ಬೆಂಬಲಿತ ಸಂವಹನ ವಿಧಾನಗಳ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರಬಹುದು.",
        "ಆಫ್‌ಲೈನ್ ಸಂವಹನಕ್ಕೆ ತಾಂತ್ರಿಕ ಮಿತಿಗಳು ಇರಬಹುದು ಮತ್ತು ಆನ್‌ಲೈನ್ ವ್ಯವಸ್ಥೆಯಲ್ಲಿರುವ ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳು ಲಭ್ಯವಿರದೇ ಇರಬಹುದು.",
        "ಬಳಕೆದಾರರು ಆಫ್‌ಲೈನ್ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಕಾನೂನುಬದ್ಧ Worker Spot ಸೇವಾ ಸಂವಹನಕ್ಕಾಗಿ ಮಾತ್ರ ಬಳಸಬೇಕು."
      ]
    },

    {
      title: "7. ಸ್ಥಳದ ಮಾಹಿತಿ",
      text: [
        "ಸಂಬಂಧಿತ ಪ್ರದೇಶಗಳಲ್ಲಿರುವ Workers ಅನ್ನು ಗ್ರಾಹಕರು ಹುಡುಕಲು ಸಹಾಯ ಮಾಡಲು Worker Spot ಸ್ಥಳದ ಮಾಹಿತಿಯನ್ನು ಬಳಸಬಹುದು.",
        "ಸೇವಾ ಹೊಂದಾಣಿಕೆಗೆ ಅಗತ್ಯವಿರುವಾಗ ಬಳಕೆದಾರರು ನಿಖರವಾದ ಸ್ಥಳದ ಮಾಹಿತಿಯನ್ನು ನೀಡಬೇಕು.",
        "ಇತರ ಬಳಕೆದಾರರನ್ನು ತಪ್ಪುದಾರಿಗೆಳೆಯಲು ತಪ್ಪಾದ ಸ್ಥಳದ ಮಾಹಿತಿಯನ್ನು ನೀಡಬಾರದು."
      ]
    },

    {
      title: "8. ಕಾರ್ಮಿಕರ ಜವಾಬ್ದಾರಿಗಳು",
      text: [
        "ಕಾರ್ಮಿಕರು ಸೇವೆಗಳನ್ನು ಪ್ರಾಮಾಣಿಕವಾಗಿ ಮತ್ತು ವೃತ್ತಿಪರವಾಗಿ ಒದಗಿಸಬೇಕು.",
        "ಅರ್ಹತೆಗಳು, ಅನುಭವ, ಪ್ರಮಾಣಪತ್ರಗಳು ಅಥವಾ ಕೌಶಲ್ಯಗಳ ಬಗ್ಗೆ ಸುಳ್ಳು ಹೇಳಬಾರದು.",
        "ತಮ್ಮ ಸೇವಾ ಶುಲ್ಕವನ್ನು ಪ್ರಾಮಾಣಿಕವಾಗಿ ತಿಳಿಸಬೇಕು.",
        "ಗ್ರಾಹಕರ ಆಸ್ತಿಗೆ ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಹಾನಿ ಮಾಡಬಾರದು.",
        "ಗ್ರಾಹಕರ ಗೌಪ್ಯತೆಯನ್ನು ಗೌರವಿಸಬೇಕು ಮತ್ತು ಅವರ ಮಾಹಿತಿಯನ್ನು ದುರುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳಬಾರದು.",
        "ತಮ್ಮ ಕೆಲಸಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಅನ್ವಯಿಸುವ ಕಾನೂನುಗಳು, ಸುರಕ್ಷತಾ ನಿಯಮಗಳು ಮತ್ತು ವೃತ್ತಿಪರ ಅವಶ್ಯಕತೆಗಳನ್ನು ಪಾಲಿಸಬೇಕು."
      ]
    },

    {
      title: "9. ಗ್ರಾಹಕರ ಜವಾಬ್ದಾರಿಗಳು",
      text: [
        "ಗ್ರಾಹಕರು ಕೇಳುತ್ತಿರುವ ಸೇವೆಯ ಬಗ್ಗೆ ನಿಖರವಾದ ಮಾಹಿತಿಯನ್ನು ನೀಡಬೇಕು.",
        "ಗ್ರಾಹಕರು ಕಾರ್ಮಿಕರನ್ನು ಗೌರವದಿಂದ ನಡೆಸಿಕೊಳ್ಳಬೇಕು ಮತ್ತು ಬೆದರಿಕೆ, ಕಿರುಕುಳ, ಭೇದಭಾವ ಅಥವಾ ದುರ್ವರ್ತನೆ ಮಾಡಬಾರದು.",
        "ಒಪ್ಪಿಕೊಂಡ ಸೇವೆಯನ್ನು ಒದಗಿಸಲು ಸಮಂಜಸವಾಗಿ ಸುರಕ್ಷಿತ ವಾತಾವರಣವನ್ನು ಒದಗಿಸಬೇಕು.",
        "ಒಪ್ಪಿಕೊಂಡ ಸೇವಾ ನಿಯಮಗಳ ಪ್ರಕಾರ ಅನ್ವಯಿಸುವ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಬೇಕು."
      ]
    },

    {
      title: "10. ಸುರಕ್ಷತಾ ನಿಯಮಗಳು",
      text: [
        "ವೇದಿಕೆಯ ಮೂಲಕ ಮತ್ತೊಬ್ಬ ವ್ಯಕ್ತಿಯನ್ನು ಭೇಟಿಯಾಗುವಾಗ ಬಳಕೆದಾರರು ಸಮಂಜಸವಾದ ಸುರಕ್ಷತಾ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು.",
        "ಸೇವೆಯನ್ನು ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಮತ್ತೊಬ್ಬ ವ್ಯಕ್ತಿಯ ಗುರುತು ಮತ್ತು ಸಂಬಂಧಿತ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಬೇಕು.",
        "Worker Spot ಮೂಲಕ ಕಾನೂನುಬಾಹಿರ, ಅಪಾಯಕಾರಿ ಅಥವಾ ಅಕ್ರಮ ಕೆಲಸವನ್ನು ಕೇಳಬಾರದು ಅಥವಾ ಮಾಡಬಾರದು.",
        "ಶಂಕಿತ ವಂಚನೆ, ಗಂಭೀರ ದುರ್ವರ್ತನೆ, ಬೆದರಿಕೆ ಅಥವಾ ಸುರಕ್ಷತಾ ಸಮಸ್ಯೆಯನ್ನು ಸಾಧ್ಯವಾದಷ್ಟು ಬೇಗ Worker Spot ಗೆ ವರದಿ ಮಾಡಬೇಕು.",
        "ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ Worker Spot ಮೇಲೆ ಮಾತ್ರ ಅವಲಂಬಿಸದೆ ಸೂಕ್ತ ತುರ್ತು ಸೇವೆಗಳನ್ನು ಸಂಪರ್ಕಿಸಬೇಕು."
      ]
    },

    {
      title: "11. ನಿಷೇಧಿತ ಚಟುವಟಿಕೆಗಳು",
      text: [
        "ವಂಚನೆ, ನಕಲಿ ಗುರುತು ಅಥವಾ ತಪ್ಪು ಮಾಹಿತಿಯನ್ನು ನೀಡುವುದು.",
        "ಕಿರುಕುಳ, ಬೆದರಿಕೆ, ದುರ್ವರ್ತನೆ ಅಥವಾ ಭೇದಭಾವದ ವರ್ತನೆ.",
        "ಕಾನೂನುಬಾಹಿರ ಸೇವೆಗಳು ಅಥವಾ ಚಟುವಟಿಕೆಗಳು.",
        "ಸೇವಾ ಕ್ರೆಡಿಟ್‌ಗಳು ಅಥವಾ ಪಾವತಿಗಳನ್ನು ಕದಿಯಲು, ದುರುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳಲು ಅಥವಾ ತಿರುಚಲು ಪ್ರಯತ್ನಿಸುವುದು.",
        "ಇನ್ನೊಬ್ಬ ಬಳಕೆದಾರರ ಖಾತೆ ಅಥವಾ ಮಾಹಿತಿಗೆ ಅನಧಿಕೃತ ಪ್ರವೇಶ ಪಡೆಯುವುದು.",
        "ಹಾನಿಕಾರಕ ಸಾಫ್ಟ್‌ವೇರ್ ಅಪ್‌ಲೋಡ್ ಮಾಡುವುದು ಅಥವಾ Worker Spot ವ್ಯವಸ್ಥೆಗಳಿಗೆ ಹಾನಿ ಮಾಡಲು ಪ್ರಯತ್ನಿಸುವುದು.",
        "ಸ್ಪ್ಯಾಮ್, ವಂಚನೆ ಅಥವಾ ಕಾನೂನುಬದ್ಧ ಸೇವೆಗಳಿಗೆ ಸಂಬಂಧಿಸದ ಚಟುವಟಿಕೆಗಳಿಗಾಗಿ Worker Spot ಬಳಸುವುದು.",
        "ಅನುಮತಿಯಿಲ್ಲದೆ ಮತ್ತೊಬ್ಬರ ಗುರುತು, ಫೋನ್ ಸಂಖ್ಯೆ ಅಥವಾ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಬಳಸುವುದು."
      ]
    },

    {
      title: "12. ರದ್ದತಿಗಳು",
      text: [
        "ರದ್ದತಿ ನಿಯಮಗಳು ಸೇವೆಯ ಪ್ರಕಾರ ಮತ್ತು ರದ್ದತಿ ನಡೆಯುವ ಹಂತವನ್ನು ಅವಲಂಬಿಸಿರಬಹುದು.",
        "ಬುಕಿಂಗ್ ಮುಂದುವರಿಸಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ ಬಳಕೆದಾರರು ಸಾಧ್ಯವಾದಷ್ಟು ಬೇಗ ರದ್ದುಗೊಳಿಸಬೇಕು.",
        "ಪುನರಾವರ್ತಿತ ದುರುಪಯೋಗ ಕಂಡುಬಂದಲ್ಲಿ Worker Spot ಸಮಂಜಸವಾದ ರದ್ದತಿ ನಿಯಮಗಳು ಅಥವಾ ನಿರ್ಬಂಧಗಳನ್ನು ಅನ್ವಯಿಸಬಹುದು."
      ]
    },

    {
      title: "13. ಮರುಪಾವತಿಗಳು",
      text: [
        "ಮರುಪಾವತಿ ಅರ್ಹತೆಯು Worker Spot ನಲ್ಲಿ ತೋರಿಸಲಾದ ಅನ್ವಯಿಸುವ ಪಾವತಿ, ಸೇವೆ ಮತ್ತು ರದ್ದತಿ ನಿಯಮಗಳ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ.",
        "ಸೇವೆ ಒದಗಿಸದಿದ್ದರೆ, ತಾಂತ್ರಿಕ ಸಮಸ್ಯೆ ಉಂಟಾದರೆ ಅಥವಾ ಅನಧಿಕೃತ ವಹಿವಾಟು ವರದಿಯಾದರೆ ಮರುಪಾವತಿ ಕುರಿತು ಪರಿಶೀಲನೆ ನಡೆಸಬಹುದು.",
        "ವಂಚನಾತ್ಮಕ ಅಥವಾ ದುರುಪಯೋಗದ ಮರುಪಾವತಿ ವಿನಂತಿಗಳನ್ನು ತಿರಸ್ಕರಿಸಬಹುದು ಮತ್ತು ಖಾತೆಯ ಮೇಲೆ ನಿರ್ಬಂಧಗಳನ್ನು ವಿಧಿಸಬಹುದು."
      ]
    },

    {
      title: "14. ವಿಮರ್ಶೆಗಳು ಮತ್ತು ರೇಟಿಂಗ್‌ಗಳು",
      text: [
        "ಬಳಕೆದಾರರು ತಮ್ಮ ನಿಜವಾದ ಅನುಭವದ ಆಧಾರದ ಮೇಲೆ ರೇಟಿಂಗ್ ಮತ್ತು ವಿಮರ್ಶೆಗಳನ್ನು ನೀಡಬಹುದು.",
        "ವಿಮರ್ಶೆಗಳು ಸತ್ಯವಾದ, ಸಂಬಂಧಿತ ಮತ್ತು ಗೌರವಯುತವಾಗಿರಬೇಕು.",
        "ನಕಲಿ ವಿಮರ್ಶೆಗಳನ್ನು ಪೋಸ್ಟ್ ಮಾಡುವುದು, ರೇಟಿಂಗ್‌ಗಳನ್ನು ತಿರುಚುವುದು, ವಿಮರ್ಶೆಯ ಮೂಲಕ ಮತ್ತೊಬ್ಬ ಬಳಕೆದಾರರನ್ನು ಬೆದರಿಸುವುದು ಅಥವಾ ಕಿರುಕುಳಕ್ಕಾಗಿ ವಿಮರ್ಶೆಗಳನ್ನು ಬಳಸುವುದು ನಿಷೇಧಿತವಾಗಿದೆ.",
        "ಈ ನಿಯಮಗಳು ಅಥವಾ ಅನ್ವಯಿಸುವ ಕಾನೂನುಗಳನ್ನು ಉಲ್ಲಂಘಿಸುವ ವಿಷಯವನ್ನು Worker Spot ತೆಗೆದುಹಾಕಬಹುದು."
      ]
    },

    {
      title: "15. ಗೌಪ್ಯತೆ ಮತ್ತು ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
      text: [
        "ಸೇವೆಗಳನ್ನು ಒದಗಿಸಲು, ಸುರಕ್ಷಿತಗೊಳಿಸಲು ಮತ್ತು ಸುಧಾರಿಸಲು ಅಗತ್ಯವಿರುವ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು Worker Spot ಸಂಗ್ರಹಿಸಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಬಹುದು.",
        "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯಲ್ಲಿ ಹೆಸರು, ಸಂಪರ್ಕ ವಿವರಗಳು, ಖಾತೆ ಮಾಹಿತಿ, ಸ್ಥಳದ ಮಾಹಿತಿ ಮತ್ತು ಬಳಸಿದ ವೈಶಿಷ್ಟ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ ಸೇವೆಗೆ ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿ ಸೇರಿರಬಹುದು.",
        "Worker Spot ತನ್ನ Privacy Policy ಮತ್ತು ಅನ್ವಯಿಸುವ ಡೇಟಾ ಸಂರಕ್ಷಣಾ ಅವಶ್ಯಕತೆಗಳ ಪ್ರಕಾರ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.",
        "ಸಾರ್ವಜನಿಕ ಪ್ರೊಫೈಲ್‌ಗಳು, ವಿಮರ್ಶೆಗಳು ಅಥವಾ ಸೇವಾ ಸಂವಹನಗಳಲ್ಲಿ ಅಗತ್ಯವಿಲ್ಲದ ಸೂಕ್ಷ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಬಾರದು."
      ]
    },

    {
      title: "16. ಖಾತೆ ಅಮಾನತು ಅಥವಾ ರದ್ದುಪಡಿಸುವಿಕೆ",
      text: [
        "ಖಾತೆಯು ಈ ನಿಯಮಗಳು, ಅನ್ವಯಿಸುವ ಕಾನೂನು, ಸುರಕ್ಷತಾ ಅವಶ್ಯಕತೆಗಳು ಅಥವಾ ವೇದಿಕೆಯ ನಿಯಮಗಳನ್ನು ಉಲ್ಲಂಘಿಸಿದೆ ಎಂದು ನಂಬಲು ಸಮಂಜಸವಾದ ಕಾರಣವಿದ್ದರೆ Worker Spot ಖಾತೆಯನ್ನು ಅಮಾನತುಗೊಳಿಸಬಹುದು, ನಿರ್ಬಂಧಿಸಬಹುದು ಅಥವಾ ರದ್ದುಪಡಿಸಬಹುದು.",
        "ವಂಚನೆ, ದುರುಪಯೋಗ, ಸುರಕ್ಷತಾ ಅಪಾಯ ಅಥವಾ ವೇದಿಕೆಯ ದುರುಪಯೋಗದ ಶಂಕೆಯಿದ್ದರೂ ಖಾತೆಯನ್ನು ನಿರ್ಬಂಧಿಸಬಹುದು.",
        "ಸೂಕ್ತ ಸಂದರ್ಭಗಳಲ್ಲಿ ಶಾಶ್ವತವಾಗಿ ಖಾತೆ ರದ್ದುಪಡಿಸುವ ಮೊದಲು ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಲು ಅವಕಾಶ ನೀಡಬಹುದು."
      ]
    },

    {
      title: "17. ವೇದಿಕೆಯ ಲಭ್ಯತೆ",
      text: [
        "Worker Spot ತನ್ನ ಸೇವೆಗಳನ್ನು ಲಭ್ಯವಾಗಿಡಲು ಪ್ರಯತ್ನಿಸುತ್ತದೆ, ಆದರೆ ನಿರಂತರ ಲಭ್ಯತೆಯನ್ನು ಖಾತರಿಪಡಿಸಲಾಗುವುದಿಲ್ಲ.",
        "ನಿರ್ವಹಣೆ, ತಾಂತ್ರಿಕ ವೈಫಲ್ಯಗಳು, ನೆಟ್‌ವರ್ಕ್ ಸಮಸ್ಯೆಗಳು, ಸಾಧನದ ಮಿತಿಗಳು ಅಥವಾ ಸಮಂಜಸವಾದ ನಿಯಂತ್ರಣದ ಹೊರಗಿನ ಸಂದರ್ಭಗಳಿಂದ ಸೇವೆಗಳು ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿರದಿರಬಹುದು."
      ]
    },

    {
      title: "18. ಜವಾಬ್ದಾರಿಯ ಮಿತಿ",
      text: [
        "Worker Spot ಗ್ರಾಹಕರು ಮತ್ತು ಕಾರ್ಮಿಕರನ್ನು ಸಂಪರ್ಕಿಸುವ ವೇದಿಕೆಯಾಗಿದ್ದು, ಪ್ರತಿಯೊಬ್ಬ Worker ಒದಗಿಸುವ ಸೇವೆಯ ಗುಣಮಟ್ಟ, ಕಾನೂನುಬದ್ಧತೆ, ಸುರಕ್ಷತೆ ಅಥವಾ ಫಲಿತಾಂಶಕ್ಕೆ ಖಾತರಿಯೆಂದು ಪರಿಗಣಿಸಬಾರದು.",
        "ಬಳಕೆದಾರರು ತಮ್ಮ ಸ್ವಂತ ಕ್ರಮಗಳು, ಒಪ್ಪಂದಗಳು ಮತ್ತು ಸಂವಹನಗಳಿಗೆ ಜವಾಬ್ದಾರರಾಗಿರುತ್ತಾರೆ.",
        "ಅನ್ವಯಿಸುವ ಕಾನೂನಿನ ಪ್ರಕಾರ ಹೊರತುಪಡಿಸಲಾಗದ ಅಥವಾ ಮಿತಿಗೊಳಿಸಲಾಗದ ಯಾವುದೇ ಜವಾಬ್ದಾರಿ ಅಥವಾ ಗ್ರಾಹಕರ ಹಕ್ಕನ್ನು ಈ ನಿಯಮಗಳು ಹೊರತುಪಡಿಸುವ ಅಥವಾ ಮಿತಿಗೊಳಿಸುವ ಉದ್ದೇಶ ಹೊಂದಿಲ್ಲ."
      ]
    },

    {
      title: "19. ವಿವಾದಗಳು",
      text: [
        "ವೇದಿಕೆಗೆ ಸಂಬಂಧಿಸಿದ ದೂರುಗಳನ್ನು ಪರಿಹರಿಸಲು ಬಳಕೆದಾರರು ಮೊದಲು Worker Spot ಅನ್ನು ಸಂಪರ್ಕಿಸಬೇಕು.",
        "ವಿವಾದಗಳನ್ನು ಅನ್ವಯಿಸುವ ಭಾರತೀಯ ಕಾನೂನುಗಳು ಮತ್ತು ಕಾನೂನುಬದ್ಧವಾಗಿ ಅನ್ವಯಿಸುವ ವಿವಾದ ಪರಿಹಾರ ಪ್ರಕ್ರಿಯೆಯ ಪ್ರಕಾರ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ.",
        "ಅನ್ವಯಿಸುವ ಕಾನೂನಿನ ಅಡಿಯಲ್ಲಿ ಬಳಕೆದಾರರಿಗೆ ಇರುವ ಹಕ್ಕುಗಳು ಅಥವಾ ಪರಿಹಾರಗಳನ್ನು ಈ ನಿಯಮಗಳು ತೆಗೆದುಹಾಕುವುದಿಲ್ಲ."
      ]
    },

    {
      title: "20. ಈ ನಿಯಮಗಳಲ್ಲಿನ ಬದಲಾವಣೆಗಳು",
      text: [
        "ಸೇವೆ, ತಂತ್ರಜ್ಞಾನ, ಸುರಕ್ಷತಾ ಅವಶ್ಯಕತೆಗಳು ಅಥವಾ ಅನ್ವಯಿಸುವ ಕಾನೂನುಗಳಲ್ಲಿನ ಬದಲಾವಣೆಗಳಿಂದಾಗಿ Worker Spot ಅಗತ್ಯವಿದ್ದಾಗ ಈ ನಿಯಮಗಳನ್ನು ನವೀಕರಿಸಬಹುದು.",
        "ಅಗತ್ಯವಿರುವಲ್ಲಿ ಪ್ರಮುಖ ಬದಲಾವಣೆಗಳನ್ನು ಸಮಂಜಸವಾದ ವಿಧಾನಗಳ ಮೂಲಕ ಬಳಕೆದಾರರಿಗೆ ತಿಳಿಸಲಾಗುತ್ತದೆ.",
        "ನವೀಕರಿಸಿದ ನಿಯಮಗಳು ಜಾರಿಗೆ ಬಂದ ನಂತರ Worker Spot ಅನ್ನು ಮುಂದುವರಿಸಿ ಬಳಸುವುದರಿಂದ, ಅನ್ವಯಿಸುವ ಕಾನೂನಿಗೆ ಒಳಪಟ್ಟಂತೆ ಬಳಕೆದಾರರು ನವೀಕರಿಸಿದ ನಿಯಮಗಳನ್ನು ಒಪ್ಪಿಕೊಂಡಿದ್ದಾರೆ ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ."
      ]
    },

    {
      title: "21. ಸಂಪರ್ಕ",
      text: [
        "ಪ್ರಶ್ನೆಗಳು, ದೂರುಗಳು, ಸುರಕ್ಷತಾ ವರದಿಗಳು ಅಥವಾ ಖಾತೆಗೆ ಸಂಬಂಧಿಸಿದ ಸಮಸ್ಯೆಗಳಿಗಾಗಿ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ಒದಗಿಸಲಾದ ಅಧಿಕೃತ Worker Spot Support ಮೂಲಕ ಸಂಪರ್ಕಿಸಬೇಕು."
      ]
    },

    {
      title: "22. ಗ್ರಾಹಕರ ಶುಲ್ಕಗಳು, ಉಚಿತ ಸೇವೆಗಳು ಮತ್ತು ಕಾರ್ಮಿಕರ ಶುಲ್ಕಗಳು",
      points: [
        "ಪ್ರತಿ ಹೊಸ ಗ್ರಾಹಕ/ಬಳಕೆದಾರರಿಗೆ Worker Spot 4 ಉಚಿತ ಸೇವಾ ಬುಕಿಂಗ್‌ಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ಈ ಮೊದಲ 4 ಸೇವೆಗಳಿಗೆ ಯಾವುದೇ Worker Spot ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಶುಲ್ಕ ವಿಧಿಸಲಾಗುವುದಿಲ್ಲ.",
        "ಗ್ರಾಹಕರು/ಬಳಕೆದಾರರು ಎಲ್ಲಾ 4 ಉಚಿತ ಸೇವಾ ಬುಕಿಂಗ್‌ಗಳನ್ನು ಬಳಸಿದ ನಂತರ, ಪ್ರತಿ ಮುಂದಿನ ಸೇವಾ ಬುಕಿಂಗ್‌ಗೆ ₹20 Worker Spot ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಶುಲ್ಕ ಅನ್ವಯಿಸುತ್ತದೆ.",
        "₹20 ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಶುಲ್ಕವನ್ನು ಗ್ರಾಹಕ/ಬಳಕೆದಾರರಿಂದ ವಿಧಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಇದು ಕಾರ್ಮಿಕರ ಸೇವಾ ಶುಲ್ಕದಿಂದ ಪ್ರತ್ಯೇಕವಾಗಿರುತ್ತದೆ.",
        "ಕಾರ್ಮಿಕರು ಸ್ವತಂತ್ರ ಸೇವಾ ಪೂರೈಕೆದಾರರಾಗಿದ್ದು, Worker Spot ನ ಉದ್ಯೋಗಿಗಳು, ಏಜೆಂಟ್‌ಗಳು, ಪಾಲುದಾರರು ಅಥವಾ ಪ್ರತಿನಿಧಿಗಳಲ್ಲ.",
        "Worker Spot ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಬಳಸುವುದಕ್ಕಾಗಿ ಕಾರ್ಮಿಕರಿಂದ ₹0 ಶುಲ್ಕ ವಿಧಿಸಲಾಗುತ್ತದೆ.",
        "Worker Spot ಕಾರ್ಮಿಕರಿಂದ ನೋಂದಣಿ ಶುಲ್ಕ, ಚಂದಾದಾರಿಕೆ ಶುಲ್ಕ, ಬುಕಿಂಗ್ ಶುಲ್ಕ, ಕಮಿಷನ್ ಅಥವಾ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಶುಲ್ಕವನ್ನು ವಿಧಿಸುವುದಿಲ್ಲ.",
        "ಕಾರ್ಮಿಕರು ನಿರ್ದಿಷ್ಟ ಕೆಲಸಕ್ಕಾಗಿ ತಾವು ತಿಳಿಸಿದ ಅಥವಾ ಒಪ್ಪಿಕೊಂಡ ಸೇವಾ ಶುಲ್ಕವನ್ನು ಪಡೆಯುತ್ತಾರೆ.",
        "ಗ್ರಾಹಕರಿಂದ ವಿಧಿಸಲಾದ ₹20 ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಶುಲ್ಕವನ್ನು Worker Spot ಕಾರ್ಮಿಕರ ಒಪ್ಪಿಕೊಂಡ ಸೇವಾ ಶುಲ್ಕದಿಂದ ಕಡಿತಗೊಳಿಸುವುದಿಲ್ಲ.",
        "4 ಉಚಿತ ಸೇವೆಗಳು ಬಳಸಿದ ನಂತರ ಅನ್ವಯಿಸುವ Worker Spot ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸುವ ಜವಾಬ್ದಾರಿ ಗ್ರಾಹಕ/ಬಳಕೆದಾರರದ್ದಾಗಿದೆ.",
        "ಒಪ್ಪಿಕೊಂಡ ಸೇವೆಯನ್ನು ಗ್ರಾಹಕರಿಗೆ ಒದಗಿಸುವುದು ಮತ್ತು ಸೇವಾ ವಿನಂತಿಯನ್ನು ಸ್ವೀಕರಿಸಬೇಕೇ ಅಥವಾ ತಿರಸ್ಕರಿಸಬೇಕೇ ಎಂಬುದನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ನಿರ್ಧರಿಸುವುದು ಕಾರ್ಮಿಕರ ಜವಾಬ್ದಾರಿಯಾಗಿದೆ."
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
    {
      title: "1. Worker Spot பற்றி",
      text: [
        "Worker Spot வாடிக்கையாளர்கள் உள்ளூர் சேவைத் தொழிலாளர்களைக் கண்டறிந்து அவர்களுடன் தொடர்பு கொள்ள உதவும் ஒரு தளமாகும்."
      ]
    },

    {
      title: "2. தகுதி",
      text: [
        "பதிவு செய்யும் போது சரியான தகவல்களை வழங்க வேண்டும்."
      ]
    },

    {
      title: "3. Worker பதிவு",
      text: [
        "Worker ஆக பதிவு செய்யும் நபர் தனது பெயர், மொபைல் எண், மின்னஞ்சல், வயது, இருப்பிடம் மற்றும் வேலை வகை போன்ற தகவல்களை சரியாக வழங்க வேண்டும்."
      ]
    },

    {
      title: "4. சேவைகள் மற்றும் முன்பதிவுகள்",
      text: [
        "Worker Spot கிடைக்கும் தகவலின் அடிப்படையில் வாடிக்கையாளர்களை Workers உடன் இணைக்க உதவுகிறது."
      ]
    },

    {
      title: "5. பணம் மற்றும் சேவை கிரெடிட்கள்",
      text: [
        "Prepaid service-credit முறை பயன்படுத்தப்படும் இடங்களில், சேவையைப் பயன்படுத்துவதற்கு முன் தேவையான கட்டணம் செலுத்த வேண்டும்."
      ]
    },

    {
      title: "6. பாதுகாப்பு மற்றும் தடைசெய்யப்பட்ட செயல்கள்",
      text: [
        "மோசடி, போலி அடையாளம், மிரட்டல், தொந்தரவு, பாகுபாடு, சட்டவிரோத சேவைகள் மற்றும் பண மோசடி தடைசெய்யப்பட்டவை."
      ]
    },

    {
      title: "7. தனியுரிமை",
      text: [
        "சேவைகளை வழங்க தேவையான தனிப்பட்ட தகவல்களை Worker Spot செயலாக்கலாம்."
      ]
    },

    {
      title: "8. கணக்கு இடைநிறுத்தம் அல்லது நிறுத்தம்",
      text: [
        "விதிமுறை மீறல், மோசடி, பாதுகாப்பு அபாயம் அல்லது தளத்தின் தவறான பயன்பாடு ஏற்பட்டால் கணக்கு கட்டுப்படுத்தப்படலாம் அல்லது இடைநிறுத்தப்படலாம்."
      ]
    },

    {
      title: "9. தகராறுகள்",
      text: [
        "பிரச்சினை ஏற்பட்டால் முதலில் Worker Spot Support-ஐ தொடர்பு கொண்டு தீர்வு காண முயற்சிக்க வேண்டும்."
      ]
    },

    {
      title: "10. விதிமுறைகளில் மாற்றங்கள்",
      text: [
        "சேவை, தொழில்நுட்பம், பாதுகாப்பு அல்லது சட்ட மாற்றங்களுக்கேற்ப Worker Spot இந்த விதிமுறைகளை புதுப்பிக்கலாம்."
      ]
    },

    {
      title: "11. பாதுகாப்பு விதிகள்",
      text: [
        "தளத்தின் மூலம் மற்றொரு நபரை சந்திக்கும் போது பயனர்கள் தேவையான பாதுகாப்பு முன்னெச்சரிக்கைகளை மேற்கொள்ள வேண்டும்."
      ]
    },

    {
      title: "12. தடைசெய்யப்பட்ட செயல்பாடுகள்",
      text: [
        "மோசடி, ஆள்மாறாட்டம், தவறான தகவல் வழங்குதல், தொந்தரவு, மிரட்டல், துஷ்பிரயோகம் மற்றும் சட்டவிரோத செயல்பாடுகள் தடைசெய்யப்பட்டவை."
      ]
    },

    {
      title: "13. ரத்து செய்தல்",
      text: [
        "ரத்து விதிகள் சேவையின் வகை மற்றும் ரத்து செய்யப்படும் நேரத்தைப் பொறுத்து மாறுபடலாம்."
      ]
    },

    {
      title: "14. பணத்தைத் திரும்பப் பெறுதல்",
      text: [
        "பணத்தைத் திரும்பப் பெறுவதற்கான தகுதி Worker Spot-ல் காட்டப்படும் பொருந்தக்கூடிய கட்டணம், சேவை மற்றும் ரத்து விதிகளின் அடிப்படையில் இருக்கும்."
      ]
    },

    {
      title: "15. மதிப்பீடுகள் மற்றும் விமர்சனங்கள்",
      text: [
        "பயனர்கள் தங்களின் உண்மையான அனுபவத்தின் அடிப்படையில் மதிப்பீடுகள் மற்றும் விமர்சனங்களை வழங்கலாம்."
      ]
    },

    {
      title: "16. தனியுரிமை மற்றும் தனிப்பட்ட தரவு",
      text: [
        "சேவைகளை வழங்கவும், பாதுகாக்கவும் மற்றும் மேம்படுத்தவும் தேவையான தனிப்பட்ட தகவல்களை Worker Spot சேகரித்து செயலாக்கலாம்."
      ]
    },

    {
      title: "17. கணக்கு இடைநிறுத்தம் அல்லது நிறுத்துதல்",
      text: [
        "இந்த விதிமுறைகள், பொருந்தக்கூடிய சட்டங்கள் அல்லது பாதுகாப்பு விதிகள் மீறப்பட்டதாக நியாயமான காரணம் இருந்தால் Worker Spot ஒரு கணக்கை இடைநிறுத்தலாம், கட்டுப்படுத்தலாம் அல்லது நிறுத்தலாம்."
      ]
    },

    {
      title: "18. தளத்தின் கிடைக்கும் தன்மை",
      text: [
        "Worker Spot தனது சேவைகளை தொடர்ந்து கிடைக்கச் செய்ய முயற்சிக்கும். இருப்பினும் இடையறாத சேவை கிடைக்கும் என்பதை உறுதி செய்ய முடியாது."
      ]
    },

    {
      title: "19. பொறுப்பின் வரம்பு",
      text: [
        "Worker Spot என்பது வாடிக்கையாளர்களையும் Workers-ஐயும் இணைக்கும் ஒரு தளமாகும். ஒவ்வொரு Worker வழங்கும் சேவையின் தரம், சட்டபூர்வ தன்மை, பாதுகாப்பு அல்லது முடிவுக்கு Worker Spot உத்தரவாதம் அளிக்காது."
      ]
    },

    {
      title: "20. தகராறுகள்",
      text: [
        "தளத்துடன் தொடர்புடைய புகார்கள் அல்லது பிரச்சினைகளைத் தீர்க்க பயனர்கள் முதலில் Worker Spot-ஐ தொடர்பு கொள்ள வேண்டும்."
      ]
    },

    {
      title: "21. இந்த விதிமுறைகளில் மாற்றங்கள்",
      text: [
        "சேவை, தொழில்நுட்பம், பாதுகாப்பு தேவைகள் அல்லது பொருந்தக்கூடிய சட்டங்களில் ஏற்படும் மாற்றங்களின் காரணமாக Worker Spot இந்த விதிமுறைகளை புதுப்பிக்கலாம்."
      ]
    },

    {
      title: "22. தொடர்பு",
      text: [
        "கேள்விகள், புகார்கள், பாதுகாப்பு அறிக்கைகள் அல்லது கணக்கு தொடர்பான பிரச்சினைகளுக்கு, பயன்பாட்டில் வழங்கப்பட்டுள்ள அதிகாரப்பூர்வ Worker Spot Support வழியாக தொடர்பு கொள்ள வேண்டும்."
      ]
    },

    {
      title: "23. வாடிக்கையாளர் கட்டணங்கள், இலவச சேவைகள் மற்றும் Worker கட்டணங்கள்",
      points: [
        "ஒவ்வொரு புதிய வாடிக்கையாளர்/பயனருக்கும் Worker Spot 4 இலவச சேவை முன்பதிவுகளை வழங்குகிறது. இந்த முதல் 4 சேவைகளுக்கு Worker Spot தளக் கட்டணம் வசூலிக்கப்படாது.",
        "வாடிக்கையாளர்/பயனர் 4 இலவச சேவை முன்பதிவுகளையும் பயன்படுத்திய பிறகு, ஒவ்வொரு அடுத்தடுத்த சேவை முன்பதிவுக்கும் ₹20 Worker Spot தளக் கட்டணம் பொருந்தும்.",
        "₹20 தளக் கட்டணம் வாடிக்கையாளர்/பயனரிடம் வசூலிக்கப்படும் மற்றும் அது Worker-ன் சேவை கட்டணத்திலிருந்து தனியானது.",
        "Workers சுயாதீன சேவை வழங்குநர்கள். அவர்கள் Worker Spot-ன் ஊழியர்கள், முகவர்கள், கூட்டாளர்கள் அல்லது பிரதிநிதிகள் அல்ல.",
        "Worker Spot-ஐ பயன்படுத்துவதற்காக Workers-க்கு ₹0 கட்டணம் வசூலிக்கப்படும்.",
        "Worker Spot Workers-களிடம் பதிவு கட்டணம், சந்தா கட்டணம், முன்பதிவு கட்டணம், கமிஷன் அல்லது தளக் கட்டணம் எதுவும் வசூலிக்காது.",
        "Workers அவர்கள் குறிப்பிட்ட அல்லது குறிப்பிட்ட சேவைக்காக ஒப்புக்கொண்ட சேவை கட்டணத்தைப் பெறுவார்கள்.",
        "வாடிக்கையாளரிடமிருந்து வசூலிக்கப்படும் ₹20 Worker Spot தளக் கட்டணம் Worker-ன் ஒப்புக்கொண்ட சேவை கட்டணத்திலிருந்து கழிக்கப்படாது.",
        "4 இலவச சேவைகள் பயன்படுத்தப்பட்ட பிறகு பொருந்தக்கூடிய Worker Spot தளக் கட்டணத்தை வாடிக்கையாளர்/பயனர் செலுத்த வேண்டும்.",
        "வாடிக்கையாளருக்கு ஒப்புக்கொண்ட சேவையை வழங்குவதற்கும், சேவை கோரிக்கையை ஏற்க வேண்டுமா அல்லது நிராகரிக்க வேண்டுமா என்பதை சுயமாக முடிவு செய்வதற்கும் Worker பொறுப்பானவர்."
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
    {
      title: "1. Worker Spot-നെ കുറിച്ച്",
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
        "ലോഗിൻ വിവരങ്ങളുടെ സുരക്ഷ ഉപയോക്താവിന്റെ ഉത്തരവാദിത്തമാണ്.",
        "പ്രധാനപ്പെട്ട വിവരങ്ങളിൽ മാറ്റമുണ്ടാകുമ്പോൾ Worker തന്റെ പ്രൊഫൈൽ വിവരങ്ങൾ പുതുക്കണം."
      ]
    },

    {
      title: "4. ഉപഭോക്തൃ അക്കൗണ്ടുകൾ",
      text: [
        "ഉപഭോക്താക്കൾ രജിസ്ട്രേഷൻ സമയത്ത് കൃത്യമായ വിവരങ്ങൾ നൽകണം.",
        "മറ്റൊരാളുടെ അക്കൗണ്ട് ദുരുപയോഗം ചെയ്യരുത്.",
        "തങ്ങളുടെ അക്കൗണ്ട് വഴി നടക്കുന്ന പ്രവർത്തനങ്ങൾക്ക് ഉപഭോക്താക്കൾ ഉത്തരവാദികളാണ്."
      ]
    },

    {
      title: "5. സേവനങ്ങളും ബുക്കിംഗുകളും",
      text: [
        "ലഭ്യമായ വിവരങ്ങളുടെ അടിസ്ഥാനത്തിൽ ഉപഭോക്താക്കളെ Workers-ുമായി ബന്ധിപ്പിക്കാൻ Worker Spot സഹായിക്കുന്നു.",
        "Worker ഏറ്റെടുത്ത സേവനം ഉത്തരവാദിത്തത്തോടെ നൽകണം.",
        "സേവനം ആരംഭിക്കുന്നതിന് മുമ്പ് ജോലി, നിരക്ക്, സമയം, മറ്റ് ആവശ്യമായ കാര്യങ്ങൾ എന്നിവ വ്യക്തമായി തീരുമാനിക്കണം.",
        "ഒരു പ്രത്യേക Worker എല്ലായ്പ്പോഴും ലഭ്യമാകുമെന്ന് അല്ലെങ്കിൽ സേവനം ഒരു നിശ്ചിത സമയത്തിനുള്ളിൽ പൂർത്തിയാകുമെന്ന് Worker Spot ഉറപ്പ് നൽകുന്നില്ല."
      ]
    },

    {
      title: "6. പേയ്‌മെന്റുകളും സർവീസ് ക്രെഡിറ്റുകളും",
      text: [
        "പ്രീപെയ്ഡ് സർവീസ് ക്രെഡിറ്റ് സംവിധാനം ബാധകമായിടത്ത്, ബന്ധപ്പെട്ട സേവനം ഉപയോഗിക്കുന്നതിന് മുമ്പ് ആവശ്യമായ പേയ്‌മെന്റ് പൂർത്തിയാക്കണം.",
        "Worker Spot നിശ്ചയിച്ചിരിക്കുന്ന സേവന നിയമങ്ങൾക്കനുസരിച്ചാണ് സർവീസ് ക്രെഡിറ്റ് ഉപയോഗിക്കേണ്ടത്.",
        "സർവീസ് ക്രെഡിറ്റുകൾ മറികടക്കാനോ കൈകാര്യം ചെയ്യാനോ വഞ്ചനാപരമായി നേടാനോ ശ്രമിക്കരുത്.",
        "ബാധകമായ പ്ലാറ്റ്‌ഫോം ഫീസ്, സേവന ചാർജുകൾ, നികുതികൾ, റീഫണ്ട് അല്ലെങ്കിൽ കാലാവധി സംബന്ധിച്ച നിയമങ്ങൾ ആവശ്യമായിടത്ത് ഇടപാടിന് മുമ്പ് ഉപയോക്താവിന് കാണിക്കും.",
        "സംശയാസ്പദമായതോ വഞ്ചനാപരമായതോ ആയ ഇടപാടുകൾ Worker Spot അന്വേഷിക്കുകയും പേയ്‌മെന്റ് ദുരുപയോഗത്തിൽ ഉൾപ്പെട്ട അക്കൗണ്ടുകൾ നിയന്ത്രിക്കുകയും ചെയ്യാം."
      ]
    },

    {
      title: "7. ഓൺലൈൻ, ഓഫ്‌ലൈൻ സേവനങ്ങൾ",
      text: [
        "ബന്ധപ്പെട്ട സൗകര്യം ലഭ്യമായിടത്ത് Worker Spot ഓൺലൈൻ, ഓഫ്‌ലൈൻ സേവന കണക്ഷനുകളെ പിന്തുണച്ചേക്കാം.",
        "ഓഫ്‌ലൈൻ സൗകര്യങ്ങൾ ഉപകരണ ശേഷി, പ്രാദേശിക കണക്റ്റിവിറ്റി, Bluetooth, Wi-Fi Direct അല്ലെങ്കിൽ പിന്തുണയ്ക്കുന്ന മറ്റ് ആശയവിനിമയ മാർഗങ്ങളെ ആശ്രയിച്ചിരിക്കാം.",
        "ഓഫ്‌ലൈൻ ആശയവിനിമയത്തിന് സാങ്കേതിക പരിമിതികൾ ഉണ്ടായേക്കാമെന്നും ഓൺലൈൻ സംവിധാനത്തിലെ എല്ലാ സൗകര്യങ്ങളും ലഭ്യമാകണമെന്നില്ലെന്നും ഉപയോക്താക്കൾ മനസ്സിലാക്കുന്നു.",
        "ഓഫ്‌ലൈൻ സൗകര്യങ്ങൾ നിയമാനുസൃതമായ Worker Spot സേവന ഇടപാടുകൾക്കായി മാത്രം ഉപയോഗിക്കണം."
      ]
    },

    {
      title: "8. ലൊക്കേഷൻ വിവരങ്ങൾ",
      text: [
        "ഉചിതമായ പ്രദേശങ്ങളിലെ Workers-നെ ഉപഭോക്താക്കൾക്ക് കണ്ടെത്താൻ സഹായിക്കുന്നതിനായി Worker Spot ലൊക്കേഷൻ വിവരങ്ങൾ ഉപയോഗിച്ചേക്കാം.",
        "സേവനവുമായി പൊരുത്തപ്പെടുത്തുന്നതിനായി ആവശ്യപ്പെടുമ്പോൾ ഉപയോക്താക്കൾ കൃത്യമായ ലൊക്കേഷൻ വിവരങ്ങൾ നൽകണം.",
        "മറ്റൊരു ഉപയോക്താവിനെ തെറ്റിദ്ധരിപ്പിക്കുന്നതിനായി വ്യാജ ലൊക്കേഷൻ വിവരങ്ങൾ നൽകാൻ പാടില്ല."
      ]
    },

    {
      title: "9. Worker-ന്റെ ഉത്തരവാദിത്തങ്ങൾ",
      text: [
        "Workers സേവനങ്ങൾ സത്യസന്ധമായും പ്രൊഫഷണൽ രീതിയിലും നൽകണം.",
        "യോഗ്യത, പരിചയം, സർട്ടിഫിക്കേഷൻ അല്ലെങ്കിൽ കഴിവുകൾ സംബന്ധിച്ച് തെറ്റായ അവകാശവാദങ്ങൾ ഉന്നയിക്കരുത്.",
        "തങ്ങളുടെ ചാർജുകൾ സത്യസന്ധമായി വ്യക്തമാക്കണം.",
        "ഉപഭോക്താവിന്റെ സ്വത്ത് മനപ്പൂർവ്വം നശിപ്പിക്കരുത്.",
        "ഉപഭോക്താവിന്റെ സ്വകാര്യത മാനിക്കുകയും അവരുടെ വിവരങ്ങൾ ദുരുപയോഗം ചെയ്യാതിരിക്കുകയും വേണം.",
        "തങ്ങളുടെ ജോലിയുമായി ബന്ധപ്പെട്ട ബാധകമായ നിയമങ്ങൾ, സുരക്ഷാ ആവശ്യകതകൾ, പ്രൊഫഷണൽ ആവശ്യകതകൾ എന്നിവ പാലിക്കണം."
      ]
    },

    {
      title: "10. ഉപഭോക്താവിന്റെ ഉത്തരവാദിത്തങ്ങൾ",
      text: [
        "ആവശ്യപ്പെട്ട സേവനത്തെക്കുറിച്ച് ഉപഭോക്താക്കൾ കൃത്യമായ വിവരങ്ങൾ നൽകണം.",
        "Workers-നെ അപമാനിക്കുകയോ ഭീഷണിപ്പെടുത്തുകയോ ഉപദ്രവിക്കുകയോ വിവേചനം കാണിക്കുകയോ ചെയ്യരുത്.",
        "അംഗീകരിച്ച സേവനം നൽകുന്നതിനായി യുക്തിസഹമായ സുരക്ഷിതമായ അന്തരീക്ഷം ഒരുക്കണം.",
        "അംഗീകരിച്ച സേവന നിബന്ധനകൾ പ്രകാരം ബാധകമായ ചാർജുകൾ അടയ്ക്കണം."
      ]
    },

    {
      title: "11. സുരക്ഷാ നിയമങ്ങൾ",
      text: [
        "പ്ലാറ്റ്‌ഫോമിലൂടെ മറ്റൊരാളെ കാണുമ്പോൾ ഉപയോക്താക്കൾ ആവശ്യമായ സുരക്ഷാ മുൻകരുതലുകൾ സ്വീകരിക്കണം.",
        "സേവനം ആരംഭിക്കുന്നതിന് മുമ്പ് മറ്റേ വ്യക്തിയുടെ തിരിച്ചറിയലും ആവശ്യമായ വിവരങ്ങളും പരിശോധിക്കണം.",
        "Worker Spot വഴി നിയമവിരുദ്ധമോ അപകടകരമോ നിയമത്തിന് വിരുദ്ധമോ ആയ ജോലികൾ ആവശ്യപ്പെടുകയോ ചെയ്യുകയോ ചെയ്യരുത്.",
        "സംശയിക്കുന്ന വഞ്ചന, ഗുരുതരമായ തെറ്റായ പെരുമാറ്റം, ഭീഷണി അല്ലെങ്കിൽ സുരക്ഷാ പ്രശ്നം ഉണ്ടെങ്കിൽ കഴിയുന്നത്ര വേഗത്തിൽ Worker Spot-നെ അറിയിക്കണം.",
        "അടിയന്തര സാഹചര്യത്തിൽ Worker Spot-നെ മാത്രം ആശ്രയിക്കാതെ ബന്ധപ്പെട്ട അടിയന്തര സേവന അധികാരികളെ ബന്ധപ്പെടണം."
      ]
    },

    {
      title: "12. നിരോധിത പ്രവർത്തനങ്ങൾ",
      text: [
        "വഞ്ചന, വ്യാജ തിരിച്ചറിയൽ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ നൽകുന്നത്.",
        "ഉപദ്രവം, ഭീഷണി, ദുരുപയോഗം അല്ലെങ്കിൽ വിവേചനപരമായ പെരുമാറ്റം.",
        "നിയമവിരുദ്ധമായ സേവനങ്ങളോ പ്രവർത്തനങ്ങളോ.",
        "സർവീസ് ക്രെഡിറ്റുകളോ പേയ്‌മെന്റുകളോ മോഷ്ടിക്കാനോ ദുരുപയോഗം ചെയ്യാനോ കൈകാര്യം ചെയ്യാനോ ശ്രമിക്കുന്നത്.",
        "മറ്റൊരു ഉപയോക്താവിന്റെ അക്കൗണ്ടിലേക്കോ ഡാറ്റയിലേക്കോ അനധികൃതമായി പ്രവേശിക്കുന്നത്.",
        "ക്ഷുദ്ര സോഫ്റ്റ്‌വെയർ അപ്‌ലോഡ് ചെയ്യുകയോ Worker Spot സംവിധാനങ്ങൾക്ക് കേടുപാടുകൾ വരുത്താൻ ശ്രമിക്കുകയോ ചെയ്യുന്നത്.",
        "സ്പാം, തട്ടിപ്പ് അല്ലെങ്കിൽ നിയമാനുസൃത സേവനങ്ങളുമായി ബന്ധമില്ലാത്ത മറ്റ് പ്രവർത്തനങ്ങൾക്കായി Worker Spot ഉപയോഗിക്കുന്നത്.",
        "അനുമതിയില്ലാതെ മറ്റൊരാളുടെ തിരിച്ചറിയൽ, ഫോൺ നമ്പർ അല്ലെങ്കിൽ വ്യക്തിഗത വിവരങ്ങൾ ഉപയോഗിക്കുന്നത്."
      ]
    },

    {
      title: "13. റദ്ദാക്കലുകൾ",
      text: [
        "റദ്ദാക്കൽ നിയമങ്ങൾ സേവനത്തിന്റെ തരവും റദ്ദാക്കൽ നടക്കുന്ന ഘട്ടവും അനുസരിച്ച് വ്യത്യാസപ്പെടാം.",
        "ബുക്കിംഗ് തുടരാൻ കഴിയാത്ത സാഹചര്യം ഉണ്ടായാൽ കഴിയുന്നത്ര നേരത്തെ റദ്ദാക്കണം.",
        "തുടർച്ചയായ ദുരുപയോഗം കണ്ടെത്തിയാൽ Worker Spot യുക്തിസഹമായ റദ്ദാക്കൽ നിയമങ്ങളോ നിയന്ത്രണങ്ങളോ പ്രയോഗിച്ചേക്കാം."
      ]
    },

    {
      title: "14. റീഫണ്ടുകൾ",
      text: [
        "റീഫണ്ടിന് അർഹത Worker Spot-ൽ കാണിച്ചിരിക്കുന്ന ബാധകമായ പേയ്‌മെന്റ്, സേവനം, റദ്ദാക്കൽ നിയമങ്ങൾ എന്നിവയെ ആശ്രയിച്ചിരിക്കും.",
        "സേവനം നൽകാത്തത്, സാങ്കേതിക പ്രശ്നം ഉണ്ടായത് അല്ലെങ്കിൽ അനധികൃത ഇടപാട് റിപ്പോർട്ട് ചെയ്തതിനെ തുടർന്ന് റീഫണ്ട് അഭ്യർത്ഥന അന്വേഷിക്കാം.",
        "വഞ്ചനാപരമായതോ ദുരുപയോഗം ചെയ്യുന്നതോ ആയ റീഫണ്ട് അഭ്യർത്ഥനകൾ നിരസിക്കുകയും അക്കൗണ്ടിന് നിയന്ത്രണങ്ങൾ ഏർപ്പെടുത്തുകയും ചെയ്യാം."
      ]
    },

    {
      title: "15. റിവ്യൂകളും റേറ്റിംഗുകളും",
      text: [
        "യഥാർത്ഥ അനുഭവത്തിന്റെ അടിസ്ഥാനത്തിൽ ഉപയോക്താക്കൾക്ക് റേറ്റിംഗുകളും റിവ്യൂകളും നൽകാൻ അനുവാദമുണ്ടാകാം.",
        "റിവ്യൂകൾ സത്യസന്ധവും പ്രസക്തവും മാന്യവുമായിരിക്കണം.",
        "വ്യാജ റിവ്യൂകൾ പോസ്റ്റ് ചെയ്യുകയോ റേറ്റിംഗുകൾ കൈകാര്യം ചെയ്യുകയോ റിവ്യൂ ഉപയോഗിച്ച് മറ്റൊരു ഉപയോക്താവിനെ ഭീഷണിപ്പെടുത്തുകയോ ഉപദ്രവിക്കുകയോ ചെയ്യരുത്.",
        "ഈ നിബന്ധനകളോ ബാധകമായ നിയമങ്ങളോ ലംഘിക്കുന്ന ഉള്ളടക്കം Worker Spot നീക്കം ചെയ്തേക്കാം."
      ]
    },

    {
      title: "16. സ്വകാര്യതയും വ്യക്തിഗത ഡാറ്റയും",
      text: [
        "സേവനങ്ങൾ നൽകുന്നതിനും സുരക്ഷിതമാക്കുന്നതിനും മെച്ചപ്പെടുത്തുന്നതിനും ആവശ്യമായ വ്യക്തിഗത വിവരങ്ങൾ Worker Spot ശേഖരിക്കുകയും പ്രോസസ്സ് ചെയ്യുകയും ചെയ്യാം.",
        "ഉപയോഗിക്കുന്ന സൗകര്യങ്ങൾ അനുസരിച്ച് പേര്, ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ, അക്കൗണ്ട് വിവരങ്ങൾ, ലൊക്കേഷൻ വിവരങ്ങൾ, സേവനവുമായി ബന്ധപ്പെട്ട വിവരങ്ങൾ എന്നിവ വ്യക്തിഗത ഡാറ്റയിൽ ഉൾപ്പെടാം.",
        "Worker Spot അതിന്റെ Privacy Policy-ക്കും ബാധകമായ ഡാറ്റാ സംരക്ഷണ ആവശ്യകതകൾക്കും അനുസരിച്ചാണ് വ്യക്തിഗത ഡാറ്റ കൈകാര്യം ചെയ്യുന്നത്.",
        "പൊതു പ്രൊഫൈലുകൾ, റിവ്യൂകൾ അല്ലെങ്കിൽ സേവന ആശയവിനിമയങ്ങൾ വഴി അനാവശ്യമായ സെൻസിറ്റീവ് വ്യക്തിഗത വിവരങ്ങൾ പങ്കിടരുത്."
      ]
    },

    {
      title: "17. അക്കൗണ്ട് സസ്പെൻഷനും അവസാനിപ്പിക്കലും",
      text: [
        "ഒരു അക്കൗണ്ട് ഈ നിബന്ധനകളോ ബാധകമായ നിയമങ്ങളോ സുരക്ഷാ ആവശ്യകതകളോ പ്ലാറ്റ്‌ഫോം നിയമങ്ങളോ ലംഘിച്ചിട്ടുണ്ടെന്ന് വിശ്വസിക്കാൻ യുക്തിസഹമായ കാരണം ഉണ്ടെങ്കിൽ Worker Spot അക്കൗണ്ട് സസ്പെൻഡ് ചെയ്യുകയോ നിയന്ത്രിക്കുകയോ അവസാനിപ്പിക്കുകയോ ചെയ്യാം.",
        "വഞ്ചന, ദുരുപയോഗം, സുരക്ഷാ അപകടസാധ്യത അല്ലെങ്കിൽ പ്ലാറ്റ്‌ഫോം ദുരുപയോഗം സംശയിക്കുന്ന സാഹചര്യങ്ങളിലും അക്കൗണ്ടുകൾ നിയന്ത്രിക്കാം.",
        "ഉചിതമായ സാഹചര്യത്തിൽ സ്ഥിരമായി അക്കൗണ്ട് അവസാനിപ്പിക്കുന്നതിന് മുമ്പ് പ്രശ്നം പരിഹരിക്കാൻ അവസരം നൽകാം."
      ]
    },

    {
      title: "18. പ്ലാറ്റ്‌ഫോം ലഭ്യത",
      text: [
        "Worker Spot അതിന്റെ സേവനങ്ങൾ ലഭ്യമാക്കാൻ ശ്രമിക്കുന്നു, എന്നാൽ തടസ്സമില്ലാത്ത ലഭ്യത ഉറപ്പാക്കാൻ കഴിയില്ല.",
        "പരിപാലനം, സാങ്കേതിക തകരാറുകൾ, നെറ്റ്‌വർക്ക് പ്രശ്നങ്ങൾ, ഉപകരണ പരിമിതികൾ അല്ലെങ്കിൽ നിയന്ത്രണത്തിന് പുറത്തുള്ള സാഹചര്യങ്ങൾ എന്നിവ കാരണം സേവനങ്ങൾ താൽക്കാലികമായി ലഭ്യമല്ലാതാകാം."
      ]
    },

    {
      title: "19. ഉത്തരവാദിത്തത്തിന്റെ പരിധി",
      text: [
        "Worker Spot ഉപഭോക്താക്കളെയും Workers-നെയും ബന്ധിപ്പിക്കുന്ന ഒരു പ്ലാറ്റ്‌ഫോമാണ്. ഒരു Worker നൽകുന്ന ഓരോ സേവനത്തിന്റെയും ഗുണനിലവാരം, നിയമസാധുത, സുരക്ഷ അല്ലെങ്കിൽ ഫലം Worker Spot ഉറപ്പുനൽകുന്നതായി കണക്കാക്കരുത്.",
        "ഉപയോക്താക്കൾ അവരുടെ സ്വന്തം പ്രവർത്തനങ്ങൾക്കും കരാറുകൾക്കും ഇടപെടലുകൾക്കും ഉത്തരവാദികളാണ്.",
        "ബാധകമായ നിയമപ്രകാരം ഒഴിവാക്കാനോ പരിമിതപ്പെടുത്താനോ കഴിയാത്ത ഏതെങ്കിലും ഉത്തരവാദിത്തമോ ഉപഭോക്തൃ അവകാശമോ ഒഴിവാക്കാനോ പരിമിതപ്പെടുത്താനോ ഈ നിബന്ധനകളിലെ ഒന്നും ഉദ്ദേശിക്കുന്നില്ല."
      ]
    },

    {
      title: "20. തർക്കപരിഹാരം",
      text: [
        "പ്ലാറ്റ്‌ഫോമുമായി ബന്ധപ്പെട്ട പരാതികൾ പരിഹരിക്കുന്നതിനായി ഉപയോക്താക്കൾ ആദ്യം Worker Spot-നെ ബന്ധപ്പെടണം.",
        "ബാധകമായ ഇന്ത്യൻ നിയമങ്ങളും നിയമപരമായി ബാധകമായ തർക്കപരിഹാര നടപടികളും അനുസരിച്ചായിരിക്കും തർക്കങ്ങൾ കൈകാര്യം ചെയ്യുന്നത്.",
        "ബാധകമായ നിയമപ്രകാരം ഉപയോക്താക്കൾക്കുള്ള അവകാശങ്ങളെയോ പരിഹാര മാർഗങ്ങളെയോ ഈ നിബന്ധനകൾ ഇല്ലാതാക്കുന്നില്ല."
      ]
    },

    {
      title: "21. ഈ നിബന്ധനകളിലെ മാറ്റങ്ങൾ",
      text: [
        "സേവനം, സാങ്കേതികവിദ്യ, സുരക്ഷാ ആവശ്യകതകൾ അല്ലെങ്കിൽ ബാധകമായ നിയമങ്ങൾ എന്നിവയിലെ മാറ്റങ്ങൾ കാരണം ആവശ്യമായപ്പോൾ Worker Spot ഈ നിബന്ധനകൾ പുതുക്കാം.",
        "പ്രധാനപ്പെട്ട മാറ്റങ്ങൾ ആവശ്യമായിടത്ത് യുക്തിസഹമായ മാർഗങ്ങളിലൂടെ ഉപയോക്താക്കളെ അറിയിക്കും.",
        "പുതുക്കിയ നിബന്ധനകൾ പ്രാബല്യത്തിൽ വന്നതിന് ശേഷം Worker Spot ഉപയോഗിക്കുന്നത്, ബാധകമായ നിയമങ്ങൾക്ക് വിധേയമായി, പുതുക്കിയ നിബന്ധനകൾ അംഗീകരിച്ചതായി കണക്കാക്കാം."
      ]
    },

    {
      title: "22. ബന്ധപ്പെടുക",
      text: [
        "ചോദ്യങ്ങൾ, പരാതികൾ, സുരക്ഷാ റിപ്പോർട്ടുകൾ അല്ലെങ്കിൽ അക്കൗണ്ടുമായി ബന്ധപ്പെട്ട പ്രശ്നങ്ങൾ എന്നിവയ്ക്കായി ആപ്ലിക്കേഷനിൽ നൽകിയിരിക്കുന്ന ഔദ്യോഗിക Worker Spot Support ചാനൽ വഴി ബന്ധപ്പെടണം."
      ]
    },

    {
      title: "23. ഉപഭോക്തൃ ഫീസ്, സൗജന്യ സേവനങ്ങൾ, Worker ഫീസ്",
      points: [
        "ഓരോ പുതിയ ഉപഭോക്താവിനും 4 സൗജന്യ സേവന ബുക്കിംഗുകൾ Worker Spot നൽകുന്നു. ഈ ആദ്യ 4 സേവനങ്ങൾക്ക് Worker Spot പ്ലാറ്റ്‌ഫോം ഫീസ് ഈടാക്കില്ല.",
        "ഒരു ഉപഭോക്താവ് 4 സൗജന്യ സേവന ബുക്കിംഗുകളും ഉപയോഗിച്ചതിന് ശേഷം ഓരോ തുടർന്നുള്ള സേവന ബുക്കിംഗിനും ₹20 Worker Spot പ്ലാറ്റ്‌ഫോം ഫീസ് ബാധകമാകും.",
        "₹20 പ്ലാറ്റ്‌ഫോം ഫീസ് ഉപഭോക്താവിൽ നിന്ന് ഈടാക്കുന്നതാണ്. ഇത് Worker-ന്റെ സേവന ഫീസിൽ നിന്ന് വേറിട്ടതാണ്.",
        "Workers സ്വതന്ത്ര സേവനദാതാക്കളാണ്. അവർ Worker Spot-ന്റെ ജീവനക്കാരോ ഏജന്റുമാരോ പങ്കാളികളോ പ്രതിനിധികളോ അല്ല.",
        "Worker Spot ഉപയോഗിക്കുന്നതിന് Workers-ൽ നിന്ന് ₹0 ഈടാക്കുന്നു.",
        "രജിസ്ട്രേഷൻ ഫീസ്, സബ്സ്ക്രിപ്ഷൻ ഫീസ്, ബുക്കിംഗ് ഫീസ്, കമ്മീഷൻ അല്ലെങ്കിൽ പ്ലാറ്റ്‌ഫോം ഫീസ് Workers-ൽ നിന്ന് Worker Spot ഈടാക്കുന്നില്ല.",
        "ഒരു പ്രത്യേക ജോലിക്ക് Worker വ്യക്തമാക്കിയതോ അംഗീകരിച്ചതോ ആയ സേവന ഫീസ് Worker-ന് ലഭിക്കും.",
        "ഉപഭോക്താവിൽ നിന്ന് ഈടാക്കുന്ന ₹20 പ്ലാറ്റ്‌ഫോം ഫീസ് Worker-ന്റെ അംഗീകരിച്ച സേവന ഫീസിൽ നിന്ന് Worker Spot കുറയ്ക്കില്ല.",
        "4 സൗജന്യ സേവനങ്ങൾ ഉപയോഗിച്ചതിന് ശേഷം ബാധകമായ Worker Spot പ്ലാറ്റ്‌ഫോം ഫീസ് അടയ്ക്കേണ്ടത് ഉപഭോക്താവിന്റെ ഉത്തരവാദിത്തമാണ്.",
        "അംഗീകരിച്ച സേവനം ഉപഭോക്താവിന് നൽകുകയും സേവന അഭ്യർത്ഥന സ്വീകരിക്കണോ നിരസിക്കണോ എന്ന് സ്വതന്ത്രമായി തീരുമാനിക്കുകയും ചെയ്യുന്നത് Worker-ന്റെ ഉത്തരവാദിത്തമാണ്."
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