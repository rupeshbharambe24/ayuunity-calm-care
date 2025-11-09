import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Auth & Onboarding
      'auth.title': 'Welcome to AyuUnity',
      'auth.subtitle': 'Your unified health records platform',
      'auth.phone': 'Phone Number',
      'auth.email': 'Email Address',
      'auth.sendOtp': 'Send OTP',
      'auth.verifyOtp': 'Verify OTP',
      'auth.otp': 'Enter OTP',
      'auth.resendOtp': 'Resend OTP',
      'auth.next': 'Next',
      'auth.back': 'Back',
      
      // Profile
      'profile.title': 'Complete Your Profile',
      'profile.name': 'Full Name',
      'profile.dob': 'Date of Birth',
      'profile.gender': 'Gender',
      'profile.bloodGroup': 'Blood Group',
      'profile.male': 'Male',
      'profile.female': 'Female',
      'profile.other': 'Other',
      
      // Consent
      'consent.title': 'Privacy & Consent',
      'consent.tos': 'I agree to the Terms of Service',
      'consent.privacy': 'I agree to the Privacy Policy',
      'consent.dataSharing': 'I consent to data sharing with healthcare providers',
      'consent.complete': 'Complete Setup',
      
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.records': 'Records',
      'nav.appointments': 'Appointments',
      'nav.doctors': 'Doctors',
      'nav.family': 'Family',
      'nav.emergency': 'Emergency',
      'nav.pharmacy': 'Pharmacy',
      'nav.labs': 'Labs',
      'nav.notifications': 'Notifications',
      'nav.settings': 'Settings',
      
      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.quickActions': 'Quick Actions',
      'dashboard.addRecord': 'Add Record',
      'dashboard.bookAppointment': 'Book Appointment',
      'dashboard.shareRecords': 'Share Records',
      'dashboard.upcoming': 'Upcoming',
      'dashboard.recentRecords': 'Recent Records',
      'dashboard.healthCards': 'Health Summary',
      'dashboard.emergency': 'Emergency Info',
      
      // Records
      'records.title': 'Health Records',
      'records.upload': 'Upload Record',
      'records.dragDrop': 'Drag and drop files here, or click to select',
      'records.type': 'Record Type',
      'records.lab': 'Lab Report',
      'records.imaging': 'Imaging',
      'records.prescription': 'Prescription',
      'records.other': 'Other',
      'records.share': 'Share',
      'records.accessLog': 'Access Log',
      'records.noRecords': 'No records yet',
      
      // Appointments
      'appointments.title': 'Appointments',
      'appointments.book': 'Book Appointment',
      'appointments.search': 'Search doctors...',
      'appointments.specialty': 'Specialty',
      'appointments.location': 'Location',
      'appointments.mode': 'Mode',
      'appointments.inPerson': 'In Person',
      'appointments.teleconsult': 'Teleconsult',
      'appointments.upcoming': 'Upcoming Appointments',
      'appointments.past': 'Past Appointments',
      'appointments.reschedule': 'Reschedule',
      'appointments.cancel': 'Cancel',
      
      // Emergency
      'emergency.title': 'Emergency Information',
      'emergency.nominee': 'Emergency Nominee',
      'emergency.addNominee': 'Add Nominee',
      'emergency.qr': 'Emergency QR Code',
      'emergency.downloadQr': 'Download QR',
      'emergency.sendPacket': 'Send Emergency Packet',
      'emergency.bloodGroup': 'Blood Group',
      'emergency.allergies': 'Allergies',
      'emergency.medications': 'Current Medications',
      
      // Settings
      'settings.title': 'Settings',
      'settings.appearance': 'Appearance',
      'settings.language': 'Language',
      'settings.security': 'Security',
      'settings.privacy': 'Privacy',
      'settings.profile': 'Profile',
      'settings.theme': 'Theme',
      'settings.light': 'Light',
      'settings.dark': 'Dark',
      'settings.highContrast': 'High Contrast',
      'settings.textSize': 'Text Size',
      'settings.reduceMotion': 'Reduce Motion',
      
      // Common
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.close': 'Close',
      'common.loading': 'Loading...',
      'common.error': 'Something went wrong',
      'common.success': 'Success',
      'common.confirm': 'Confirm',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.sort': 'Sort',
      'common.download': 'Download',
      'common.upload': 'Upload',
    },
  },
  hi: {
    translation: {
      // Auth & Onboarding
      'auth.title': 'आयुयूनिटी में आपका स्वागत है',
      'auth.subtitle': 'आपका एकीकृत स्वास्थ्य रिकॉर्ड प्लेटफ़ॉर्म',
      'auth.phone': 'फ़ोन नंबर',
      'auth.email': 'ईमेल पता',
      'auth.sendOtp': 'OTP भेजें',
      'auth.verifyOtp': 'OTP सत्यापित करें',
      'auth.otp': 'OTP दर्ज करें',
      'auth.resendOtp': 'OTP पुनः भेजें',
      'auth.next': 'आगे',
      'auth.back': 'पीछे',
      
      // Profile
      'profile.title': 'अपनी प्रोफ़ाइल पूरी करें',
      'profile.name': 'पूरा नाम',
      'profile.dob': 'जन्म तिथि',
      'profile.gender': 'लिंग',
      'profile.bloodGroup': 'रक्त समूह',
      'profile.male': 'पुरुष',
      'profile.female': 'महिला',
      'profile.other': 'अन्य',
      
      // Consent
      'consent.title': 'गोपनीयता और सहमति',
      'consent.tos': 'मैं सेवा की शर्तों से सहमत हूं',
      'consent.privacy': 'मैं गोपनीयता नीति से सहमत हूं',
      'consent.dataSharing': 'मैं स्वास्थ्य सेवा प्रदाताओं के साथ डेटा साझा करने के लिए सहमत हूं',
      'consent.complete': 'सेटअप पूर्ण करें',
      
      // Navigation
      'nav.dashboard': 'डैशबोर्ड',
      'nav.records': 'रिकॉर्ड',
      'nav.appointments': 'अपॉइंटमेंट',
      'nav.doctors': 'डॉक्टर',
      'nav.family': 'परिवार',
      'nav.emergency': 'आपातकाल',
      'nav.pharmacy': 'फार्मेसी',
      'nav.labs': 'लैब',
      'nav.notifications': 'सूचनाएं',
      'nav.settings': 'सेटिंग्स',
      
      // Dashboard
      'dashboard.title': 'डैशबोर्ड',
      'dashboard.quickActions': 'त्वरित क्रियाएं',
      'dashboard.addRecord': 'रिकॉर्ड जोड़ें',
      'dashboard.bookAppointment': 'अपॉइंटमेंट बुक करें',
      'dashboard.shareRecords': 'रिकॉर्ड साझा करें',
      'dashboard.upcoming': 'आगामी',
      'dashboard.recentRecords': 'हाल के रिकॉर्ड',
      'dashboard.healthCards': 'स्वास्थ्य सारांश',
      'dashboard.emergency': 'आपातकालीन जानकारी',
      
      // Common
      'common.save': 'सेव करें',
      'common.cancel': 'रद्द करें',
      'common.delete': 'हटाएं',
      'common.edit': 'संपादित करें',
      'common.close': 'बंद करें',
      'common.loading': 'लोड हो रहा है...',
      'common.error': 'कुछ गलत हो गया',
      'common.success': 'सफलता',
      'common.confirm': 'पुष्टि करें',
      'common.search': 'खोजें',
      'common.filter': 'फ़िल्टर',
      'common.sort': 'क्रमबद्ध करें',
      'common.download': 'डाउनलोड करें',
      'common.upload': 'अपलोड करें',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
